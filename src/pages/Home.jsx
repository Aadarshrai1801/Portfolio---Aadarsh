import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import DigitalBall from '../components/DigitalBall';
import Magnetic from '../components/Magnetic';
import { useTransition } from '../context/TransitionContext';
import { ArrowUpRight } from 'lucide-react';

export default function Home({ setCursorState }) {
  const { navigateTo } = useTransition();
  const [activeProject, setActiveProject] = useState(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  const handleProjectMouseEnter = (project, e) => {
    setActiveProject(project);
    setCursorState({ type: 'project', text: 'View' });
    setPreviewPos({ x: e.clientX, y: e.clientY });
  };

  const handleProjectMouseMove = (e) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  };

  const handleProjectMouseLeave = () => {
    setActiveProject(null);
    setCursorState(null);
  };

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-portrait">
          <img src="/assets/hero.jpg" alt="Aadarsh Rai Portrait" />
        </div>
        <div className="hero-gradient-overlay" />

        <div className="container hero-content">
          <div className="hero-top-badge">
            <DigitalBall />
          </div>

          <h1 className="hero-title">
            <span className="title-sub">Freelance Interaction Designer & Developer</span>
            Aadarsh Rai
          </h1>

          <div className="hero-bottom-row">
            <p className="hero-descriptor">
              Crafting premium digital experiences, tactile web interfaces, and high-performance applications with meticulous attention to detail.
            </p>

            <div className="hero-ctas">
              <Magnetic strength={0.35}>
                <button
                  className="btn-click primary"
                  onClick={() => navigateTo('/work', 'Work')}
                >
                  <span className="btn-text">Explore Work</span>
                </button>
              </Magnetic>

              <Magnetic strength={0.35}>
                <button
                  className="btn-click"
                  onClick={() => navigateTo('/contact', 'Contact')}
                >
                  <span className="btn-text">Get in touch</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="work-section">
        <div className="container">
          <div className="section-header-row">
            <h2 className="section-title">Selected Work</h2>
            <Magnetic strength={0.3}>
              <button
                className="btn-click"
                onClick={() => navigateTo('/work', 'Work')}
              >
                <span className="btn-text">View All ({PROJECTS.length})</span>
              </button>
            </Magnetic>
          </div>

          <div className="project-list">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="project-item"
                onMouseEnter={(e) => handleProjectMouseEnter(project, e)}
                onMouseMove={handleProjectMouseMove}
                onMouseLeave={handleProjectMouseLeave}
                onClick={() => navigateTo('/work', 'Work')}
              >
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta-mobile">{project.service} • {project.year}</div>
                </div>
                <div className="project-service">{project.service}</div>
                <div className="project-year">{project.year}</div>
                <div className="project-arrow">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Hover Preview Container (Desktop) */}
        {activeProject && (
          <div
            className={`floating-preview-container ${activeProject ? 'active' : ''}`}
            style={{
              left: `${previewPos.x}px`,
              top: `${previewPos.y}px`,
              backgroundColor: activeProject.bgColor || '#141517'
            }}
          >
            <img src={activeProject.image} alt={activeProject.title} />
          </div>
        )}
      </section>

      {/* Philosophy & Overview */}
      <section className="about-intro-section">
        <div className="container">
          <div className="about-intro-grid">
            <h2 className="about-big-text">
              Helping forward-thinking brands stand out in the digital age through bespoke design and fluid engineering.
            </h2>
            <div className="about-sub-col">
              <p>
                The combination of my passion for design, code & interaction puts me in a unique position in the digital space. I bridge the gap between design vision and technical execution.
              </p>
              <p>
                Every project is an opportunity to push visual boundaries, deliver buttery smooth 60fps performance, and create unforgettable user interactions.
              </p>
              <div>
                <Magnetic strength={0.3}>
                  <button
                    className="btn-click"
                    onClick={() => navigateTo('/about', 'About')}
                  >
                    <span className="btn-text">About me</span>
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
