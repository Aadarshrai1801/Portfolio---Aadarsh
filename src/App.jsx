import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { usePortfolioEffects } from './hooks/usePortfolioEffects';
import Navbar from './components/Navbar';
import DrawerMenu from './components/DrawerMenu';
import PageLoader from './components/PageLoader';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  useSmoothScroll();
  usePortfolioEffects();

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('nav-active', isMenuOpen);
    const hamburger = document.querySelector('.btn-hamburger');
    if (hamburger) {
      hamburger.classList.toggle('active', isMenuOpen);
    }
  }, [isMenuOpen]);

  // Close drawer menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isContactPage = location.pathname.includes('contact');

  return (
    <>
      <div className="no-scroll-overlay"></div>

      {/* Page Curtain Transition & Welcome Loader */}
      <PageLoader />

      <main className="main no-touch">
        {/* Navigation */}
        <Navbar onToggleMenu={toggleMenu} />
        <DrawerMenu onClose={closeMenu} />

        {/* Main Routed Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work.html" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Global Footer (Used on Home, Work, About; Contact has its own footer) */}
        {!isContactPage && <Footer />}
      </main>
    </>
  );
}
