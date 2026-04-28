import React from 'react';
import { motion } from 'framer-motion';

const VaultLogin = ({ passcode, setPasscode, isError, startSequence }) => {
  return (
    <div className="front-page">
      <div className="bank-card">
        <div className="bank-header">
          <h3>THE ETERNAL VAULT</h3>
          <p>Legacy of IEEE Student Branch</p>
        </div>
        <div className="bank-form">
          <div className="bank-input" style={{ marginTop: '20px' }}>
            <label style={{
              color: isError ? '#ff4b2b' : 'var(--accent)',
              fontSize: '0.65rem',
              textShadow: isError ? '0 0 10px rgba(255, 75, 43, 0.3)' : 'none'
            }}>
              {isError ? 'Access Denied: Invalid Key' : 'Enter Secret Passcode'}
            </label>
            <input
              type="text"
              placeholder="e.g. FAREWELL2026"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startSequence()}
              autoComplete="off"
              spellCheck={false}
              style={{
                boxShadow: isError ? 'inset 6px 6px 12px #001227, inset -4px -4px 10px rgba(255, 75, 43, 0.2)' : undefined
              }}
            />
            <p style={{ fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '20px', textAlign: 'center', fontStyle: 'italic', letterSpacing: '1px' }}>
              Only those with the key may witness the memories.
            </p>
          </div>
          <motion.button
            className="withdraw-btn"
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startSequence}
          >
            UNLOCK MEMORIES
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VaultLogin;
