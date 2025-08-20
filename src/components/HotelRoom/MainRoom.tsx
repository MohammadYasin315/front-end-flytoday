import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RoomDetailCard from "./RoomDetailCard";
import styles from "./Main-Room.module.css";
import { getHotelRooms } from "../utils/api";

interface Room {
  id: number;
  name: string;
  price_per_night: string;
  cancellation_policy: string;
  breakfast_included: boolean;
}

export default function MainRooms() {
  const router = useRouter();
  const { hotel_id } = router.query;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hotel_id) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const hotelData = await getHotelRooms(Number(hotel_id));
        setRooms(hotelData.rooms || []);
      } catch (err) {
        setError("خطا در دریافت اطلاعات اتاق‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotel_id]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {rooms.map((room) => {
          const priceNumber = parseInt(room.price_per_night.replace(/[^0-9]/g, "")) || 0;


          return (
            <RoomDetailCard
              key={room.id}
              title={room.name}
              subtitle={room.breakfast_included ? "(صبحانه)" : "(بدون صبحانه)"}
              image="https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/main.jpg?width=600"
              price={priceNumber}
              currency="تومان"
              loyaltyPoints={Math.floor(priceNumber / 1000000)}
              roomId={room.id} onSelect={function (): void {
                throw new Error("Function not implemented.");
              } }            />
          );
        })}
      </div>
    </div>
  );
}
