import React from "react";
import { useCheckout } from "./contexts/CheckoutContext";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import BookingSteps from "@/components/CheckoutPage/BookingSteps";

const CheckoutSteps: React.FC = () => {
  const { currentStep, hotelData } = useCheckout();

  return (
    <>
      <BookingSteps currentStep={currentStep} />
      {currentStep === 1 ? <StepOne /> : <StepTwo />}
    </>
  );
};

export default CheckoutSteps;
