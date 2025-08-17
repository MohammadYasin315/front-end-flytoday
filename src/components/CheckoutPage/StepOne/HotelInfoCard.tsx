import Image from "next/image";
import Link from "next/link";
import { Star, Info } from "lucide-react";
import clsx from "clsx";
import styles from "./Hotel-Info-Card.module.css";

interface HotelInfoCardProps {
  hotelName: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  score: number;
  roomType: string;
  hasBreakfast?: boolean;
  checkIn: string;
  checkOut: string;
  nights: number;
  hotelUrl: string;
  className?: string;
}

export default function HotelInfoCard({
  hotelName,
  imageUrl,
  imageAlt,
  rating,
  score,
  roomType,
  hasBreakfast = false,
  checkIn,
  checkOut,
  nights,
  hotelUrl,
  className,
}: HotelInfoCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={clsx(styles.star, {
          [styles.starFilled]: index < rating,
        })}
        size={16}
      />
    ));
  };

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={320}
            height={185}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <Link href={hotelUrl} className={styles.hotelLink}>
          <h3 className={styles.hotelName}>{hotelName}</h3>
        </Link>

        <div className={styles.ratingContainer}>
          <div className={styles.stars}>{renderStars()}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.scoreContainer}>
          <div className={styles.scoreWrapper}>
            <div className={styles.scoreBadge}>
              <span className={styles.scoreText}>{score}</span>
            </div>
          </div>
        </div>

        <div className={styles.roomInfo}>
          <span className={styles.roomType}>{roomType}</span>
          {hasBreakfast && <span className={styles.breakfast}>(صبحانه)</span>}
        </div>

        <div className={styles.bookingDetails}>
          <div className={styles.cancellationPolicy}>
            <span className={styles.policyText}>قوانین کنسلی</span>
            <Info className={styles.infoIcon} size={16} />
          </div>

          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>ورود:</span>
            <span className={styles.dateValue}>{checkIn}</span>
          </div>
          <div className={styles.dateItem}>
            <span className={styles.dateLabel}>خروج:</span>
            <span className={styles.dateValue}>{checkOut}</span>
          </div>
          <div className={styles.nightsInfo}>{nights} شب اقامت</div>
            </div>
      </div>
    </div>
  );
}
