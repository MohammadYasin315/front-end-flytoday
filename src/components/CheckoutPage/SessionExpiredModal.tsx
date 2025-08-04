import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./Session-Expired-Modal.module.css";

interface SessionExpiredModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SessionExpiredModal({
  isOpen = true,
  onClose,
}: SessionExpiredModalProps) {
  const router = useRouter();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [isOpen]);

  const handleBackToHome = () => {
    onClose?.(); // Close modal before navigating
    router.push("/hotel");
  };

  const handleRefreshSearch = () => {
    onClose?.(); // Close modal before reloading
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBody}>
          <div className={styles.iconContainer}>
            <img
              src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/errors/time-out-clock.svg"
              alt="time expired"
              className={styles.iconImage}
            />
          </div>

          <h2 className={styles.title}>اعتبار نتایج به پایان رسید</h2>

          <p className={styles.description}>
            جهت نمایش قیمت‌ها و اطلاعات به‌روز، لطفا مجددا جستجو کنید.
          </p>

          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              type="button"
              onClick={handleRefreshSearch}
            >
              بروزرسانی جستجو
            </button>

            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              type="button"
              onClick={handleBackToHome}
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
