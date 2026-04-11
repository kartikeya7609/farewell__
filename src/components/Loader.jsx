import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="loader-text"
      >
        Farewell
      </motion.div>
      <div className="loader-bar" />
    </div>
  );
};

export default Loader;
