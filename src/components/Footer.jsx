import React from 'react';
import Magnetic from './Magnetic';
import { useTransition } from '../context/TransitionContext';

export default function Footer() {
  const { navigateTo } = useTransition();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-main-cta">
          <div className="footer-avatar">
            <img src="/assets/avatar.jpg" alt="Aadarsh Rai" />
          </div>
          <h2 className="footer-heading">Let's work together</h2>

          <Magnetic strength={0.4}>
            <button
              className="btn-click primary"
              onClick={() => navigateTo('/contact', 'Contact')}
            >
              <span className="btn-text">Get in touch</span>
            </button>
          </Magnetic>
        </div>

        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} Aadarsh Rai. All rights reserved.</p>
          <div className="footer-social-links">
            <a
              href="https://www.linkedin.com/in/aadarshrai1801/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Aadarshrai1801"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:aadarshrai1801@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
