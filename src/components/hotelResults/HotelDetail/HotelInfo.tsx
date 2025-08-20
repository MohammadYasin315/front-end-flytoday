import type React from "react";
import clsx from "clsx";
import { Star, Wifi, ParkingCircle, Utensils, Building } from "lucide-react";
import styles from "./Hotel-Info.module.css";
import { useRouter } from "next/router";

interface HotelInfoProps {
  hotelId?: number;
  hotelName?: string;
  hotelType?: string;
  starRating?: number;
  address?: string;
  roomType?: string;
  hasBreakfast?: boolean;
  amenities?: string[];
  rating?: number;
  remainingRooms?: number;
  priceFrom?: number;
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
  hotelId,
  hotelName,
  hotelType,
  starRating,
  address,
  roomType,
  hasBreakfast,
  amenities = ["وای فای", "پارکینگ", "رستوران", "آسانسور"],
  rating,
  remainingRooms,
  priceFrom = 5000000,
  className,
}: HotelInfoProps) {
  const router = useRouter();

  const handleShowRooms = () => {
    if (!hotelId) return;
    router.push(`/rooms?hotel_id=${hotelId}`);

  };

  const renderStars = () => {
    if (!starRating) return null;
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

  const formatPrice = (price?: number) => {
    if (!price) return "---";
    return price.toLocaleString("fa-IR");
  };

  const getRatingDescription = (rating?: number) => {
    if (!rating) return "---";
    if (rating >= 8) return "عالی";
    if (rating >= 6) return "خیلی خوب";
    if (rating >= 4) return "متوسط";
    return "ضعیف";
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={clsx(styles.hotelName, "text-primaryBlack")}>
            {hotelName}
          </span>
          <div className={styles.hotelBadge}>{hotelType}</div>
          <div className={styles.starRating}>{renderStars()}</div>
        </div>
      </div>

      <div className={styles.addressSection}>
        <div className={styles.addressContent}>
          <div className={styles.address}>{address}</div>
          <button className={styles.mapButton}>&nbsp; نقشه &nbsp;</button>
        </div>
      </div>

      <span className={styles.roomTypeSection}>
        <span className={styles.roomType}>
          {roomType}
          <span className={styles.breakfastBadge}>
            {hasBreakfast ? " (صبحانه)" : " (بدون صبحانه)"}
          </span>
        </span>
      </span>

      <div className={styles.mainContent}>
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
          {rating && (
            <div className={styles.ratingRow}>
              <div className={styles.ratingContainer}>
                <small className={styles.ratingDescription}>
                  {getRatingDescription(rating)}
                </small>
                <div className={styles.ratingBadge}>
                  <span className={styles.ratingScore}>{rating} / 10</span>
                </div>
              </div>
            </div>
          )}
        </div>

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
            onClick={handleShowRooms}
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
