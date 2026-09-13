import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import Magnetic from './Magnetic';

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const location = useLocation();
  const { navigateTo } = useTransition();

  const handleNavClick = (path, label) => {
    setIsMenuOpen(false);
    navigateTo(path, label);
  };

  return (
    <>
      <header className="nav-bar">
        <div className="credits-top">
          <Magnetic strength={0.25}>
            <div
              className="author-link"
              onClick={() => handleNavClick('/', 'Home')}
              role="button"
              tabIndex={0}
            >
              <span className="credit">©</span>
              <span>Code by <strong>Aadarsh Rai</strong></span>
            </div>
          </Magnetic>
        </div>

        <nav className="nav-bar-links">
          <Magnetic strength={0.3}>
            <button
              className={`nav-item ${location.pathname === '/work' ? 'active' : ''}`}
              onClick={() => handleNavClick('/work', 'Work')}
            >
              Work
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button
              className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => handleNavClick('/about', 'About')}
            >
              About
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button
              className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('/contact', 'Contact')}
            >
              Contact
            </button>
          </Magnetic>
        </nav>
      </header>

      {/* Floating Hamburger Button */}
      <div className={`btn-hamburger ${isMenuOpen ? 'is-open' : ''}`}>
        <Magnetic strength={0.4}>
          <button
            className="hamburger-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </Magnetic>
      </div>
    </>
  );
}
