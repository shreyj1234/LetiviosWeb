import { useEffect, useState } from "react";
import { ID } from "appwrite";
import { useSearchParams, useNavigate } from "react-router-dom";
import { databases, account } from "../lib/appwrite";
import styles from "./VerifyEmail.module.css";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) return;

    const completeVerification = async () => {
      setStatus("verifying");
      try {
        await account.updateVerification(userId, secret);
      } catch (err) {
        try {
          const user = await account.get();
          if (!user.emailVerification) {
            setStatus("error");
            return;
          }
        } catch {
          setStatus("error");
          return;
        }
      }

      try {
        const user = await account.get();
        const prefs = user.prefs;

        if (prefs.pendingSetup) {
          const planLimits = { tier3: 5, tier2: 15, tier1: null };

          await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            "users",
            user.$id,
            {
              name: user.name,
              email: user.email,
              role: "landlord",
              webAuthEnabled: false,
              onboardingComplete: false,
              maxProperties: planLimits[prefs.plan] ?? null,
            },
          );

          await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            "subscriptions",
            ID.unique(),
            {
              landlordId: user.$id,
              status: "trial",
              trialStartDate: new Date().toISOString(),
            },
          );

          await account.updatePrefs({ ...prefs, pendingSetup: false });
        }

        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    completeVerification();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          {status === "success" ? "✅" : status === "error" ? "❌" : "📬"}
        </div>

        <h2 className={styles.title}>
          {status === "waiting" && "Check your email"}
          {status === "verifying" && "Verifying…"}
          {status === "success" && "Email verified!"}
          {status === "error" && "Something went wrong"}
        </h2>

        <p className={styles.subtitle}>
          {status === "waiting" &&
            "We've sent a verification link to your email. Click it to continue."}
          {status === "verifying" && "Please wait while we verify your email."}
          {status === "success" && "Redirecting you to your dashboard…"}
          {status === "error" &&
            "This link is invalid or has expired. Please sign up again."}
        </p>

        {status === "error" && (
          <button
            className={styles.submitBtn}
            onClick={() => navigate("/auth")}
          >
            Back to Sign Up
          </button>
        )}

        {status === "waiting" && (
          <button
            className={styles.submitBtn}
            onClick={() => navigate("/auth")}
          >
            Back to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
