import React, { createContext, useContext, useState, useCallback } from "react";

interface HotelData {
  hotelName: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  score: number;
  roomType: string;
  hasBreakfast: boolean;
  checkIn: string;
  checkOut: string;
  nights: number;
  hotelUrl: string;
}
const hotelData: HotelData = {
  hotelName: "هویزه تهران",
  imageUrl:
    "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/79/main.jpg?width=320",
  imageAlt: "Howeyzeh Tehran Hotel",
  rating: 2,
  score: 6.7,
  roomType: "اتاق دو تخته تویین",
  hasBreakfast: true,
  checkIn: "12 مرداد",
  checkOut: "14 مرداد",
  nights: 2,
  hotelUrl: "/howeyzeh-tehran",
};

interface ContactInfo {
  email: string;
  mobile: string;
  lateCheckIn: boolean;
  arrivalTime: string;
}

interface TravelerInfo {
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: string | null;
}

interface CheckoutContextType {
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  hotelData: HotelData;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  travelerInfo: TravelerInfo;
  setTravelerInfo: (info: TravelerInfo) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    mobile: "",
    lateCheckIn: false,
    arrivalTime: "",
  });

  const [travelerInfo, setTravelerInfo] = useState<TravelerInfo>({
    firstName: "",
    lastName: "",
    nationalId: "",
    gender: null,
  });

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  }, []);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSetContactInfo = useCallback((info: ContactInfo) => {
    setContactInfo(info);
  }, []);

  const handleSetTravelerInfo = useCallback((info: TravelerInfo) => {
    setTravelerInfo(info);
  }, []);

  const value = {
    currentStep,
    goToNextStep,
    goToPrevStep,
    hotelData,
    contactInfo,
    setContactInfo: handleSetContactInfo,
    travelerInfo,
    setTravelerInfo: handleSetTravelerInfo,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
