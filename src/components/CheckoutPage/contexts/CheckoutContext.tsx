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
  pricePerNight: number;
  loyaltyPoints: number;
  roomId: number;
}

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
  hotelData: HotelData | null;
  setHotelData: (data: HotelData) => void;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  travelerInfo: TravelerInfo;
  setTravelerInfo: (info: TravelerInfo) => void;
  roomId: number | null; 
  setRoomId: (id: number) => void;
  reservationId: number | null; 
  setReservationId: (id: number) => void;
  discountCode: string; 
  setDiscountCode: (code: string) => void; 
  additionalInfo: string; 
  setAdditionalInfo: (info: string) => void; 
  acceptedTerms: boolean; 
  setAcceptedTerms: (accepted: boolean) => void;
  voucherCode: string; 
  setVoucherCode: (code: string) => void; 
  paymentData: any; 
  setPaymentData: (data: any) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);
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
    setCurrentStep((prev) => Math.min(prev + 1,3));
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

  const handleSetRoomId = useCallback((id: number) => {
    setRoomId(id);
  }, []);

  const [reservationId, setReservationId] = useState<number | null>(null);

  const handleSetReservationId = useCallback((id: number) => {
    setReservationId(id);
  }, []);

  const [discountCode, setDiscountCode] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleSetDiscountCode = useCallback((code: string) => {
    setDiscountCode(code);
  }, []);

  const handleSetAdditionalInfo = useCallback((info: string) => {
    setAdditionalInfo(info);
  }, []);

  const handleSetAcceptedTerms = useCallback((accepted: boolean) => {
    setAcceptedTerms(accepted);
  }, []);

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleSetVoucherCode = useCallback((code: string) => {
    setVoucherCode(code);
  }, []);

  const handleSetPaymentData = useCallback((data: any) => {
    setPaymentData(data);
  }, []);

  const value = {
    currentStep,
    goToNextStep,
    goToPrevStep,
    hotelData,
    setHotelData,
    contactInfo,
    setContactInfo: handleSetContactInfo,
    travelerInfo,
    setTravelerInfo: handleSetTravelerInfo,
    roomId,
    setRoomId: handleSetRoomId,
    reservationId,
    setReservationId: handleSetReservationId,
    discountCode,
    setDiscountCode: handleSetDiscountCode,
    additionalInfo,
    setAdditionalInfo: handleSetAdditionalInfo,
    acceptedTerms,
    setAcceptedTerms: handleSetAcceptedTerms,
    voucherCode,
    setVoucherCode: handleSetVoucherCode,
    paymentData,
    setPaymentData: handleSetPaymentData,
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
