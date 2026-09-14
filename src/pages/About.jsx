import React from 'react';

export default function About() {
  return (
    <div className="main-wrap" id="about">
      <header className="section default-header about-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1><span>Helping brands &amp; teams</span><span>thrive in the AI era</span></h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section no-padding line-globe once-in">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="stripe"></div>
              <div className="digital-ball">
                <div className="overlay"></div>
                <div className="globe">
                  <div className="globe-wrap">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle-hor"></div>
                    <div className="circle-hor-middle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-image once-in">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <div className="arrow">
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>arrow-up-right</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1019.000000, -279.000000)" stroke="currentColor" strokeWidth="1.5">
                      <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <p>
                I help companies and engineering teams build tailor-made AI solutions and production-ready intelligent systems. With each project, I push technology to new horizons, always putting quality and performance first.
              </p>
              <p>
                <span style={{ opacity: 0.5, display: 'block', paddingTop: '0.5em' }}>
                  Always exploring<span className="animate-dot">.</span><span className="animate-dot">.</span><span className="animate-dot">.</span>
                </span>
              </p>
            </div>
            <div className="flex-col">
              <div className="single-about-image">
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundImage: 'url(/assets/about-portrait.jpg)',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-services">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <h2>I can help you with <span className="animate-dot">.</span><span className="animate-dot">.</span><span className="animate-dot">.</span></h2>
            </div>
          </div>
          <div className="row">
            <div className="flex-col">
              <h5>01</h5>
              <div className="stripe"></div>
              <h4>Machine Learning</h4>
              <p>From predictive modeling and deep learning architectures to robust feature engineering and automated training pipelines tailored to real-world business data.</p>
            </div>
            <div className="flex-col">
              <h5>02</h5>
              <div className="stripe"></div>
              <h4>LLMs &amp; GenAI</h4>
              <p>Building state-of-the-art GenAI applications, intelligent retrieval systems (RAG), autonomous multi-agent workflows, and fine-tuned domain-specific language models.</p>
            </div>
            <div className="flex-col">
              <h5>03</h5>
              <div className="stripe"></div>
              <h4>The full package</h4>
              <p>End-to-end intelligent software from concept to implementation. Seamlessly integrating high-performance AI APIs (FastAPI/Flask) with modern web interfaces and scalable cloud infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-awwwards">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="single-image">
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundImage: 'url(/assets/avatar.jpg)',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="overlay"></div>
              </div>
            </div>
            <div className="flex-col">
              <div className="awwwards-badge"></div>
              <h2>Education &amp;<br />Background</h2>
              <p>I am an AI and Machine Learning Engineer based in Dubai, UAE, dedicated to building production-ready machine learning pipelines, fine-tuned LLM workflows, and intelligent software systems.</p>
              <div className="about-credentials">
                <div className="credential-item">
                  <h5>Degree</h5>
                  <h4>B.Tech in Computer Science</h4>
                  <p>Global Group of Institutes, Amritsar (2023 — 2027)</p>
                </div>
                <div className="credential-item">
                  <h5>Foundation</h5>
                  <h4>Intermediate, PCM</h4>
                  <p>Gopeshwar College, Hathua (2021 — 2023)</p>
                </div>
                <div className="credential-item">
                  <h5>Core Competencies</h5>
                  <div className="credential-tags">
                    <span>Python</span>
                    <span>PyTorch</span>
                    <span>TensorFlow</span>
                    <span>LangChain</span>
                    <span>FastAPI</span>
                    <span>AWS</span>
                    <span>Docker</span>
                    <span>Linux</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
