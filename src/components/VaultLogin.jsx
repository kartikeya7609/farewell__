import React from 'react';
import { motion } from 'framer-motion';

const VaultLogin = ({ passcode, setPasscode, isError, startSequence }) => {
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
};

export default VaultLogin;
