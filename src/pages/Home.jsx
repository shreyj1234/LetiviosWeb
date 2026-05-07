import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        }),
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));

    // Make hero elements visible immediately
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll(`.${styles.heroReveal}`)
          .forEach((el) => el.classList.add(styles.visible));
      });
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <a href="/" className={styles.logo}>
              <img
                src="/images/webIcon.png"
                className={styles.logoIcon}
                alt="Letivios"
              />
              <img
                src="/images/title.png"
                className={styles.logoTextImg}
                alt="Letivios"
              />
            </a>
            <div className={styles.navLinks}>
              <a
                href="#features"
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Features
              </a>
              <a
                href="#how"
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("how")
                    .scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                How it works
              </a>
              <button
                className={styles.navCta}
                onClick={() => navigate("/auth")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div>
              <h1
                className={`${styles.reveal} ${styles.heroReveal} ${styles.delay1}`}
              >
                Manage properties,
                <br />
                tenants, and payments
                <br />
                <em>all on one platform.</em>
              </h1>
              <p
                className={`${styles.heroSub} ${styles.reveal} ${styles.heroReveal} ${styles.delay2}`}
              >
                Letivios is a management and tracking platform — not a signing
                tool. Documents are stored and shared, payments are tracked and
                confirmed, jobs are logged and monitored. Everything in one
                place, for everyone involved.
              </p>
              <div
                className={`${styles.heroActions} ${styles.reveal} ${styles.heroReveal} ${styles.delay3}`}
              >
                <button
                  className={styles.btnPrimary}
                  onClick={() => navigate("/auth")}
                >
                  Start Managing Smarter
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className={styles.heroTrust}>
                No credit card required · Cancel anytime
              </p>
              <div
                className={`${styles.heroReplacesWrap} ${styles.reveal} ${styles.heroReveal} ${styles.delay4}`}
              >
                <p className={styles.replacesLabel}>
                  Replaces your current tools
                </p>
                <div className={styles.heroReplaces}>
                  {[
                    ["WhatsApp groups", "In-app messaging"],
                    ["Excel spreadsheets", "Payment tracking"],
                    ["Email attachments", "Document storage"],
                    ["Phone calls", "Maintenance jobs"],
                    ["Paper notices", "Digital records"],
                  ].map(([before, after]) => (
                    <div key={before} className={styles.heroReplacesItem}>
                      <span className={styles.replacesBefore}>{before}</span>
                      <span className={styles.replacesArrow}>→</span>
                      <span className={styles.replacesAfter}>{after}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p
                className={`${styles.heroNote} ${styles.reveal} ${styles.heroReveal} ${styles.delay5}`}
              >
                Available on iOS & Android · Only landlords pay — tenants &
                contractors are free{" "}
              </p>
            </div>

            {/* Phone mockup */}
            <div
              className={`${styles.heroVisual} ${styles.reveal} ${styles.heroReveal} ${styles.delay2}`}
            >
              <div className={styles.phoneWrap}>
                <div className={styles.phoneGlow} />
                <div className={styles.phone}>
                  <div className={styles.phoneNotch} />
                  <div className={styles.phoneScreen}>
                    <div className={styles.phoneHeader}>
                      <div className={styles.phoneHeaderTitle}>Portfolio</div>
                      <div className={styles.phoneHeaderSub}>
                        Manage properties & tenants
                      </div>
                      <div className={styles.phoneHeaderStats}>
                        {[
                          ["4", "Properties"],
                          ["3", "Occupied"],
                          ["1", "Vacant"],
                        ].map(([v, l]) => (
                          <div key={l} className={styles.phoneStat}>
                            <div className={styles.phoneStatV}>{v}</div>
                            <div className={styles.phoneStatL}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.phoneCards}>
                      <div className={styles.phoneCard}>
                        <div
                          className={styles.phoneCardIcon}
                          style={{ background: "rgba(74,124,255,0.15)" }}
                        >
                          🏠
                        </div>
                        <div>
                          <div className={styles.phoneCardTitle}>
                            12 Baker Street
                          </div>
                          <div className={styles.phoneCardSub}>
                            2 bed · Flat · £1,400/mo
                          </div>
                        </div>
                        <div
                          className={styles.phoneCardBadge}
                          style={{
                            background: "rgba(34,197,94,0.15)",
                            color: "#22c55e",
                          }}
                        >
                          Active
                        </div>
                      </div>
                      <div className={styles.phoneCard}>
                        <div
                          className={styles.phoneCardIcon}
                          style={{ background: "rgba(232,180,90,0.15)" }}
                        >
                          💳
                        </div>
                        <div>
                          <div className={styles.phoneCardTitle}>
                            Rent due in 3 days
                          </div>
                          <div className={styles.phoneCardSub}>
                            S. Holmes · £1,400
                          </div>
                        </div>
                        <div
                          className={styles.phoneCardBadge}
                          style={{
                            background: "rgba(232,180,90,0.15)",
                            color: "#e8b45a",
                          }}
                        >
                          Soon
                        </div>
                      </div>
                      <div className={styles.phoneCard}>
                        <div
                          className={styles.phoneCardIcon}
                          style={{ background: "rgba(239,68,68,0.15)" }}
                        >
                          🔧
                        </div>
                        <div>
                          <div className={styles.phoneCardTitle}>
                            Boiler repair
                          </div>
                          <div className={styles.phoneCardSub}>
                            J. Smith Plumbing
                          </div>
                        </div>
                        <div
                          className={styles.phoneCardBadge}
                          style={{
                            background: "rgba(74,124,255,0.15)",
                            color: "#4a7cff",
                          }}
                        >
                          Open
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <div
            ref={addRef}
            className={`${styles.reveal} ${styles.featuresHeader}`}
          >
            <div>
              <h2>
                Built around the way
                <br />
                <em>landlords actually work</em>
              </h2>
              <p className={styles.sectionSub}>
                Every feature designed from real landlord workflows. No bloat,
                no confusion — just the tools that matter.
              </p>
            </div>
            <div className={styles.pricingRow}>
              {[
                { name: "Starter", price: "£15", props: "Up to 5 Properties" },
                {
                  name: "Growth",
                  price: "£29",
                  props: "Up to 15 Properties",
                },
                { name: "Pro", price: "£59", props: "Unlimited Properties" },
              ].map((p) => (
                <div key={p.name} className={styles.pricingCard}>
                  <div className={styles.pricingName}></div>
                  <div className={styles.pricingPrice}>
                    {p.price}
                    <span>/mo</span>
                  </div>
                  <div className={styles.pricingProps}>{p.props}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featuresGrid}>
            {[
              {
                icon: "🏠",
                title: "Portfolio Management",
                desc: "Monitor occupancy, lease dates, rent amounts, deposit status and key safe codes at a glance.",
                tag: "Landlord",
              },
              {
                icon: "🗓️",
                title: "Calendar & Viewings",
                desc: "Track inspections, contractor visits, viewings and other property events in one calendar. All parties see what's relevant to them.",
                tag: "All roles",
              },
              {
                icon: "💬",
                title: "In-App Messaging",
                desc: "Direct messaging between landlords, tenants, and contractors. Job-linked threads keep conversations in context. No more lost WhatsApp messages.",
                tag: "All roles",
              },
              {
                icon: "💸",
                title: "Payment Tracking",
                desc: "Tenants notify you when rent is sent. Landlords confirm receipt in one tap. Full payment history with overdue alerts — no actual payments processed.",
                tag: "Landlord + Tenant",
              },
              {
                icon: "🔧",
                title: "Job Management",
                desc: "Log maintenance jobs, assign contractors, track progress and view completion photos. Tenants are notified when a contractor is scheduled.",
                tag: "All roles",
              },
              {
                icon: "📁",
                title: "Document Storage",
                desc: "Tenancy agreements, guarantor docs, gas certificates — all stored securely. Mutual consent required for any deletion.",
                tag: "Landlord + Tenant",
              },
            ].map((f, i) => (
              <div
                key={i}
                ref={addRef}
                className={`${styles.featureCard} ${styles.reveal}`}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
                <span className={styles.featureTag}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className={styles.howSection}>
        <div className={styles.container}>
          <div className={styles.howGrid}>
            <div ref={addRef} className={`${styles.steps} ${styles.reveal}`}>
              <h2 style={{ marginBottom: 24 }}>
                Up and running in
                <br />
                <em>minutes, not days</em>
              </h2>
              {[
                {
                  n: "1",
                  title: "Create your account",
                  desc: "Sign up on this website and choose a plan. Your 14-day free trial starts immediately — no card required.",
                },
                {
                  n: "2",
                  title: "Add your properties",
                  desc: "Each property gets a unique referral code. Set rent, deposit, lease dates, and the app handles the rest.",
                },
                {
                  n: "3",
                  title: "Invite your tenants",
                  desc: "Share the referral code. Tenants download the app, enter the code, and are instantly linked to the property.",
                },
                {
                  n: "4",
                  title: "Manage everything in one place",
                  desc: "Payments, documents, maintenance, inspections — all flowing between landlord and tenant through Letivios.",
                },
              ].map((s) => (
                <div key={s.n} className={styles.step}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <div>
                    <div className={styles.stepTitle}>{s.title}</div>
                    <div className={styles.stepDesc}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={addRef}
              className={`${styles.howVisual} ${styles.reveal}`}
            >
              <div className={styles.howVisualHeader}>
                <div className={styles.dot} style={{ background: "#ef4444" }} />
                <div className={styles.dot} style={{ background: "#e8b45a" }} />
                <div className={styles.dot} style={{ background: "#22c55e" }} />
                <span className={styles.howVisualLabel}>
                  Letivios — Tenancy Overview
                </span>
              </div>
              <div className={styles.flowBody}>
                {[
                  {
                    label: "PROPERTY",
                    items: [
                      {
                        icon: "🏠",
                        bg: "rgba(74,124,255,0.15)",
                        title: "12 Baker Street",
                        sub: "2 bed flat · NW1 6XE",
                        status: "Occupied",
                        statusColor: "#22c55e",
                        statusBg: "rgba(34,197,94,0.15)",
                      },
                    ],
                  },
                  {
                    label: "TENANT",
                    items: [
                      {
                        icon: "👤",
                        bg: "rgba(232,180,90,0.15)",
                        title: "Sherlock Holmes",
                        sub: "Linked via LET-AB12CD · Lease until Jan 2027",
                        status: "Active",
                        statusColor: "#4a7cff",
                        statusBg: "rgba(74,124,255,0.15)",
                      },
                    ],
                  },
                  {
                    label: "PAYMENTS",
                    items: [
                      {
                        icon: "💸",
                        bg: "rgba(34,197,94,0.15)",
                        title: "April rent received",
                        sub: "£1,400 · 1 Apr 2026 · Confirmed",
                        status: "Paid",
                        statusColor: "#22c55e",
                        statusBg: "rgba(34,197,94,0.15)",
                      },
                      {
                        icon: "💸",
                        bg: "rgba(232,180,90,0.15)",
                        title: "May rent due",
                        sub: "£1,400 · 1 May 2026",
                        status: "Soon",
                        statusColor: "#e8b45a",
                        statusBg: "rgba(232,180,90,0.15)",
                      },
                    ],
                  },
                  {
                    label: "MAINTENANCE",
                    items: [
                      {
                        icon: "🔧",
                        bg: "rgba(239,68,68,0.15)",
                        title: "Boiler repair",
                        sub: "J. Smith Plumbing · Raised 8 Apr",
                        status: "Open",
                        statusColor: "#4a7cff",
                        statusBg: "rgba(74,124,255,0.15)",
                      },
                      {
                        icon: "🔧",
                        bg: "rgba(34,197,94,0.15)",
                        title: "Electrical safety check",
                        sub: "A. Khan Electrical · Completed 2 Mar",
                        status: "Done",
                        statusColor: "#22c55e",
                        statusBg: "rgba(34,197,94,0.15)",
                      },
                    ],
                  },
                ].map((group, gi) => (
                  <div key={gi}>
                    {gi > 0 && <div className={styles.flowArrow}>↓</div>}
                    <div className={styles.flowLabel}>{group.label}</div>
                    {group.items.map((item, ii) => (
                      <div key={ii} className={styles.flowItem}>
                        <div
                          className={styles.flowIcon}
                          style={{ background: item.bg }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className={styles.flowItemLabel}>
                            {item.title}
                          </div>
                          <div className={styles.flowItemSub}>{item.sub}</div>
                        </div>
                        <div
                          className={styles.flowStatus}
                          style={{
                            background: item.statusBg,
                            color: item.statusColor,
                          }}
                        >
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div ref={addRef} className={`${styles.ctaSection} ${styles.reveal}`}>
            <h2 style={{ position: "relative", zIndex: 1 }}>
              Ready to take back
              <br />
              <em>your time?</em>
            </h2>
            <p>
              Join landlords already using Letivios to manage their properties
              with less stress and more control.
            </p>
            <div className={styles.ctaActions}>
              <button
                className={styles.btnPrimary}
                onClick={() => navigate("/auth")}
              >
                Start managing smarter
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.ctaNote}>
              14 days free · No card required · Cancel any time
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <a href="/" className={styles.logo}>
              <img
                src="/images/webIcon.png"
                className={styles.logoIcon}
                alt=""
              />
              <img
                src="/images/title.png"
                className={styles.logoTextImg}
                alt=""
              />
            </a>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>
                Privacy
              </a>
              <a href="#" className={styles.footerLink}>
                Terms
              </a>
              <a href="#" className={styles.footerLink}>
                Support
              </a>
            </div>
            <div className={styles.footerCopy}>
              © 2026 Letivios. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
