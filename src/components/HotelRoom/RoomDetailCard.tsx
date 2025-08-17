import Image from "next/image";
import clsx from "clsx";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import styles from "./Room-Detail-Card.module.css";

interface RoomDetailCardProps {
  title: string;
  subtitle?: string;
  image: string;
  price: string;
  currency: string;
  loyaltyPoints: number;
  bookingUrl: string;
}

export default function RoomDetailCard({
  title,
  subtitle,
  image,
  price,
  currency,
  loyaltyPoints,
  bookingUrl,
}: RoomDetailCardProps) {
  return (
    <div className={clsx(styles.cardWrapper)}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={164}
              className={styles.roomImage}
              priority
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h3 className={styles.title}>
              {title}
              {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </h3>
          </div>

          <div className={styles.policySection}>
            <div className={styles.policyLink}>
              <span className={styles.policyText}>قوانین کنسلی</span>
              <InformationCircleIcon className={styles.infoIcon} />
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailsLink}>
              <span className={styles.detailsText}>جزئیات بیشتر</span>
              <ChevronLeftIcon className={styles.chevronIcon} />
            </div>
          </div>

          <div className={styles.loyaltySection}>
            <div className={styles.loyaltyInfo}>
              <Image
                src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/icons/coin.svg"
                alt="coin"
                width={16}
                height={16}
                className={styles.coinIcon}
              />
              <span className={styles.loyaltyText}>
                دریافت {loyaltyPoints} امتیاز در باشگاه مشتریان
              </span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceSection}>
              <div className={styles.priceContainer}>
                <div className={styles.priceWrapper}>
                  <span className={styles.priceAmount}>{price}</span>
                  <span className={styles.priceCurrency}>{currency}</span>
                </div>
              </div>
            </div>

            <div className={styles.bookingSection}>
              <a href={bookingUrl} className={styles.bookingLink}>
                <button className={styles.bookingButton} type="button">
                  انتخاب اتاق
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
