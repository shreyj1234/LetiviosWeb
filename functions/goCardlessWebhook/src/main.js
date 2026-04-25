import { Client, Databases, Query } from "node-appwrite";
import { createHmac } from "crypto";

const {
  APPWRITE_FUNCTION_API_ENDPOINT,
  APPWRITE_FUNCTION_PROJECT_ID,
  APPWRITE_API_KEY,
  DATABASE_ID,
  COLLECTION_SUBSCRIPTIONS_ID,
  COLLECTION_USERS_ID,
  GOCARDLESS_WEBHOOK_SECRET,
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

const TIER_CONFIG = {
  tier3: { amount: 1599, maxProperties: 5 },
  tier2: { amount: 2999, maxProperties: 15 },
  tier1: { amount: 5999, maxProperties: 999 },
};

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
  return res.json();
}

export default async ({ req, res, log, error }) => {
  try {
    // 1. Verify webhook signature
    const signature = req.headers?.["webhook-signature"];
    const rawBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    if (GOCARDLESS_WEBHOOK_SECRET && signature) {
      const expected = createHmac("sha256", GOCARDLESS_WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");
      if (expected !== signature) {
        return res.json({ ok: false, message: "Invalid signature." }, 498);
      }
    }

    const payload =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const events = payload?.events ?? [];

    for (const event of events) {
      log(`GoCardless event: ${event.resource_type} ${event.action}`);

      // ── Mandate created → activate subscription ──────────────────────────
      if (event.resource_type === "mandates" && event.action === "created") {
        const mandateId = event.links?.mandate;
        if (!mandateId) continue;

        // Fetch mandate from GoCardless
        const mandateData = await gcRequest("GET", `/mandates/${mandateId}`);
        const mandate = mandateData?.mandates;
        if (!mandate) continue;

        // Match to our subscription via billing request ID
        const billingRequestId = mandate.links?.billing_request;
        if (!billingRequestId) {
          log(`No billing_request link on mandate ${mandateId}`);
          continue;
        }

        const subRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_SUBSCRIPTIONS_ID,
          [Query.equal("gcBillingRequestId", billingRequestId), Query.limit(1)],
        );

        if (subRes.total === 0) {
          log(`No subscription found for billing request ${billingRequestId}`);
          continue;
        }

        const existingSub = subRes.documents[0];
        const landlordId = existingSub.landlordId;
        const tier = existingSub.tier;
        const tierConf = TIER_CONFIG[tier] ?? TIER_CONFIG.tier3;

        // Create the recurring GoCardless subscription
        await gcRequest("POST", "/subscriptions", {
          subscriptions: {
            amount: tierConf.amount,
            currency: "GBP",
            name: `Letivios ${tier} Plan`,
            interval_unit: "monthly",
            day_of_month: -1,
            links: { mandate: mandateId },
            metadata: { landlordId, tier },
          },
        });

        // Activate subscription in Appwrite
        const now = new Date().toISOString();
        const periodEnd = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString();

        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_SUBSCRIPTIONS_ID,
          existingSub.$id,
          {
            status: "active",
            billingSource: "gocardless",
            tier,
            maxProperties: tierConf.maxProperties,
            monthlyCharge: tierConf.amount / 100,
            billingDate: now,
            currentPeriodEnd: periodEnd,
            gcMandateId: mandateId,
          },
        );

        // Update user record with GC customer ID
        const customerId = mandate.links?.customer;
        if (customerId) {
          const userRes = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_USERS_ID,
            [Query.equal("$id", landlordId), Query.limit(1)],
          );
          if (userRes.total > 0) {
            await databases.updateDocument(
              DATABASE_ID,
              COLLECTION_USERS_ID,
              userRes.documents[0].$id,
              { gcCustomerId: customerId },
            );
          }
        }

        log(`Activated subscription for landlord ${landlordId}`);
      }

      // ── Payment confirmed → renew period ────────────────────────────────
      if (event.resource_type === "payments" && event.action === "confirmed") {
        const paymentId = event.links?.payment;
        if (!paymentId) continue;

        const paymentData = await gcRequest("GET", `/payments/${paymentId}`);
        const payment = paymentData?.payments;
        const landlordId = payment?.metadata?.landlordId;
        if (!landlordId) continue;

        const periodEnd = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString();

        const subRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_SUBSCRIPTIONS_ID,
          [Query.equal("landlordId", landlordId), Query.limit(1)],
        );

        if (subRes.total === 0) continue;

        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_SUBSCRIPTIONS_ID,
          subRes.documents[0].$id,
          {
            status: "active",
            currentPeriodEnd: periodEnd,
            paymentDate: new Date().toISOString(),
          },
        );

        // Auto-adjust tier based on property count
        const propertiesRes = await databases.listDocuments(
          DATABASE_ID,
          "properties",
          [Query.equal("landlordId", landlordId)],
        );
        const propertyCount = propertiesRes.total;
        const recommendedTier =
          propertyCount <= 5
            ? "tier3"
            : propertyCount <= 15
              ? "tier2"
              : "tier1";
        const currentTier = subRes.documents[0].tier;

        if (recommendedTier !== currentTier) {
          const newTierConf = TIER_CONFIG[recommendedTier];
          await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_SUBSCRIPTIONS_ID,
            subRes.documents[0].$id,
            {
              tier: recommendedTier,
              maxProperties: newTierConf.maxProperties,
              monthlyCharge: newTierConf.amount / 100,
            },
          );
        }
      }

      // ── Mandate cancelled/expired → lapse subscription ──────────────────
      if (
        event.resource_type === "mandates" &&
        (event.action === "cancelled" || event.action === "expired")
      ) {
        const mandateId = event.links?.mandate;
        if (!mandateId) continue;

        const subRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_SUBSCRIPTIONS_ID,
          [Query.equal("gcMandateId", mandateId), Query.limit(1)],
        );

        if (subRes.total > 0) {
          await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_SUBSCRIPTIONS_ID,
            subRes.documents[0].$id,
            { status: "cancelled" },
          );
        }
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    error(err?.message || String(err));
    return res.json(
      { ok: false, message: err?.message || "Webhook error." },
      500,
    );
  }
};
