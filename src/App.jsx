import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import DrawerMenu from './components/DrawerMenu';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorState, setCursorState] = useState(null);

  return (
    <div className="app-wrapper">
      {/* Page Curtain Transition & Welcome Loader */}
      <PageLoader />

      {/* Smooth Cursor Follower */}
      <CustomCursor hoverState={cursorState} />

      {/* Navigation */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <DrawerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Main Routed Content */}
      <Routes>
        <Route path="/" element={<Home setCursorState={setCursorState} />} />
        <Route path="/index.html" element={<Home setCursorState={setCursorState} />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work.html" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="*" element={<Home setCursorState={setCursorState} />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
