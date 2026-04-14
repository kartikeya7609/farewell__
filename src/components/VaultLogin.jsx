import React from 'react';
import { motion } from 'framer-motion';

const VaultLogin = ({ passcode, setPasscode, isError, startSequence }) => {
  return (
    <div className="front-page" style={{ background: 'var(--bg-dark)' }}>
      <div className="bank-card" style={{ background: 'var(--surface)', borderColor: 'var(--glass-border)' }}>
        <div className="bank-header">
          <h3 style={{ 
            background: 'linear-gradient(135deg, #fff 0%, var(--gold) 50%, #ffd700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '8px'
          }}>THE ETERNAL VAULT</h3>
          <p style={{ color: 'var(--accent-dim)', letterSpacing: '4px' }}>Legacy of IEEE Student Branch</p>
        </div>
        <div className="bank-form">
          <div className="bank-input">
            <label style={{ color: isError ? '#ff4b2b' : 'var(--accent)', fontSize: '0.65rem' }}>
              {isError ? 'Access Denied: Invalid Key' : 'Enter Secret Passcode'}
            </label>
            <input
              type="text"
              placeholder="e.g. MISSION-COMPLETE"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startSequence()}
              autoComplete="off"
              spellCheck={false}
              style={{
                borderColor: isError ? '#ff4b2b' : 'var(--glass-border)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-primary)',
                textTransform: 'uppercase', 
                letterSpacing: '3px',
                fontSize: '0.9rem'
              }}
            />
            <p style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '12px', textAlign: 'center', fontStyle: 'italic' }}>
              Only those with the key may witness the memories.
            </p>
          </div>
          <motion.button
            className="withdraw-btn"
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02, backgroundColor: 'var(--accent)', color: '#001' }}
            whileTap={{ scale: 0.98 }}
            onClick={startSequence}
            style={{
               background: 'var(--accent-trace)',
               border: '1px solid var(--accent-dim)',
               color: 'var(--accent)',
               letterSpacing: '4px',
               fontWeight: '500'
            }}
          >
            UNLOCK MEMORIES
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VaultLogin;
