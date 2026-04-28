import React from 'react';
import { motion } from 'framer-motion';

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(212,175,55,0.4))' }}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(212,175,55,0.4))' }}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(212,175,55,0.4))' }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(212,175,55,0.4))' }}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);

const FarewellTimeline = () => {
  const achievements = [
    { year: '2022', title: 'The Foundation', desc: 'Starting the journey at NIT Durgapur, building bonds that last a lifetime.', icon: <GraduationCapIcon /> },
    { year: '2023', title: 'Growth & Innovation', desc: 'Leading technical workshops, IEEE fests, and sleepless hackathon nights.', icon: <LightbulbIcon /> },
    { year: '2024', title: 'Excellence Achieved', desc: 'Leading the student branch to new heights.', icon: <TrophyIcon /> },
    { year: '2025', title: 'The Legacy', desc: 'Preparing to step into the world, leaving behind a trail of inspiration.', icon: <SparklesIcon /> },
  ];

  return (
    <div className="farewell-container">
      <style>{`
        .farewell-container {
          width: 100%;
          background: var(--bg-dark);
          padding: 100px 20px;
          position: relative;
          color: #fff;
        }
        .timeline-wrapper {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--gold-dim), var(--gold-dim), transparent);
          opacity: 0.3;
        }
        .timeline-item {
          display: flex;
          width: 100%;
          margin-bottom: 80px;
          position: relative;
        }
        .timeline-item.left { justify-content: flex-end; }
        .timeline-item.right { justify-content: flex-start; }
        
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 20px;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          background: var(--gold);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--gold);
          z-index: 2;
        }
        .timeline-content {
          width: 45%;
          padding: 30px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(212,175,55,0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }
        .timeline-item.left .timeline-content { text-align: right; }
        .timeline-item.right .timeline-content { text-align: left; }

        .event-details-card {
          max-width: 800px;
          margin: 150px auto 100px;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 4px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .details-grid {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-bottom: 50px;
        }

        @media (max-width: 800px) {
          .timeline-line { left: 30px; transform: none; }
          .timeline-dot { left: 30px; transform: translateX(-50%); }
          .timeline-item { justify-content: flex-start !important; padding-left: 60px; margin-bottom: 50px; }
          .timeline-content { width: 100%; text-align: left !important; padding: 20px; }
          .event-details-card { padding: 40px 20px; margin-top: 80px; }
          .details-grid { flex-direction: column; gap: 30px; }
          .details-divider { display: none; }
          .event-details-card h2 { font-size: 2rem !important; }
        }
      `}</style>

      {/* SECTION 1: THE TIMELINE */}
      <div className="timeline-wrapper">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--gold)',
            textAlign: 'center',
            marginBottom: '80px',
            letterSpacing: '2px'
          }}
        >
          A Legacy in Motion
        </motion.h2>

        <div style={{ position: 'relative' }}>
          <div className="timeline-line" />

          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}>{item.icon}</span>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: '10px 0', fontFamily: "'Playfair Display', serif" }}>{item.year}: {item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 2: EVENT DETAILS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="event-details-card"
      >
        <div style={{ position: 'absolute', top: 20, left: 20, width: 30, height: 30, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 30, height: 30, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', opacity: 0.5 }} />

        <p style={{ letterSpacing: '8px', color: 'var(--gold)', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '30px' }}>Save The Date</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#fff', marginBottom: '40px' }}>
          FAREWELL - 2026
        </h2>

        <div className="details-grid">
          <div>
            <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '5px' }}>WHEN</p>
            <p style={{ color: '#fff', fontSize: '1.2rem' }}>APRIL 30TH, 2026</p>
          </div>
          <div className="details-divider" style={{ width: '1px', background: 'rgba(212,175,55,0.3)' }} />
          <div>
            <p style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '5px' }}>WHERE</p>
            <p style={{ color: '#fff', fontSize: '1.2rem' }}>YAMAS</p>
          </div>
        </div>

      </motion.div>

      {/* SECTION 3: HEARTFELT QUOTE */}
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            fontStyle: 'italic',
            color: '#fff',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}
        >
          "Engineering taught us the laws of physics, but IEEE taught us the laws of friendship and the power of connection."
        </motion.p>
      </div>

    </div>
  );
};

export default FarewellTimeline;
