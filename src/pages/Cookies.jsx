import styles from "./Legal.module.css";

export default function Cookies() {
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
        <div className={styles.header}>
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.meta}>
            Brimcore Technologies Ltd · Company No. 17138624 · Last updated: May
            2026
          </p>
        </div>

        <div className={styles.body}>
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They help the website remember information about your
            visit, such as whether you are logged in, and help improve your
            experience.
          </p>
          <p>
            This policy explains what cookies we use on letivios.com and what
            similar technologies we use in our mobile app.
          </p>

          <h2>2. Cookies on letivios.com</h2>
          <p>
            Our website uses a minimal number of cookies. We do not use
            advertising cookies, tracking pixels, or third-party analytics
            cookies.
          </p>
          <h3>2.1 Strictly Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function and cannot
            be switched off. They do not require your consent under UK GDPR.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Appwrite session cookie</td>
                <td>Keeps you logged in to your landlord dashboard</td>
                <td>Session / until sign out</td>
              </tr>
              <tr>
                <td>Vercel infrastructure cookies</td>
                <td>
                  Used by our hosting provider to route requests and for
                  security
                </td>
                <td>Session</td>
              </tr>
            </tbody>
          </table>
          <h3>2.2 Analytics and Tracking Cookies</h3>
          <p>
            We do not use Google Analytics, Mixpanel, Facebook Pixel, or any
            other third-party analytics or advertising cookies on our website.
            Vercel collects basic server-side access logs (IP addresses and
            request timestamps) at the server level — this does not involve
            placing cookies on your device.
          </p>
          <h3>2.3 Preference Cookies</h3>
          <p>We do not currently use preference cookies on our website.</p>

          <h2>3. Local Storage in the Mobile App</h2>
          <p>
            The Letivios mobile app does not use browser cookies. It uses
            AsyncStorage — a similar technology that stores small amounts of
            data locally on your device.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data Stored</th>
                <th>Purpose</th>
                <th>Where</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Seen job IDs and timestamps</td>
                <td>Tracks viewed jobs to show unread indicators</td>
                <td>Your device only</td>
              </tr>
              <tr>
                <td>Seen property, tenant, and notification IDs</td>
                <td>Managing unread/new item indicators</td>
                <td>Your device only</td>
              </tr>
              <tr>
                <td>Conversation read timestamps</td>
                <td>Tracks which messages you have read</td>
                <td>Your device only</td>
              </tr>
            </tbody>
          </table>
          <p>
            This data is stored only on your device, is never transmitted to our
            servers, and is deleted if you uninstall the app.
          </p>

          <h2>4. Push Notifications</h2>
          <p>
            The Letivios app uses Expo to deliver push notifications. Your
            device generates a unique push notification token, which is stored
            in our database linked to your account.
          </p>
          <ul>
            <li>
              You can disable push notifications at any time in your device
              settings
            </li>
            <li>
              Disabling notifications does not affect your ability to use the
              app
            </li>
            <li>
              If you disable notifications, your token may remain in our
              database but will not be used to send you notifications
            </li>
          </ul>

          <h2>5. Your Choices</h2>
          <h3>Website Cookies</h3>
          <p>
            Because we only use strictly necessary cookies, we do not present a
            cookie consent banner — strictly necessary cookies do not require
            consent under UK GDPR / PECR. If we introduce any non-essential
            cookies in future, we will update this policy and add a consent
            mechanism.
          </p>
          <h3>App Local Storage</h3>
          <p>
            You can clear all locally stored app data via your device settings:
          </p>
          <ul>
            <li>
              iOS: Settings → General → iPhone Storage → Letivios → Offload App
            </li>
            <li>Android: Settings → Apps → Letivios → Storage → Clear Data</li>
          </ul>
          <p>Note that clearing app data will log you out of the app.</p>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time, particularly if
            we introduce new features or third-party integrations. The "Last
            updated" date at the top of this page reflects the most recent
            version.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            Brimcore Technologies Ltd, 7 Meadow Oak Drive, Liverpool, L25 3SZ
            <br />
            Email:{" "}
            <a href="mailto:letivios@outlook.com">letivios@outlook.com</a>
          </p>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="/terms" className={styles.footerLink}>
              Terms &amp; Conditions
            </a>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
          </div>
          <div className={styles.footerCopy}>
            © 2026 Letivios. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
