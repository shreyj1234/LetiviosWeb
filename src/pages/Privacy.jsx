import styles from "./Legal.module.css";

export default function Privacy() {
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
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>
            Brimcore Technologies Ltd · Company No. 17138624 · Last updated: May
            2026
          </p>
        </div>

        <div className={styles.body}>
          <h2>1. Who We Are</h2>
          <p>
            Brimcore Technologies Ltd ("we", "us", "our") operates the Letivios
            platform, including the Letivios mobile application (iOS and
            Android) and the website at letivios.com. We are the data controller
            for personal data collected through the platform.
          </p>
          <p>
            We are registered with the Information Commissioner's Office (ICO)
            as a data controller [ICO registration number to be inserted once
            issued]. If you have any questions about this policy or wish to
            exercise your rights, contact us at letivios@outlook.com.
          </p>

          <h2>2. Who This Policy Applies To</h2>
          <p>
            This policy applies to all users of the Letivios platform,
            including:
          </p>
          <ul>
            <li>
              Landlords — who sign up via the website and manage properties
              through the app
            </li>
            <li>
              Tenants — who link to a property via a referral code in the app
            </li>
            <li>
              Contractors — who receive jobs and communicate through the app
            </li>
            <li>Website visitors — who visit letivios.com</li>
          </ul>

          <h2>3. What Personal Data We Collect</h2>
          <h3>3.1 Data You Give Us Directly</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Who</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full name</td>
                <td>All users</td>
                <td>Account creation and identification</td>
              </tr>
              <tr>
                <td>Email address</td>
                <td>All users</td>
                <td>Account login and communications</td>
              </tr>
              <tr>
                <td>Password (hashed)</td>
                <td>All users</td>
                <td>Authentication</td>
              </tr>
              <tr>
                <td>Phone number</td>
                <td>All users (optional)</td>
                <td>Contact and notifications</td>
              </tr>
              <tr>
                <td>Company name</td>
                <td>Contractors</td>
                <td>Profile and job assignment</td>
              </tr>
              <tr>
                <td>Bank account name, number, sort code</td>
                <td>Landlords only</td>
                <td>
                  So tenants can make rent payments to the correct account
                </td>
              </tr>
              <tr>
                <td>Property addresses and postcodes</td>
                <td>Landlords</td>
                <td>Portfolio management</td>
              </tr>
              <tr>
                <td>Lease dates, rent amounts, deposit amounts</td>
                <td>Landlords and Tenants</td>
                <td>Tenancy management</td>
              </tr>
              <tr>
                <td>Job descriptions and maintenance notes</td>
                <td>All users</td>
                <td>Maintenance management</td>
              </tr>
              <tr>
                <td>Photos</td>
                <td>All users</td>
                <td>Job documentation</td>
              </tr>
              <tr>
                <td>Documents (tenancy agreements, certificates, ID)</td>
                <td>Landlords and Tenants</td>
                <td>Document storage</td>
              </tr>
              <tr>
                <td>Messages</td>
                <td>All users</td>
                <td>In-app communication</td>
              </tr>
              <tr>
                <td>Key safe codes</td>
                <td>Landlords</td>
                <td>Property access for contractors</td>
              </tr>
              <tr>
                <td>Notice to quit details</td>
                <td>Landlords and Tenants</td>
                <td>Tenancy end management</td>
              </tr>
            </tbody>
          </table>
          <h3>3.2 Data We Collect Automatically</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Source</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Push notification token</td>
                <td>Device (via Expo)</td>
                <td>Sending app notifications</td>
              </tr>
              <tr>
                <td>Device type and OS</td>
                <td>Device</td>
                <td>App compatibility</td>
              </tr>
              <tr>
                <td>IP address and access logs</td>
                <td>Vercel</td>
                <td>Security and server operation</td>
              </tr>
              <tr>
                <td>App usage patterns</td>
                <td>Appwrite</td>
                <td>Platform operation</td>
              </tr>
            </tbody>
          </table>
          <h3>3.3 Data Stored on Your Device</h3>
          <p>
            The Letivios app stores a small amount of data locally on your
            device using AsyncStorage — records of which jobs and properties you
            have viewed, to manage unread indicators. This data does not leave
            your device and is not transmitted to our servers.
          </p>

          <h2>4. How We Use Your Data and Our Lawful Basis</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Lawful Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Creating and managing your account</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Displaying property, tenancy, and job information</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Sending push notifications</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Rent payment notifications</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Storing and sharing documents</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Displaying bank details to tenants</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Sharing job details with contractors</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Processing subscription payments via GoCardless</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Sending certificate expiry warnings</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Complying with legal obligations</td>
                <td>Legal obligation</td>
              </tr>
            </tbody>
          </table>
          <p>
            We do not use your personal data for marketing or advertising. We do
            not sell your data to third parties.
          </p>

          <h2>5. Who We Share Your Data With</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sub-Processor</th>
                <th>Purpose</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Appwrite (Frankfurt)</td>
                <td>Database, file storage, authentication</td>
                <td>EU</td>
              </tr>
              <tr>
                <td>GoCardless Ltd</td>
                <td>Direct Debit processing</td>
                <td>UK / EU</td>
              </tr>
              <tr>
                <td>Expo Inc.</td>
                <td>Push notifications, app infrastructure</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>Vercel Inc.</td>
                <td>Website hosting and access logs</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>GoDaddy</td>
                <td>Domain registration</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>Apple (App Store)</td>
                <td>iOS app distribution</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>Google (Play Store)</td>
                <td>Android app distribution</td>
                <td>USA</td>
              </tr>
            </tbody>
          </table>
          <h3>Data Sharing Between Users</h3>
          <p>As part of the service, certain data is visible to other users:</p>
          <ul>
            <li>
              Landlords can see tenant names, contact details, payment status,
              and document acknowledgement status
            </li>
            <li>
              Tenants can see their landlord's name, contact details, and bank
              account details for rent payment
            </li>
            <li>
              Contractors can see property address, job details, scheduled time,
              and key safe code (if enabled)
            </li>
            <li>Co-tenants can see each other's names in group chats</li>
          </ul>
          <p>
            We may also disclose personal data where required by law, court
            order, or in response to a valid legal complaint.
          </p>

          <h2>6. International Data Transfers</h2>
          <p>
            Some sub-processors (Expo, Vercel, GoDaddy, Apple, Google) are based
            in the United States. Where data is transferred outside the UK, we
            ensure appropriate safeguards are in place, including Standard
            Contractual Clauses or reliance on the UK-US Data Bridge where
            applicable.
          </p>

          <h2>7. How Long We Keep Your Data</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Retention Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account data (name, email)</td>
                <td>Duration of account + 2 years</td>
              </tr>
              <tr>
                <td>Property and tenancy records</td>
                <td>Duration of tenancy + 6 years</td>
              </tr>
              <tr>
                <td>Payment records</td>
                <td>6 years</td>
              </tr>
              <tr>
                <td>Job and maintenance records</td>
                <td>Duration of tenancy + 2 years</td>
              </tr>
              <tr>
                <td>Messages</td>
                <td>Duration of account</td>
              </tr>
              <tr>
                <td>Documents</td>
                <td>
                  Duration of account or until both parties consent to deletion
                </td>
              </tr>
              <tr>
                <td>Push notification tokens</td>
                <td>Until app is uninstalled or permission revoked</td>
              </tr>
            </tbody>
          </table>
          <p>
            When your account is deleted, we will delete or anonymise your
            personal data within 30 days, except where we are required by law to
            retain it longer.
          </p>

          <h2>8. Your Rights Under UK GDPR</h2>
          <p>
            You have the following rights. To exercise any of them, contact us
            at letivios@outlook.com:
          </p>
          <ul>
            <li>
              <strong>Right to access (Art. 15)</strong> — request a copy of all
              personal data we hold about you
            </li>
            <li>
              <strong>Right to rectification (Art. 16)</strong> — ask us to
              correct inaccurate data
            </li>
            <li>
              <strong>Right to erasure (Art. 17)</strong> — ask us to delete
              your data
            </li>
            <li>
              <strong>Right to restriction (Art. 18)</strong> — ask us to limit
              how we use your data
            </li>
            <li>
              <strong>Right to portability (Art. 20)</strong> — receive your
              data in a machine-readable format
            </li>
            <li>
              <strong>Right to object (Art. 21)</strong> — object to processing
              based on legitimate interests
            </li>
          </ul>
          <p>
            We will respond within 30 days. If you are not satisfied, you may
            complain to the ICO at ico.org.uk or 0303 123 1113.
          </p>

          <h2>9. Security</h2>
          <p>Our security measures include:</p>
          <ul>
            <li>All data in transit encrypted using TLS/HTTPS</li>
            <li>Passwords hashed and never stored in plain text</li>
            <li>Authentication handled by Appwrite's secure auth system</li>
            <li>File storage using Appwrite's access-controlled buckets</li>
            <li>
              Access to personal data limited to what is necessary for each user
              role
            </li>
          </ul>
          <div className={styles.callout}>
            <p>
              <strong>Please note:</strong> Key safe codes are currently stored
              in our database and are visible to assigned contractors. We
              recommend changing your key safe code after each contractor visit.
            </p>
          </div>

          <h2>10. Children</h2>
          <p>
            Letivios is not intended for use by anyone under the age of 18. We
            do not knowingly collect personal data from children. Contact us at
            letivios@outlook.com if you believe a child has provided us with
            personal data and we will delete it.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via the app or by email. Continued use of
            Letivios after changes are notified constitutes acceptance.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            Brimcore Technologies Ltd, 7 Meadow Oak Drive, Liverpool, L25 3SZ
            <br />
            Email:{" "}
            <a href="mailto:letivios@outlook.com">letivios@outlook.com</a>
            <br />
            ICO Registration: [to be inserted]
          </p>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="/terms" className={styles.footerLink}>
              Terms &amp; Conditions
            </a>
            <a href="/cookies" className={styles.footerLink}>
              Cookie Policy
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
