import React from 'react';
import { useTransition } from '../context/TransitionContext';

export default function Footer() {
  const { navigateTo } = useTransition();

  return (
    <>
      <div className="footer-rounded-div">
        <div className="rounded-div-wrap">
          <div className="rounded-div"></div>
        </div>
      </div>
      <div className="footer-spacer"></div>
      <div className="footer-wrap footer-footer-wrap theme-dark" id="contact">
        <footer className="section footer">
          <div className="container medium">
            <div className="row">
              <div className="flex-col">
                <div className="arrow">
                  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>arrow-up-right</title>
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
                        <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                          <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                          <line x1="12" y1="0" x2="0" y2="12"></line>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <h2>
                  <span>
                    <div className="profile-picture"></div> Let's work{' '}
                  </span>
                  <span>together</span>
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="flex-col">
                <div className="stripe"></div>
                <div className="btn-fixed">
                  <div className="btn btn-round">
                    <a
                      href="/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/contact', 'Contact');
                      }}
                      className="btn-click magnetic"
                      data-strength="100"
                      data-strength-text="50"
                    >
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">Get in touch</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="flex-col">
                <div className="btn btn-normal">
                  <a href="mailto:aadarshrai1801@gmail.com" className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">aadarshrai1801@gmail.com</span>
                    </span>
                  </a>
                </div>
                <div className="btn btn-normal">
                  <a href="tel:+918434501384" className="btn-click magnetic" data-strength="25" data-strength-text="15">
                    <div className="btn-fill"></div>
                    <span className="btn-text">
                      <span className="btn-text-inner change">+91 8434501384</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container no-padding">
            <div className="row bottom-footer">
              <div className="flex-col">
                <div className="credits">
                  <h5>Version</h5>
                  <p>2026 © Edition</p>
                </div>
                <div className="time">
                  <h5>Local time</h5>
                  <p><span id="timeSpan">--:-- GST</span></p>
                </div>
              </div>
              <div className="flex-col">
                <div className="socials">
                  <h5>Socials</h5>
                  <ul>
                    <li className="btn btn-link btn-link-external">
                      <a
                        href="https://www.linkedin.com/in/aadarshrai1801/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-click magnetic"
                        data-strength="20"
                        data-strength-text="10"
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
                        data-strength="20"
                        data-strength-text="10"
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
                        data-strength="20"
                        data-strength-text="10"
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
        </footer>
        <div className="overlay overlay-gradient"></div>
      </div>
    </>
  );
}
