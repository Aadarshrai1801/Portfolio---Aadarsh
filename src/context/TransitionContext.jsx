import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

function getPageNameFromPath(pathname) {
  const p = (pathname || '').toLowerCase();
  if (p.includes('work')) return 'Work';
  if (p.includes('about')) return 'About';
  if (p.includes('contact')) return 'Contact';
  return 'Home';
}

export function TransitionProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isTransitioningRef = useRef(false);
  const initialLoadHandledRef = useRef(false);

  const collapseLoaderInU = useCallback(() => {
    return new Promise((resolve) => {
      const loader = document.querySelector('.loading-container');
      const loaderScreen = document.querySelector('.loading-screen');
      if (!loader || !loaderScreen) {
        document.body.classList.remove('loading');
        return resolve();
      }

      const duration = 900;
      const screenHeight = loaderScreen.offsetHeight || window.innerHeight;
      const screenWidth = loaderScreen.offsetWidth || window.innerWidth;
      const depth = Math.min(screenWidth * 0.35, screenHeight * 0.45);
      const samples = 32;
      let startTime = null;

      const heroScaleEl = document.querySelector('.home-header .hero-scale');
      const heroBigName = document.querySelector('.home-header .big-name');

      if (heroScaleEl) {
        heroScaleEl.style.transition = 'none';
        heroScaleEl.style.transformOrigin = '50% 100%';
      }

      const activeWord = loader.querySelector('.loading-words h2.active') || loader.querySelector('.loading-words h2:not([style*="display: none"])');

      const step = (now) => {
        if (startTime === null) startTime = now;
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        const curveFactor = Math.sin(t * Math.PI);
        const currentDepth = depth * (0.35 + 0.65 * curveFactor);
        const edge = (screenHeight + currentDepth) - eased * (screenHeight + currentDepth * 2.8);

        const points = [];
        for (let i = 0; i <= samples; i++) {
          const x = i / samples;
          const y = edge + currentDepth * 4 * x * (1 - x);
          points.push((x * 100).toFixed(2) + '% ' + y.toFixed(1) + 'px');
        }
        points.push('100% 0%', '0% 0%');
        loaderScreen.style.clipPath = 'polygon(' + points.join(', ') + ')';

        if (activeWord && t > 0.08) {
          activeWord.style.opacity = Math.max(0, 1 - (t - 0.08) * 3.5).toFixed(3);
        }

        if (heroScaleEl) {
          const liftY = (1 - eased) * 160;
          const scaleVal = 0.88 + eased * 0.12;
          heroScaleEl.style.transform = 'translate3d(0, ' + liftY.toFixed(2) + 'px, 0) scale(' + scaleVal.toFixed(4) + ')';
        }
        if (heroBigName) {
          const nameLiftY = (1 - eased) * 90;
          heroBigName.style.transform = 'translate3d(0, ' + nameLiftY.toFixed(2) + 'px, 0)';
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          if (heroScaleEl) {
            heroScaleEl.style.transform = '';
            heroScaleEl.style.transition = '';
          }
          if (heroBigName) {
            heroBigName.style.transform = '';
          }
          loaderScreen.style.clipPath = '';
          loader.style.display = 'none';
          loader.style.pointerEvents = 'none';
          loader.style.zIndex = '';
          document.body.classList.remove('loading');
          document.documentElement.classList.remove('page-transitioning');
          if (activeWord) {
            activeWord.style.display = 'none';
            activeWord.classList.remove('active');
          }
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }, []);

  const coverScreenInU = useCallback((pageName) => {
    return new Promise((resolve) => {
      const loader = document.querySelector('.loading-container');
      const loaderScreen = document.querySelector('.loading-screen');
      const loaderWords = document.querySelector('.loading-words');
      if (!loader || !loaderScreen) return resolve();

      loader.style.display = 'block';
      loader.style.pointerEvents = 'all';
      loader.style.zIndex = '10000';
      document.body.classList.add('loading');

      const allWords = loader.querySelectorAll('.loading-words h2');
      let targetWord = null;
      for (let i = 0; i < allWords.length; i++) {
        allWords[i].style.display = 'none';
        allWords[i].classList.remove('active');
        allWords[i].style.opacity = '0';
        if (!allWords[i].classList.contains('home-active')) {
          const txt = allWords[i].textContent.trim();
          if (txt.toLowerCase() === (pageName || '').toLowerCase()) {
            targetWord = allWords[i];
          }
        }
      }
      if (!targetWord) {
        targetWord = loader.querySelector('.loading-words h2:not(.home-active)') || allWords[0];
        if (targetWord) {
          targetWord.innerHTML = (pageName || '') + '<div class="dot"></div>';
        }
      }
      if (targetWord) {
        targetWord.style.display = 'block';
        targetWord.classList.add('active');
        targetWord.style.opacity = '0';
      }
      if (loaderWords) loaderWords.style.opacity = '1';

      const duration = 650;
      const screenHeight = loaderScreen.offsetHeight || window.innerHeight;
      const screenWidth = loaderScreen.offsetWidth || window.innerWidth;
      const depth = Math.min(screenWidth * 0.35, screenHeight * 0.45);
      const samples = 32;
      let startTime = null;

      const step = (now) => {
        if (startTime === null) startTime = now;
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        const curveFactor = Math.sin(t * Math.PI);
        const currentDepth = depth * (0.35 + 0.65 * curveFactor);
        const edge = (screenHeight + currentDepth) - eased * (screenHeight + currentDepth * 2.8);

        const points = [];
        for (let i = 0; i <= samples; i++) {
          const x = i / samples;
          const y = edge - currentDepth * 4 * x * (1 - x);
          points.push((x * 100).toFixed(2) + '% ' + y.toFixed(1) + 'px');
        }
        points.push('100% 100%', '0% 100%');
        loaderScreen.style.clipPath = 'polygon(' + points.join(', ') + ')';

        if (targetWord) {
          if (t < 0.22) {
            targetWord.style.opacity = '0';
          } else if (t < 0.65) {
            const progress = (t - 0.22) / 0.43;
            targetWord.style.opacity = progress.toFixed(3);
          } else {
            targetWord.style.opacity = '1';
          }
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          loaderScreen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          if (targetWord) targetWord.style.opacity = '1';
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }, []);

  const playSubpageAnimation = useCallback((pageName) => {
    const loader = document.querySelector('.loading-container');
    const loaderScreen = document.querySelector('.loading-screen');
    const loaderWords = document.querySelector('.loading-words');
    if (!loader || !loaderScreen) return Promise.resolve();

    loader.style.display = 'block';
    loader.style.pointerEvents = 'all';
    loader.style.zIndex = '10000';
    loaderScreen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    document.body.classList.add('loading');

    const allWords = loader.querySelectorAll('.loading-words h2');
    allWords.forEach((w) => {
      w.style.display = 'none';
      w.style.opacity = '0';
      w.classList.remove('active');
    });

    let targetWord = null;
    for (let i = 0; i < allWords.length; i++) {
      const txt = allWords[i].textContent.trim();
      if (txt.toLowerCase() === (pageName || '').toLowerCase()) {
        targetWord = allWords[i];
        break;
      }
    }
    if (!targetWord && allWords.length > 0) {
      targetWord = allWords[0];
      targetWord.innerHTML = (pageName || '') + '<div class="dot"></div>';
    }
    if (targetWord) {
      targetWord.style.display = 'block';
      targetWord.classList.add('active');
      targetWord.style.opacity = '1';
    }
    if (loaderWords) loaderWords.style.opacity = '1';

    return new Promise((r) => setTimeout(r, 260))
      .then(() => collapseLoaderInU())
      .then(() => {
        loader.style.display = 'none';
        loader.style.pointerEvents = 'none';
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('page-transitioning');
      });
  }, [collapseLoaderInU]);

  const runWelcomeSequence = useCallback(() => {
    const loader = document.querySelector('.loading-container');
    const loaderScreen = document.querySelector('.loading-screen');
    const loaderWords = document.querySelector('.loading-words');
    if (!loader || !loaderScreen) return Promise.resolve();

    loader.style.display = 'block';
    loader.style.pointerEvents = 'all';
    loader.style.zIndex = '10000';
    loaderScreen.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    document.body.classList.add('loading');

    const allWords = loader.querySelectorAll('.loading-words h2');
    allWords.forEach((w) => {
      w.style.display = 'none';
      w.style.opacity = '0';
      w.classList.remove('active');
    });

    if (loaderWords) loaderWords.style.opacity = '1';

    const greetingWords = loader.querySelectorAll('.loading-words h2.home-active');
    let chain = Promise.resolve();
    const greetingArray = Array.prototype.slice.call(greetingWords);

    greetingArray.forEach((word, index) => {
      const isLast = (index === greetingArray.length - 1);
      chain = chain.then(() => {
        word.style.display = 'block';
        word.style.transition = 'opacity .11s ease';
        word.style.opacity = '1';
        word.classList.add('active');

        if (isLast) {
          return new Promise((r) => setTimeout(r, 300));
        } else {
          return new Promise((r) => setTimeout(r, 120))
            .then(() => {
              word.style.opacity = '0';
              return new Promise((r) => setTimeout(r, 50));
            })
            .then(() => {
              word.style.display = 'none';
              word.classList.remove('active');
            });
        }
      });
    });

    return chain
      .then(() => {
        document.body.classList.add('hero-reveal');
        return collapseLoaderInU();
      })
      .then(() => {
        loader.style.display = 'none';
        loader.style.pointerEvents = 'none';
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('page-transitioning');
      });
  }, [collapseLoaderInU]);

  // Initial load trigger
  useEffect(() => {
    if (initialLoadHandledRef.current) return;
    initialLoadHandledRef.current = true;

    const isHome = location.pathname === '/' || location.pathname === '/index.html';
    if (isHome) {
      runWelcomeSequence();
    } else {
      const pageName = getPageNameFromPath(location.pathname);
      playSubpageAnimation(pageName);
    }
  }, [location.pathname, runWelcomeSequence, playSubpageAnimation]);

  // Handle Browser Back / Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const destinationPage = getPageNameFromPath(window.location.pathname);
      if (destinationPage === 'Home') {
        playSubpageAnimation('Home');
      } else {
        playSubpageAnimation(destinationPage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [playSubpageAnimation]);

  // Programmatic client navigation with authentic U-curtain transition
  const navigateTo = useCallback((to, pageName) => {
    const current = location.pathname;
    if (current === to) return;
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const label = pageName || getPageNameFromPath(to);

    // Close mobile drawer if active
    document.body.classList.remove('nav-active');
    const hamburger = document.querySelector('.btn-hamburger');
    if (hamburger) hamburger.classList.remove('active');

    coverScreenInU(label).then(() => {
      navigate(to);
      window.scrollTo(0, 0);

      setTimeout(() => {
        collapseLoaderInU().then(() => {
          isTransitioningRef.current = false;
        });
      }, 80);
    });
  }, [location.pathname, navigate, coverScreenInU, collapseLoaderInU]);

  return (
    <TransitionContext.Provider value={{ navigateTo, playSubpageAnimation, runWelcomeSequence }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}
