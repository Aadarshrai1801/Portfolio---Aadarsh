import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export default function Navbar({ onToggleMenu }) {
  const { navigateTo } = useTransition();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Home and Contact have dark headers, while Work and About have light headers
  const isDark = path === '/' || path === '/index.html' || path.includes('contact');

  const isWork = path.includes('work');
  const isAbout = path.includes('about');
  const isContact = path.includes('contact');

  return (
    <>
      <div className="btn btn-hamburger" onClick={onToggleMenu}>
        <div className="btn-click magnetic" data-strength="25" data-strength-text="15">
          <div className="btn-fill"></div>
          <div className="btn-text">
            <div className="btn-bars"></div>
            <span className="btn-text-inner">Menu</span>
          </div>
        </div>
      </div>

      <div className={`nav-bar ${isDark ? 'theme-dark' : ''}`}>
        <div className="credits-top">
          <div className="btn btn-link btn-left-top">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/', 'Home');
              }}
              className="btn-click magnetic"
              data-strength="20"
              data-strength-text="10"
            >
              <span className="btn-text">
                <div className="credit"><span>©</span></div>
                <div className="cbd">
                  <span className="code-by">Code by </span>
                  <span className="author">Aadarsh</span>
                  <span className="author-last"> Rai</span>
                </div>
              </span>
            </a>
          </div>
        </div>
        <ul className="links-wrap">
          <li className={`btn btn-link ${isWork ? 'active' : ''}`}>
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/work', 'Work');
              }}
              className="btn-click magnetic"
              data-strength="20"
              data-strength-text="10"
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
                navigateTo('/about', 'About');
              }}
              className="btn-click magnetic"
              data-strength="20"
              data-strength-text="10"
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
                navigateTo('/contact', 'Contact');
              }}
              className="btn-click magnetic"
              data-strength="20"
              data-strength-text="10"
            >
              <span className="btn-text">
                <span className="btn-text-inner">Contact</span>
              </span>
            </a>
          </li>
          <li className="btn btn-link btn-menu" onClick={onToggleMenu}>
            <div className="btn-click magnetic" data-strength="20" data-strength-text="10">
              <div className="btn-text">
                <span className="btn-text-inner">Menu</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
