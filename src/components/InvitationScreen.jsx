import React from 'react';
import { motion } from 'framer-motion';
import imgBg from '../../image/img4.jpg';
import FarewellTimeline from './FarewellTimeline';

const InvitationScreen = ({ setPhase }) => {
  // Animation Variants for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const lineReveal = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 1.2, ease: "easeInOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'var(--bg-dark)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        .inv-btn {
          display: block;
          width: 100%;
          padding: 18px 24px;
          background: transparent;
          border: 1px solid rgba(158,143,115,0.15);
          color: var(--accent-dim);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 16px;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .inv-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(158,143,115,0.1), transparent);
          transition: 0.5s;
        }

        .inv-btn:hover::before { left: 100%; }

        .inv-btn:hover {
          border-color: var(--gold);
          padding-left: 32px;
          color: #fff;
          background: rgba(158,143,115,0.05);
        }

        .inv-btn-primary { background: rgba(158,143,115,0.08); border-color: rgba(158,143,115,0.4); }

        @keyframes subtleZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.1); }
        }

        @media (max-width: 900px) {
          .inv-layout { flex-direction: column !important; }
          .inv-right-panel { width: 100% !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.05) !important; }
          .inv-left-panel { padding: 40px 24px !important; }
        }
      `}</style>

      {/* --- Background with Ken Burns Effect --- */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
        backgroundImage: `url(${imgBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        filter: 'grayscale(100%) contrast(1.2)',
        animation: 'subtleZoom 20s infinite alternate ease-in-out',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Main Layout (The Invitation Hub) */}
      <div className="inv-layout" style={{ display: 'flex', width: '100%', minHeight: '100vh', zIndex: 3, position: 'relative' }}>

        {/* LEFT PANEL */}
        <div className="inv-left-panel" style={{
          flex: 1, padding: '80px 60px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderRight: '1px solid rgba(255,255,255,0.05)'
        }}>

          <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 30 }}>
            <motion.div variants={lineReveal} style={{ height: '1px', background: 'var(--accent)' }} />
            <span style={{ fontSize: 10, letterSpacing: 5, color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              IEEE · NIT Durgapur · 2026
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 400, color: '#fff', lineHeight: 1.1, margin: 0
            }}>
              Celebrating the<br />
              <motion.span
                style={{ color: 'var(--gold)', fontStyle: 'italic', display: 'inline-block' }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Journey of Excellence
              </motion.span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem', color: 'rgba(201,184,150,0.7)',
            fontStyle: 'italic', margin: '15px 0 40px'
          }}>
            An evening of memories & celebration
          </motion.p>

          <motion.div variants={itemVariants} style={{ position: 'relative', paddingLeft: 25, margin: '40px 0' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{ position: 'absolute', left: 0, top: 0, width: '2px', background: 'var(--gold)', opacity: 0.5 }}
            />
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.35rem', fontStyle: 'italic', color: '#f0ebe0',
              lineHeight: 1.6, margin: 0, fontWeight: 300
            }}>
              "Don't cry because it's over —<br />
              smile because it happened."
            </blockquote>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 60, marginTop: 20 }}>
            <div>
              <p style={{ fontSize: 8, letterSpacing: 3, color: '#9e8f73', textTransform: 'uppercase', marginBottom: 8 }}>Hosted by</p>
              <p style={{ fontSize: 13, color: 'var(--accent-dim)', fontWeight: 300 }}>IEEE Student Branch</p>
            </div>
            <div>
              <p style={{ fontSize: 8, letterSpacing: 3, color: '#9e8f73', textTransform: 'uppercase', marginBottom: 8 }}>Occasion</p>
              <p style={{ fontSize: 13, color: 'var(--accent-dim)', fontWeight: 300 }}>Farewell 2025 – 26</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          className="inv-right-panel"
          variants={itemVariants}
          style={{
            width: 350, background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '80px 45px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center'
          }}
        >
          <motion.p variants={itemVariants} style={{ fontSize: 9, letterSpacing: 5, color: '#9e8f73', textTransform: 'uppercase', marginBottom: 35 }}>
            Explore the Vault
          </motion.p>

          <button className="inv-btn inv-btn-primary" onClick={() => setPhase('invitation_card')}>
            Invitation Card
          </button>

          <button className="inv-btn" onClick={() => setPhase('slider')}>
            Memories
          </button>

          <motion.div
            variants={itemVariants}
            style={{ marginTop: 50, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 30 }}
          >
            <p style={{ fontSize: 10, letterSpacing: 3, color: 'var(--accent)', textTransform: 'uppercase', lineHeight: 1.8 }}>
              The journey ends here,<br />
              but the memories remain.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* NEW CONTENT SECTION */}
      <FarewellTimeline />

      {/* Scroll Down Hint */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '90vh', left: '50%', transform: 'translateX(-50%)',
          zIndex: 4, textAlign: 'center', pointerEvents: 'none'
        }}
      >
        <p style={{ fontSize: 8, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Scroll Down</p>
        <div style={{ width: '1px', height: '30px', background: 'var(--gold)', margin: '10px auto', opacity: 0.2 }} />
      </motion.div>

    </motion.div>
  );
};

export default InvitationScreen;