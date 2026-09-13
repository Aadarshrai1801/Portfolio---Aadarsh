import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePortfolioEffects() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    // Scroll to top on route change
    window.scrollTo(0, 0);

    // 0. Toggle .scrolled on <main>
    const mainEl = document.querySelector('main');
    const updateScrolled = () => {
      if (mainEl) {
        mainEl.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();
    cleanups.push(() => window.removeEventListener('scroll', updateScrolled));

    // 1. Reveal on scroll (IntersectionObserver)
    const targets = document.querySelectorAll('.reveal, .span-lines, .once-in');
    const spanLines = document.querySelectorAll('.span-lines');

    spanLines.forEach((group) => {
      group.querySelectorAll('.span-line-inner').forEach((span, i) => {
        span.style.transitionDelay = (i * 0.12) + 's';
      });
    });

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target;
            if (entry.isIntersecting) {
              el.classList.add('in-view');
              if (!el.classList.contains('span-lines')) {
                io.unobserve(el);
              }
            } else {
              if (el.classList.contains('span-lines') && entry.boundingClientRect.top > 0) {
                el.classList.remove('in-view');
              }
            }
          });
        },
        { threshold: [0, 0.1], rootMargin: '0px 0px -5% 0px' }
      );
      targets.forEach((el) => io.observe(el));
    } else {
      targets.forEach((el) => el.classList.add('in-view'));
    }

    // Immediately trigger any in-view elements on the page
    setTimeout(() => {
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 150);

    // 2. Dubai GST local time
    const timeSpan = document.getElementById('timeSpan');
    let timerInterval = null;
    if (timeSpan) {
      const updateTime = () => {
        try {
          timeSpan.textContent = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Dubai'
          }).format(new Date()).toLowerCase() + ' GST';
        } catch (e) {
          timeSpan.textContent = new Date().toLocaleTimeString() + ' GST';
        }
      };
      updateTime();
      timerInterval = setInterval(updateTime, 15000);
      cleanups.push(() => {
        if (timerInterval) clearInterval(timerInterval);
      });
    }

    // 3. Dennis Snellenberg Magnetic Buttons with 3D Text Parallax
    if (!reduceMotion) {
      const buttons = document.querySelectorAll('.btn-click.magnetic, .btn-click');
      buttons.forEach((btn) => {
        const text = btn.querySelector('.btn-text');
        let frame = null;

        let shiftX = 0;
        let shiftY = 0;
        let targetShiftX = 0;
        let targetShiftY = 0;
        let textShiftX = 0;
        let textShiftY = 0;
        let targetTextShiftX = 0;
        let targetTextShiftY = 0;
        let rotate = 0;
        let targetRotate = 0;
        let scale = 1;
        let targetScale = 1;
        let isHovered = false;

        const str = parseFloat(btn.getAttribute('data-strength')) || 40;
        const strText = parseFloat(btn.getAttribute('data-strength-text')) || 20;

        const tick = () => {
          shiftX += (targetShiftX - shiftX) * 0.22;
          shiftY += (targetShiftY - shiftY) * 0.22;
          rotate += (targetRotate - rotate) * 0.18;
          scale += (targetScale - scale) * 0.18;

          if (text) {
            textShiftX += (targetTextShiftX - textShiftX) * 0.24;
            textShiftY += (targetTextShiftY - textShiftY) * 0.24;
            text.style.transform = `translate3d(${textShiftX.toFixed(2)}px, ${textShiftY.toFixed(2)}px, 0)`;
          }

          btn.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) rotate(${rotate.toFixed(3)}deg) scale(${scale.toFixed(4)})`;

          if (
            isHovered ||
            Math.abs(targetShiftX - shiftX) > 0.1 ||
            Math.abs(targetShiftY - shiftY) > 0.1 ||
            Math.abs(targetRotate - rotate) > 0.05 ||
            Math.abs(targetScale - scale) > 0.005
          ) {
            frame = requestAnimationFrame(tick);
          } else {
            btn.style.transform = '';
            if (text) text.style.transform = '';
            frame = null;
          }
        };

        const start = () => {
          if (frame === null) frame = requestAnimationFrame(tick);
        };

        const onMouseEnter = () => {
          isHovered = true;
          targetScale = 1.04;
          if (btn.closest('.btn-left-top')) {
            targetRotate = -2.5;
            targetShiftX = 2;
            targetShiftY = 0;
          }
          start();
        };

        const onMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          targetShiftX = (dx / (rect.width / 2)) * (str * 0.45);
          targetShiftY = (dy / (rect.height / 2)) * (str * 0.45);

          if (text) {
            targetTextShiftX = (dx / (rect.width / 2)) * (strText * 0.55);
            targetTextShiftY = (dy / (rect.height / 2)) * (strText * 0.55);
          }

          start();
        };

        const onMouseLeave = () => {
          isHovered = false;
          targetShiftX = 0;
          targetShiftY = 0;
          targetRotate = 0;
          targetScale = 1;
          targetTextShiftX = 0;
          targetTextShiftY = 0;
          start();
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);

        cleanups.push(() => {
          btn.removeEventListener('mouseenter', onMouseEnter);
          btn.removeEventListener('mousemove', onMouseMove);
          btn.removeEventListener('mouseleave', onMouseLeave);
          if (frame) cancelAnimationFrame(frame);
        });
      });
    }

    // 4. Hero Name Marquee (continuous, reverses & boosts with scroll)
    const nameEl = document.querySelector('.home-header .big-name .name-h1');
    if (nameEl) {
      let position = 0;
      let direction = -1;
      let speed = 1;
      let boost = 0;
      let lastScrollY = window.scrollY;
      let lastTime = performance.now();
      let marqueeRaf = null;

      const measure = () => {
        const half = nameEl.scrollWidth / 2;
        speed = half > 0 ? half / 26000 : 1;
      };
      measure();
      window.addEventListener('resize', measure);

      const onScrollMarquee = () => {
        const y = window.scrollY;
        const delta = Math.abs(y - lastScrollY);
        if (y > lastScrollY + 1) {
          direction = -1;
        } else if (y < lastScrollY - 1) {
          direction = 1;
        }
        if (delta > 0) {
          boost = Math.min(6, boost + delta * 0.35);
        }
        lastScrollY = y;
      };
      window.addEventListener('scroll', onScrollMarquee, { passive: true });

      const tickMarquee = (now) => {
        const dt = Math.min(now - lastTime, 48);
        lastTime = now;
        position += direction * speed * (1 + boost) * dt;
        boost *= Math.pow(0.985, dt / 16);
        if (boost < 0.01) boost = 0;

        const half = nameEl.scrollWidth / 2;
        if (half > 0) {
          if (position <= -half) position += half;
          if (position > 0) position -= half;
        }
        nameEl.style.transform = `translateX(${position.toFixed(2)}px)`;
        marqueeRaf = requestAnimationFrame(tickMarquee);
      };
      marqueeRaf = requestAnimationFrame(tickMarquee);

      cleanups.push(() => {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', onScrollMarquee);
        if (marqueeRaf) cancelAnimationFrame(marqueeRaf);
      });
    }

    // 5. Floating Hover Project Preview on Desktop
    if (!reduceMotion && window.innerWidth > 1024) {
      const imageContainer = document.querySelector('.mouse-pos-list-image');
      const btnContainer = document.querySelector('.mouse-pos-list-btn');
      const spanContainer = document.querySelector('.mouse-pos-list-span');
      const rows = document.querySelectorAll('.hover-row, .work-items li, .work-tiles li');
      const items = document.querySelectorAll('.mouse-pos-list-image-inner');

      if (imageContainer && rows.length > 0) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isHovering = false;
        let hoverRaf = null;

        const onMouseMoveFollower = (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          if (!hoverRaf && isHovering) {
            hoverRaf = requestAnimationFrame(renderFollower);
          }
        };

        const renderFollower = () => {
          const diffX = mouseX - currentX;
          const diffY = mouseY - currentY;
          if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
            currentX += diffX * 0.16;
            currentY += diffY * 0.16;
          } else {
            currentX = mouseX;
            currentY = mouseY;
          }

          imageContainer.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          if (btnContainer) {
            btnContainer.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          }
          if (spanContainer) {
            spanContainer.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
          }

          if (isHovering || Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
            hoverRaf = requestAnimationFrame(renderFollower);
          } else {
            hoverRaf = null;
          }
        };

        document.addEventListener('mousemove', onMouseMoveFollower);

        rows.forEach((row) => {
          const onMouseEnterRow = () => {
            const project = row.getAttribute('data-project');
            const idx = row.getAttribute('data-index');
            items.forEach((item) => {
              const matchesProject = project && item.getAttribute('data-project') === project;
              const matchesIndex = idx && item.getAttribute('data-index') === idx;
              item.classList.toggle('visible', matchesProject || matchesIndex);
            });
            isHovering = true;
            imageContainer.classList.add('active');
            if (btnContainer) btnContainer.classList.add('active');
            if (spanContainer) spanContainer.classList.add('active');
            if (!hoverRaf) hoverRaf = requestAnimationFrame(renderFollower);
          };

          const onMouseLeaveRow = () => {
            isHovering = false;
            imageContainer.classList.remove('active');
            if (btnContainer) btnContainer.classList.remove('active');
            if (spanContainer) spanContainer.classList.remove('active');
          };

          row.addEventListener('mouseenter', onMouseEnterRow);
          row.addEventListener('mouseleave', onMouseLeaveRow);

          cleanups.push(() => {
            row.removeEventListener('mouseenter', onMouseEnterRow);
            row.removeEventListener('mouseleave', onMouseLeaveRow);
          });
        });

        cleanups.push(() => {
          document.removeEventListener('mousemove', onMouseMoveFollower);
          if (hoverRaf) cancelAnimationFrame(hoverRaf);
        });
      }
    }

    // 6. Dennis Snellenberg Intro Parallax ("About Me" button)
    const introSection = document.querySelector('.home-intro');
    const introWrap = introSection ? introSection.querySelector('.btn-wrap-intro') : null;
    if (introSection && introWrap) {
      let ticking = false;
      const updateIntroParallax = () => {
        const rect = introSection.getBoundingClientRect();
        const winH = window.innerHeight;
        const total = winH * 0.85 + rect.height * 0.5;
        const visible = winH - rect.top;
        const t = Math.max(0, Math.min(1, visible / total));

        const startDist = 110;
        const endDist = -105;
        const translateY = startDist + (endDist - startDist) * t;

        introWrap.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        ticking = false;
      };

      const onIntroScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateIntroParallax);
          ticking = true;
        }
      };
      window.addEventListener('scroll', onIntroScroll, { passive: true });
      window.addEventListener('resize', updateIntroParallax);
      updateIntroParallax();

      cleanups.push(() => {
        window.removeEventListener('scroll', onIntroScroll);
        window.removeEventListener('resize', updateIntroParallax);
      });
    }

    // 7. Dennis Snellenberg Footer Overlap & Vertical Scroll Parallax
    const footerWrap = document.querySelector('.footer-wrap');
    const footerSpacer = document.querySelector('.footer-spacer');
    const roundedWrap = document.querySelector('.footer-rounded-div .rounded-div-wrap');
    const footerEl = footerWrap ? footerWrap.querySelector('.footer') : null;
    const headingEl = footerWrap ? footerWrap.querySelector('.container.medium .row:nth-child(1) h2') : null;
    const btnFixed = footerWrap ? footerWrap.querySelector('.btn-fixed') : null;
    const footerRow = footerWrap ? footerWrap.querySelector('.container.medium .row:nth-child(2)') : null;
    const arrowEl = footerWrap ? footerWrap.querySelector('.arrow') : null;

    if (footerWrap && footerSpacer) {
      let currentProgress = 0;
      let targetProgress = 0;
      let footerRafId = null;

      const updateSpacer = () => {
        const winH = window.innerHeight;
        const footerH = footerEl ? footerEl.offsetHeight : 0;
        footerSpacer.style.height = Math.max(winH * 0.9, footerH) + 'px';
      };

      const calculateTarget = () => {
        const rect = footerSpacer.getBoundingClientRect();
        const winH = window.innerHeight;
        const spacerH = rect.height || winH;
        const scrolledIntoSpacer = winH - rect.top;
        targetProgress = Math.max(0, Math.min(1, scrolledIntoSpacer / spacerH));

        if (scrolledIntoSpacer > -40) {
          footerWrap.classList.add('visible');
        } else {
          footerWrap.classList.remove('visible');
        }

        if (!footerRafId) {
          footerRafId = requestAnimationFrame(renderFooter);
        }
      };

      const renderFooter = () => {
        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.0005) {
          currentProgress += diff * 0.14;
        } else {
          currentProgress = targetProgress;
        }

        const p = currentProgress;

        if (roundedWrap) {
          const curveHeight = (1 - p) * 8;
          roundedWrap.style.height = Math.max(0, curveHeight).toFixed(2) + 'vh';
        }

        if (footerEl) {
          const footerTranslateY = (1 - p) * 280;
          footerEl.style.transform = `translate3d(0, ${footerTranslateY.toFixed(2)}px, 0)`;
        }

        if (headingEl) {
          const headingY = (1 - p) * 60;
          headingEl.style.transform = `translate3d(0, ${headingY.toFixed(2)}px, 0)`;
        }

        if (arrowEl) {
          const arrowRot = (1 - p) * 15;
          arrowEl.style.transform = `rotate(${arrowRot.toFixed(1)}deg)`;
        }

        if (btnFixed && footerRow) {
          const rowWidth = footerRow.offsetWidth;
          const maxShiftLeft = Math.min(rowWidth * 0.35, 400);
          const shiftX = -maxShiftLeft * (1 - Math.pow(p, 0.85));
          const btnVerticalY = (1 - p) * 45;
          const tilt = (1 - p) * -10;

          btnFixed.style.transform = `translate3d(calc(-50% + ${shiftX.toFixed(1)}px), calc(-50% + ${btnVerticalY.toFixed(1)}px), 0) rotate(${tilt.toFixed(1)}deg)`;
        }

        if (Math.abs(targetProgress - currentProgress) > 0.0005) {
          footerRafId = requestAnimationFrame(renderFooter);
        } else {
          footerRafId = null;
        }
      };

      window.addEventListener('scroll', calculateTarget, { passive: true });
      window.addEventListener('resize', () => {
        updateSpacer();
        calculateTarget();
      });

      updateSpacer();
      calculateTarget();

      cleanups.push(() => {
        window.removeEventListener('scroll', calculateTarget);
        if (footerRafId) cancelAnimationFrame(footerRafId);
      });
    }

    return () => {
      if (io) io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [location.pathname]);
}
