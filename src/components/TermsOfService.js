import React from 'react';
import './LegalPages.css'; // Shared styles for both pages

function TermsOfService() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p>Last updated: February 2025</p>

      <h2>1. Agreement to Terms</h2>
      <p>By using Celiac Community, you agree to these terms. If you do not agree, please do not use our platform.</p>

      <h2>2. User Accounts</h2>
      <p>You are responsible for maintaining the security of your account. You must not share your login details.</p>

      <h2>3. Acceptable Use</h2>
      <p>When using our platform, you agree to:</p>
      <ul>
        <li>Follow all applicable laws.</li>
        <li>Respect other users and avoid harmful behavior.</li>
        <li>Not attempt to hack or disrupt the platform.</li>
      </ul>

      <h2>4. Content Ownership</h2>
      <p>All content posted by users remains their property, but we have a right to use and display it.</p>

      <h2>5. Limitation of Liability</h2>
      <p>We are not responsible for any damages or losses caused by using our platform.</p>

      <h2>6. Termination</h2>
      <p>We reserve the right to terminate accounts that violate these terms.</p>

      <h2>7. Changes to Terms</h2>
      <p>We may update these Terms of Service at any time. Continued use of our platform means you accept the changes.</p>

      <p>If you have any questions, contact us at <a href="mailto:support@flourlesshaven.com">support@flourlesshaven.com</a>.</p>
    </div>
  );
}

export default TermsOfService;
