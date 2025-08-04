import styles from "./Main-Results.module.css";
import FilterBar from "./FilterBar/FilterBar";
import HotelSortList from "./HotelDetail/HotelSortList";
import HotelImageSlider from "./HotelDetail/HotelImageSlider";

export default function MainResults() {
  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        <div className={styles.filterColumn}>
          <FilterBar />
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.sortHeader}>
            <HotelSortList />
          </div>
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
          <HotelImageSlider />
        </div>
      </div>
    </div>
  );
}
