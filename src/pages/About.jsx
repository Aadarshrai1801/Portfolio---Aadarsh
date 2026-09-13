import React from 'react';
import Magnetic from '../components/Magnetic';
import { useTransition } from '../context/TransitionContext';
import { Code, Palette, Sparkles, Layers } from 'lucide-react';

export default function About() {
  const { navigateTo } = useTransition();

  const skills = [
    {
      title: 'Frontend Engineering',
      icon: Code,
      items: ['React & Next.js', 'TypeScript', 'Modern JavaScript (ESNext)', 'HTML5 & Semantic Web', 'Tailwind CSS & Vanilla CSS']
    },
    {
      title: 'Interaction & UI/UX',
      icon: Palette,
      items: ['Figma Prototyping', 'Design Systems & Tokens', 'Micro-animations', 'Design Thinking & Wireframing', 'Typography & Layout']
    },
    {
      title: 'Creative Development',
      icon: Sparkles,
      items: ['Canvas API & WebGL', 'Three.js Visuals', 'GSAP & Lenis Smooth Scroll', 'SVG Animation & Physics', 'Responsive Shaders']
    },
    {
      title: 'Architecture & Tools',
      icon: Layers,
      items: ['Git & GitHub CI/CD', 'REST & GraphQL APIs', 'Performance Optimization', 'Vite & Build Tooling', 'Web Vitals & SEO']
    }
  ];

  const experience = [
    {
      period: '2023 — Present',
      role: 'Interaction Designer & Creative Developer',
      company: 'Freelance & Independent Projects',
      description: 'Engineering bespoke, motion-rich web applications, headless platforms, and design systems for global clients.'
    },
    {
      period: '2022 — 2023',
      role: 'Full Stack Frontend Developer',
      company: 'Digital Solutions Lab',
      description: 'Developed responsive client interfaces, interactive telemetry charts, and scalable design component libraries.'
    }
  ];

  return (
    <main className="main-content" style={{ paddingTop: 'clamp(100px, 16vh, 160px)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', marginBottom: '1.5rem' }}>
            About
          </h1>
          <p style={{ maxWidth: '640px', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Bridging the worlds of thoughtful visual design, fluid interaction engineering, and scalable code.
          </p>
        </div>

        {/* Narrative & Philosophy */}
        <div className="about-intro-grid" style={{ marginBottom: 'clamp(4rem, 8vh, 7rem)' }}>
          <h2 className="about-big-text">
            I believe that great digital products live at the intersection of aesthetic restraint and technical excellence.
          </h2>
          <div className="about-sub-col">
            <p>
              Hi, I'm Aadarsh Rai — a developer and interaction designer based in Dubai. I partner with founders, brands, and creative studios to turn bold concepts into intuitive, high-performance web realities.
            </p>
            <p>
              My approach prioritizes typography, motion fluidity, and responsive architecture. Every transition, spring easing curve, and layout decision is deliberate — designed to engage users without getting in the way.
            </p>
            <div>
              <Magnetic strength={0.3}>
                <button
                  className="btn-click"
                  onClick={() => navigateTo('/contact', 'Contact')}
                >
                  <span className="btn-text">Let's talk</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Skills Matrix */}
        <div style={{ marginBottom: 'clamp(4rem, 8vh, 7rem)' }}>
          <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '2rem' }}>
            Core Capabilities
          </h3>
          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.title} className="skill-card">
                  <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', marginBottom: '1rem' }}>
                    <Icon size={24} color="#ffffff" />
                  </div>
                  <h4>{skill.title}</h4>
                  <ul>
                    {skill.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div style={{ marginBottom: 'clamp(4rem, 8vh, 7rem)' }}>
          <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, marginBottom: '2rem' }}>
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {experience.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid var(--color-border)',
                  padding: 'clamp(1.5rem, 3vh, 2.5rem) 0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                <div style={{ color: 'var(--color-text-subtle)', fontSize: '0.95rem' }}>{item.period}</div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.35rem' }}>{item.role}</h4>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{item.company}</div>
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
