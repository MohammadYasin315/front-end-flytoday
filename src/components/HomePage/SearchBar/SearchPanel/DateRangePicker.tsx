import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "./Date-Range-Picker.module.css";

interface DateRangePickerProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  startDate?: Date | null;
  endDate?: Date | null;
}

interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export default function DateRangePicker({
  onDateSelect,
  placeholder = "Select dates",
  isOpen,
  onToggle,
  startDate: propStartDate,
  endDate: propEndDate,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    propStartDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(propEndDate || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when props change
  useEffect(() => {
    setStartDate(propStartDate || null);
    setEndDate(propEndDate || null);
  }, [propStartDate, propEndDate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onToggle]);

  const generateCalendarDates = (month: Date): CalendarDate[] => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const dates: CalendarDate[] = [];

    // Add previous month's trailing dates
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, monthIndex, -i);
      dates.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isInRange: false,
        isStart: false,
        isEnd: false,
      });
    }

    // Add current month's dates
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, monthIndex, day);
      const isStart =
        startDate && date.toDateString() === startDate.toDateString();
      const isEnd = endDate && date.toDateString() === endDate.toDateString();
      const isInRange =
        startDate && endDate && date > startDate && date < endDate;

      dates.push({
        date,
        isCurrentMonth: true,
        isSelected: !!isStart || !!isEnd,
        isInRange: !!isInRange,
        isStart: !!isStart,
        isEnd: !!isEnd,
      });
    }

    // Add next month's leading dates to complete the grid
    const remainingCells = 42 - dates.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, monthIndex + 1, day);
      dates.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isInRange: false,
        isStart: false,
        isEnd: false,
      });
    }

    return dates;
  };

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow selection of past dates
    if (date < today) {
      return;
    }

    if (selectingStart || !startDate) {
      setStartDate(date);
      setEndDate(null);
      setSelectingStart(false);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
        setSelectingStart(true);
      }
    }
  };

  const handleConfirm = () => {
    onDateSelect?.(startDate, endDate);
    onToggle();
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setStartDate(today);
    setEndDate(null);
    setSelectingStart(false);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        const today = new Date();
        const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
        // Don't allow navigation to months before current month
        if (
          prevMonth.getFullYear() < today.getFullYear() ||
          (prevMonth.getFullYear() === today.getFullYear() &&
            prevMonth.getMonth() < today.getMonth())
        ) {
          return prev; // Don't change month
        }
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonthDates = generateCalendarDates(currentMonth);
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );
  const nextMonthDates = generateCalendarDates(nextMonth);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigateMonth("prev")}
          >
            <ChevronRightIcon className={styles.navIcon} />
          </button>

          <div className={styles.monthsContainer}>
            <div className={styles.monthHeader}>
              <h3 className={styles.monthTitle}>
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>
            </div>
            <div className={styles.monthHeader}>
              <h3 className={styles.monthTitle}>
                {monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}
              </h3>
            </div>
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigateMonth("next")}
          >
            <ChevronLeftIcon className={styles.navIcon} />
          </button>
        </div>

        <div className={styles.calendarsGrid}>
          {/* Current Month Calendar */}
          <div className={styles.calendar}>
            <div className={styles.dayHeaders}>
              {dayNames.map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>
            <div className={styles.datesGrid}>
              {currentMonthDates.map((dateObj, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPastDate = dateObj.date < today;

                return (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dateButton} 
                      ${!dateObj.isCurrentMonth ? styles.otherMonth : ""} 
                      ${dateObj.isSelected ? styles.selected : ""} 
                      ${dateObj.isInRange ? styles.inRange : ""}
                      ${dateObj.isStart ? styles.rangeStart : ""}
                      ${dateObj.isEnd ? styles.rangeEnd : ""}`}
                    onClick={() => handleDateClick(dateObj.date)}
                    disabled={!dateObj.isCurrentMonth || isPastDate}
                  >
                    {dateObj.date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Month Calendar */}
          <div className={styles.calendar}>
            <div className={styles.dayHeaders}>
              {dayNames.map((day) => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>
            <div className={styles.datesGrid}>
              {nextMonthDates.map((dateObj, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPastDate = dateObj.date < today;

                return (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dateButton} 
                      ${!dateObj.isCurrentMonth ? styles.otherMonth : ""} 
                      ${dateObj.isSelected ? styles.selected : ""} 
                      ${dateObj.isInRange ? styles.inRange : ""}
                      ${dateObj.isStart ? styles.rangeStart : ""}
                      ${dateObj.isEnd ? styles.rangeEnd : ""}`}
                    onClick={() => handleDateClick(dateObj.date)}
                    disabled={!dateObj.isCurrentMonth || isPastDate}
                  >
                    {dateObj.date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.calendarFooter}>
          <button
            type="button"
            className={styles.todayButton}
            onClick={handleGoToToday}
          >
           رفتن به امروز
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={!startDate}
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}
