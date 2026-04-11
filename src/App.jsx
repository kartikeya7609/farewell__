import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

// Components
import Calendar from './components/Calendar';
import VaultLogin from './components/VaultLogin';
import Loader from './components/Loader';
import ImageSlider from './components/ImageSlider';
import InvitationScreen from './components/InvitationScreen';

// Styles
import './styles/calendar.css';

const initialItems = [
  { id: 1, img: '/image/img1.jpg', title: 'Farewell', type: 'FLOWER', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 2, img: '/image/img2.jpg', title: 'Farewell', type: 'NATURE', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 3, img: '/image/img4.jpg', title: 'Farewell', type: 'PLANT', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
  { id: 4, img: '/image/img3.jpg', title: 'Farewell', type: 'NATURE', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio.' },
];

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

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
    await wait(1250);
    setPhase('calendar');
    await wait(1400);
    setPhase('animate');
    await wait(1250);
    setPhase('zoom');
    await wait(1000);
    setPhase('loading2');
    await wait(1000);
    setPhase('parallax');
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

  useEffect(() => {
    // ── Phase-based Scroll Control ───────────────────────────
    if (phase === 'parallax') {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.display = "block";
    } else {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (['calendar', 'zoom', 'animate'].includes(phase)) {
        document.body.style.display = "block";
      } else {
        document.body.style.display = "flex";
      }
    }

    if (phase === 'slider') {
      const triggerParallax = (e) => {
        if (e.deltaY > 30 || (e.type === 'touchmove' && window.scrollY > 20)) {
          setPhase('parallax');
        }
      };
      window.addEventListener('wheel', triggerParallax, { passive: true });
      window.addEventListener('touchmove', triggerParallax, { passive: true });
      return () => {
        window.removeEventListener('wheel', triggerParallax);
        window.removeEventListener('touchmove', triggerParallax);
      };
    }
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

  // ── Render Phases ──
  if (phase === 'front') {
    return (
      <VaultLogin
        passcode={passcode}
        setPasscode={setPasscode}
        isError={isError}
        startSequence={startSequence}
      />
    );
  }

  if (phase === 'loading' || phase === 'loading2') {
    return <Loader />;
  }

  if (['calendar', 'animate', 'zoom'].includes(phase)) {
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

  if (phase === 'slider') {
    return (
      <ImageSlider
        items={items}
        slideDir={slideDir}
        moveSlider={moveSlider}
      />
    );
  }

  if (phase === 'parallax') {
    return <InvitationScreen setPhase={setPhase} />;
  }

  return null;
}

export default App;