import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export default function DrawerMenu({ onClose }) {
  const location = useLocation();
  const { navigateTo } = useTransition();

  const handleNav = (path, label) => {
    onClose();
    navigateTo(path, label);
  };

  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  const isWork = location.pathname.includes('work');
  const isAbout = location.pathname.includes('about');
  const isContact = location.pathname.includes('contact');

  return (
    <>
      <div className="overlay fixed-nav-back" onClick={onClose}></div>
      <div className="fixed-nav theme-dark">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>
        <div className="fixed-nav-inner">
          <div className="row nav-row">
            <h5>Navigation</h5>
            <div className="stripe"></div>
            <ul className="links-wrap">
              <li className={`btn btn-link ${isHome ? 'active' : ''}`}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/', 'Home');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Home</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isWork ? 'active' : ''}`}>
                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/work', 'Work');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Work</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isAbout ? 'active' : ''}`}>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/about', 'About');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">About</span>
                  </span>
                </a>
              </li>
              <li className={`btn btn-link ${isContact ? 'active' : ''}`}>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/contact', 'Contact');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Contact</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="row social-row">
            <div className="stripe"></div>
            <div className="socials">
              <h5>Socials</h5>
              <ul>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.linkedin.com/in/aadarshrai1801/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">LinkedIn</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://github.com/Aadarshrai1801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-click magnetic"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">GitHub</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="mailto:aadarshrai1801@gmail.com"
                    className="btn-click magnetic"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">Email</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
