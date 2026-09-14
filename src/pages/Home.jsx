import React from 'react';
import { useTransition } from '../context/TransitionContext';
import { PROJECTS } from '../data/projects';

export default function Home() {
  const { navigateTo } = useTransition();

  return (
    <>
      <div className="mouse-pos-list-image no-select">
        <div className="mouse-pos-list-image-bounce overlay">
          <div className="float-image-wrap">
            {PROJECTS.map((p) => (
              <li key={p.id} className="mouse-pos-list-image-inner" data-project={p.id}>
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: p.bgColor
                  }}
                ></div>
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="mouse-pos-list-btn no-select"></div>
      <div className="mouse-pos-list-span no-select"><p>View</p></div>

      <div className="main-wrap" id="home">
        <header className="section home-header theme-dark">
          <div className="hero-scale">
            <div className="personal-image-wrap">
              <div
                className="overlay overlay-image"
                style={{
                  backgroundImage: 'url(/assets/hero-cutout.png)',
                  backgroundPosition: '55% bottom',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              ></div>
            </div>
            <div className="overlay get-height">
              <div className="hanger">
                <p><span>Located </span><span>in </span><span>Dubai, UAE</span></p>
                <svg width="300px" height="121px" viewBox="0 0 300 121" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>Combined Shape</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(0.000000, -366.000000)" fill="#1C1D20">
                      <g transform="translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)">
                        <g transform="translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)">
                          <path d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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

            <div className="container">
              <div className="row">
                <div className="flex-col">
                  <div className="header-above-h4 reveal">
                    <div className="arrow big">
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
                  </div>
                  <h4 className="reveal"><span>AI &amp; Machine Learning</span> Engineer</h4>
                </div>
              </div>
            </div>

            <div className="big-name">
              <div className="name-h1">
                <div className="name-wrap">
                  <h1 className="no-select">Aadarsh Rai<span className="spacer">—</span></h1>
                </div>
                <div className="name-wrap">
                  <h1 className="no-select">Aadarsh Rai<span className="spacer">—</span></h1>
                </div>
              </div>
            </div>

            <div className="white-block"></div>
          </div>
        </header>

        <section className="section home-intro" id="about">
          <div className="container medium">
            <div className="row">
              <div className="flex-col">
                <h4 className="span-lines animate">
                  <span className="span-line"><span className="span-line-inner">Building practical AI that</span></span>
                  <span className="span-line"><span className="span-line-inner">solves real-world problems.</span></span>
                </h4>
              </div>
              <div className="flex-col">
                <div className="text-wrap reveal">
                  <p>
                    I’m an aspiring AI and Machine Learning Engineer focused on building production-oriented machine learning systems and intelligent applications — from data collection and preprocessing to model training, evaluation, API development and deployment.
                  </p>
                </div>
                <div className="btn-wrap-intro">
                  <div className="btn btn-round reveal">
                    <a
                      href="/about"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/about', 'About');
                      }}
                      className="btn-click magnetic"
                    >
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">About Me</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section work-grid large-work-grid" id="work">
          <div className="container">
            <div className="grid-sub-title reveal">
              <div className="flex-col">
                <h5>Recent work</h5>
              </div>
            </div>
            <ul className="work-items mouse-pos-list-image-wrap">
              {PROJECTS.map((p) => (
                <li key={p.id} data-project={p.id} className="reveal">
                  <div className="stripe animate"></div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="row">
                    <div className="flex-col">
                      <h4><span>{p.title}</span></h4>
                    </div>
                    <div className="flex-col animate">
                      <p>{p.services}</p>
                    </div>
                  </a>
                </li>
              ))}
              <div className="stripe last animate"></div>
            </ul>
          </div>
        </section>

        <section className="section work-tiles work-tiles-home">
          <div className="container">
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.id} className="visible">
                  <div className="single-tile-wrap">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="row">
                      <div className="flex-col">
                        <div className="tile-image">
                          <div
                            className="overlay overlay-image"
                            style={{
                              backgroundImage: `url(${p.image})`,
                              backgroundColor: p.bgColor,
                              backgroundPosition: 'center center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover'
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-col">
                        <h4><span>{p.title}</span></h4>
                        <div className="stripe"></div>
                      </div>
                      <div className="flex-col">
                        <p>{p.sub}</p>
                      </div>
                      <div className="flex-col">
                        <p>{p.tags}</p>
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section center-grid-btn center-grid-btn-home">
          <div className="container">
            <div className="grid-after-btn reveal in-view">
              <div className="btn btn-normal">
                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/work', 'Work');
                  }}
                  className="btn-click magnetic"
                  data-strength="25"
                  data-strength-text="15"
                >
                  <div className="btn-fill"></div>
                  <span className="btn-text">
                    <span className="btn-text-inner change">
                      More work<div className="count-nr">4</div>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
