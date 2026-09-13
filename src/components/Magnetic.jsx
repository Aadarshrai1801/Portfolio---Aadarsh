import React, { useRef, useEffect } from 'react';

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let animationId = null;
    let isHovered = false;

    const animate = () => {
      // Spring interpolation
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      const isSettled = Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05;

      if (!isSettled || isHovered) {
        animationId = requestAnimationFrame(animate);
      } else {
        el.style.transform = 'translate3d(0, 0, 0)';
        animationId = null;
      }
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) * strength;
      targetY = (e.clientY - centerY) * strength;

      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleMouseEnter = () => {
      isHovered = true;
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [strength]);

  return (
    <div ref={elementRef} className={`btn-magnetic ${className}`}>
      {children}
    </div>
  );
}
