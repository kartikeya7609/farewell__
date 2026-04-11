import React from 'react';
import { motion } from 'framer-motion';

const VaultLogin = ({ passcode, setPasscode, isError, startSequence }) => {
  return (
    <div className="front-page">
      <div className="bank-card">
        <div className="bank-header">
          <h3 style={{ color: '#1a237e' }}>IEEE BANK</h3>
          <p style={{ color: 'var(--accent-dim)' }}>The Memories Vault</p>
        </div>
        <div className="bank-form">
          <div className="bank-input">
            <label style={{ color: isError ? '#ff4b2b' : 'var(--accent)' }}>
              {isError ? 'Invalid Passcode' : 'Enter Passcode'}
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
                borderColor: isError ? '#ff4b2b' : 'rgba(201,184,150,0.2)',
                background: 'rgba(201,184,150,0.03)',
                color: 'var(--accent)',
                textTransform: 'uppercase', letterSpacing: '2px'
              }}
            />
            <p style={{ fontSize: '0.6rem', color: 'var(--accent-trace)', marginTop: '10px', textAlign: 'center' }}>
              The vault is sealed. Enter the secret code.
            </p>
          </div>
          <motion.button
            className="withdraw-btn"
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02, backgroundColor: 'var(--accent)', color: '#000' }}
            whileTap={{ scale: 0.98 }}
            onClick={startSequence}
            style={{
               background: 'var(--accent-trace)',
               border: '1px solid var(--accent-dim)',
               color: 'var(--accent)',
               letterSpacing: '5px'
            }}
          >
            ENTER THE VAULT
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default VaultLogin;
