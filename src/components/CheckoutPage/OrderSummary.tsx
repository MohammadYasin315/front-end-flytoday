import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import styles from "./Order-Summary.module.css";
import SessionExpiredModal from "./SessionExpiredModal";
import { useCheckout } from "./contexts/CheckoutContext";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { getAccessToken } from "../utils/auth";
import AdditionalInfo from "./StepTwo/AdditionalInfo";
import DiscountCodeForm from "./StepTwo/DiscountCodeForm";
import HotelPolicyAgreement from "./StepTwo/HotelPolicyAgreement";

interface OrderSummaryProps {
  initialTimeInMinutes?: number;
  nightCount?: number;
  totalAmount?: number;
  loyaltyPoints?: number;
  onSessionExpire?: () => void;
  onConfirm?: () => void;
}

export default function OrderSummary({
  initialTimeInMinutes = 20,
  onSessionExpire,
}: OrderSummaryProps) {
  const {
    goToNextStep,
    contactInfo,
    travelerInfo,
    currentStep,
    hotelData,
    roomId,
    setReservationId,
    reservationId,
    discountCode,
    additionalInfo,
    acceptedTerms,
    setPaymentData,
    setVoucherCode,
  } = useCheckout();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(initialTimeInMinutes * 60); // Convert to seconds
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const { checkIn, checkOut, guests } = useSelector(
    (state: RootState) => state.search
  );

  const nightCount = hotelData?.nights || 0;

  const totalAmount =
    (hotelData?.pricePerNight || 0) * (hotelData?.nights || 0);

  const loyaltyPoints = hotelData?.loyaltyPoints || 0;

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

  const handleConfirmAndContinue = async (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("شروع رزرو...");
    console.log("roomId:", roomId);
    console.log("checkIn:", checkIn);
    console.log("checkOut:", checkOut);
    console.log("travelerInfo:", travelerInfo);
    console.log("contactInfo:", contactInfo);

    if (!contactInfo.email || !contactInfo.mobile) {
      toast.error("لطفا اطلاعات تماس را تکمیل کنید");
      return;
    }
    if (
      !travelerInfo.firstName ||
      !travelerInfo.lastName ||
      !travelerInfo.nationalId ||
      !travelerInfo.gender
    ) {
      toast.error("لطفا اطلاعات مسافر را تکمیل کنید");
      return;
    }

    if (!roomId) {
      toast.error("اتاق انتخاب نشده است");
      return;
    }

    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    if (!token) {
      toast.error("ابتدا وارد حساب کاربری شوید");
      return;
    }

    const genderMapping: Record<string, string> = {
      مرد: "M",
      زن: "F",
    };
    const apiGender = genderMapping[travelerInfo.gender] || "";
    console.log("جنسیت تبدیل شده:", apiGender);

    try {
      console.log("ارسال درخواست به API...");

      const requestBody = {
        room: roomId,
        check_in: checkIn,
        check_out: checkOut,
        adults: guests,
        first_name: travelerInfo.firstName,
        last_name: travelerInfo.lastName,
        nationality: "IR",
        gender: apiGender,
        passport_number: travelerInfo.nationalId,
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch("http://127.0.0.1:8000/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("وضعیت پاسخ:", response.status);
      console.log("Headers:", Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log("متن پاسخ:", responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = {
            message: "خطای نامشخص در سرور",
            status: response.status,
          };
        }

        console.error("جزئیات خطا:", errorData);

        if (response.status === 400) {
          throw new Error("اتاق در تاریخ انتخاب شده رزرو شده است");
        } else {
          throw new Error(errorData.message || `خطای سرور: ${response.status}`);
        }
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("پاسخ سرور نامعتبر است");
      }

      console.log("پاسخ موفق:", data);
      toast.success("رزرو با موفقیت انجام شد");

      if (data.id) {
        setReservationId(data.id);
        console.log("Reservation ID saved:", data.id);
      }

      console.log("رفتن به مرحله بعد...");
      goToNextStep();
    } catch (error: any) {
      console.error("Reservation Error Details:", error);
      toast.error(error.message || "مشکلی در رزرو پیش آمد");
    }
  };

  const handlePayment = async () => {
    if (!reservationId) {
      toast.error("ابتدا رزرو را تکمیل کنید");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("لطفا دوباره وارد شوید");
      return;
    }

    try {
      console.log("شروع پرداخت برای reservation:", reservationId);

      const response = await fetch("http://127.0.0.1:8000/payments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservation: reservationId,
          discount_code: discountCode || null,
          description:
            additionalInfo || `پرداخت رزرو هتل ${hotelData?.hotelName}`,
          accepted_terms: true,
        }),
      });

      console.log("وضعیت پرداخت:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("خطای پرداخت:", errorText);

        let errorMessage = "خطا در پرداخت";

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Payment successful:", data);

      // ذخیره داده‌های پرداخت و کد واچر از response
      if (data.tracking_code) {
        setVoucherCode(data.tracking_code);
        console.log("Tracking code received:", data.tracking_code);
      }

      setPaymentData(data);

      toast.success("پرداخت با موفقیت انجام شد");

      goToNextStep();
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "مشکلی در پرداخت پیش آمد");
    }
  };

  // Determine circle color based on time remaining
  const getCircleColorClass = () => {
    if (timeLeft <= 300) return styles.circleRed; // 5 minutes = 300 seconds
    if (progressPercentage > 50) return styles.circleGreen;
    return styles.circleYellow;
  };

  return (
    <div className={styles.leftColumn}>
      <ToastContainer
        z-index={40000}
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              <div className={styles.detailLabel}>{nightCount} شب</div>
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
            type="button"
            onClick={() => {
              if (currentStep === 2 && !acceptedTerms) {
                toast.error("لطفا قوانین و مقررات را بپذیرید", {
                });
                return;
              }

              if (currentStep === 1) {
                handleConfirmAndContinue();
              } else {
                handlePayment();
              }
            }}
            className={styles.confirmButton}
          >
            {currentStep === 1 ? "تایید و ادامه" : "تایید و پرداخت نهایی"}
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
