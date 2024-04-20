"use client";

import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface WeekDaySelectorProps {
  onDayChange: (selectedDay: string) => void;
}

const getCurrentWeekDays = (weekOffset = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + 7 * weekOffset);
  const first = now.getDate() - now.getDay();
  const days = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(now);
    day.setDate(first + index);
    return day;
  });
  return days;
};

const WeekDaySelector: React.FC<WeekDaySelectorProps> = ({ onDayChange }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().toDateString());
  const weekDays = getCurrentWeekDays(weekOffset);

  useEffect(() => {
    setCurrentDay(new Date().toDateString());
  }, [weekOffset]);

  const handlePrevWeek = () => {
    setWeekOffset(weekOffset - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset(weekOffset + 1);
  };

  const selectDay = (day: Date) => {
    const selectedDay = day.toDateString();
    setCurrentDay(selectedDay);
    if (onDayChange) {
      onDayChange(selectedDay);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrevWeek}
        className="p-4 rounded-full active:bg-slate-200 transition-colors"
      >
        <FaChevronLeft />
      </button>
      <div className="w-fit p-2 bg-slate-100 flex justify-center items-center gap-4 rounded-full">
        {weekDays.map((day) => {
          const isActiveDay = day.toDateString() === currentDay;
          return (
            <a
              key={day.getTime()}
              className={`h-12 w-12 cursor-pointer ${
                isActiveDay ? "bg-primary text-white" : "bg-slate-200"
              } rounded-full flex flex-col justify-center items-center text-sm transition-colors`}
              onClick={() => selectDay(day)}
            >
              <span>
                {day
                  .toLocaleString("default", { weekday: "short" })
                  .slice(0, 1)
                  .toUpperCase()}
              </span>
              <span>{day.getDate()}</span>
            </a>
          );
        })}
      </div>
      <button
        onClick={handleNextWeek}
        className="p-4 rounded-full active:bg-slate-200 transition-colors"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default WeekDaySelector;
