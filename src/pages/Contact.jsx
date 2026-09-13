import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.target;
    const formData = new FormData(form);

    // Spam honeypot protection (hidden phone input)
    if (formData.get('tel')) {
      setStatus('success');
      setFeedback("Thank you! Your message has been sent successfully.");
      form.reset();
      return;
    }

    let formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ID ? import.meta.env.VITE_FORMSPREE_ID.trim() : '';
    if (formspreeEndpoint && !formspreeEndpoint.startsWith('http')) {
      formspreeEndpoint = `https://formspree.io/f/${formspreeEndpoint}`;
    }
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY ? import.meta.env.VITE_WEB3FORMS_KEY.trim() : '';

    setStatus('submitting');
    setFeedback('');

    try {
      if (formspreeEndpoint) {
        // Submit via Formspree
        const payload = {
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          service: formData.get('service'),
          message: formData.get('message'),
        };

        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setStatus('success');
          setFeedback("Thank you! Your message has been sent successfully.");
          form.reset();
          setTimeout(() => {
            setStatus('idle');
            setFeedback('');
          }, 6000);
        } else {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to send message. Please try again.');
        }
      } else if (web3formsKey) {
        // Submit via Web3Forms
        formData.append('access_key', web3formsKey);
        formData.append('subject', `New Portfolio Inquiry from ${formData.get('name') || 'Visitor'}`);
        formData.append('from_name', 'Aadarsh Portfolio Contact Form');

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json().catch(() => ({}));
        if (data.success) {
          setStatus('success');
          setFeedback("Thank you! Your message has been sent successfully.");
          form.reset();
          setTimeout(() => {
            setStatus('idle');
            setFeedback('');
          }, 6000);
        } else {
          throw new Error(data.message || 'Failed to send message. Please try again.');
        }
      } else {
        // Fallback when no API key is yet configured in .env
        console.info(
          "Contact form: Add your Formspree Form ID (VITE_FORMSPREE_ID) or Web3Forms Key (VITE_WEB3FORMS_KEY) to .env to receive emails directly."
        );
        setStatus('success');
        setFeedback("Message received! Note: Configure VITE_FORMSPREE_ID or VITE_WEB3FORMS_KEY in your .env file to route directly to your email inbox.");
        form.reset();
        setTimeout(() => {
          setStatus('idle');
          setFeedback('');
        }, 7000);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
      setFeedback(err.message || "An error occurred while sending your message. Please email directly at aadarshrai1801@gmail.com.");
      setTimeout(() => {
        setStatus('idle');
      }, 7000);
    }
  };

  return (
    <div className="main-wrap" id="contact">
      <header className="section default-header contact-header theme-dark">
        <div className="container medium">
          <div className="row once-in">
            <div className="flex-col">
              <h1>
                <span>
                  <div className="profile-picture"></div> Let's start a{' '}
                </span>
                <span>project together</span>
              </h1>
            </div>
            <div className="flex-col">
              <div className="profile-picture"></div>
              <div className="arrow">
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>arrow-down-right</title>
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
            </div>
          </div>
          <div className="row once-in">
            <div className="flex-col">
              <form className="form" id="contact-form" onSubmit={handleSubmit}>
                <div className="website-field" style={{ display: 'none' }}>
                  <label className="label" htmlFor="form-tel">Phone Number</label>
                  <input className="field" type="text" id="form-tel" name="tel" tabIndex={-1} />
                </div>
                <div className="form-col">
                  <h5>01</h5>
                  <label className="label" htmlFor="form-name">What's your name?</label>
                  <input className="field" type="text" id="form-name" name="name" required placeholder="John Doe *" />
                </div>
                <div className="form-col">
                  <h5>02</h5>
                  <label className="label" htmlFor="form-email">What's your email?</label>
                  <input className="field" type="email" id="form-email" name="email" required placeholder="john@doe.com *" />
                </div>
                <div className="form-col">
                  <h5>03</h5>
                  <label className="label" htmlFor="form-company">What's the name of your organization?</label>
                  <input className="field" type="text" id="form-company" name="company" placeholder="John &amp; Doe ®" />
                </div>
                <div className="form-col">
                  <h5>04</h5>
                  <label className="label" htmlFor="form-service">What services are you looking for?</label>
                  <input className="field" type="text" id="form-service" name="service" placeholder="Web Design, Web Development ..." />
                </div>
                <div className="form-col">
                  <h5>05</h5>
                  <label className="label" htmlFor="form-message">Your message</label>
                  <textarea className="field" id="form-message" name="message" rows="8" required placeholder="Hello Aadarsh, can you help me with ... *"></textarea>
                </div>
                <div className="btn-contact-send">
                  <div className="btn btn-round" data-scroll data-scroll-speed="2">
                    <div className="btn-click magnetic" data-strength="100" data-strength-text="50">
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">
                          {status === 'submitting'
                            ? 'Sending...'
                            : status === 'success'
                            ? 'Sent!'
                            : status === 'error'
                            ? 'Retry'
                            : 'Send it!'}
                        </span>
                      </span>
                      <input
                        type="submit"
                        name="submit"
                        value=""
                        className="form-btn"
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>
                </div>
                {feedback && (
                  <div
                    className="contact-feedback"
                    style={{
                      marginTop: '1.75rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      backgroundColor: status === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)',
                      border: `1px solid ${status === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                      color: status === 'error' ? '#fca5a5' : '#86efac',
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {feedback}
                  </div>
                )}
              </form>
            </div>
            <div className="flex-col">
              <h5>Contact Details</h5>
              <ul className="links-wrap">
                <li className="btn btn-link btn-link-external">
                  <a href="mailto:aadarshrai1801@gmail.com" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">aadarshrai1801@gmail.com</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a href="tel:+918434501384" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">+91 8434501384</span>
                    </span>
                  </a>
                </li>
              </ul>
              <h5>Business Details</h5>
              <ul className="links-wrap">
                <li><p>Aadarsh Rai</p></li>
                <li><p>Location: Dubai, UAE</p></li>
              </ul>
              <h5>Socials</h5>
              <ul className="links-wrap">
                <li className="btn btn-link btn-link-external">
                  <a href="https://www.linkedin.com/in/aadarshrai1801/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">LinkedIn</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a href="https://github.com/Aadarshrai1801" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">GitHub</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">Twitter</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">Instagram</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <footer className="section footer footer-contact theme-dark">
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
                    <a href="https://www.linkedin.com/in/aadarshrai1801/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                      <span className="btn-text">
                        <span className="btn-text-inner">LinkedIn</span>
                      </span>
                    </a>
                  </li>
                  <li className="btn btn-link btn-link-external">
                    <a href="https://github.com/Aadarshrai1801" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                      <span className="btn-text">
                        <span className="btn-text-inner">GitHub</span>
                      </span>
                    </a>
                  </li>
                  <li className="btn btn-link btn-link-external">
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                      <span className="btn-text">
                        <span className="btn-text-inner">Twitter</span>
                      </span>
                    </a>
                  </li>
                  <li className="btn btn-link btn-link-external">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="20" data-strength-text="10">
                      <span className="btn-text">
                        <span className="btn-text-inner">Instagram</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
