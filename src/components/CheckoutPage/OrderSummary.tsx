import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import styles from "./Order-Summary.module.css";
import SessionExpiredModal from "./SessionExpiredModal";

interface OrderSummaryProps {
  initialTimeInMinutes?: number;
  roomCount?: number;
  nightCount?: number;
  totalAmount?: number;
  loyaltyPoints?: number;
  onSessionExpire?: () => void;
}

export default function OrderSummary({
  initialTimeInMinutes = 20,
  roomCount = 1,
  nightCount = 2,
  totalAmount = 113000000,
  loyaltyPoints = 113,
  onSessionExpire,
}: OrderSummaryProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes * 60); // Convert to seconds
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Calculate progress percentage (0-100)
  const totalSeconds = initialTimeInMinutes * 60;
  const progressPercentage = (timeLeft / totalSeconds) * 100;
  console.log(
    "Progress Percentage:",
    timeLeft,
    totalSeconds,
    progressPercentage
  );

  // Calculate stroke-dashoffset for circular progress
  const circumference = 2 * Math.PI * 9; // radius = 9
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  useEffect(() => {
    if (timeLeft <= 0) {
      onSessionExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const handlePreviousStep = () => {
    router.push("/hotel");
  };

  const handleConfirmAndContinue = () => {
    // Handle form submission
    console.log("Confirming order...");
  };

  // Determine circle color based on time remaining
  const getCircleColorClass = () => {
    if (timeLeft <= 300) return styles.circleRed; // 5 minutes = 300 seconds
    if (progressPercentage > 50) return styles.circleGreen;
    return styles.circleYellow;
  };

  return (
    <div className={styles.leftColumn}>
      <SessionExpiredModal
        isOpen={isSessionExpired}
        onClose={() => setIsSessionExpired(false)}
      />
      <div className={styles.contentWrapper}>
        {/* Timer Section */}
        <div className={styles.timerSection}>
          <div className={styles.timerContent}>
            <span className={styles.timerLabel}>زمان باقی مانده:</span>
            <div className={styles.timerDisplay}>
              <svg
                className={styles.circularProgress}
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <circle
                  className={styles.circleBackground}
                  cx="10"
                  cy="10"
                  r="9"
                  strokeWidth="2"
                />
                <circle
                  className={clsx(styles.circleProgress, getCircleColorClass())}
                  cx="10"
                  cy="10"
                  r="9"
                  strokeWidth="2"
                  transform="rotate(-90 10 10)"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>
              <span
                className={clsx(styles.timerText, {
                  [styles.timerDanger]: timeLeft <= 300, // 5 minutes = 300 seconds
                  [styles.timerYellow]:
                    timeLeft > 300 && progressPercentage <= 50,
                  [styles.timers]: progressPercentage > 50,
                })}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePreviousStep}
            className={styles.previousButton}
          >
            <svg
              className={styles.previousIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="14.219"
              viewBox="0 0 16 14.219"
            >
              <path
                fill="currentColor"
                d="M12.126 18.037a.667.667 0 1 1-.92-.965l5.557-5.293H3.667a.667.667 0 0 1 0-1.333h13.1l-5.56-5.294a.667.667 0 1 1 .92-.965l6.595 6.282a.884.884 0 0 1 .267.515.674.674 0 0 1 0 .257.884.884 0 0 1-.266.515z"
                transform="translate(-3 -4.002)"
              />
            </svg>
            مرحله قبل
          </button>
        </div>

        {/* Purchase Details */}
        <div className={styles.detailsCard}>
          <h6 className={styles.cardTitle}>جزئیات خرید</h6>
          <div className={styles.detailsContent}>
            <div className={styles.detailRow}>
              <div className={styles.detailLabel}>
                {roomCount} اتاق × {nightCount} شب
              </div>
              <div className={styles.detailPrice}>
                <span className={styles.priceAmount}>
                  {formatPrice(totalAmount)}
                </span>
                <span className={styles.priceCurrency}>ریال</span>
              </div>
            </div>
          </div>

          <div className={styles.totalSection}>
            <strong className={styles.totalLabel}>مبلغ قابل پرداخت</strong>
            <div className={styles.totalPrice}>
              <span className={styles.totalAmount}>
                {formatPrice(totalAmount)}
              </span>
              <span className={styles.totalCurrency}>ریال</span>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleConfirmAndContinue}
            className={styles.confirmButton}
          >
            تایید و ادامه
          </button>
        </div>

        {/* Loyalty Points Section */}
        <div className={styles.loyaltyCard}>
          <div className={styles.loyaltyContent}>
            <div className={styles.loyaltyInfo}>
              <img
                alt="coin"
                width="24"
                height="24"
                src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/icons/coin.svg"
                className={styles.coinIcon}
              />
              <span className={styles.loyaltyLabel}>امتیاز باشگاه مشتریان</span>
            </div>
            <span className={styles.loyaltyPoints}>{loyaltyPoints} امتیاز</span>
          </div>
        </div>
      </div>
    </div>
  );
}
