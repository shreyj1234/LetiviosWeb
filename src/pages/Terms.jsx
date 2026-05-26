import styles from "./Legal.module.css";

export default function Terms() {
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
          <h1 className={styles.title}>Terms &amp; Conditions</h1>
          <p className={styles.meta}>
            Letivios is a product of Brimcore Technologies Ltd · Company No.
            17138624 · Last updated: May 2026
          </p>
        </div>

        <div className={styles.body}>
          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions ("Terms") govern your use of the Letivios
            platform, including the Letivios mobile application and website at
            letivios.com (together, the "Platform"), operated by Brimcore
            Technologies Ltd ("we", "us", "our").
          </p>
          <p>
            By creating an account or using the Platform, you agree to these
            Terms. If you do not agree, you must not use the Platform. These
            Terms are governed by the laws of England and Wales.
          </p>

          <h2>2. Who Can Use Letivios</h2>
          <p>You may use Letivios if you:</p>
          <ul>
            <li>Are at least 18 years old</li>
            <li>
              Are legally permitted to enter into binding contracts under
              English law
            </li>
            <li>Are using the Platform for lawful purposes only</li>
          </ul>
          <p>Letivios is available to three types of users:</p>
          <ul>
            <li>
              <strong>Landlords</strong> — property owners or managers who
              subscribe to the Platform via the website
            </li>
            <li>
              <strong>Tenants</strong> — individuals renting a property managed
              through the Platform
            </li>
            <li>
              <strong>Contractors</strong> — tradespeople or service providers
              assigned to maintenance jobs through the Platform
            </li>
          </ul>
          <p>
            Tenants and contractors may use the app free of charge. Landlords
            pay a subscription fee as described in Section 6.
          </p>

          <h2>3. Account Registration</h2>
          <h3>3.1 Landlords</h3>
          <p>
            Landlords must register via the Letivios website at letivios.com.
            You must provide accurate and complete information. Landlords sign
            up directly and manage the Platform via both the website and mobile
            app.
          </p>
          <h3>3.2 Tenants and Contractors</h3>
          <p>
            Tenants and contractors register via the Letivios mobile app.
            Tenants are linked to a property using a unique referral code
            provided by their landlord.
          </p>
          <h3>3.3 Account Security</h3>
          <p>
            You are responsible for keeping your login credentials secure. Do
            not share your password. Notify us immediately at
            letivios@outlook.com if you believe your account has been
            compromised.
          </p>
          <h3>3.4 Accuracy of Information</h3>
          <p>
            You must ensure that all information you provide to Letivios is
            accurate, current, and complete. You must update your details
            promptly if they change.
          </p>

          <h2>4. What Letivios Does and Does Not Do</h2>
          <h3>4.1 What the Platform Provides</h3>
          <p>
            Letivios is a property management and communication platform. It
            allows landlords, tenants, and contractors to:
          </p>
          <ul>
            <li>Manage properties, tenancies, and lease details</li>
            <li>Log and track maintenance jobs</li>
            <li>Store and share documents</li>
            <li>Communicate via in-app messaging</li>
            <li>Track rent payments and notify parties of payment status</li>
            <li>Store and share property-related information</li>
          </ul>
          <h3>4.2 What the Platform Does Not Do</h3>
          <p>Letivios is not:</p>
          <ul>
            <li>A letting agent or estate agent</li>
            <li>A legal advice service</li>
            <li>A regulated financial service</li>
            <li>
              A payment processor — rent payments are made directly between
              tenants and landlords via bank transfer. Letivios only facilitates
              notification of payments
            </li>
            <li>
              A deposit protection scheme — landlords are solely responsible for
              protecting deposits in accordance with applicable law
            </li>
          </ul>
          <h3>4.3 Landlord Responsibilities</h3>
          <p>Landlords using Letivios remain solely responsible for:</p>
          <ul>
            <li>
              Compliance with all applicable landlord and tenant legislation,
              including the Renters' Rights Act, housing safety regulations, and
              deposit protection requirements
            </li>
            <li>
              Ensuring all documents, certificates, and notices are legally
              valid
            </li>
            <li>The accuracy of any information entered into the Platform</li>
            <li>The conduct of contractors assigned through the Platform</li>
            <li>
              Maintaining valid gas safety certificates, electrical installation
              condition reports, and any other legally required documentation
            </li>
          </ul>
          <p>
            Letivios does not verify the accuracy of any information entered by
            landlords and accepts no liability for landlords' failure to comply
            with their legal obligations.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You must not use Letivios to:</p>
          <ul>
            <li>
              Upload or share illegal, fraudulent, defamatory, or harmful
              content
            </li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Impersonate another person or misrepresent your identity</li>
            <li>
              Upload documents or information you do not have the right to share
            </li>
            <li>
              Attempt to access another user's account without authorisation
            </li>
            <li>Introduce malware, viruses, or malicious code</li>
            <li>
              Scrape, copy, or extract data from the Platform by automated means
            </li>
            <li>
              Use the Platform for any purpose other than legitimate property
              management
            </li>
          </ul>
          <h3>If you break the rules</h3>
          <p>
            If you violate this policy, we may take action. This could include
            removing your content without warning, suspending or closing your
            account, reporting you to the authorities, or taking legal action if
            needed. Users who repeatedly upload infringing, defamatory, or
            unlawful content will have their accounts terminated permanently.
          </p>
          <p>
            If you wish to report content that you believe breaches this policy,
            infringes your copyright, or is defamatory, please contact us at
            letivios@outlook.com with a description of the content and the
            reason for your complaint. We will investigate all reports.
          </p>
          <p>
            We do not check everything users submit, but we may review content
            if it is reported to us. If we believe something breaks the rules,
            we can remove it without warning. If someone makes a legal
            complaint, we might need to share your identity with them.
          </p>

          <h2>6. Subscriptions and Payment (Landlords)</h2>
          <h3>6.1 Subscription Plans</h3>
          <p>Landlord subscriptions are priced based on portfolio size:</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Properties</th>
                <th>Monthly Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tier 3</td>
                <td>Up to 5</td>
                <td>£15.99/month</td>
              </tr>
              <tr>
                <td>Tier 2</td>
                <td>Up to 15</td>
                <td>£29.99/month</td>
              </tr>
              <tr>
                <td>Tier 1</td>
                <td>Unlimited</td>
                <td>£59.99/month</td>
              </tr>
            </tbody>
          </table>
          <p>
            Your tier adjusts automatically at each billing cycle based on your
            current property count.
          </p>
          <h3>6.2 Free Trial</h3>
          <p>
            New landlord accounts receive a 14-day free trial. No payment is
            taken during the trial period. At the end of the trial, your
            subscription begins automatically if you have set up a Direct Debit
            mandate via GoCardless. Promotional codes may extend the trial
            period where validly applied at sign-up.
          </p>
          <h3>6.3 Payment Method</h3>
          <p>
            Subscriptions are collected by Direct Debit via GoCardless. By
            setting up a mandate, you authorise GoCardless to collect the
            applicable monthly amount on our behalf. GoCardless's own terms
            apply to the Direct Debit arrangement.
          </p>
          <h3>6.4 Payment Disputes</h3>
          <div className={styles.callout}>
            <p>
              If you believe a charge is incorrect, you must contact us at
              letivios@outlook.com in writing before raising a dispute with your
              bank or card issuer. We will respond within 5 working days and
              work to resolve any genuine billing issue.
            </p>
          </div>
          <p>
            Filing a chargeback without first contacting us is a breach of these
            Terms. Where a chargeback is filed and the underlying charge is
            found by us to have been valid, the following amounts become payable
            to us as a contractual debt:
          </p>
          <ul>
            <li>The full disputed amount</li>
            <li>
              All third-party payment processing and dispute-handling fees we
              incurred
            </li>
            <li>
              A £50 administration fee, representing our reasonable internal
              cost of handling the dispute
            </li>
            <li>
              Interest at 8% above the Bank of England base rate from the date
              of chargeback until paid
            </li>
          </ul>
          <p>
            Your account will be suspended until the debt is paid in full. We
            reserve the right to pursue recovery through the courts without
            further notice.
          </p>
          <h3>6.5 Cancellation</h3>
          <p>
            You may cancel your subscription at any time via your dashboard on
            letivios.com. Cancellation takes effect at the end of your current
            billing period. No refunds are issued for partial billing periods.
          </p>
          <h3>6.6 Price Changes</h3>
          <p>
            We will give you at least 30 days' notice of any price changes by
            email or via the Platform.
          </p>
          <h3>6.7 Failed Payments</h3>
          <p>
            If a payment fails, we will attempt to contact you. Continued
            failure to pay may result in your account being restricted or
            terminated.
          </p>

          <h2>7. Documents and Data</h2>
          <h3>7.1 Your Content</h3>
          <p>
            You retain ownership of any documents, photos, and data you upload
            to the Platform ("Your Content"). By uploading content, you grant us
            a limited licence to store, display, and share it with other users
            as necessary to provide the service.
          </p>
          <h3>7.2 Document Deletion</h3>
          <p>
            For documents shared between landlords and tenants, deletion
            requires the consent of both parties. This is reflected in the
            Platform's mutual consent deletion system.
          </p>
          <h3>7.3 Data Accuracy</h3>
          <p>
            We are not responsible for the accuracy, completeness, or legal
            validity of any documents or information uploaded to the Platform by
            users.
          </p>
          <h3>7.4 Backups</h3>
          <p>
            While we take reasonable steps to maintain the Platform and prevent
            data loss, we do not guarantee that your data will never be lost.
            You should maintain your own copies of important documents.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All intellectual property rights in the Letivios Platform —
            including the software, design, logos, and branding — belong to
            Brimcore Technologies Ltd. Nothing in these Terms grants you any
            right to use our intellectual property other than to use the
            Platform as intended.
          </p>
          <p>
            You must not copy, modify, distribute, or create derivative works
            from any part of the Platform without our prior written consent.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law:</p>
          <ul>
            <li>
              We provide the Platform on an "as is" and "as available" basis
            </li>
            <li>
              We do not guarantee the Platform will be uninterrupted,
              error-free, or secure at all times
            </li>
            <li>
              We are not liable for any loss of data, loss of profits, or
              indirect or consequential losses arising from your use of the
              Platform
            </li>
            <li>
              Our total liability to you in any 12-month period shall not exceed
              the total subscription fees you paid to us in that period
            </li>
            <li>
              Information displayed on the Platform may not always be current or
              complete, and we do not warrant its accuracy
            </li>
          </ul>
          <p>
            Nothing in these Terms excludes our liability for death or personal
            injury caused by our negligence, fraud, or any other liability that
            cannot be excluded by law.
          </p>
          <h3>9A. Specific Exclusions</h3>
          <div className={styles.callout}>
            <p>
              Without limiting Section 9, we are not liable for any loss of
              profit, loss of revenue, loss of data, or loss of business
              opportunity arising from your use of the Platform, whether direct
              or indirect. This applies even if we were advised such losses were
              possible.
            </p>
          </div>

          <h2>10. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless Brimcore Technologies Ltd,
            its directors, employees, and contractors from any claims, losses,
            damages, or expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your breach of these Terms</li>
            <li>
              Your use of the Platform in a way that breaches applicable law
            </li>
            <li>Any content or data you upload to the Platform</li>
            <li>Your failure to comply with landlord and tenant legislation</li>
          </ul>
          <h3>10A. Copyright and Defamation Notices</h3>
          <div className={styles.callout}>
            <p>
              If you believe content on the Platform infringes your copyright or
              is defamatory, you may notify us at letivios@outlook.com with:
              your name and contact details, a description of the content and
              where it appears, and an explanation of why you believe it is
              infringing or defamatory. We will investigate and, where we agree
              the content breaches these Terms or applicable law, remove it
              without notice to the uploader. We may share the identity of the
              uploader if required by a valid legal process. Users who
              repeatedly upload infringing or unlawful content will have their
              accounts terminated.
            </p>
          </div>

          <h2>11. Third-Party Services</h2>
          <p>
            The Platform integrates with third-party services including
            GoCardless, Appwrite, Expo, and others listed in our Privacy Policy.
            We are not responsible for the availability, accuracy, or conduct of
            these services. Your use of third-party services is subject to their
            own terms and privacy policies.
          </p>

          <h2>12. Suspension and Termination</h2>
          <h3>12.1 By You</h3>
          <p>
            You may close your account at any time by contacting us at
            letivios@outlook.com or via the account settings in the app.
          </p>
          <h3>12.2 By Us</h3>
          <p>
            We may suspend or terminate your account immediately if you breach
            these Terms, engage in behaviour harmful to other users or the
            Platform, fail to pay your subscription after reasonable notice, or
            provide false information at registration.
          </p>
          <h3>12.3 Effect of Termination</h3>
          <p>
            On termination, your access to the Platform will end. We will retain
            your data for the periods described in our Privacy Policy. Landlords
            may request an export of their data within 30 days of termination.
          </p>

          <h2>13. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of
            material changes via the app or by email with at least 14 days'
            notice. Continued use of the Platform after the effective date of
            changes constitutes acceptance.
          </p>

          <h2>14. Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any
            disputes shall be subject to the exclusive jurisdiction of the
            courts of England and Wales. If you have a complaint, please contact
            us first at letivios@outlook.com. We will make every effort to
            resolve disputes informally.
          </p>

          <h2>15. Contact Us</h2>
          <p>
            Brimcore Technologies Ltd, 7 Meadow Oak Drive, Liverpool, L25 3SZ
            <br />
            Email:{" "}
            <a href="mailto:letivios@outlook.com">letivios@outlook.com</a>
          </p>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
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
