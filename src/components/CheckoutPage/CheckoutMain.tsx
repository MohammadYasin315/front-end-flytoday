import React from "react";
import styles from "./Checkout-Main.module.css";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import CheckoutSteps from "./CheckoutSteps";
import OrderSummary from "@/components/CheckoutPage/OrderSummary";
import SessionExpiredModal from "@/components/CheckoutPage/SessionExpiredModal";

export default function CheckoutMain() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CheckoutProvider>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              <CheckoutSteps />
            </div>
            <OrderSummary onSessionExpire={() => setIsModalOpen(true)} />
          </div>
          <SessionExpiredModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </form>
      </div>
    </CheckoutProvider>
  );
}
