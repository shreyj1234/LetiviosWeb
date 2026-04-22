import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import styles from "./Auth.module.css";
import { account, databases } from "../lib/appwrite";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [selectedPlan, setSelectedPlan] = useState("tier3");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

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
      try {
        await account.deleteSession("current");
      } catch {}
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`,
      );
      await account.createEmailPasswordSession(email, password);
      await account.updatePrefs({ plan: selectedPlan });
      await account.updatePrefs({ plan: selectedPlan, role: "landlord" });

      // Write user to database
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "users",
        newAccount.$id, // use same ID as auth account
        {
          name: `${firstName} ${lastName}`,
          email: email,
          role: "landlord",
          webAuthEnabled: false,
          onboardingComplete: false,
        },
      );

      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      showError(err.message || "Something went wrong.");
    }
  };

  const plans = [
    {
      id: "tier3",
      name: "Tier 3",
      price: "£15",
      props: "Up to 5 Properties",
    },
    {
      id: "tier2",
      name: "Tier 2",
      price: "£29",
      props: "Up to 15 Properties",
    },
    {
      id: "tier1",
      name: "Tier 1",
      price: "£59",
      props: "Unlimited Properties",
    },
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
          <div className={styles.eyebrow}>14-day free trial upon Sign Up</div>
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
                <div className={styles.passwordWrap}>
                  <input
                    type={showSignInPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={signInForm.password}
                    onChange={(e) =>
                      setSignInForm({ ...signInForm, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                  >
                    {showSignInPassword ? (
                      <AiOutlineEyeInvisible size={22} color="#9CA3AF" />
                    ) : (
                      <AiOutlineEye size={22} color="#9CA3AF" />
                    )}
                  </button>
                </div>
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
                    onChange={(e) => {
                      const val = e.target.value;
                      setSignUpForm({
                        ...signUpForm,
                        firstName: val.charAt(0).toUpperCase() + val.slice(1),
                      });
                    }}
                  />
                </div>
                <div className={styles.field}>
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={signUpForm.lastName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSignUpForm({
                        ...signUpForm,
                        lastName: val.charAt(0).toUpperCase() + val.slice(1),
                      });
                    }}
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
                <div className={styles.passwordWrap}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={signUpForm.password}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} color="#9CA3AF" />
                    ) : (
                      <AiOutlineEye size={22} color="#9CA3AF" />
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label>Confirm password</label>
                <div className={styles.passwordWrap}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={signUpForm.confirmPassword}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={22} color="#9CA3AF" />
                    ) : (
                      <AiOutlineEye size={22} color="#9CA3AF" />
                    )}{" "}
                  </button>
                </div>
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
                      <div className={styles.planName}>{plan.name} </div>
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
