import React from 'react';
import './LegalPages.css'; // Shared styles for both pages

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p>Last updated: February 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to Celiac Community! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, and other details you provide.</li>
        <li><strong>Usage Data:</strong> Pages visited, time spent, and interactions on our platform.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Improve our platform and user experience.</li>
        <li>Send updates and important notifications.</li>
        <li>Ensure compliance with regulations.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>We use cookies to enhance your browsing experience. You can disable them in your browser settings.</p>

      <h2>5. Third-Party Services</h2>
      <p>We may use third-party services like analytics or payment providers. These services have their own privacy policies.</p>

      <h2>6. Data Security</h2>
      <p>We implement security measures to protect your data, but no system is 100% secure.</p>

      <h2>7. Your Rights</h2>
      <p>You have the right to access, modify, or delete your personal data. Contact us for any requests.</p>

      <h2>8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted here.</p>

      <p>If you have any questions, contact us at <a href="mailto:support@flourlesshaven.com">support@flourlesshaven.com</a>.</p>
    </div>
  );
}

export default PrivacyPolicy;
