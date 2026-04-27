import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import invitationImg from '../assets/farewell invitation.png';

const InvitationCard = ({ setPhase }) => {
  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="invitation-wrapper"
    >
      <style>{`
        .invitation-wrapper {
          width: 100vw;
          height: 100vh;
          background: #050505;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          perspective: 1500px;
        }

        /* Gold Dust Particles */
        .particle {
          position: absolute;
          background: radial-gradient(circle, #d4af37 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        @keyframes goldDrift {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }

        .invitation-card-container {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 600px; /* Slimmer for elegant portrait look */
          aspect-ratio: 1 / 1.414; /* Standard A-series aspect ratio */
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .invitation-card-inner {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border-radius: 4px;
          box-shadow: 
            0 30px 60px -12px rgba(0,0,0,0.9),
            0 18px 36px -18px rgba(0,0,0,0.5),
            inset 0 0 0 1px rgba(212,175,55,0.2);
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .inv-img-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .inv-bg-blur {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(20px) brightness(0.3);
          transform: scale(1.1);
        }
        .inv-main-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          inset: 0;
          z-index: 1;
          display: block;
          transition: filter 0.5s ease;
        }

        .invitation-card-container:hover .inv-main-img {
          filter: contrast(1.1) saturate(1.1) brightness(1.1);
        }

        .back-btn {
          position: absolute;
          top: 40px;
          left: 40px;
          background: transparent;
          border: 1px solid rgba(212,175,55,0.3);
          color: #d4af37;
          padding: 12px 24px;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          cursor: pointer;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .back-btn:hover {
          background: #d4af37;
          color: #000;
          letter-spacing: 6px;
        }

        /* Ambient Lighting */
        .ambient-light {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,175,55,0.15) 0%, transparent 50%);
          z-index: 5;
          pointer-events: none;
        }
      `}</style>

      {/* Cinematic Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            bottom: '-5%',
            opacity: 0,
          }}
          animate={{
            y: [-20, -1000],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}

      {/* Back Button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ x: 5 }}
        onClick={() => setPhase('parallax')}
        className="back-btn"
      >
        ← THE HUB
      </motion.button>

      {/* 3D TILT CARD */}
      <motion.div
        className="invitation-card-container"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 50, opacity: 0, rotateX: "20deg" }}
        animate={{ y: 0, opacity: 1, rotateX: "0deg" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="invitation-card-inner">
          <div className="inv-img-container">
            <img src={invitationImg} alt="" className="inv-bg-blur" />
            <img src={invitationImg} alt="Farewell" className="inv-main-img" />
          </div>

          {/* Dynamic Light Reflection (Glare) */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.1) 50%, transparent 60%)',
              zIndex: 11,
              backgroundSize: '200% 200%',
            }}
            animate={{ backgroundPosition: ['200% 200%', '-200% -200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Bottom Text with revealing line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 5
        }}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          style={{ width: '1px', background: 'linear-gradient(to bottom, #d4af37, transparent)' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 2.2 }}
          style={{
            fontSize: '9px',
            letterSpacing: '8px',
            color: '#d4af37',
            textTransform: 'uppercase',
            marginTop: '20px'
          }}
        >
          MEMORIES FOR A LIFETIME
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default InvitationCard;