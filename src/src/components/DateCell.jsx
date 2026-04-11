import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { holidays } from '../utils/dateUtils';
import { motion, AnimatePresence } from 'framer-motion';

const LONG_PRESS_MS = 500; // ms before long-press fires

export default function DateCell({ 
  phase,
  dayInfo, 
  selectionStart, 
  selectionEnd, 
  hoverDate, 
  onClick, 
  onHover,
  onRightClick,
  allNotes,
  eventsArr
}) {
  const { dateObj, timestamp, dayNum, isToday, isCurrentMonth } = dayInfo;
  
  const cellRef = useRef(null);
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (phase === "zoom" && cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight / 2;
      // We calculate exactly how many pixels to drift before scaling dominates
      setCenterOffset({ 
        x: targetX - elCenterX, 
        y: targetY - elCenterY 
      });
    } else {
      setCenterOffset({ x: 0, y: 0 });
    }
  }, [phase]);
  
  const particles = useMemo(() => {
    return [...Array(15)].map(() => ({
      rx: (Math.random() - 0.5) * 600,
      ry: (Math.random() - 0.5) * 600,
      delay: Math.random() * 0.4,
      size: Math.random() * 8 + 4
    }));
  }, []);
  
  const monthIndex = dateObj.getMonth();
  const dayOfMonth = dateObj.getDate();
  const holidayEmoji = holidays[`${monthIndex}-${dayOfMonth}`];

  // ── Long-press / double-click tracking ──────────────────────
  const longPressTimer = useRef(null);
  const touchStartPos = useRef(null);
  const didLongPress = useRef(false);

  const triggerSticky = useCallback((clientX, clientY) => {
    // If a range is fully selected, the long-press/right-click represents the whole range
    // Pass the cell's date — the hook itself reads selectionStart/End to build the range
    onRightClick(dateObj, clientX, clientY);
  }, [dateObj, onRightClick]);

  // Touch start → begin long-press countdown
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    didLongPress.current = false;

    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      // Vibrate for tactile feedback (most Android devices)
      if (navigator.vibrate) navigator.vibrate(60);
      // Provide visual pulse feedback via class
      triggerSticky(touch.clientX, touch.clientY);
    }, LONG_PRESS_MS);
  };

  // If finger moves too much, cancel long press
  const handleTouchMove = (e) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPos.current.x);
    const dy = Math.abs(touch.clientY - touchStartPos.current.y);
    if (dx > 8 || dy > 8) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current);
    touchStartPos.current = null;
  };

  // Double-click (for mouse users on mobile emulators / trackpads)
  const lastClickTime = useRef(0);
  const handleClick = (e) => {
    if (didLongPress.current) {
      didLongPress.current = false;
      return; // don't also fire click after long press
    }
    const now = Date.now();
    if (now - lastClickTime.current < 300) {
      // Double-click — open sticky
      triggerSticky(e.clientX, e.clientY);
      lastClickTime.current = 0;
    } else {
      lastClickTime.current = now;
      onClick(dateObj);
    }
  };

  // Desktop right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
    triggerSticky(e.clientX, e.clientY);
  };

  // ── Range class building ─────────────────────────────────────
  let classNames = ['day'];
  if (isToday) classNames.push('today');
  if (!isCurrentMonth) classNames.push('other-month');

  if (selectionStart) {
    const sTime = selectionStart.getTime();
    if (selectionEnd) {
      const eTime = selectionEnd.getTime();
      if (timestamp === sTime) classNames.push('range-start');
      if (timestamp === eTime) classNames.push('range-end');
      if (timestamp > sTime && timestamp < eTime) classNames.push('in-range');
    } else if (hoverDate) {
      const hTime = hoverDate.getTime();
      const minTime = Math.min(sTime, hTime);
      const maxTime = Math.max(sTime, hTime);
      if (timestamp === sTime) classNames.push(sTime === minTime ? 'range-start' : 'range-end');
      if (timestamp === hTime && timestamp !== sTime) classNames.push(hTime === maxTime ? 'range-hover-end' : 'range-hover-start');
      if (timestamp > minTime && timestamp < maxTime) classNames.push('in-hover-range');
    } else {
      if (timestamp === sTime) classNames.push('range-start');
    }
  }

  // ── Indicators ───────────────────────────────────────────────
  const notesKey = `date_${format(dateObj, 'yyyy-MM-dd')}`;
  const cellNote = allNotes?.[notesKey];
  const hasNote = cellNote && cellNote.trim() !== '';

  const d = dateObj.getDate();
  const m = dateObj.getMonth() + 1;
  const y = dateObj.getFullYear();
  const todaysEvObj = (eventsArr || []).find(e => e.day === d && e.month === m && e.year === y);
  const eventCount = todaysEvObj ? todaysEvObj.events.length : 0;
  const hasEvents = eventCount > 0;

  const isTarget = Number(dayNum) === 15 && isCurrentMonth;

  return (
    <motion.div 
      ref={cellRef}
      className={classNames.join(' ')} 
      onClick={handleClick}
      onMouseEnter={() => onHover(dateObj)}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      animate={
        isTarget
          ? phase === "zoom"
            ? { scale: 100, rotate: 5, x: centerOffset.x, y: centerOffset.y, zIndex: 99999, background: "#fff", boxShadow: "0 0 0px red" }
            : phase === "animate"
            ? { scale: [1, 1.3, 1], boxShadow: ["0 0 5px red", "0 0 20px red", "0 0 50px red"], x: 0, y: 0 }
            : { scale: 1, x: 0, y: 0 }
          : {}
      }
      transition={
        isTarget && phase === "animate"
          ? { scale: { duration: 0.6, repeat: 1 }, boxShadow: { duration: 1.2 } }
          : phase === "zoom"
          ? { duration: 2, ease: "easeIn" }
          : { duration: 0.4 }
      }
      style={isTarget ? { position: 'relative', zIndex: (phase === "zoom" || phase === "animate") ? 50 : 1, transformOrigin: 'center', background: phase === 'zoom' ? '#fff' : undefined } : {}}
    >
      {/* Background Dim Spotlight */}
      <AnimatePresence>
        {isTarget && (phase === "animate" || phase === "zoom") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "animate" ? 1 : 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "4000px", height: "4000px",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle at center, transparent 60px, rgba(0,0,0,0.8) 120px, rgba(0,0,0,0.9) 200px, rgba(0,0,0,0.9) 100%)",
              pointerEvents: "none",
              zIndex: -1
            }}
          />
        )}
      </AnimatePresence>

      {/* Circle animation via SVG inside AnimatePresence */}
      <AnimatePresence>
        {isTarget && phase === "animate" && (
          <svg 
            style={{ 
              position: 'absolute', top: '50%', left: '50%', 
              width: '100px', height: '100px', transform: 'translate(-50%, -50%)',
              zIndex: 100,
              pointerEvents: 'none'
            }}
          >
            <motion.circle
              cx="50" cy="50" r="30"
              stroke="#d32f2f"
              strokeWidth="4"
              fill="transparent"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(211, 47, 47, 0.8))' }}
            />
          </svg>
        )}
      </AnimatePresence>

      {/* Ripple Shockwave */}
      <AnimatePresence>
        {isTarget && phase === "animate" && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "60px", height: "60px",
              marginTop: "-30px", marginLeft: "-30px",
              border: "2px solid #d32f2f", borderRadius: "50%",
              pointerEvents: "none", zIndex: 10,
              boxShadow: "0 0 10px red"
            }}
          />
        )}
      </AnimatePresence>

      {/* Collapsing Particles inward */}
      <AnimatePresence>
        {isTarget && phase === "animate" && (
          <motion.div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: -1, pointerEvents: 'none' }}>
            {particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: p.rx, y: p.ry }}
                animate={{ opacity: [0, 1, 0], scale: [3, 1, 0], x: 0, y: 0 }}
                transition={{ duration: 1, delay: p.delay, ease: "easeIn" }}
                style={{
                  position: 'absolute', top: '-4px', left: '-4px',
                  width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
                  background: '#14ff72', boxShadow: '0 0 10px #14ff72'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {holidayEmoji && <span className="holiday-marker">{holidayEmoji}</span>}
      <span className="date-num">{dayNum}</span>

      {/* Emoji-only indicators */}
      {(hasNote || hasEvents) && (
        <div className="cell-indicators">
          {hasNote && <span className="cell-emoji" title={cellNote}>📝</span>}
          {hasEvents && (
            <span className="cell-emoji" title={`${eventCount} event${eventCount > 1 ? 's' : ''}`}>
              📌{eventCount > 1 && <sup>{eventCount}</sup>}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
