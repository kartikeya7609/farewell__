import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import './index.css';
import Calendar from './src/components/Calendar';
import './src/styles/calendar.css';

const initialItems = [
  { id: 1, img: '/image/img1.jpg', title: 'Farewell', type: 'FLOWER', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 2, img: '/image/img2.jpg', title: 'Farewell', type: 'NATURE', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 3, img: '/image/img4.jpg', title: 'Farewell', type: 'PLANT', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 4, img: '/image/img3.jpg', title: 'Farewell', type: 'NATURE', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

/* ─────────────────────────────────────────────────────────────────
   ParallaxItem

   THE CORE FIX:
   ─────────────
   useScroll({ target: ref }) only works when the TARGET element has
   its OWN scroll. Our sections are normal block divs — the WINDOW
   scrolls. So scrollYProgress always stayed at 0.

   Solution: use useScroll() with NO options (gives window scrollY),
   then inside each transform function compute the section's progress
   from its getBoundingClientRect() on the fly. This is the correct
   pattern for window-scroll parallax with multiple sections.

   "Welcome to the Farewell" FIX:
   ─────────────────────────────
   whileInView fires only when an element ENTERS the viewport after
   mount. The final section can already be partially visible on first
   render (no scroll happened yet), so it never triggers.
   Fix: use useInView({ once: false, amount: 0.35 }) and bind
   animate={} manually to isInView.
───────────────────────────────────────────────────────────────── */
const ParallaxItem = ({ item, isFinal = false }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // useInView for the "Welcome" heading — once:false retriggers on scroll
  const isInView = useInView(contentRef, { once: false, amount: 0.35 });

  // Window-level scroll (no container option)
  const { scrollY } = useScroll();

  // Helper: returns section scroll progress 0..1 through the viewport
  const getP = (scrollTop) => {
    const el = sectionRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const absTop = rect.top + scrollTop;
    const p = (scrollTop + window.innerHeight - absTop) /
      (window.innerHeight + rect.height);
    return Math.min(1, Math.max(0, p));
  };

  // All transform derivations run through getP(scrollY)
  const yBg = useTransform(scrollY, (v) => `${-30 + getP(v) * 60}%`);
  const scaleBg = useTransform(scrollY, (v) => 1.25 - getP(v) * 0.2);
  const rotateBg = useTransform(scrollY, (v) => `${-2 + getP(v) * 4}deg`);
  const yContent = useTransform(scrollY, (v) => `${40 - getP(v) * 80}px`);
  const yFg = useTransform(scrollY, (v) => `${20 - getP(v) * 40}%`);
  const rawOpacity = useTransform(scrollY, (v) => {
    const p = getP(v);
    if (p < 0.2) return p / 0.2;
    if (p < 0.75) return 1;
    return 1 - (p - 0.75) / 0.25;
  });

  // Spring smoothing
  const yBgS = useSpring(yBg, { stiffness: 55, damping: 20 });
  const scaleBgS = useSpring(scaleBg, { stiffness: 55, damping: 20 });
  const rotateBgS = useSpring(rotateBg, { stiffness: 55, damping: 20 });
  const yContentS = useSpring(yContent, { stiffness: 75, damping: 25 });
  const opacityS = useSpring(rawOpacity, { stiffness: 75, damping: 25 });
  const yFgS = useSpring(yFg, { stiffness: 55, damping: 20 });

  const imgSrc = typeof item === 'string' ? item : item.img;

  return (
    <section ref={sectionRef} className="parallax-section">

      {/* ── Background: ALL background-* must be inline with framer style={} ── */}
      <motion.div
        className="parallax-bg"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: yBgS,
          scale: scaleBgS,
          rotate: rotateBgS,
          willChange: 'transform',
        }}
      />

      <div className="parallax-overlay" />

      <motion.div className="parallax-fg" style={{ y: yFgS }} />

      {/* ── Content card ── */}
      <motion.div
        ref={contentRef}
        className="parallax-content"
        style={{ y: yContentS, opacity: opacityS, willChange: 'transform, opacity' }}
      >
        {isFinal ? (
          <motion.div
            initial={{ scale: 0.88, opacity: 0, filter: 'blur(16px)' }}
            animate={
              isInView
                ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
                : { scale: 0.88, opacity: 0, filter: 'blur(16px)' }
            }
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h1 className="parallax-text cinematic-glow">
              Welcome to the Farewell
            </h1>
            <p className="parallax-subtext">
              The journey ends here, but the memories remain.
            </p>
            <motion.div
              className="particle-streak"
              animate={{ x: ['-100%', '250%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : (
          <>
            <h2 className="parallax-text cinematic-glow">{item.title}</h2>
            <p className="parallax-subtext">{item.type}</p>
          </>
        )}
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   App
───────────────────────────────────────────── */
function App() {
  const [items, setItems] = useState(initialItems);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState('');

  const [phase, setPhase] = useState('front');
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);

  const validPasscodes = [
    'FAREWELL2026', 'MEMORIES-FOR-LIFE', 'WITHDRAW-MEMORIES',
    'NITDGP-FAREWELL', 'IEEE-BANK-VAULT', 'STAY-CONNECTED',
  ];

  const runCinematicSequence = async () => {
    setPhase('loading');
    await wait(1800);
    setPhase('calendar');
    await wait(1800);
    setPhase('animate');
    await wait(1500);
    setPhase('zoom');
    await wait(1000);
    setPhase('loading2');
    await wait(1200);
    setPhase('slider');
  };

  const startSequence = async () => {
    if (validPasscodes.includes(passcode.toUpperCase())) {
      setIsError(false);
      localStorage.setItem('vaultUnlocked', 'true');
      runCinematicSequence();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }
  };

  useEffect(() => {
    const isUnlocked = localStorage.getItem('vaultUnlocked');
    if (isUnlocked === 'true') {
      runCinematicSequence();
    }
  }, []);

  /* ── Scroll lock / unlock ──
     CRITICAL: must unlock BOTH html and body, and reset scrollY to 0
     so parallax starts from the very top.
  ── */
  useEffect(() => {
    if (phase === 'parallax') {
      document.documentElement.style.cssText = 'overflow:auto;height:auto;margin:0;padding:0;';
      document.body.style.cssText = 'overflow:auto;height:auto;margin:0;padding:0;display:block;';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.cssText = 'overflow:hidden;height:100%;margin:0;padding:0;';
      document.body.style.cssText = 'overflow:hidden;height:100%;margin:0;padding:0;display:flex;';
    }
    return () => {
      document.documentElement.style.cssText = '';
      document.body.style.cssText = '';
    };
  }, [phase]);

  const moveSlider = (direction) => {
    if (animating) return;
    setAnimating(true);
    setSlideDir(direction);
    setItems((prev) => {
      const next = [...prev];
      if (direction === 'next') next.push(next.shift());
      else next.unshift(next.pop());
      return next;
    });
    setTimeout(() => { setAnimating(false); setSlideDir(''); }, 800);
  };

  /* ── FRONT ── */
  if (phase === 'front') {
    return (
      <div className="front-page">
        <div className="bank-card">
          <div className="bank-header">
            <h3>IEEE BANK</h3>
            <p>The Memories Vault</p>
          </div>
          <div className="bank-form">
            <div className="bank-input">
              <label style={{ color: isError ? '#ff4b2b' : '#14ff72' }}>
                {isError ? 'Invalid Passcode' : 'Enter Passcode'}
              </label>
              <input
                type="text"
                placeholder="e.g. WITHDRAW-MEMORIES"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startSequence()}
                autoComplete="off"
                spellCheck={false}
                style={{
                  borderColor: isError ? '#ff4b2b' : 'rgba(255,255,255,0.1)',
                  textTransform: 'uppercase', letterSpacing: '2px'
                }}
              />
              <p style={{ fontSize: '0.6rem', color: '#666', marginTop: '10px', textAlign: 'center' }}>
                Hint: Check the vault codes (e.g. FAREWELL2026)
              </p>
            </div>
            <motion.button
              className="withdraw-btn"
              animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: '#14ff72', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              onClick={startSequence}
            >
              Withdraw memories
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  /* ── LOADER ── */
  if (phase === 'loading' || phase === 'loading2') {
    return (
      <div className="loader-container">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="loader-text"
        >
          Farewell
        </motion.div>
        <div className="loader-bar" />
      </div>
    );
  }

  /* ── CALENDAR ── */
  if (phase === 'calendar' || phase === 'animate' || phase === 'zoom') {
    return (
      <div style={{
        width: '100vw', height: '100vh', overflow: 'hidden',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: '#000', position: 'relative'
      }}>
        <div style={{ width: '100%', height: '100%', zIndex: 10 }}>
          <Calendar phase={phase} />
        </div>
        <AnimatePresence>
          {phase === 'zoom' && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute', inset: 0, background: '#fff',
                zIndex: 999999, pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── SLIDER ── */
  if (phase === 'slider') {
    return (
      <motion.div
        className={`slider ${slideDir}`}
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'fixed', inset: 0, zIndex: 10 }}
      >
        <div className="list">
          {items.map((item, index) => (
            <div key={item.id} className="item" style={{ zIndex: items.length - index }}>
              <img src={item.img} alt={item.type} />
              <div className="content">
                <div className="title">{item.title}</div>
                <div className="type">{item.type}</div>
                <div className="description">{item.desc}</div>
                <div className="button">
                  <button onClick={() => setPhase('parallax')}>ENTER FAREWELL</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail">
          {items.map((item) => (
            <div key={item.id} className="item">
              <img src={item.img} alt="" />
            </div>
          ))}
        </div>

        <div className="nextPrevArrows">
          <button className="prev" onClick={() => moveSlider('prev')}>{'<'}</button>
          <button className="next" onClick={() => moveSlider('next')}>{'>'}</button>
        </div>
      </motion.div>
    );
  }

  /* ── PARALLAX ──
     Plain block container. Window scroll is the driver.
  ── */
  if (phase === 'parallax') {
    return (
      <div className="parallax-container">
        {initialItems.map((item) => (
          <ParallaxItem key={item.id} item={item} />
        ))}
        <ParallaxItem item="/image/img1.jpg" isFinal={true} />
      </div>
    );
  }

  return null;
}

export default App;