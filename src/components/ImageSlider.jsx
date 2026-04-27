import React from 'react';
import { motion } from 'framer-motion';

const ImageSlider = ({ items, slideDir, moveSlider }) => {
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
            <div className="img-container">
              <img src={item.img} alt="" className="bg-blur" />
              <img src={item.img} alt={item.type} className="main-img" />
            </div>
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
            if (index !== 0) moveSlider('next');
          }}>
            <img src={item.img} alt="" />
          </div>
        ))}
      </div>

      <div className="nextPrevArrows">
        <button className="prev" onClick={() => moveSlider('prev')} aria-label="Previous Slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="next" onClick={() => moveSlider('next')} aria-label="Next Slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ImageSlider;
