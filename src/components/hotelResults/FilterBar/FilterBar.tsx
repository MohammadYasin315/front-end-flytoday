import { useState } from "react";
import styles from "./Filter-Bar.module.css";
import FilterByName from "./FilterByName";
import FilterByType from "./FilterByType";
import FilterByCapacity from "./FilterByCapacity";
import FilterByFacilities from "./FilterByFacilities";

export default function MainResults() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (newFilters: string[]) => {
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const newFilters = activeFilters.filter(
      (filter) => filter !== filterToRemove
    );
    setActiveFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        <aside className={styles.filtersWrapper}>
          {/* Capacity Filter Component - includes map and active filters */}
          <FilterByCapacity
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAllFilters}
          />

          {/* Name Filter Component */}
          <FilterByName
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />

          {/* Type Filter Component */}
          <FilterByType
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />

          {/* Facilities Filter Component */}
          <FilterByFacilities
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        </aside>
      </div>
    </div>
  );
}
