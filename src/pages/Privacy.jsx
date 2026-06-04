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
            Brimcore Technologies Ltd · Company No. 17138624 · Last updated:
            June 2026
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
            as a data controller ZC157016. If you have any questions about this
            policy or wish to exercise your rights, contact us at
            letivios@outlook.com.
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
                <td>Consent</td>
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
          <p>
            We use the following sub-processors to operate the Letivios
            platform. We have Data Processing Agreements (DPAs) in place with
            each processor as required by UK GDPR Article 28.
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sub-Processor</th>
                <th>Purpose</th>
                <th>Data Shared</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Appwrite (Frankfurt)</td>
                <td>Database, file storage, and authentication</td>
                <td>All user account and platform data</td>
                <td>EU (Frankfurt)</td>
              </tr>
              <tr>
                <td>GoCardless Ltd</td>
                <td>Direct Debit subscription billing for landlords</td>
                <td>
                  Landlord name, email address, and mandate details. GoCardless
                  acts as an independent data controller for payment data and
                  has their own Privacy Policy at gocardless.com/legal/privacy.
                </td>
                <td>UK / EU</td>
              </tr>
              <tr>
                <td>Expo Inc. (via Apple APNS and Google FCM)</td>
                <td>Push notification delivery to mobile devices</td>
                <td>
                  Push notification tokens (device identifiers) and notification
                  content (notification title and body only — no financial or
                  tenancy data)
                </td>
                <td>USA (UK–US Data Bridge)</td>
              </tr>
              <tr>
                <td>Google LLC (Google Fonts)</td>
                <td>Font delivery</td>
                <td>
                  Website visitors' IP addresses are sent to Google's servers
                  when fonts load. No personal account data is shared.
                </td>
                <td>USA (Standard Contractual Clauses)</td>
              </tr>
              <tr>
                <td>Vercel Inc.</td>
                <td>Website hosting and delivery</td>
                <td>IP addresses and HTTP access logs (retained 90 days)</td>
                <td>USA (UK–US Data Bridge)</td>
              </tr>
              <tr>
                <td>GoDaddy</td>
                <td>Domain name registration (letivios.com)</td>
                <td>Registrant contact details only</td>
                <td>USA (Standard Contractual Clauses)</td>
              </tr>
              <tr>
                <td>Apple (App Store)</td>
                <td>iOS app distribution and in-app purchase infrastructure</td>
                <td>App Store account identifiers only</td>
                <td>USA (Standard Contractual Clauses)</td>
              </tr>
              <tr>
                <td>Google (Play Store)</td>
                <td>Android app distribution</td>
                <td>Play Store account identifiers only</td>
                <td>USA (Standard Contractual Clauses)</td>
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
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account data (name, email, role)</td>
                <td>
                  Duration of account, then deleted within 30 days of deletion
                  request
                </td>
                <td>Service operation</td>
              </tr>
              <tr>
                <td>Property and tenancy records</td>
                <td>Duration of tenancy + 6 years</td>
                <td>
                  Landlord legal obligations (Landlord and Tenant Act 1985)
                </td>
              </tr>
              <tr>
                <td>Payment records (rent, subscriptions)</td>
                <td>7 years from the date of the transaction</td>
                <td>UK tax and financial record-keeping requirements (HMRC)</td>
              </tr>
              <tr>
                <td>Job and maintenance records</td>
                <td>Duration of tenancy + 2 years</td>
                <td>Dispute resolution</td>
              </tr>
              <tr>
                <td>Messages and job comments</td>
                <td>Deleted within 30 days of account deletion request</td>
                <td>Retained only while account is active</td>
              </tr>
              <tr>
                <td>Inspection records and photos</td>
                <td>
                  Duration of tenancy + 2 years, then deleted within 30 days
                </td>
                <td>Deposit dispute evidence (Tenancy Deposit Scheme)</td>
              </tr>
              <tr>
                <td>Documents (tenancy agreements, certificates)</td>
                <td>
                  Duration of account or until both parties request deletion
                </td>
                <td>Legal documentation requirements</td>
              </tr>
              <tr>
                <td>Push notification tokens</td>
                <td>
                  Until app is uninstalled, permission revoked, or account
                  deleted
                </td>
                <td>Notification delivery</td>
              </tr>
              <tr>
                <td>Server access logs (IP addresses)</td>
                <td>90 days</td>
                <td>Security monitoring (Vercel default)</td>
              </tr>
            </tbody>
          </table>
          <p>
            When your account is deleted, we will delete or anonymise your
            personal data within 30 days, except where we are required by law to
            retain it longer (for example, payment records must be kept for 7
            years under UK tax law). In those cases, retained data is kept
            securely and not used for any other purpose.
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

          <h2>9. Data Breaches</h2>
          <p>
            In the unlikely event of a personal data breach, Letivios will act
            in accordance with our obligations under UK GDPR Articles 33 and 34:
          </p>
          <ul>
            <li>
              <strong>ICO notification:</strong> Where a breach is likely to
              result in a risk to your rights and freedoms, we will notify the
              Information Commissioner's Office (ICO) within 72 hours of
              becoming aware of it.
            </li>
            <li>
              <strong>User notification:</strong> Where a breach is likely to
              result in a high risk to your rights and freedoms, we will notify
              affected users directly without undue delay, explaining the nature
              of the breach, likely consequences, and the measures we have taken
              or propose to take.
            </li>
            <li>
              <strong>Record keeping:</strong> We maintain an internal record of
              all data breaches regardless of whether notification to the ICO is
              required.
            </li>
          </ul>
          <p>
            If you suspect your account has been compromised, contact us
            immediately at{" "}
            <a href="mailto:letivios@outlook.com">letivios@outlook.com</a>.
          </p>

          <h2>10. Security</h2>
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
            <li>
              Bank account details (sort code and account number) are stored in
              access-controlled documents readable only by the landlord who
              entered them and their linked tenant. These fields are not
              accessible via the API to any other user role.
            </li>
          </ul>
          <div className={styles.callout}>
            <p>
              <strong>Please note:</strong> Key safe codes are currently stored
              in our database and are visible to assigned contractors. We
              recommend changing your key safe code after each contractor visit.
            </p>
          </div>

          <h2>11. Children</h2>
          <p>
            Letivios is not intended for use by anyone under the age of 18. We
            do not knowingly collect personal data from children. Contact us at
            letivios@outlook.com if you believe a child has provided us with
            personal data and we will delete it.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via the app or by email before they take
            effect. For material changes affecting how we use your personal
            data, we will obtain fresh consent where required by UK GDPR.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            Brimcore Technologies Ltd, 7 Meadow Oak Drive, Liverpool, L25 3SZ
            <br />
            Email:{" "}
            <a href="mailto:letivios@outlook.com">letivios@outlook.com</a>
            <br />
            ICO Registration: ZC157016
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
