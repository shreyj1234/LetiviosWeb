import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases, client } from "../lib/appwrite";
import { Query, Functions } from "appwrite";
import styles from "./Dashboard.module.css";
import appleLogo from "../../public/images/app-icon.png";

// ─── Tier helpers ────────────────────────────────────────────────────────────
const TIER_CONFIG = {
  tier3: { maxProperties: 5, price: "£15.99", amount: 1599 },
  tier2: { maxProperties: 15, price: "£29.99", amount: 2999 },
  tier1: { maxProperties: 9999, price: "£59.99", amount: 5999 },
};

function getRecommendedTier(propertyCount) {
  if (propertyCount <= 5) return "tier3";
  if (propertyCount <= 15) return "tier2";
  return "tier1";
}

// ─── Dashboard (root) ────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("welcome");
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("tier3");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    properties: 0,
    tenancies: 0,
    jobs: 0,
    trialDaysLeft: null,
  });

  useEffect(() => {
    account
      .get()
      .then((u) => {
        setUser(u);
        setPlan(u.prefs?.plan || "tier3");
      })
      .catch(() => navigate("/auth"));
  }, []);

  useEffect(() => {
    if (!user) return;

    const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;

    databases
      .listDocuments(dbId, "properties", [Query.equal("landlordId", user.$id)])
      .then((r) => setStats((s) => ({ ...s, properties: r.total })))
      .catch(() => {});

    databases
      .listDocuments(dbId, "tenancies", [
        Query.equal("landlordId", user.$id),
        Query.equal("status", "active"),
      ])
      .then((r) => setStats((s) => ({ ...s, tenancies: r.total })))
      .catch(() => {});

    databases
      .listDocuments(dbId, "jobs", [Query.equal("landlordId", user.$id)])
      .then((r) => setStats((s) => ({ ...s, jobs: r.total })))
      .catch(() => {});

    databases
      .listDocuments(dbId, "subscriptions", [
        Query.equal("landlordId", user.$id),
        Query.limit(1),
      ])
      .then((res) => {
        if (res.documents.length > 0) {
          const trialStart = new Date(res.documents[0].trialStartDate);
          const daysUsed = Math.floor(
            (Date.now() - trialStart) / (1000 * 60 * 60 * 24),
          );
          const trialLength = res.documents[0].trialDays ?? 14;
          const daysLeft = Math.max(0, trialLength - daysUsed);
          setStats((s) => ({ ...s, trialDaysLeft: daysLeft }));
        } else {
          // No subscription doc yet — fall back to account creation date
          const created = new Date(user.$createdAt);
          const daysUsed = Math.floor(
            (Date.now() - created) / (1000 * 60 * 60 * 24),
          );
          const daysLeft = Math.max(0, 14 - daysUsed);
          setStats((s) => ({ ...s, trialDaysLeft: daysLeft }));
        }
      })
      .catch(() => {});
  }, [user]);

  const handleSignOut = async () => {
    try {
      await account.deleteSession("current");
    } catch {}
    navigate("/auth");
  };

  const handleCancelSubscription = async () => {
    setShowCancelModal(false);
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "subscriptions",
        [Query.equal("landlordId", user.$id), Query.limit(1)],
      );
      if (res.documents.length === 0) {
        alert("No active subscription found.");
        return;
      }
      const sub = res.documents[0];
      const gcMandateId = sub.gcMandateId;
      if (!gcMandateId) {
        alert("No Direct Debit mandate found.");
        return;
      }
      const jwt = await account.createJWT(); // ← add this
      const functions = new Functions(client);
      await functions.createExecution(
        import.meta.env.VITE_FUNCTION_CANCEL_GC_SUBSCRIPTION_ID,
        JSON.stringify({ mandateId: gcMandateId, jwt: jwt.jwt }), // ← add jwt here
        false,
      );
      alert(
        "Subscription cancelled. Your access continues until the end of your billing period.",
      );
    } catch (err) {
      alert(err.message || "Failed to cancel subscription.");
    }
  };

  const planLabels = {
    tier3: "Tier 3 Plan",
    tier2: "Tier 2 Plan",
    tier1: "Tier 1 Plan",
  };
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className={styles.shell} style={{ overflow: "visible" }}>
      {" "}
      {/* ── Sidebar ── */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarExpanded : ""}`}
      >
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <span>{sidebarOpen ? "✕  Close" : "☰  Menu"}</span>
          <img src="/images/webIcon.png" style={{ height: 26 }} alt="" />
        </button>
        <div className={styles.sidebarNav}>
          <a href="/" className={styles.sidebarLogo}>
            <img src="/images/webIcon.png" style={{ height: 36 }} alt="" />
            <img src="/images/title.png" style={{ height: 22 }} alt="" />
          </a>

          <div className={styles.navSectionLabel}>Overview</div>
          <button
            className={`${styles.navItem} ${activeSection === "welcome" ? styles.navActive : ""}`}
            onClick={() => {
              setActiveSection("welcome");
              setSidebarOpen(false);
            }}
          >
            <span>🏠</span> Dashboard
          </button>

          <div className={styles.navSectionLabel}>Manage</div>
          <button className={`${styles.navItem} ${styles.navDisabled}`}>
            <span>🏘️</span> Portfolio{" "}
            <span className={styles.comingSoonBadge}>Soon</span>
          </button>
          <button className={`${styles.navItem} ${styles.navDisabled}`}>
            <span>🔧</span> Jobs{" "}
            <span className={styles.comingSoonBadge}>Soon</span>
          </button>
          <button className={`${styles.navItem} ${styles.navDisabled}`}>
            <span>💬</span> Messages{" "}
            <span className={styles.comingSoonBadge}>Soon</span>
          </button>

          <div className={styles.navSectionLabel}>Account</div>
          <button
            className={`${styles.navItem} ${activeSection === "subscription" ? styles.navActive : ""}`}
            onClick={() => {
              setActiveSection("subscription");
              setSidebarOpen(false);
            }}
          >
            <span>💳</span> Subscription
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "account" ? styles.navActive : ""}`}
            onClick={() => {
              setActiveSection("account");
              setSidebarOpen(false);
            }}
          >
            <span>👤</span> Account
          </button>

          <div className={styles.navSectionLabel}>App</div>
          <button className={styles.navItem}>
            <span>❓</span> Support
          </button>

          <div className={styles.sidebarSpacer} />

          <div className={styles.sidebarUser}>
            <div className={styles.userAvatar}>👤</div>
            <div>
              <div className={styles.userName}>
                {user?.name || "Loading..."}
              </div>
              <div className={styles.userPlan}>{planLabels[plan]}</div>
            </div>
            <button
              className={styles.signoutBtn}
              onClick={() => setShowSignOutModal(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      {/* ── Main ── */}
      <main className={styles.main}>
        {activeSection === "welcome" && (
          <WelcomeSection firstName={firstName} stats={stats} />
        )}
        {activeSection === "subscription" && (
          <SubscriptionSection
            user={user}
            stats={stats}
            onCancel={() => setShowCancelModal(true)}
          />
        )}
        {activeSection === "account" && <AccountSection user={user} />}
      </main>
      {/* ── Sign-out modal ── */}
      {showSignOutModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowSignOutModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>Sign out?</div>
            <div className={styles.modalDesc}>
              You'll need to sign in again to access your account.
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.modalBtnCancel}
                onClick={() => setShowSignOutModal(false)}
              >
                Cancel
              </button>
              <button className={styles.modalBtnDanger} onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── Cancel-subscription modal ── */}
      {showCancelModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowCancelModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>Cancel subscription?</div>
            <div className={styles.modalDesc}>
              Your access continues until the end of your billing period. Data
              kept for 90 days.
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.modalBtnCancel}
                onClick={() => setShowCancelModal(false)}
              >
                Keep subscription
              </button>
              <button
                className={styles.modalBtnDanger}
                onClick={handleCancelSubscription}
              >
                Cancel anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WelcomeSection ───────────────────────────────────────────────────────────
function WelcomeSection({ firstName, stats }) {
  const statCards = [
    {
      value: stats.properties.toString(),
      label: "Properties added",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 8.5L10 2l8 6.5V18a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M7 19v-7h6v7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: stats.tenancies.toString(),
      label: "Active tenancies",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M2 17c0-3.314 2.686-5 6-5s6 1.686 6 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="15"
            cy="7"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M18 17c0-2.21-1.343-3.5-3-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      value: stats.jobs.toString(),
      label: "Active jobs",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.5 3.5l2 2-9 9-2.5.5.5-2.5 9-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12.5 5.5l2 2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    ...(stats.trialDaysLeft > 0
      ? [
          {
            value: stats.trialDaysLeft.toString(),
            label: "Trial days left",
            icon: (
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6v4l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
        ]
      : []),
  ];

  const appFeatures = [
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <path
            d="M2 8.5L10 2l8 6.5V18a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M7 19v-7h6v7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Portfolio",
      desc: "View and manage all your properties, rooms, and HMOs in one place.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <path
            d="M14.5 3.5l2 2-9 9-2.5.5.5-2.5 9-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12.5 5.5l2 2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Maintenance Jobs",
      desc: "Log repair requests, assign contractors, and track job progress.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <path
            d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M3 7l7 5 7-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Messaging",
      desc: "Message tenants directly, send notices, and keep a full audit trail.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <rect
            x="2"
            y="4"
            width="16"
            height="12"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 9h8M6 12h5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Rent & Payments",
      desc: "Track rent payments, send reminders, and manage arrears.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <path
            d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 2v4h4M7 9h6M7 12h6M7 15h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Documents",
      desc: "Store tenancy agreements, gas certificates, and inspection reports.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none">
          <circle
            cx="10"
            cy="10"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Inspections",
      desc: "Schedule property inspections and log damages with photo evidence.",
    },
  ];

  return (
    <div className={styles.wContainer}>
      <div className={styles.wPageHeader}>
        <h2 className={styles.wGreeting}>Welcome back, {firstName}</h2>
        <p className={styles.wSubline}>Here's a snapshot of your portfolio.</p>
      </div>

      <div className={styles.wStatsGrid}>
        {statCards.map((card) => (
          <div key={card.label} className={styles.wStatCard}>
            <div className={styles.wStatIcon}>{card.icon}</div>
            <div className={styles.wStatValue}>{card.value}</div>
            <div className={styles.wStatLabel}>{card.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.wSectionHeader}>
        <h3 className={styles.wSectionTitle}>
          Everything you need — in the app
        </h3>
        <p className={styles.wSectionSubtitle}>
          The full Letivios experience is available on iOS and Android. Download
          the app to access all features included in your plan.
        </p>
      </div>

      <div className={styles.wFeaturesGrid}>
        {appFeatures.map((feature) => (
          <div key={feature.title} className={styles.wFeatureCard}>
            <div className={styles.wFeatureIcon}>{feature.icon}</div>
            <div className={styles.wFeatureText}>
              <div className={styles.wFeatureTitle}>{feature.title}</div>
              <div className={styles.wFeatureDesc}>{feature.desc}</div>
            </div>
            <div className={styles.wFeatureBadge}>Available in app</div>
          </div>
        ))}
      </div>

      <div className={styles.wDownloadBanner}>
        <div className={styles.wDownloadLeft}>
          <img src={appleLogo} alt="Letivios" className={styles.wAppIcon} />
          <div className={styles.wDownloadText}>
            <strong className={styles.wDownloadTitle}>
              Get the Letivios app
            </strong>
            <span className={styles.wDownloadSub}>
              Manage your properties on the go — available on iOS &amp; Android.
            </span>
          </div>
        </div>
        <div className={styles.wDownloadBtns}>
          <a href="#" className={styles.wBtnApple}>
            <svg
              viewBox="0 0 14 17"
              className={styles.wStoreBtnIcon}
              fill="currentColor"
            >
              <path d="M13.26 13.07c-.24.55-.52 1.06-.85 1.53-.45.63-.82 1.07-1.1 1.3-.44.4-.91.61-1.42.62-.36 0-.8-.1-1.3-.31-.5-.2-.96-.3-1.38-.3-.44 0-.91.1-1.42.3-.51.21-.92.32-1.24.33-.49.02-.97-.2-1.44-.63-.3-.25-.69-.7-1.15-1.37A7.89 7.89 0 01.4 12.3 7.56 7.56 0 010 9.93c0-.88.19-1.64.57-2.27A3.35 3.35 0 011.77 6.4a3.2 3.2 0 011.6-.44c.4 0 .92.12 1.56.36.64.24 1.05.36 1.23.36.13 0 .58-.14 1.32-.43.7-.27 1.3-.38 1.78-.34 1.32.1 2.3.62 2.96 1.55-1.18.71-1.76 1.7-1.75 2.98.01 1 .37 1.82 1.08 2.48.32.3.68.54 1.08.7l-.37.45zM10.1.24c0 .78-.28 1.51-.85 2.18-.68.8-1.51 1.26-2.4 1.18a2.4 2.4 0 01-.02-.3c0-.75.33-1.55.9-2.2.29-.33.65-.61 1.1-.83.44-.22.86-.34 1.25-.36.01.1.02.22.02.33z" />
            </svg>
            App Store
          </a>
          <a href="#" className={styles.wBtnGoogle}>
            <svg
              viewBox="0 0 13 14"
              className={styles.wStoreBtnIcon}
              fill="currentColor"
            >
              <path d="M.5 1.18v11.64c0 .48.53.76.93.5l10.44-5.82a.57.57 0 000-.99L1.43.68A.57.57 0 00.5 1.18z" />
            </svg>
            Google Play
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SubscriptionSection ──────────────────────────────────────────────────────
function SubscriptionSection({ onCancel, user, stats }) {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gc_success")) {
      alert(
        "Payment authorised! Your subscription will activate within a minute.",
      );
      window.history.replaceState({}, "", "/dashboard");
      setFetchingStatus(true);
    }
    if (params.get("gc_cancelled")) {
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  useEffect(() => {
    if (!user || !fetchingStatus) return;
    databases
      .listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "subscriptions",
        [Query.equal("landlordId", user.$id), Query.limit(1)],
      )
      .then((res) => {
        if (res.documents.length > 0) setSubscription(res.documents[0]);
      })
      .catch(() => {})
      .finally(() => setFetchingStatus(false));
  }, [user, fetchingStatus]);

  const subStatus = subscription?.status ?? "trial";
  const isActive = subStatus === "active";
  const isCancelled = subStatus === "cancelled";

  const propertyCount = stats?.properties ?? 0;
  const recommendedTier =
    propertyCount <= 5 ? "tier3" : propertyCount <= 15 ? "tier2" : "tier1";
  const currentTier = isActive
    ? (subscription?.tier ?? recommendedTier)
    : recommendedTier;

  const trialStartDate = subscription?.trialStartDate
    ? new Date(subscription.trialStartDate)
    : user?.$createdAt
      ? new Date(user.$createdAt)
      : null;

  const trialLength = subscription?.trialDays ?? 14;
  const trialDaysLeft = trialStartDate
    ? Math.max(
        0,
        trialLength -
          Math.floor((Date.now() - trialStartDate) / (1000 * 60 * 60 * 24)),
      )
    : trialLength;

  const isInTrial = trialDaysLeft > 0 && !isActive && !isCancelled;

  const periodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const accessEnds = isCancelled && periodEnd ? periodEnd : null;

  const plans = [
    {
      id: "tier3",
      name: "Tier 3",
      price: "£15.99",
      description: "Up to 5 properties",
      maxProperties: 5,
    },
    {
      id: "tier2",
      name: "Tier 2",
      price: "£29.99",
      description: "Up to 15 properties",
      maxProperties: 15,
    },
    {
      id: "tier1",
      name: "Tier 1",
      price: "£59.99",
      description: "Unlimited properties",
      maxProperties: null,
    },
  ];

  const currentPlanMeta = plans.find((p) => p.id === currentTier) ?? plans[0];

  const handleSubscribe = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const jwt = await account.createJWT();

      const functions = new Functions(client);
      const execution = await functions.createExecution(
        import.meta.env.VITE_FUNCTION_CREATE_GC_SUBSCRIPTION_ID,
        JSON.stringify({
          tier: currentTier,
          email: user.email,
          name: user.name,
          jwt: jwt.jwt,
        }),
        false,
        "/",
        "POST",
      );

      const result = JSON.parse(execution.responseBody || "{}");

      if (result?.ok && result?.hostedUrl) {
        window.location.href = result.hostedUrl;
      } else {
        alert(result?.message || "Failed to start subscription.");
      }
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2>Subscription</h2>
        <p>
          All plans include full Letivios access. Pricing is based on how many
          properties you manage.
        </p>
      </div>

      {/* ── Top status card ── */}
      <div className={styles.subCurrent}>
        <div className={styles.subTierBadge}>
          {isActive
            ? `${currentPlanMeta.name} — Active`
            : isCancelled
              ? "Subscription Cancelled"
              : isInTrial
                ? "Free Trial Active"
                : "Trial Ended"}
        </div>

        <div className={styles.subPrice}>
          {isActive ? currentPlanMeta.price : "Free"}
          <span>{isActive ? "/month" : isInTrial ? " during trial" : ""}</span>
        </div>

        {!isCancelled && (
          <div className={styles.subRenews}>
            {isActive
              ? `Supports ${currentPlanMeta.description}`
              : `Your plan after trial: ${currentPlanMeta.name} (${currentPlanMeta.price}/mo · ${currentPlanMeta.description})`}
          </div>
        )}

        {isInTrial && (
          <div className={styles.subRenews} style={{ marginTop: 6 }}>
            <strong>
              {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} remaining
            </strong>{" "}
            — set up your Direct Debit now so your access continues
            automatically. No payment is taken until your trial ends.
          </div>
        )}

        {isCancelled && accessEnds && (
          <div className={styles.subRenews} style={{ color: "#DC2626" }}>
            Your access ends {accessEnds}
          </div>
        )}

        {isCancelled && (
          <div
            className={styles.subRenews}
            style={{ marginTop: 4, fontSize: 13, color: "#6B7280" }}
          >
            You can resubscribe at any time to continue using Letivios.
          </div>
        )}

        {periodEnd && isActive && (
          <div className={styles.subRenews}>Renews {periodEnd}</div>
        )}

        <div className={styles.subActions} style={{ marginTop: 16 }}>
          {!isActive && !isCancelled && !subscription?.gcMandateId && (
            <button
              className={styles.btnPrimary}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isInTrial
                  ? "Set up Direct Debit — no charge until trial ends"
                  : "Subscribe via GoCardless"}
            </button>
          )}
          {isInTrial && subscription?.gcMandateId && (
            <>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>
                ✅ Direct Debit set up — your first payment will be taken when
                your trial ends.
              </div>
              <button className={styles.btnOutline} onClick={onCancel}>
                Cancel Direct Debit
              </button>
            </>
          )}
          {isActive && (
            <button className={styles.btnOutline} onClick={onCancel}>
              Cancel subscription
            </button>
          )}
          {isCancelled && (
            <button
              className={styles.btnPrimary}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Loading..." : "Resubscribe via GoCardless"}
            </button>
          )}
        </div>
      </div>

      {/* ── Pricing tiers (info only) ── */}
      <div style={{ marginTop: 28, marginBottom: 8 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 4,
          }}
        >
          Pricing tiers
        </p>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16 }}>
          Your tier is set automatically based on your property count. It
          adjusts at each billing cycle.
        </p>
      </div>

      <div className={styles.plansGrid}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.planCard}>
            <div className={styles.planTier}>{plan.name}</div>
            <div className={styles.planPriceLg}>
              {plan.price}
              <sub>/mo</sub>
            </div>
            <div className={styles.planPropsLabel}>{plan.description}</div>
            <ul className={styles.planFeatures}>
              <li>Full access to all Letivios features</li>
              <li>{plan.description}</li>
              <li>Adjusts automatically as your portfolio grows</li>
            </ul>
            {plan.id === currentTier && (
              <div className={styles.planAutoNote}>
                📍 Your current tier — based on <strong>{propertyCount}</strong>{" "}
                {propertyCount === 1 ? "property" : "properties"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── GoCardless trust note ── */}
      <div
        className={styles.cancelZone}
        style={{
          backgroundColor: "#F0FDF4",
          borderColor: "#BBF7D0",
          marginTop: 24,
        }}
      >
        <div className={styles.cancelZoneTitle} style={{ color: "#166534" }}>
          🔒 Secure direct debit via GoCardless
        </div>
        <div className={styles.cancelZoneDesc}>
          GoCardless is FCA authorised and used by thousands of UK businesses.
          Your bank details are never shared with us. You can cancel anytime.
        </div>
      </div>

      {/* ── Cancel zone (active only) ── */}
      {isActive && (
        <div className={styles.cancelZone} style={{ marginTop: 16 }}>
          <div className={styles.cancelZoneTitle}>Cancel subscription</div>
          <div className={styles.cancelZoneDesc}>
            Cancelling will end your access at the end of your current billing
            period. Your data is retained for 90 days.
          </div>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel subscription
          </button>
        </div>
      )}
    </div>
  );
}

// ─── AccountSection ───────────────────────────────────────────────────────────
function AccountSection({ user }) {
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(
    user?.name?.split(" ").slice(1).join(" ") || "",
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const saveProfile = async () => {
    setSaving(true);
    try {
      await account.updateName(`${firstName} ${lastName}`);

      // Update phone in users collection
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "users",
        user.$id,
        { phone: phone },
      );

      alert("Profile saved!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      await account.updatePassword(newPassword);
      alert("Password updated!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2>Account settings</h2>
        <p>Update your personal details and password.</p>
      </div>

      <div className={styles.accountGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Personal details</div>
          <div className={styles.fieldGroup}>
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Email address</label>
            <input type="email" value={user?.email || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              placeholder="+44 7700 900000"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            className={styles.btnPrimary}
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Change password</div>
          <div className={styles.fieldGroup}>
            <label>New password</label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Confirm new password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className={styles.btnPrimary}
            onClick={changePassword}
            disabled={saving}
          >
            {saving ? "Saving..." : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}
