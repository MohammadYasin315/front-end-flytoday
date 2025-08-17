import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import styles from "./Traveler-Info-Form.module.css";
import { useCheckout } from "../contexts/CheckoutContext";

interface TravelerInfoFormProps {
  className?: string;
}

export default function TravelerInfoForm({ className }: TravelerInfoFormProps) {
  const { contactInfo, goToPrevStep, hotelData, travelerInfo } = useCheckout();

  return (
    <div className={clsx(styles.container, className)}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>اطلاعات مسافران</div>
        <span className={styles.editButton} onClick={goToPrevStep}>
          ویرایش
        </span>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.notificationSection}>
          کاربر گرامی، لطفا از صحت اطلاعات وارد شده (شماره موبایل و ایمیل)
          اطمینان حاصل کنید تا در مواقع ضروری امکان تماس با شما فراهم باشد.
        </div>

        {/* Contact Information */}
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>ایمیل:</span>
            <span className={clsx(styles.contactValue, styles.emailValue)}>
              {contactInfo.email || "اطلاعاتی وارد نشده"}
            </span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>موبایل:</span>
            <span className={styles.contactValue}>
              {contactInfo.mobile || "اطلاعاتی وارد نشده"}
            </span>
          </div>
        </div>
        {/* Late Check-in Information */}
        {contactInfo.lateCheckIn && (
          <div className={styles.lateCheckInSection}>
            <div className={styles.lateCheckInLabel}>زمان ورود دیرهنگام:</div>
            <div className={styles.lateCheckInValue}>
              {contactInfo.arrivalTime || "زمان مشخص نشده"}
            </div>
          </div>
        )}
      </div>

      {/* Room Information Card */}
      <div className={styles.roomCard}>
        <div className={styles.roomHeader}>
          <div className={styles.roomTitle}>اتاق اول،</div>
          <div className={styles.roomDetails}>
            <div className={styles.roomType}>{hotelData.roomType}</div>
            <div className={styles.roomFeature}>
              ({hotelData.hasBreakfast ? "صبحانه" : "بدون صبحانه"})
            </div>
          </div>
        </div>

        {/* Traveler Information */}
        <div className={styles.travelerSection}>
          <div className={styles.travelerInfo}>
            <span className={styles.travelerRole}>بزرگسال اول (سرپرست)</span>

            <div className={styles.travelerDetail}>
              <div className={styles.detailLabel}>نام و نام خانوادگی:</div>
              <div className={styles.detailValue}>
                {travelerInfo.firstName || "نام"}{" "}
                {travelerInfo.lastName || "نام خانوادگی"}
              </div>
            </div>

            <div className={styles.travelerDetail}>
              <div className={styles.detailLabel}>جنسیت:</div>
              <div className={styles.detailValue}>
                {travelerInfo.gender || "جنسیت انتخاب نشده"}
              </div>
            </div>

            <div className={styles.travelerDetail}>
              <div className={styles.detailLabel}>کد ملی:</div>
              <div className={styles.detailValue}>
                {travelerInfo.nationalId || "کد ملی وارد نشده"}
              </div>
            </div>
          </div>

          {/* Details Button */}
          <div className={styles.detailsButton}>
            جزئیات
            <ChevronLeftIcon className={styles.chevronIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
