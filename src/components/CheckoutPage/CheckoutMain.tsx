import React, { useState } from "react";
import styles from "./Checkout-Main.module.css";
import BookingSteps from "@/components/CheckoutPage/BookingSteps";
import OrderSummary from "@/components/CheckoutPage/OrderSummary";
import SessionExpiredModal from "@/components/CheckoutPage/SessionExpiredModal";
import HotelInfoCard from "./HotelInfoCard";
import GuestContactForm from "./GuestContactForm";
import CancellationPolicy from "./CancellationPolicy";
import HotelPolicies from "./HotelPolicies";

export default function CheckoutMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <BookingSteps currentStep={1} />
            <HotelInfoCard
              hotelName="هویزه تهران"
              imageUrl="https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/79/main.jpg?width=320"
              imageAlt="Howeyzeh Tehran Hotel"
              rating={4}
              score={6.7}
              roomType="اتاق دو تخته تویین"
              hasBreakfast={true}
              checkIn="12 مرداد"
              checkOut="14 مرداد"
              nights={2}
              hotelUrl="/hotel/howeyzeh-tehran"
            />

            <GuestContactForm />
            <CancellationPolicy/>
            <HotelPolicies />
          </div>

          <OrderSummary
            initialTimeInMinutes={20}
            roomCount={1}
            nightCount={8}
            totalAmount={112000000}
            loyaltyPoints={111}
            onSessionExpire={() => setIsModalOpen(true)}
          />
        </div>

        <SessionExpiredModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </form>
    </div>
  );
}
