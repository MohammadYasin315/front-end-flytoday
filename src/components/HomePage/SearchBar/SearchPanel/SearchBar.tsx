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
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "@/store/searchSlice";
import { useRouter } from "next/router";
import { RootState } from "@/store/store";
import axios from "axios";

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
  const searchData = useSelector((state: RootState) => state.search);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    searchData.location || ""
  );
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    searchData.checkIn ? new Date(searchData.checkIn) : null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    searchData.checkOut ? new Date(searchData.checkOut) : null
  );
  const [guestData, setGuestData] = useState({
    adults: Math.max(1, searchData.guests - (searchData.children || 0)),
    children: searchData.children || 0,
    rooms: Math.max(1, searchData.rooms || 1),
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const isSearchValid = () => {
    return (
      selectedLocation.trim() !== "" &&
      checkInDate !== null &&
      checkOutDate !== null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId) return;
    setIsLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:8000/hotels/", {
        params: { city_id: selectedCityId },
      });

      const hotels = response.data;

      dispatch(
        setSearchData({
          location: selectedLocation,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests: guestData.adults + guestData.children,
          rooms: guestData.rooms,
        })
      );

      if (onSearch) {
        onSearch(hotels);
      }

      router.push({
        pathname: "/cities",
        query: { city_id: selectedCityId },
      });
    } catch (error) {
      console.error("خطا در گرفتن هتل‌ها:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = useCallback((city: any) => {
    setSelectedLocation(city.city_name);
    setSelectedCityId(city.id);
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

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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
              disabled={isLoading || !isSearchValid()}
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
