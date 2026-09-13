import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

const GREETINGS = [
  'Hello',
  'Bonjour',
  'नमस्ते',
  'Ciao',
  'Olá',
  'こんにちは',
  'Hallå',
  'Guten tag',
  'Namaste'
];

function getPageNameFromPath(pathname) {
  const p = pathname.toLowerCase();
  if (p.includes('work')) return 'Work';
  if (p.includes('about')) return 'About';
  if (p.includes('contact')) return 'Contact';
  return 'Home';
}

export function TransitionProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeWord, setActiveWord] = useState('');
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [loaderClipPath, setLoaderClipPath] = useState('polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)');
  const [isWelcomeSequence, setIsWelcomeSequence] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState('');
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  const prevPathRef = useRef(location.pathname);

  // U-curve curtain collapse animation via rAF
  const collapseCurtain = useCallback(() => {
    return new Promise((resolve) => {
      const duration = 850;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic bezier easing
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const topEdge = ease * 100;
        const dip = Math.sin(progress * Math.PI) * 16;
        const midDip = Math.max(0, topEdge - dip);

        // U-shaped curved polygon
        const path = `polygon(0% 0%, 100% 0%, 100% ${topEdge}%, 50% ${midDip}%, 0% ${topEdge}%)`;
        setLoaderClipPath(path);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setLoaderClipPath('polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)');
          setIsLoaderVisible(false);
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  }, []);

  // Play multilingual greeting sequence on Home
  const playWelcomeSequence = useCallback(async () => {
    setIsWelcomeSequence(true);
    setLoaderClipPath('polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)');
    setIsLoaderVisible(true);

    for (let i = 0; i < GREETINGS.length; i++) {
      setCurrentGreeting(GREETINGS[i]);
      const isLast = i === GREETINGS.length - 1;
      await new Promise((r) => setTimeout(r, isLast ? 320 : 160));
    }

    setIsWelcomeSequence(false);
    await collapseCurtain();
    setIsInitialLoadDone(true);
  }, [collapseCurtain]);

  // Play single page title curtain collapse
  const playPageCurtain = useCallback(async (word) => {
    setIsWelcomeSequence(false);
    setActiveWord(word);
    setLoaderClipPath('polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)');
    setIsLoaderVisible(true);

    // Hold word briefly before collapsing in U-shape
    await new Promise((r) => setTimeout(r, 280));
    await collapseCurtain();
    setIsInitialLoadDone(true);
  }, [collapseCurtain]);

  // Handle Initial Load
  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/index.html';
    if (isHome) {
      playWelcomeSequence();
    } else {
      const pageName = getPageNameFromPath(location.pathname);
      playPageCurtain(pageName);
    }
  }, []);

  // Handle Browser Back / Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const destinationPage = getPageNameFromPath(window.location.pathname);
      playPageCurtain(destinationPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [playPageCurtain]);

  // Trigger programmatic navigation with curtain transition
  const navigateTo = useCallback(async (to, label) => {
    if (location.pathname === to) return;

    const pageLabel = label || getPageNameFromPath(to);
    setActiveWord(pageLabel);
    setIsWelcomeSequence(false);
    setLoaderClipPath('polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)');
    setIsLoaderVisible(true);

    await new Promise((r) => setTimeout(r, 220));
    navigate(to);
    window.scrollTo(0, 0);

    await new Promise((r) => setTimeout(r, 180));
    await collapseCurtain();
  }, [location.pathname, navigate, collapseCurtain]);

  return (
    <TransitionContext.Provider
      value={{
        activeWord,
        isLoaderVisible,
        loaderClipPath,
        isWelcomeSequence,
        currentGreeting,
        navigateTo,
        isInitialLoadDone
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
