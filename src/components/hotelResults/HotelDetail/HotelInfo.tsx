import type React from "react";
import clsx from "clsx";
import { Star, Wifi, ParkingCircle, Utensils, Building } from "lucide-react";
import styles from "./Hotel-Info.module.css";

interface HotelInfoProps {
  hotelName?: string;
  hotelType?: string;
  starRating?: number;
  address?: string;
  roomType?: string;
  hasBreakfast?: boolean;
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  remainingRooms?: number;
  priceFrom?: number;
  currency?: string;
  onShowRooms?: () => void;
  className?: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "وای فای": <Wifi className={styles.amenityIcon} />,
  پارکینگ: <ParkingCircle className={styles.amenityIcon} />,
  رستوران: <Utensils className={styles.amenityIcon} />,
  آسانسور: <Building className={styles.amenityIcon} />,
};

export function HotelInfo({
  hotelName = "آناتا تهران",
  hotelType = "هتل",
  starRating = 4,
  address = "تهران، خیابان آزادی، نرسیده به میدان انقلاب، روبروی دانشکده دامپزشکی، انتهای خیابان زارع، پلاک ۱",
  roomType = "اتاق یک تخته",
  hasBreakfast = true,
  amenities = ["وای فای", "پارکینگ", "رستوران", "آسانسور"],
  rating = 6.7,
  reviewCount = 0,
  remainingRooms = 2,
  priceFrom = 43500000,
  currency = "ریال",
  onShowRooms,
  className,
}: HotelInfoProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={clsx(styles.starIcon, {
          [styles.starFilled]: index < starRating,
          [styles.starEmpty]: index >= starRating,
        })}
      />
    ));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <div className={clsx(styles.container, className)}>
      {/* Header Section - All in one line */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={clsx(styles.hotelName, "text-primaryBlack")}>
            {hotelName}
          </span>
          <div className={styles.hotelBadge}>{hotelType}</div>
          <div className={styles.starRating}>{renderStars()}</div>
        </div>
      </div>

      {/* Address Section */}
      <div className={styles.addressSection}>
        <div className={styles.addressContent}>
          <div className={styles.address}>{address}</div>
          <button className={styles.mapButton}>&nbsp; نقشه &nbsp;</button>
        </div>
      </div>

      {/* Room Type */}
      <span className={styles.roomTypeSection}>
        <span className={styles.roomType}>
          {roomType}
          {hasBreakfast && (
            <span className={styles.breakfastBadge}>  (صبحانه) </span>
          )}
        </span>
      </span>

      {/* Main Content - RTL Layout */}
      <div className={styles.mainContent}>
        {/* Right Section - Amenities and Rating */}
        <div className={styles.rightSection}>
          <div className={styles.amenitiesGrid}>
            {amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className={styles.amenityItem}>
                <div className={styles.amenityContent}>
                  {amenityIcons[amenity]}
                  <div className={styles.amenityText}>{amenity}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.ratingContainer}>
            <small className={styles.ratingDescription}>خیلی خوب</small>
              <div className={styles.ratingBadge}>
                <span className={styles.ratingScore}>{rating} / 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Section - Price info and Button */}
        <div className={styles.leftSection}>
          <div className={styles.priceContainer}>
            <span className={styles.remainingRooms}>
              {remainingRooms} باقیمانده
            </span>
            <div className={styles.priceLabel}>شروع قیمت از</div>
            <div className={styles.priceAmount}>
              <div className={styles.priceValue}>
                <span>{formatPrice(priceFrom)} </span>
                <span className={styles.currency}>ریال</span>
              </div>
            </div>
          </div>
          <button
            className={styles.showRoomsButton}
            onClick={onShowRooms}
            type="button"
          >
            نمایش اتاق‌ها
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelInfo;
