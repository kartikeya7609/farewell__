// main layout exists here
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CalendarGrid from './CalendarGrid';
import { useCalendar } from '../hooks/useCalendar';

const _imgModules = import.meta.glob('../assets/*.jpg', {
  eager: true,
  import: 'default'
});

const MONTH_IMAGES = Object.entries(_imgModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10);
    const numB = parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10);
    return numA - numB;
  })
  .map(([, mod]) => mod);

export default function Calendar({ phase }) {
  const {
    currentDate,
    selectionStart,
    selectionEnd,
    hoverDate,
    changeMonth,
    handleDayClick,
    handleDayHover,
    clearHover,
    animationClass,
    allNotes,
    eventsArr,
    jumpToToday,
    gotoDate
  } = useCalendar();

  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset loading state when the month changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentDate]);

  const monthImage =
    MONTH_IMAGES[currentDate.getMonth() % (MONTH_IMAGES.length || 1)];

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        
        {/* Left/Top Part: Image Section */}
        <div className="calendar-photo-section">
          <div className="image-inset">
            <div className="image-overlay"></div>
            {isImageLoading && <div className="image-loader-sheen"></div>}

            <div
              className={`hero-image ${animationClass} ${isImageLoading ? 'image-blur' : 'image-clear'}`}
              style={{
                backgroundImage: monthImage ? `url(${monthImage})` : 'none',
                opacity: isImageLoading ? 0.8 : 1,
              }}
            >
              {!isImageLoading && monthImage && (
                <img
                  src={monthImage}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <img
                src={monthImage}
                style={{ display: 'none' }}
                onLoad={() => setIsImageLoading(false)}
                alt=""
              />
            </div>

            <div className={`month-hero-title ${animationClass}`}>
              {format(currentDate, 'MMMM')}
            </div>
          </div>
        </div>

        {/* Right/Bottom Part: Grid Section */}
        <div className="calendar-grid-section">
          <CalendarGrid
            phase={phase}
            currentDate={currentDate}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={handleDayHover}
            onMouseLeaveGrid={clearHover}
            onPrevMonth={() => changeMonth('prev')}
            onNextMonth={() => changeMonth('next')}
            animationClass={animationClass}
            allNotes={allNotes}
            eventsArr={eventsArr}
            onGotoDate={gotoDate}
            onJumpToday={jumpToToday}
          />
        </div>
      </div>
    </div>
  );
}

