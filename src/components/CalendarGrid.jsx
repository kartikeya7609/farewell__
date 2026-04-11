import React from 'react';
import { format } from 'date-fns';
import { getDaysInView } from '../utils/dateUtils';
import DateCell from './DateCell';

export default function CalendarGrid({ 
  phase,
  currentDate, 
  selectionStart, 
  selectionEnd, 
  hoverDate,
  onDayClick,
  onDayHover,
  onMouseLeaveGrid,
  onPrevMonth,
  onNextMonth,
  animationClass,
  allNotes,
  eventsArr
}) {
  const daysInView = getDaysInView(currentDate);

  return (
    <>
      <div className="calendar-header">
        <button className="nav-btn" onClick={onPrevMonth} aria-label="Previous Month">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="current-month-year">{format(currentDate, 'MMMM yyyy')}</h1>
        <button className="nav-btn" onClick={onNextMonth} aria-label="Next Month">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className={`calendar-grid ${animationClass}`}>
        <div className="weekdays">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div className="days" onMouseLeave={onMouseLeaveGrid}>
          {daysInView.map((dayInfo, index) => (
            <DateCell 
              key={index}
              phase={phase}
              dayInfo={dayInfo}
              selectionStart={selectionStart}
              selectionEnd={selectionEnd}
              hoverDate={hoverDate}
              onClick={onDayClick}
              onHover={onDayHover}
              allNotes={allNotes}
              eventsArr={eventsArr}
            />
          ))}
        </div>
      </div>
    </>
  );
}
