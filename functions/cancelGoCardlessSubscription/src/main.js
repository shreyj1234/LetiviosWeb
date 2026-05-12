import { Client, Databases, Query } from "node-appwrite";

const {
  APPWRITE_FUNCTION_API_ENDPOINT,
  APPWRITE_FUNCTION_PROJECT_ID,
  APPWRITE_API_KEY,
  DATABASE_ID,
  COLLECTION_SUBSCRIPTIONS_ID,
  GOCARDLESS_ACCESS_TOKEN,
  GOCARDLESS_ENVIRONMENT,
} = process.env;

const client = new Client()
  .setEndpoint(APPWRITE_FUNCTION_API_ENDPOINT)
  .setProject(APPWRITE_FUNCTION_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const databases = new Databases(client);

const GC_BASE =
  GOCARDLESS_ENVIRONMENT === "live"
    ? "https://api.gocardless.com"
    : "https://api-sandbox.gocardless.com";

async function gcRequest(method, path, body) {
  const res = await fetch(`${GC_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GOCARDLESS_ACCESS_TOKEN}`,
      "GoCardless-Version": "2015-07-06",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok)
    throw new Error(json?.error?.message || `GoCardless error ${res.status}`);
  return json;
}

export default async ({ req, res, log, error }) => {
  try {
    // 1. Auth check
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});

    const jwt = req.headers?.["x-appwrite-user-jwt"] ?? body.jwt;
    if (!jwt) return res.json({ ok: false, message: "Unauthorised." }, 401);

    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString(),
    );
    const landlordId = payload.sub ?? payload.userId;

    const { mandateId } = body;

    if (!mandateId) {
      return res.json({ ok: false, message: "mandateId is required." }, 400);
    }

    // 3. Verify mandate belongs to this user
    const ownerCheck = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_SUBSCRIPTIONS_ID,
      [Query.equal("gcMandateId", mandateId), Query.limit(1)],
    );

    if (
      ownerCheck.total === 0 ||
      ownerCheck.documents[0].landlordId !== landlordId
    ) {
      return res.json({ ok: false, message: "Unauthorised." }, 401);
    }

    // 2. Cancel the mandate in GoCardless
    await gcRequest("POST", `/mandates/${mandateId}/actions/cancel`, {
      data: {},
    });

    log(`Cancelled GoCardless mandate ${mandateId}`);

    // 3. Update subscription status in Appwrite (reuse ownerCheck result)
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_SUBSCRIPTIONS_ID,
      ownerCheck.documents[0].$id,
      { status: "cancelled" },
    );
    log(`Updated subscription to cancelled for mandate ${mandateId}`);

    return res.json({ ok: true });
  } catch (err) {
    error(err?.message || String(err));
    return res.json(
      { ok: false, message: err?.message || "Failed to cancel subscription." },
      500,
    );
  }
};
