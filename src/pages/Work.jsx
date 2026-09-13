import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Magnetic from '../components/Magnetic';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Design', 'Development', 'AI'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Design') return p.category.includes('Design') || p.service.includes('Design');
    if (activeFilter === 'Development') return p.category.includes('Development') || p.tags.includes('React');
    if (activeFilter === 'AI') return p.category.includes('AI') || p.tags.includes('AI Analytics');
    return true;
  });

  return (
    <main className="main-content" style={{ paddingTop: 'clamp(100px, 16vh, 160px)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', marginBottom: '1.5rem' }}>
            Work
          </h1>
          <p style={{ maxWidth: '640px', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            A curated showcase of interactive digital experiences, scalable web applications, and thoughtful design systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'clamp(2.5rem, 5vh, 4rem)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
          {categories.map((cat) => (
            <Magnetic key={cat} strength={0.25}>
              <button
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: activeFilter === cat ? 'var(--color-text)' : 'var(--color-border)',
                  background: activeFilter === cat ? '#ffffff' : 'transparent',
                  color: activeFilter === cat ? '#000000' : 'var(--color-text)',
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 540px), 1fr))', gap: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '6rem' }}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s var(--ease-out-expo), border-color 0.3s ease'
              }}
            >
              {/* Media Preview */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(240px, 35vh, 340px)',
                  backgroundColor: project.bgColor || '#1C1D20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.5s var(--ease-out-expo)'
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.8rem' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 400 }}>{project.title}</h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-subtle)' }}>{project.year}</span>
                </div>

                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.78rem',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.92rem',
                      color: 'var(--color-text)',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <span>View Repository</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
