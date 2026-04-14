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

  // ── Target Logic (moved up to avoid TDZ) ─────────────────────
  const isTarget = Number(dayNum) === 30 && isCurrentMonth;
  const notesKey = `date_${format(dateObj, 'yyyy-MM-dd')}`;
  const cellNote = allNotes?.[notesKey];
  const hasNote = cellNote && cellNote.trim() !== '';

  const d = dateObj.getDate();
  const m = dateObj.getMonth() + 1;
  const y = dateObj.getFullYear();
  const todaysEvObj = (eventsArr || []).find(e => e.day === d && e.month === m && e.year === y);
  const eventCount = todaysEvObj ? todaysEvObj.events.length : 0;
  const hasEvents = eventCount > 0;

  useEffect(() => {
    if (phase === "zoom" && cellRef.current && isTarget) {
      const rect = cellRef.current.getBoundingClientRect();
      
      // Find the center of the specific DateCell
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      
      // Find the center of the screen
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight / 2;

      setCenterOffset({
        x: targetX - elCenterX,
        y: targetY - elCenterY
      });
    } else if (phase !== "zoom") {
      setCenterOffset({ x: 0, y: 0 });
    }
  }, [phase, isTarget]);

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
            ? { 
                x: centerOffset.x, 
                y: centerOffset.y,
                // Morph into a perfect sphere as we zoom
                borderRadius: ["10px", "50%", "50%"],
                scale: [1, 1.5, 5, 80],
                rotate: [0, 0, 2],
                zIndex: 99999,
                background: "var(--accent-gold)",
                boxShadow: "0 0 100px rgba(255, 215, 0, 0.6)",
              }
            : phase === "animate"
              ? { 
                  scale: [1, 1.3, 1], 
                  boxShadow: ["0 0 5px #d32f2f", "0 0 30px #d32f2f", "0 0 10px #d32f2f"],
                  borderRadius: "10px",
                  x: 0, y: 0 
                }
              : { scale: 1, x: 0, y: 0, borderRadius: "10px", background: "var(--paper-bg)" }
          : {}
      }
      transition={
        isTarget && phase === "zoom"
          ? {
              x: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
              y: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
              scale: { 
                times: [0, 0.3, 0.6, 1],
                duration: 1.1, 
                ease: "easeInOut" 
              },
              borderRadius: { duration: 0.3 },
              background: { duration: 0.4 }
            }
          : isTarget && phase === "animate"
            ? { scale: { duration: 0.3, repeat: 1 }, boxShadow: { duration: 0.6 } }
            : { duration: 0.2 }
      }
      style={isTarget ? { 
        position: 'relative', 
        zIndex: (phase === "zoom" || phase === "animate") ? 1000 : 1, 
        transformOrigin: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      } : {}}
    >
      {/* Background Dim Spotlight */}
      <AnimatePresence>
        {isTarget && (phase === "animate" || phase === "zoom") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "500vw", height: "500vh",
              transform: "translate(-50%, -50%)",
              background: phase === "zoom" 
                ? "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.95) 15%, #000 40%)"
                : "radial-gradient(circle at center, transparent 60px, rgba(0,0,0,0.8) 120px, rgba(0,0,0,0.9) 200px, rgba(0,0,0,0.9) 100%)",
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
              stroke="var(--accent-gold)"
              strokeWidth="4"
              fill="transparent"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))' }}
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
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "60px", height: "60px",
              marginTop: "-30px", marginLeft: "-30px",
              border: "2px solid var(--accent-gold)", borderRadius: "50%",
              pointerEvents: "none", zIndex: 10,
              boxShadow: "0 0 10px var(--accent-gold)"
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
                transition={{ duration: 0.5, delay: p.delay / 2, ease: "easeIn" }}
                style={{
                  position: 'absolute', top: '-4px', left: '-4px',
                  width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
                  background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {holidayEmoji && <span className="holiday-marker">{holidayEmoji}</span>}
      
      <motion.span 
        className="date-num"
        animate={isTarget && phase === "zoom" ? {
          scale: [1, 1.2, 5, 20],
          opacity: [1, 1, 0.8, 0],
          color: "#fff"
        } : {}}
        transition={isTarget && phase === "zoom" ? {
          duration: 1.1,
          times: [0, 0.3, 0.6, 1],
          ease: "easeInOut"
        } : {}}
      >
        {dayNum}
      </motion.span>

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
