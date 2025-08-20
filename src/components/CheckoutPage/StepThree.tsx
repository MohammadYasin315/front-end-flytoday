import React from "react";
import { useCheckout } from "./contexts/CheckoutContext";
import styles from "./StepThree.module.css";
import { CheckCircle, Download, Printer, Mail } from "lucide-react";

const StepThree: React.FC = () => {
  const { paymentData, voucherCode, hotelData, travelerInfo, contactInfo } =
    useCheckout();

  // استخراج اطلاعات از paymentData
  const voucher =
    voucherCode ||
    paymentData?.tracking_code ||
    "در حال دریافت...";

  const reservationId =
    paymentData?.reservation || paymentData?.reservation_id || "---";

  const paymentDate = paymentData?.created_at
    ? new Date(paymentData.created_at).toLocaleDateString("fa-IR")
    : new Date().toLocaleDateString("fa-IR");

  const paymentAmount =
    paymentData?.amount ||
    paymentData?.total_price ||
    hotelData?.pricePerNight * hotelData?.nights ||
    0;

  const handleDownloadVoucher = () => {
    // ایجاد PDF یا تصویر واچر برای دانلود
    const voucherContent = `
      واچر رزرو هتل
      ==================================
      کد پیگیری: ${voucher}
      شماره رزرو: ${reservationId}
      هتل: ${hotelData?.hotelName}
      مسافر: ${travelerInfo.firstName} ${travelerInfo.lastName}
      تاریخ رزرو: ${paymentDate}
      مبلغ پرداختی: ${paymentAmount.toLocaleString("fa-IR")} ریال
    `;

    const blob = new Blob([voucherContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voucher-${voucher}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintVoucher = () => {
    const printContent = `
      <div style="font-family: Tahoma; direction: rtl; text-align: right; padding: 20px;">
        <h2 style="color: #007bff; text-align: center;">واچر رزرو هتل</h2>
        <div style="border: 2px solid #007bff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p><strong>کد پیگیری:</strong> ${voucher}</p>
          <p><strong>شماره رزرو:</strong> ${reservationId}</p>
          <p><strong>هتل:</strong> ${hotelData?.hotelName}</p>
          <p><strong>اتاق:</strong> ${hotelData?.roomType}</p>
          <p><strong>مسافر:</strong> ${travelerInfo.firstName} ${
      travelerInfo.lastName
    }</p>
          <p><strong>کد ملی:</strong> ${travelerInfo.nationalId}</p>
          <p><strong>تلفن:</strong> ${contactInfo.mobile}</p>
          <p><strong>ایمیل:</strong> ${contactInfo.email}</p>
          <p><strong>تاریخ check-in:</strong> ${hotelData?.checkIn}</p>
          <p><strong>تاریخ check-out:</strong> ${hotelData?.checkOut}</p>
          <p><strong>تعداد شب‌ها:</strong> ${hotelData?.nights} شب</p>
          <p><strong>مبلغ پرداختی:</strong> ${paymentAmount.toLocaleString(
            "fa-IR"
          )} ریال</p>
          <p><strong>تاریخ رزرو:</strong> ${paymentDate}</p>
        </div>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.successHeader}>
          <CheckCircle className={styles.successIcon} />
          <h2 className={styles.successTitle}>پرداخت با موفقیت انجام شد!</h2>
          <p className={styles.successMessage}>
            رزرو شما با موفقیت ثبت و پرداخت شد. می‌توانید واچر خود را دریافت
            کنید.
          </p>
        </div>

        <div className={styles.voucherSection}>
          <h3 className={styles.voucherTitle}>واچر رزرو</h3>

          <div className={styles.voucherCard}>
            <div className={styles.voucherHeader}>
              <span className={styles.voucherLabel}>کد پیگیری:</span>
              <span className={styles.voucherCode}>{voucher}</span>
            </div>

            <div className={styles.voucherDetails}>
              <div className={styles.detailRow}>
                <span>شماره رزرو:</span>
                <span>{reservationId}</span>
              </div>

              <div className={styles.detailRow}>
                <span>هتل:</span>
                <span>{hotelData?.hotelName || "---"}</span>
              </div>

              <div className={styles.detailRow}>
                <span>اتاق:</span>
                <span>{hotelData?.roomType || "---"}</span>
              </div>

              <div className={styles.detailRow}>
                <span>مسافر:</span>
                <span>
                  {travelerInfo.firstName} {travelerInfo.lastName}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span>تاریخ ورود:</span>
                <span>{hotelData?.checkIn || "---"}</span>
              </div>

              <div className={styles.detailRow}>
                <span>تاریخ خروج:</span>
                <span>{hotelData?.checkOut || "---"}</span>
              </div>

              <div className={styles.detailRow}>
                <span>تعداد شب‌ها:</span>
                <span>{hotelData?.nights || 0} شب</span>
              </div>

              <div className={styles.detailRow}>
                <span>مبلغ پرداختی:</span>
                <span>{paymentAmount.toLocaleString("fa-IR")} ریال</span>
              </div>

              <div className={styles.detailRow}>
                <span>تاریخ رزرو:</span>
                <span>{paymentDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            onClick={handleDownloadVoucher}
            className={styles.downloadButton}
          >
            <Download className={styles.buttonIcon} />
            دانلود واچر
          </button>

          <button onClick={handlePrintVoucher} className={styles.printButton}>
            <Printer className={styles.buttonIcon} />
            چاپ واچر
          </button>

          <button className={styles.emailButton}>
            <Mail className={styles.buttonIcon} />
            ارسال ایمیل
          </button>
        </div>

        <div className={styles.instructions}>
          <h4>راهنمایی:</h4>
          <ul>
            <li>واچر را چاپ کرده یا روی موبایل خود ذخیره کنید</li>
            <li>در زمان ورود واچر و کارت شناسایی به همراه داشته باشید</li>
            <li>
              کد پیگیری: <strong>{voucher}</strong> را نزد خود نگه دارید
            </li>
            <li>در صورت هرگونه مشکل با پشتیبانی تماس بگیرید</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
