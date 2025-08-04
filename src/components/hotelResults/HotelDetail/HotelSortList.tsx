import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import styles from "./Hotel-Sort-List.module.css";

interface SortOption {
  id: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { id: "recommended", label: "پیشنهادی" },
  { id: "popular", label: "محبوب‌ترین" },
  { id: "price", label: "قیمت (ارزانترین به گرانترین)" },
  { id: "rating", label: "امتیاز کاربران (بیشترین به کمترین)" },
  { id: "stars", label: "تعداد ستاره (بیشترین به کمترین)" },
];

export default function HotelSortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.contentArea}>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              className={clsx(styles.dropdownButton, {
                [styles.dropdownButtonActive]: isOpen,
              })}
              onClick={handleToggle}
              type="button"
            >
              <div className={styles.labelValueWrapper}>
                <label className={styles.label}>مرتب‌سازی</label>
                <span className={styles.value}>{selectedOption.label}</span>
              </div>
              <div className={styles.iconWrapper}>
                <ChevronDownIcon
                  className={clsx(styles.chevronIcon, {
                    [styles.chevronIconRotated]: isOpen,
                  })}
                />
              </div>
            </button>

            {isOpen && (
              <div className={styles.dropdown}>
                {sortOptions.map((option) => (
                  <div
                    key={option.id}
                    className={clsx(styles.option, {
                      [styles.optionActive]: selectedOption.id === option.id,
                    })}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.resultsText}>124 نتیجه پیدا شد</div>
        </div>
      </div>
    </div>
  );
}
