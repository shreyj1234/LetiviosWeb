import { Client, Databases, Query, ID } from "node-appwrite";

const {
  APPWRITE_FUNCTION_API_ENDPOINT,
  APPWRITE_FUNCTION_PROJECT_ID,
  APPWRITE_API_KEY,
  DATABASE_ID,
  COLLECTION_SUBSCRIPTIONS_ID,
  GOCARDLESS_ACCESS_TOKEN,
  GOCARDLESS_ENVIRONMENT, // "sandbox" or "live"
  APP_BASE_URL, // e.g. https://letivios.com
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

// Tier config
const TIER_CONFIG = {
  tier3: { amount: 1599, maxProperties: 5 },
  tier2: { amount: 2999, maxProperties: 15 },
  tier1: { amount: 5999, maxProperties: 999 },
};

export default async ({ req, res, log, error }) => {
  try {
    const jwt = req.headers?.["x-appwrite-user-jwt"];
    if (!jwt) {
      return res.json({ ok: false, message: "Unauthorised." }, 401);
    }

    // Decode JWT to get landlordId — no need to call Users API, JWT is cryptographically signed
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString(),
    );
    const landlordId = payload.userId;

    // Check account age
    const { Users } = await import("node-appwrite");
    const users = new Users(client);
    const userData = await users.get(landlordId);
    const registeredAt = new Date(userData.registration * 1000);
    const daysSinceRegistration =
      (Date.now() - registeredAt) / (1000 * 60 * 60 * 24);

    /*     if (daysSinceRegistration < 14) {
      const daysLeft = Math.ceil(14 - daysSinceRegistration);
      return res.json(
        {
          ok: false,
          message: `Your free trial is active for ${daysLeft} more days. You can subscribe after your trial ends.`,
        },
        400,
      );
    } */

    // Still read tier/email/name from body — these are non-sensitive
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    const { tier, email, name } = body;
    // ─────────────────────────────────────────────────────────────

    if (!landlordId || !tier || !email) {
      return res.json(
        { ok: false, message: "landlordId, tier, and email are required." },
        400,
      );
    }

    const tierConf = TIER_CONFIG[tier];
    if (!tierConf) {
      return res.json({ ok: false, message: "Invalid tier." }, 400);
    }

    // 1. Create or retrieve GoCardless customer (billing request flow)
    const billingRequest = await gcRequest("POST", "/billing_requests", {
      billing_requests: {
        mandate_request: {
          currency: "GBP",
          scheme: "bacs",
          metadata: {
            landlordId,
            tier,
          },
        },
      },
    });

    const brId = billingRequest.billing_requests.id;

    // 2. Create billing request flow (hosted page)
    const flow = await gcRequest("POST", "/billing_request_flows", {
      billing_request_flows: {
        redirect_uri: `${APP_BASE_URL}/dashboard?gc_success=1&tier=${tier}`,
        exit_uri: `${APP_BASE_URL}/dashboard?gc_cancelled=1`,
        links: {
          billing_request: brId,
        },
        prefilled_customer: {
          email,
          given_name: name?.split(" ")[0] ?? "",
          family_name: name?.split(" ").slice(1).join(" ") ?? "",
        },
      },
    });

    const hostedUrl = flow.billing_request_flows.authorisation_url;

    // 3. Store pending subscription record in Appwrite
    const subRes = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_SUBSCRIPTIONS_ID,
      [Query.equal("landlordId", landlordId), Query.limit(1)],
    );

    const now = new Date().toISOString();
    const subData = {
      landlordId,
      status: "trial", // stays trial until webhook confirms
      billingSource: "gocardless",
      tier,
      maxProperties: tierConf.maxProperties,
      currentPeriodEnd: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      monthlyCharge: tierConf.amount / 100,
      gcBillingRequestId: brId, // store so webhook can match
    };

    if (subRes.total === 0) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_SUBSCRIPTIONS_ID,
        ID.unique(),
        { ...subData, trialStartDate: now },
      );
    } else {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_SUBSCRIPTIONS_ID,
        subRes.documents[0].$id,
        subData,
      );
    }

    return res.json({ ok: true, hostedUrl });
  } catch (err) {
    error(err?.message || String(err));
    return res.json(
      { ok: false, message: err?.message || "Internal server error." },
      500,
    );
  }
};
