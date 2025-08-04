import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  BuildingOffice2Icon,
  WifiIcon,
  TvIcon,
  HomeIcon,
  SparklesIcon,
  UserGroupIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "./Filter-By-Facilities.module.css";

interface FilterByFacilitiesProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

export default function FilterByFacilities({
  onFilterChange,
  activeFilters,
}: FilterByFacilitiesProps) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);

  const facilities = [
    { name: "پارکینگ", icon: BuildingOffice2Icon },
    { name: "رستوران", icon: HomeIcon },
    { name: "روم سرویس", icon: CogIcon },
    { name: "فضای سبز", icon: SparklesIcon },
    { name: "خشکشویی", icon: SparklesIcon },
    { name: "زمین بازی کودکان", icon: UserGroupIcon },
    { name: "وای فای", icon: WifiIcon },
    { name: "وای فای رایگان", icon: WifiIcon },
    { name: "دسترسی به وای فای", icon: WifiIcon },
    { name: "تلویزیون", icon: TvIcon },
    { name: "آسانسور", icon: BuildingOffice2Icon },
    { name: "سرویس بهداشتی فرنگی", icon: InformationCircleIcon },
    { name: "سرویس بهداشتی ایرانی", icon: InformationCircleIcon },
    { name: "حمام", icon: HomeIcon },
    { name: "کافی شاپ", icon: HomeIcon },
  ];

  const ratings = [
    { value: "", label: "همه" },
    { value: "فوق العاده +9", label: "فوق العاده +9" },
    { value: "خیلی خوب +8", label: "خیلی خوب +8" },
    { value: "خوب +7", label: "خوب +7" },
  ];

  const visibleFacilities = showMoreFacilities
    ? facilities
    : facilities.slice(0, 6);

  useEffect(() => {
    // Sync with parent component's active filters
    const facilityFilters = activeFilters.filter((filter) =>
      facilities.some((facility) => filter === facility.name)
    );
    const ratingFilter = activeFilters.find((filter) =>
      filter.startsWith("رتبه بندی: ")
    );

    setSelectedFacilities(facilityFilters);
    setSelectedRating(
      ratingFilter ? ratingFilter.replace("رتبه بندی: ", "") : ""
    );
  }, [activeFilters]);

  const handleFacilityClick = (facilityName: string) => {
    const newSelectedFacilities = selectedFacilities.includes(facilityName)
      ? selectedFacilities.filter((f) => f !== facilityName)
      : [...selectedFacilities, facilityName];

    setSelectedFacilities(newSelectedFacilities);
    updateFilters(newSelectedFacilities, selectedRating);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    updateFilters(selectedFacilities, rating);
  };

  const updateFilters = (selectedFacilities: string[], rating: string) => {
    let newFilters = [...activeFilters];

    // Remove existing facility and rating filters
    const facilityNames = facilities.map((f) => f.name);
    newFilters = newFilters.filter(
      (filter) =>
        !facilityNames.includes(filter) && !filter.startsWith("رتبه بندی: ")
    );

    // Add facility filters
    selectedFacilities.forEach((facility) => {
      newFilters.push(facility);
    });

    // Add rating filter (only if not "همه")
    if (rating && rating !== "") {
      newFilters.push(`رتبه بندی: ${rating}`);
    }

    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Facilities Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>امکانات</p>

        <div className={styles.facilitiesGrid}>
          {visibleFacilities.map((facility, index) => {
            const IconComponent = facility.icon;
            return (
              <div
                key={index}
                className={clsx(styles.facilityItem, {
                  [styles.facilityItemActive]: selectedFacilities.includes(
                    facility.name
                  ),
                })}
                onClick={() => handleFacilityClick(facility.name)}
              >
                <IconComponent className={styles.facilityIcon} />
                <span className={styles.facilityLabel}>{facility.name}</span>
              </div>
            );
          })}
        </div>

        <button
          className={styles.showMoreButton}
          onClick={() => setShowMoreFacilities(!showMoreFacilities)}
        >
          {showMoreFacilities ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </button>
      </div>

      {/* Rating Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>رتبه‌بندی کاربران</p>

        <div className={styles.ratingList}>
          {ratings.map((rating, index) => (
            <div key={index} className={styles.ratingItem}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="rating"
                  value={rating.value}
                  checked={selectedRating === rating.value}
                  onChange={() => handleRatingChange(rating.value)}
                  className={styles.radioInput}
                />
                <div
                  className={clsx(styles.radioCircle, {
                    [styles.radioCircleActive]: selectedRating === rating.value,
                  })}
                >
                  {selectedRating === rating.value && (
                    <div className={styles.radioInner} />
                  )}
                </div>
                <span className={styles.radioText}>{rating.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
