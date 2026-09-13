import React, { useState } from 'react';
import Magnetic from '../components/Magnetic';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate clean submission
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', organization: '', message: '' });
      setIsSubmitted(false);
    }, 4500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="main-content" style={{ paddingTop: 'clamp(100px, 16vh, 160px)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', marginBottom: '1.5rem' }}>
            Contact
          </h1>
          <p style={{ maxWidth: '640px', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Have a project in mind, an inquiry, or just want to connect? Let's start the conversation.
          </p>
        </div>

        {/* Form + Details Grid */}
        <div className="contact-layout" style={{ marginBottom: '6rem' }}>
          {/* Form */}
          <div>
            {isSubmitted ? (
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <CheckCircle2 size={48} color="#10b981" />
                <h3 style={{ fontSize: '1.75rem', fontWeight: 400 }}>Thank you for reaching out!</h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px' }}>
                  Your message has been received. I typically respond within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">01 / What's your name?</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe *"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">02 / What's your email?</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com *"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization" className="form-label">03 / What's your company or brand?</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    placeholder="Company or Studio Ltd."
                    value={formData.organization}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">04 / Tell me about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Hello Aadarsh, I would like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                  />
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Magnetic strength={0.35}>
                    <button type="submit" className="btn-click primary">
                      <span className="btn-text">
                        <span>Send Message</span>
                        <Send size={16} />
                      </span>
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>

          {/* Direct Details */}
          <div className="contact-direct-info">
            <div className="info-block">
              <h5>Direct Contact</h5>
              <p>
                <a href="mailto:aadarshrai1801@gmail.com">
                  aadarshrai1801@gmail.com
                </a>
              </p>
            </div>

            <div className="info-block">
              <h5>Location</h5>
              <p>Dubai, United Arab Emirates</p>
              <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                GMT+4 • Available Worldwide
              </p>
            </div>

            <div className="info-block">
              <h5>Social Profiles</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <a
                  href="https://www.linkedin.com/in/aadarshrai1801/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/Aadarshrai1801"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
