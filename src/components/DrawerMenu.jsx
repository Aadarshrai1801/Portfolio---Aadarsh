import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import Magnetic from './Magnetic';

export default function DrawerMenu({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { navigateTo } = useTransition();

  const handleLinkClick = (path, label) => {
    setIsOpen(false);
    navigateTo(path, label);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`drawer-panel ${isOpen ? 'open' : ''}`}>
        <div>
          <h5 className="drawer-section-title">Navigation</h5>
          <div className="stripe" />

          <ul className="drawer-nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="drawer-nav-item">
                  <Magnetic strength={0.2}>
                    <a
                      href={link.path}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.path, link.label);
                      }}
                    >
                      {isActive && <span className="dot" />}
                      <span>{link.label}</span>
                    </a>
                  </Magnetic>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="drawer-socials">
          <h5 className="drawer-section-title">Socials</h5>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/aadarshrai1801/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Aadarshrai1801"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:aadarshrai1801@gmail.com">
                Email
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
