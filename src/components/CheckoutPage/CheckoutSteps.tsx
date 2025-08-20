import React from "react";
import { useCheckout } from "./contexts/CheckoutContext";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree"; 
import BookingSteps from "@/components/CheckoutPage/BookingSteps";

const CheckoutSteps: React.FC = () => {
  const { currentStep, hotelData } = useCheckout();

  return (
    <>
      <BookingSteps currentStep={currentStep} />
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
    </>
  );
};

export default CheckoutSteps;
