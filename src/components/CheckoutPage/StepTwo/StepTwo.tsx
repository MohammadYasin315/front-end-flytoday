import React from "react";
import styles from "./StepTwo.module.css";
import { useCheckout } from "../contexts/CheckoutContext";
import HotelInfoCard from "../StepOne/HotelInfoCard";
import CancellationPolicy from "../CancellationPolicy";
import HotelPolicies from "../HotelPolicies";
import TravelerInfoForm from "./TravelerInfoForm";
import HotelPolicyAgreement from "./HotelPolicyAgreement";
import AdditionalInfo from "./AdditionalInfo";
import DiscountCodeForm from "./DiscountCodeForm";

const StepTwo: React.FC = () => {
  const { hotelData } = useCheckout();

  return (
    <div className={styles.container}>
      {hotelData && <HotelInfoCard {...hotelData} />}
      <TravelerInfoForm />
      <CancellationPolicy />
      <HotelPolicies />
      <AdditionalInfo />
      <DiscountCodeForm />
      <HotelPolicyAgreement />
    </div>
  );
};

export default StepTwo;
