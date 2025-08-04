import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Filter-By-Type.module.css";

interface FilterByTypeProps {
  onFilterChange: (filters: string[]) => void;
  activeFilters: string[];
}

export default function FilterByType({
  onFilterChange,
  activeFilters,
}: FilterByTypeProps) {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [showWithoutStars, setShowWithoutStars] = useState(false);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState<
    string[]
  >([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [showMoreAccommodation, setShowMoreAccommodation] = useState(false);

  const accommodationTypes = [
    { name: "هتل", count: 79 },
    { name: "بوتیک هتل", count: 2 },
    { name: "مهمانپذیر", count: 9 },
    { name: "هتل آپارتمان", count: 6 },
    { name: "هاستل", count: 2 },
    { name: "مجتمع اقامتی", count: 1 },
    { name: "مسافرخانه", count: 2 },
    { name: "اقامتگاه سنتی", count: 2 },
    { name: "متل", count: 1 },
  ];

  const mealTypes = [
    { name: "صبحانه", count: 103 },
    { name: "بدون وعده غذایی", count: 22 },
  ];

  const visibleAccommodationTypes = showMoreAccommodation
    ? accommodationTypes
    : accommodationTypes.slice(0, 5);

  useEffect(() => {
    const starFilters = activeFilters.filter((filter) =>
      filter.includes("ستاره")
    );
    const accommodationFilters = activeFilters.filter((filter) =>
      accommodationTypes.some((type) => filter === type.name)
    );
    const mealFilters = activeFilters.filter((filter) =>
      mealTypes.some((type) => filter === type.name)
    );

    setShowWithoutStars(activeFilters.includes("بدون ستاره"));
    setSelectedStars(
      starFilters.map((filter) => Number.parseInt(filter.charAt(0)))
    );
    setSelectedAccommodationTypes(accommodationFilters);
    setSelectedMealTypes(mealFilters);
  }, [activeFilters]);

  const handleStarClick = (star: number) => {
    const newSelectedStars = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star];

    setSelectedStars(newSelectedStars);
    updateFilters(
      newSelectedStars,
      showWithoutStars,
      selectedAccommodationTypes,
      selectedMealTypes
    );
  };

  const handleWithoutStarsChange = () => {
    const newValue = !showWithoutStars;
    setShowWithoutStars(newValue);
    updateFilters(
      selectedStars,
      newValue,
      selectedAccommodationTypes,
      selectedMealTypes
    );
  };

  const handleAccommodationTypeChange = (typeName: string) => {
    const newSelectedTypes = selectedAccommodationTypes.includes(typeName)
      ? selectedAccommodationTypes.filter((t) => t !== typeName)
      : [...selectedAccommodationTypes, typeName];

    setSelectedAccommodationTypes(newSelectedTypes);
    updateFilters(
      selectedStars,
      showWithoutStars,
      newSelectedTypes,
      selectedMealTypes
    );
  };

  const handleMealTypeChange = (typeName: string) => {
    const newSelectedTypes = selectedMealTypes.includes(typeName)
      ? selectedMealTypes.filter((t) => t !== typeName)
      : [...selectedMealTypes, typeName];

    setSelectedMealTypes(newSelectedTypes);
    updateFilters(
      selectedStars,
      showWithoutStars,
      selectedAccommodationTypes,
      newSelectedTypes
    );
  };

  const updateFilters = (
    stars: number[],
    withoutStars: boolean,
    accommodation: string[],
    meals: string[]
  ) => {
    let newFilters = [...activeFilters];

    newFilters = newFilters.filter(
      (filter) =>
        !filter.includes("ستاره") &&
        !accommodationTypes.some((type) => filter === type.name) &&
        !mealTypes.some((type) => filter === type.name)
    );

    if (withoutStars) {
      newFilters.push("بدون ستاره");
    }
    stars.forEach((star) => {
      newFilters.push(`${star} ستاره`);
    });

    accommodation.forEach((type) => {
      newFilters.push(type);
    });

    meals.forEach((type) => {
      newFilters.push(type);
    });

    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Star Rating Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>کلاس مکان اقامتی</p>

        <div className={styles.starContainer}>
          {/* Star Rating Buttons */}
          <div className={styles.starButtons}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={clsx(styles.starButton, {
                  [styles.starButtonActive]: selectedStars.includes(star),
                })}
                onClick={() => handleStarClick(star)}
              >
                <span className={styles.starIcon}>★</span>
                <span>{star}</span>
              </div>
            ))}
          </div>

          {/* Without Stars Checkbox */}
          <div className={styles.checkboxItem}>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="without-stars"
                className={styles.hiddenCheckbox}
                checked={showWithoutStars}
                onChange={handleWithoutStarsChange}
              />
              <label htmlFor="without-stars" className={styles.checkboxLabel}>
                <div
                  className={clsx(styles.customCheckbox, {
                    [styles.checked]: showWithoutStars,
                  })}
                >
                  <span className={styles.checkIcon}>✓</span>
                </div>
                <span>نمایش هتل‌های بدون ستاره</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodation Type Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>نوع مکان اقامتی</p>

        <div className={styles.accommodationList}>
          {visibleAccommodationTypes.map((type, index) => (
            <div key={index} className={styles.accommodationItem}>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id={`accommodation-${index}`}
                  className={styles.hiddenCheckbox}
                  checked={selectedAccommodationTypes.includes(type.name)}
                  onChange={() => handleAccommodationTypeChange(type.name)}
                />
                <label
                  htmlFor={`accommodation-${index}`}
                  className={styles.checkboxLabel}
                >
                  <div
                    className={clsx(styles.customCheckbox, {
                      [styles.checked]: selectedAccommodationTypes.includes(
                        type.name
                      ),
                    })}
                  >
                    <span className={styles.checkIcon}>✓</span>
                  </div>
                  <span>{type.name}</span>
                </label>
              </div>
              <span className={styles.itemCount}>{type.count}</span>
            </div>
          ))}

          <button
            className={styles.showMoreButton}
            onClick={() => setShowMoreAccommodation(!showMoreAccommodation)}
          >
            {showMoreAccommodation ? "مشاهده کمتر" : "مشاهده بیشتر"}
          </button>
        </div>
      </div>

      {/* Meal Type Filter */}
      <div className={styles.filterSection}>
        <p className={styles.sectionTitle}>نوع وعده غذایی</p>

        <div className={styles.mealList}>
          {mealTypes.map((type, index) => (
            <div key={index} className={styles.mealItem}>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id={`meal-${index}`}
                  className={styles.hiddenCheckbox}
                  checked={selectedMealTypes.includes(type.name)}
                  onChange={() => handleMealTypeChange(type.name)}
                />
                <label
                  htmlFor={`meal-${index}`}
                  className={styles.checkboxLabel}
                >
                  <div
                    className={clsx(styles.customCheckbox, {
                      [styles.checked]: selectedMealTypes.includes(type.name),
                    })}
                  >
                    <span className={styles.checkIcon}>✓</span>
                  </div>
                  <span>{type.name}</span>
                </label>
              </div>
              <span className={styles.itemCount}>{type.count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
