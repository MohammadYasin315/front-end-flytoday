import React from "react";
import styles from "./Step-One.module.css";
import { useCheckout } from "../contexts/CheckoutContext";
import HotelInfoCard from "./HotelInfoCard";
import GuestContactForm from "./GuestContactForm";
import TravelerInfoForm from "./TravelerForm";
import CancellationPolicy from "../CancellationPolicy";
import HotelPolicies from "../HotelPolicies";

const StepOne: React.FC = () => {
  const { hotelData } = useCheckout();

  return (
    <div className={styles.container}>
      {hotelData && <HotelInfoCard {...hotelData} />}
      <GuestContactForm />
      <TravelerInfoForm />
      <CancellationPolicy />
      <HotelPolicies />
    </div>
  );
};

export default StepOne;
