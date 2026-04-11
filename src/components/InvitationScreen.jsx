import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InvitationScreen = ({ setPhase }) => {
  const streakRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');

        .inv-btn {
          display: block;
          width: 100%;
          padding: 16px 24px;
          background: transparent;
          border: 0.5px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.4s ease;
          font-weight: 300;
          text-align: left;
          position: relative;
        }
        .inv-btn:hover {
          border-color: #9e8f73;
          color: #f0ebe0;
          background: rgba(158,143,115,0.08);
        }
        .inv-btn-primary {
          background: rgba(158,143,115,0.12);
          border-color: rgba(158,143,115,0.5);
          color: #c9b896;
        }
        .inv-btn-primary:hover {
          background: rgba(158,143,115,0.22);
          color: #f0ebe0;
        }
        .inv-btn-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9e8f73;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .inv-btn:hover .inv-btn-arrow { opacity: 1; }

        @keyframes streakMove {
          0%   { left: -60%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 40px rgba(201,184,150,0.08); }
          50%       { text-shadow: 0 0 80px rgba(201,184,150,0.18); }
        }

        @media (max-width: 700px) {
          .inv-layout { flex-direction: column !important; }
          .inv-right-panel { width: auto !important; border-left: none !important; border-top: 0.5px solid rgba(255,255,255,0.06) !important; }
          .inv-left-panel { padding: 48px 28px 32px !important; }
          .inv-right-panel { padding: 32px 28px 48px !important; }
        }
      `}</style>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.18,
        filter: 'saturate(0.35)',
      }} />

      {/* Animated top streak */}
      <div style={{
        position: 'absolute', top: 0, left: '-60%',
        width: '60%', height: '0.5px',
        background: 'linear-gradient(to right, transparent, rgba(158,143,115,0.5), transparent)',
        animation: 'streakMove 6s ease-in-out infinite',
        zIndex: 1,
      }} />

      {/* Corner accents */}
      {[
        { top: 24, left: 24, borderTop: '0.5px solid #9e8f73', borderLeft: '0.5px solid #9e8f73' },
        { bottom: 24, right: 24, borderBottom: '0.5px solid #9e8f73', borderRight: '0.5px solid #9e8f73' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 40, height: 40, opacity: 0.3, zIndex: 2, ...s }} />
      ))}

      {/* Main layout */}
      <div className="inv-layout" style={{ display: 'flex', width: '100%', position: 'relative', zIndex: 3 }}>

        {/* ── LEFT: Main content ── */}
        <motion.div
          className="inv-left-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px 64px',
            borderRight: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: 10, letterSpacing: 6, color: '#9e8f73',
              textTransform: 'uppercase', margin: '0 0 28px',
              fontWeight: 300,
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <span style={{ display: 'block', width: 32, height: '0.5px', background: '#9e8f73' }} />
            IEEE · NIT Durgapur · 2026
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0, ease: 'easeOut' }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 400,
              color: '#f0ebe0',
              lineHeight: 1.08,
              margin: '0 0 10px',
              letterSpacing: '-0.5px',
              animation: 'glowPulse 5s ease-in-out infinite',
            }}
          >
            Welcome to<br />
            <em style={{ color: '#c9b896', fontStyle: 'italic' }}>the Farewell</em>
          </motion.h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 300,
            letterSpacing: 1,
            margin: '0 0 48px',
            fontStyle: 'italic',
          }}>
            An evening of memories &amp; celebration
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{
              flex: 1, height: '0.5px',
              background: 'linear-gradient(to right, rgba(158,143,115,0.6), transparent)',
            }} />
            <div style={{ width: 5, height: 5, background: '#9e8f73', transform: 'rotate(45deg)' }} />
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.0 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'rgba(240,235,224,0.6)',
              lineHeight: 1.8,
              fontWeight: 300,
              margin: '0 0 48px',
              paddingLeft: 20,
              borderLeft: '1.5px solid rgba(158,143,115,0.4)',
            }}
          >
            "Don't cry because it's over —<br />
            smile because it happened."
          </motion.blockquote>

          {/* Meta */}
          <div>
            {[
              { label: 'Hosted by', value: 'IEEE Student Branch' },
              { label: 'Occasion', value: 'Farewell 2025 – 26' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontWeight: 300, margin: 0 }}>{label}</p>
                <p style={{ fontSize: 13, letterSpacing: 2, color: 'rgba(255,255,255,0.58)', fontWeight: 300, margin: '4px 0 0' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Bottom ornament */}
          <div style={{
            position: 'absolute', bottom: 40, left: 64,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(158,143,115,0.5)' }} />
            <div style={{ width: 48, height: '0.5px', background: 'rgba(158,143,115,0.3)' }} />
            <span style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(158,143,115,0.5)', textTransform: 'uppercase', fontWeight: 300 }}>
              Memories Vault
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: Buttons panel ── */}
        <motion.div
          className="inv-right-panel"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          style={{
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px 48px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p style={{
            fontSize: 9, letterSpacing: 5, color: '#9e8f73',
            textTransform: 'uppercase', fontWeight: 300, margin: '0 0 32px',
          }}>
            Continue to
          </p>

          <button className="inv-btn inv-btn-primary" onClick={() => setPhase('calendar')}>
            Invitation Card
            <span className="inv-btn-arrow">→</span>
          </button>

          <button className="inv-btn" onClick={() => setPhase('slider')}>
            Memories
            <span className="inv-btn-arrow">→</span>
          </button>

          <button className="inv-btn" onClick={() => setPhase('gallery')}>
            Gallery
            <span className="inv-btn-arrow">→</span>
          </button>

          <div style={{
            marginTop: 40,
            paddingTop: 32,
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{
              fontSize: 9, letterSpacing: 3,
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase', fontWeight: 300,
              lineHeight: 2.2, margin: 0,
            }}>
              The journey ends here,<br />
              but the memories remain.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default InvitationScreen;