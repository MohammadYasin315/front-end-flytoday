import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Filter-By-Capacity.module.css";

interface FilterByCapacityProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAllFilters: () => void;
}

export default function FilterByCapacity({
  onFilterChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
}: FilterByCapacityProps) {
  const [showCapacityFilter, setShowCapacityFilter] = useState(false);

  useEffect(() => {
    setShowCapacityFilter(activeFilters.includes("نمایش ظرفیت‌دارها"));
  }, [activeFilters]);

  const handleToggleCapacity = () => {
    const newValue = !showCapacityFilter;
    setShowCapacityFilter(newValue);

    let newFilters = [...activeFilters];
    if (newValue && !activeFilters.includes("نمایش ظرفیت‌دارها")) {
      newFilters.push("نمایش ظرفیت‌دارها");
    } else if (!newValue) {
      newFilters = newFilters.filter(
        (filter) => filter !== "نمایش ظرفیت‌دارها"
      );
    }

    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Map Section */}
      <div className={styles.mapSection}>
        <img
          src="/images/cities/map.png"
          alt="نقشه همدان"
          className={styles.mapImage}
        />
        <p className={styles.mapLabel}>نقشه</p>
      </div>

      {/* Active Filters Display - Below Map */}
      {activeFilters.length > 0 && (
        <>
          <div className={styles.activeFilters}>
            <span className={styles.resultCount}>115 مورد</span>
            <div className={styles.clearFilters} onClick={onClearAllFilters}>
              حذف فیلترها
            </div>
          </div>

          <div className={styles.filterTags}>
            <div className={styles.filterTagsContainer}>
              {activeFilters.map((filter, index) => (
                <div key={index} className={styles.filterTag}>
                  <div className={styles.filterTagText}>{filter}</div>
                  <span
                    className={styles.removeIcon}
                    onClick={() => onRemoveFilter(filter)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Filter Header */}
      <div className={styles.filterHeader}>
        <span className={styles.filterTitle}>فیلتر براساس</span>
      </div>

      {/* Capacity Filter */}
      <div className={styles.filterItem}>
        <div className={styles.filterLabel}>نمایش ظرفیت‌دارها</div>
        <div className={styles.toggleContainer}>
          <input
            id="capacity-toggle"
            className={styles.toggleInput}
            type="checkbox"
            checked={showCapacityFilter}
            onChange={handleToggleCapacity}
          />
          <label
            className={clsx(styles.toggleSwitch, {
              [styles.active]: showCapacityFilter,
            })}
            htmlFor="capacity-toggle"
          >
            <span className={styles.toggleHandle}>
              <span
                className={clsx(styles.toggleIcon, {
                  [styles.active]: showCapacityFilter,
                  [styles.inactive]: !showCapacityFilter,
                })}
              >
                {showCapacityFilter ? "✓" : "×"}
              </span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
