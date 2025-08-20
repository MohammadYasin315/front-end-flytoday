import React, { useEffect } from "react";
import styles from "./Checkout-Main.module.css";
import { useCheckout } from "./contexts/CheckoutContext";
import CheckoutSteps from "./CheckoutSteps";
import OrderSummary from "@/components/CheckoutPage/OrderSummary";
import SessionExpiredModal from "@/components/CheckoutPage/SessionExpiredModal";
import { useRouter } from "next/router";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function CheckoutMain() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();
  const { room_id } = router.query;
  const { setHotelData, currentStep, setRoomId } = useCheckout();

  const { checkIn, checkOut } = useSelector((state: RootState) => state.search);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateNights = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // اختلاف به روز
  };

  useEffect(() => {
    if (!room_id) return;

    const roomIdNum = parseInt(room_id as string);
    if (!isNaN(roomIdNum)) {
      setRoomId(roomIdNum);
    }

    const fetchRoomData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/rooms/${room_id}/`);
        const data = await res.json();

        setHotelData({
          hotelName: data.hotel_name,
          imageUrl:
            "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/main.jpg?width=320",
          imageAlt: data.hotel_name,
          rating: data.hotel_rating,
          score: data.hotel_rating,
          roomType: data.room_name,
          hasBreakfast: data.breakfast_included,
          checkIn: checkIn,
          checkOut: checkOut,
          nights: calculateNights(checkIn, checkOut),
          hotelUrl: `/hotels/${data.hotel_id}`,
          pricePerNight: data.price_per_night,
          loyaltyPoints: Math.floor(data.price_per_night / 1000000),
          roomId: roomIdNum, 
        });
      } catch (err) {
        console.error("خطا در گرفتن اطلاعات اتاق:", err);
      }
    };

    fetchRoomData();
  }, [room_id, setHotelData, setRoomId, checkIn, checkOut]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <CheckoutSteps />
          </div>
          {currentStep < 3 && (
            <OrderSummary onSessionExpire={() => setIsModalOpen(true)} />
          )}
        </div>
        <SessionExpiredModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </form>
    </div>
  );
}
