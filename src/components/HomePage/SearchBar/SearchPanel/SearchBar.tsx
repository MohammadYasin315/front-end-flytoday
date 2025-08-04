import type React from "react";
import { useState, useRef, useCallback } from "react";
import {
  MapPinIcon,
  UserIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import styles from "./Search-Bar.module.css";
import LocationSearchDropdown from "./LocationSearchDropdown";
import GuestDropdown from "./GuestDropdown";
import DateRangePicker from "./DateRangePicker";

interface SearchBarProps {
  onSearch?: (data: SearchData) => void;
}

interface SearchData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

interface GuestData {
  adults: number;
  children: number;
  rooms: number;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestData, setGuestData] = useState<GuestData>({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const searchData: SearchData = {
        location: selectedLocation,
        checkIn: checkInDate ? checkInDate.toISOString().split("T")[0] : "",
        checkOut: checkOutDate ? checkOutDate.toISOString().split("T")[0] : "",
        guests: guestData.adults + guestData.children,
        rooms: guestData.rooms,
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSearch?.(searchData);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = useCallback((city: any) => {
    setSelectedLocation(city.city_name);
    setIsLocationDropdownOpen(false);
  }, []);

  const handleGuestSelect = useCallback((data: GuestData) => {
    setGuestData(data);
  }, []);

  const handleDateSelect = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      setCheckInDate(startDate);
      setCheckOutDate(endDate);
    },
    []
  );

  const toggleLocationDropdown = (e: React.MouseEvent) => {
    if (
      e.target === buttonRef.current ||
      buttonRef.current?.contains(e.target as Node)
    ) {
      const dropdown = buttonRef.current?.querySelector(
        `.${styles.dropdownInsideButton}`
      );
      if (!dropdown || !dropdown.contains(e.target as Node)) {
        setIsLocationDropdownOpen(!isLocationDropdownOpen);
        setIsGuestDropdownOpen(false);
        setIsDatePickerOpen(false);
      }
    }
  };

  const toggleGuestDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
    setIsLocationDropdownOpen(false);
    setIsDatePickerOpen(false);
  };

  const toggleDatePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDatePickerOpen(!isDatePickerOpen);
    setIsLocationDropdownOpen(false);
    setIsGuestDropdownOpen(false);
  };

  const formatGuestText = () => {
    const totalGuests = guestData.adults + guestData.children;
    return `${totalGuests} مسافر، ${guestData.rooms} اتاق`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Location Field - Far Right */}
          <div className={styles.locationField}>
            <button
              ref={buttonRef}
              type="button"
              className={clsx(styles.fieldButton, {
                [styles.fieldButtonActive]: isLocationDropdownOpen,
              })}
              onClick={toggleLocationDropdown}
            >
              <MapPinIcon className={styles.icon} />
              <div className={styles.labelWrapper}>
                <label
                  className={clsx(
                    styles.label,
                    selectedLocation && styles.labelActive
                  )}
                >
                  نام شهر، هتل یا منطقه
                </label>
                {selectedLocation && (
                  <span className={styles.value}>{selectedLocation}</span>
                )}
              </div>

              {isLocationDropdownOpen && (
                <div className={styles.dropdownInsideButton}>
                  <LocationSearchDropdown
                    onSelect={handleLocationSelect}
                    placeholder="جستجوی شهر یا هتل"
                    isOpen={isLocationDropdownOpen}
                    onToggle={() => setIsLocationDropdownOpen(false)}
                  />
                </div>
              )}
            </button>
          </div>

          {/* Check-in Date */}
          <div className={styles.dateField} style={{ position: "relative" }}>
            <button
              type="button"
              className={clsx(styles.fieldButton, {
                [styles.fieldButtonActive]: isDatePickerOpen,
              })}
              onClick={toggleDatePicker}
            >
              <CalendarIcon className={styles.icon} />
              <div className={styles.labelWrapper}>
                <label
                  className={clsx(
                    styles.label,
                    checkInDate && styles.labelActive
                  )}
                >
                  ورود
                </label>
                {checkInDate && (
                  <span className={styles.value}>
                    {formatDate(checkInDate)}
                  </span>
                )}
              </div>
            </button>

            {isDatePickerOpen && (
              <DateRangePicker
                isOpen={isDatePickerOpen}
                onToggle={() => setIsDatePickerOpen(false)}
                onDateSelect={handleDateSelect}
                startDate={checkInDate}
                endDate={checkOutDate}
              />
            )}
          </div>

          {/* Check-out Date */}
          <div className={styles.dateField}>
            <button
              type="button"
              className={clsx(styles.fieldButton, {
                [styles.fieldButtonActive]: isDatePickerOpen,
              })}
              onClick={toggleDatePicker}
            >
              <CalendarIcon className={styles.icon} />
              <div className={styles.labelWrapper}>
                <label
                  className={clsx(
                    styles.label,
                    checkOutDate && styles.labelActive
                  )}
                >
                  خروج
                </label>
                {checkOutDate && (
                  <span className={styles.value}>
                    {formatDate(checkOutDate)}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Guests Field */}
          <div className={styles.guestsField}>
            <button
              type="button"
              className={clsx(styles.fieldButton, {
                [styles.fieldButtonActive]: isGuestDropdownOpen,
              })}
              onClick={(e) => {
                e.stopPropagation();
                toggleGuestDropdown(e);
              }}
            >
              <UserIcon className={styles.icon} />
              <div className={styles.labelWrapper}>
                <label className={clsx(styles.label, styles.labelActive)}>
                  مسافران و اتاق‌ها
                </label>
                <span className={styles.value}>{formatGuestText()}</span>
              </div>
            </button>

            <GuestDropdown
              isOpen={isGuestDropdownOpen}
              onToggle={() => setIsGuestDropdownOpen(false)}
              onSelect={handleGuestSelect}
            />
          </div>

          {/* Search Button - Far Left */}
          <div className={styles.searchButtonWrapper}>
            <button
              type="submit"
              className={styles.searchButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.loadingDots}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              ) : (
                "جستجو"
              )}
            </button>
          </div>
        </form>
        {/* Info Banner */}
        <div className={styles.infoBanner}>
          <div className={styles.infoContent}>
            <ExclamationTriangleIcon className={styles.warningIcon} />
            <p className={styles.infoText}>
              برای مشاهده وضعیت پروازهای داخلی،{" "}
              <a
                href="https://caa.gov.ir/news-archive"
                className={styles.infoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                اینجا
              </a>{" "}
              کلیک کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
