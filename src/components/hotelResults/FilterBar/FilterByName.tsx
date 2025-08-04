import { useState, useEffect } from "react";
import clsx from "clsx";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import styles from "./Filter-By-Name.module.css";

interface FilterByNameProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

export default function FilterByName({
  onFilterChange,
  activeFilters,
}: FilterByNameProps) {
  const [searchValue, setSearchValue] = useState("");
  const [specialDiscount, setSpecialDiscount] = useState(false);
  const [priceRange, setPriceRange] = useState([6180000, 105000000]);
  const [priceChanged, setPriceChanged] = useState(false);

  useEffect(() => {
    setSpecialDiscount(activeFilters.includes("تخفیف ویژه"));
    setPriceChanged(
      activeFilters.some((filter) => filter.startsWith("قیمت: "))
    );
  }, [activeFilters]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      const hotelFilter = `نام هتل: ${searchValue.trim()}`;
      const newFilters = [...activeFilters];
      if (!activeFilters.includes(hotelFilter)) {
        newFilters.push(hotelFilter);
      }
      onFilterChange(newFilters);
      setSearchValue("");
    }
  };

  const handleClearInput = () => {
    setSearchValue("");
  };

  const handleSpecialDiscountChange = () => {
    const newValue = !specialDiscount;
    setSpecialDiscount(newValue);

    let newFilters = [...activeFilters];
    if (newValue && !activeFilters.includes("تخفیف ویژه")) {
      newFilters.push("تخفیف ویژه");
    } else if (!newValue) {
      newFilters = newFilters.filter((filter) => filter !== "تخفیف ویژه");
    }

    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    const newRange = value as number[];
    setPriceRange(newRange);

    if (!priceChanged) {
      setPriceChanged(true);
    }

    const priceFilter = `قیمت: ${formatPrice(newRange[1])} - ${formatPrice(
      newRange[0]
    )}`;
    const newFilters = [...activeFilters];
    const existingPriceFilterIndex = newFilters.findIndex((filter) =>
      filter.startsWith("قیمت: ")
    );

    if (existingPriceFilterIndex !== -1) {
      newFilters[existingPriceFilterIndex] = priceFilter;
    } else {
      newFilters.push(priceFilter);
    }

    onFilterChange(newFilters);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const sliderStyle = {
    trackStyle: [{ backgroundColor: "#3662db", height: 3, zIndex: 1, }],
    handleStyle: [
      {
        backgroundColor: "#3662db",
        borderColor: "#3662db",
        width: 20,
        height: 20,
        marginTop: -8,
        zIndex: 2,
        opacity: 1,
      },
      {
        backgroundColor: "#3662db",
        borderColor: "#3662db",
        width: 20,
        height: 20,
        marginTop: -8,
        zIndex: 2,
        opacity: 1,
      },
    ],
    railStyle: { backgroundColor: "#e0e3f4", height: 3 },
  };

  return (
    <>
      {/* Hotel Name Search Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>جستجو بر اساس نام هتل</p>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <MagnifyingGlassIcon
              className={styles.searchIcon}
              onClick={handleSearch}
            />
            <input
              className={styles.searchInput}
              placeholder="همانند پارسیان"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchValue.length > 0 && (
              <div className={styles.clearIcon} onClick={handleClearInput}>
                <XCircleIcon />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rate Type Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>نوع نرخ</p>
        <div className={styles.checkboxContainer}>
          <div className={styles.checkboxItem}>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="special-discount"
                className={styles.hiddenCheckbox}
                checked={specialDiscount}
                onChange={handleSpecialDiscountChange}
              />
              <label
                htmlFor="special-discount"
                className={styles.checkboxWrapper}
              >
                <div
                  className={clsx(styles.customCheckbox, {
                    [styles.checked]: specialDiscount,
                  })}
                >
                  <span className={styles.checkIcon}>✓</span>
                </div>
                <span className={styles.checkboxLabel}>تخفیف ویژه</span>
              </label>
            </div>
            <span className={styles.itemCount}>1</span>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>قیمت</p>
        <div className={styles.priceContainer}>
          <div className={styles.priceInputs}>
            <div className={styles.inputField}>
              <label className={styles.inputLabel}>حداکثر</label>
              <input
                className={styles.priceInput}
                type="text"
                value={formatPrice(priceRange[1])}
                readOnly
              />
            </div>
            <div className={styles.inputField}>
              <label className={styles.inputLabel}>حداقل</label>
              <input
                className={styles.priceInput}
                type="text"
                value={formatPrice(priceRange[0])}
                readOnly
              />
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <Slider
              range
              min={6180000}
              max={105000000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              {...sliderStyle}
            />
          </div>
        </div>
      </div>
    </>
  );
}
