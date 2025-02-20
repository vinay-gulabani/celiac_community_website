import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer">
      {/* Top Row */}
      <div className="footer-top">
        <div className="footer-section links-section">
          <button className='footer-section-button' onClick={() => window.location.href = "/contact"}>Contact</button>
          <button className='footer-section-button' onClick={() => window.location.href = "/privacy"}>Privacy Policy</button>
          <button className='footer-section-button' onClick={() => window.location.href = "/terms"}>Terms of Service</button>
        </div>

        {/*<div className="footer-section social-section">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>*/}
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <p>&copy; 2024 Celiac Community. A platform dedicated to supporting and connecting those with celiac disease.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
