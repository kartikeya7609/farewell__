import React from 'react';
import { motion } from 'framer-motion';

const ImageSlider = ({ items, slideDir, moveSlider }) => {
  // Since items are reordered in App.jsx, the active one is always items[0]
  // We need to keep track of the REAL index for the counter
  // However, items[0].id can help us identify which one it is
  
  return (
    <motion.div
      className={`slider ${slideDir}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="slide-logo">Collection</div>

      <div className="slide-counter">
        <span className="counter-current">
          {String(items[0].id).padStart(2, '0')}
        </span>
        <span style={{ margin: '0 4px', opacity: 0.3 }}>/</span>
        <span>{String(items.length).padStart(2, '0')}</span>
      </div>

      <div className="list">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="item" 
            style={{ 
              zIndex: items.length - index,
              transitionDelay: index === 0 ? '0s' : '0.1s' 
            }}
          >
            <img src={item.img} alt={item.type} />
            <div className="content">
              <div className="title">Farewell</div>
              
              <div className="scroll-down-hint">
                <span>↓</span>
                <span>Scroll to enter</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {items.map((item, index) => (
          <div key={item.id} className="item" onClick={() => {
            // If they click a thumbnail, we just move next until it becomes active?
            // Or better, since we don't have a direct "goTo" in App.jsx, we just let them view
            if (index !== 0) moveSlider('next');
          }}>
            <img src={item.img} alt="" />
          </div>
        ))}
      </div>

      <div className="nextPrevArrows">
        <button className="prev" onClick={() => moveSlider('prev')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button className="next" onClick={() => moveSlider('next')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6 6-6" transform="rotate(180 12 12)"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ImageSlider;
