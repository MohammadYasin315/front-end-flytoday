import {
  CalendarIcon,
  BuildingOffice2Icon,
  UserIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState, useEffect } from "react";
import styles from "./Recent-Search-Item.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface RecentSearchItemProps {
  location?: string;
  dateRange?: string;
  guestInfo?: string;
  onModifySearch?: () => void;
  className?: string;
}

export default function RecentSearchItem({
  onModifySearch,
  className,
}: RecentSearchItemProps) {
  const searchData = useSelector((state: RootState) => state.search);

  const formatDateRange = () => {
    if (searchData.checkIn && searchData.checkOut) {
      return `${searchData.checkIn} ---> ${searchData.checkOut}`;
    }
    return "تاریخ مشخص نشده";
  };

  const formatGuestInfo = () => {
    return `${searchData.guests} مسافر، ${searchData.rooms} اتاق`;
  };

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlPosition = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlPosition);
      return () => {
        window.removeEventListener("scroll", controlPosition);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <div className={styles.spacer}></div>
      <div
        className={clsx(
          styles.searchHeader,
          !isHeaderVisible && styles.searchHeaderTop,
          className
        )}
      >
        <div className={styles.container}>
          <div className={styles.searchContent}>
            <button
              className={styles.modifyButton}
              onClick={onModifySearch}
              type="button"
            >
              <span className={styles.buttonText}>تغییر جستجو</span>
            </button>
            <div className={styles.searchInfo}>
              <div className={styles.infoItem}>
                <BuildingOffice2Icon className={styles.icon} />
                <span className={styles.text}>
                  {searchData.location
                    ? `رزرو هتل‌های ${searchData.location}`
                    : "مکان مشخص نشده"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <CalendarIcon className={styles.icon} />
                <span className={styles.text}>{formatDateRange()}</span>
              </div>
              <div className={styles.infoItem}>
                <UserIcon className={styles.icon} />
                <span className={styles.text}>{formatGuestInfo()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
