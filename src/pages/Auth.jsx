import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite";
import { ID } from "appwrite";
import styles from "./Auth.module.css";

export default function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  const handleSignIn = async () => {
    if (!signInForm.email || !signInForm.password) {
      showError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      // Delete any existing session first
      try {
        await account.deleteSession("current");
      } catch {}
      await account.createEmailPasswordSession(
        signInForm.email,
        signInForm.password,
      );
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      showError(err.message || "Invalid email or password.");
    }
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, password, confirmPassword } =
      signUpForm;
    if (!firstName || !lastName)
      return showError("Please enter your full name.");
    if (!email) return showError("Please enter your email address.");
    if (password.length < 8)
      return showError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return showError("Passwords do not match.");
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`,
      );
      await account.createEmailPasswordSession(email, password);
      await account.updatePrefs({ plan: selectedPlan });
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      showError(err.message || "Something went wrong.");
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "£15",
      props: "Up to 5 Properties",
    },
    {
      id: "growth",
      name: "Growth",
      price: "£29",
      props: "Up to 15 Properties",
      popular: true,
    },
    { id: "pro", name: "Pro", price: "£59", props: "Unlimited Properties" },
  ];

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="/" className={styles.logo}>
            <img
              src="/images/webIcon.png"
              style={{ height: 36 }}
              alt="Letivios"
            />
            <img
              src="/images/title.png"
              style={{ height: 22 }}
              alt="Letivios"
            />
          </a>
          <a href="/" className={styles.navBack}>
            ← Back to home
          </a>
        </div>
      </nav>

      <div className={styles.content}>
        <div className={styles.hero}>
          <h1>
            Your portfolio, <em>under control.</em>
          </h1>
          <p>
            Sign up in minutes. No card required during your trial. Subscribe{" "}
            <br />
            through Letivios's website to manage your properties at the best{" "}
            <br />
            possible rate.
          </p>
          <div className={styles.eyebrow}>30-day free trial upon Sign Up</div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === "signin" ? styles.tabActive : ""}`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${tab === "signup" ? styles.tabActive : ""}`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {error && <div className={styles.alert}>{error}</div>}

          {tab === "signin" && (
            <div>
              <div className={styles.field}>
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={signInForm.email}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  value={signInForm.password}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, password: e.target.value })
                  }
                />
              </div>
              <button
                className={styles.submitBtn}
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          )}

          {tab === "signup" && (
            <div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={signUpForm.firstName}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={signUpForm.lastName}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={signUpForm.email}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={signUpForm.password}
                  onChange={(e) =>
                    setSignUpForm({ ...signUpForm, password: e.target.value })
                  }
                />
                <p className={styles.fieldHint}>
                  Must be at least 8 characters
                </p>{" "}
              </div>
              <div className={styles.field}>
                <label>Confirm password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={signUpForm.confirmPassword}
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <p className={styles.fieldHint}>
                  Make sure both passwords match
                </p>{" "}
              </div>
              <div className={styles.field}>
                <label>Choose your plan</label>
                <div className={styles.planGrid}>
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`${styles.planOption} ${selectedPlan === plan.id ? styles.planSelected : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className={styles.planName}>
                        {plan.name}{" "}
                        {plan.popular && (
                          <span className={styles.planBadge}>Popular</span>
                        )}
                      </div>
                      <div className={styles.planPrice}>
                        {plan.price}
                        <span>/mo</span>
                      </div>
                      <div className={styles.planProps}>{plan.props}</div>
                    </div>
                  ))}
                </div>
              </div>
              <p className={styles.fieldHintTerms}>
                By creating an account you agree to Letivios's{" "}
                <a href="/terms" className={styles.fieldHintLink}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className={styles.fieldHintLink}>
                  Privacy Policy
                </a>
                . Your subscription will be managed through this website.
              </p>
              <button
                className={styles.submitBtn}
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Start Free Trial"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
