import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite";
import styles from "./VerifyEmail.module.css"; // ← ADD THIS

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      setStatus("verifying");
      account
        .updateVerification(userId, secret)
        .then(() => {
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 2000);
        })
        .catch(() => setStatus("error"));
    }
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
