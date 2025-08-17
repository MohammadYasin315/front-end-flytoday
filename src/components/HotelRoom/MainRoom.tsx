import { useEffect, useState } from 'react';
import RoomDetailCard from "./RoomDetailCard";
import styles from "./Main-Room.module.css";
import { getHotelRooms } from '../utils/api';

interface Room {
  id: number;
  name: string;
  price_per_night: string;
  cancellation_policy: string;
  breakfast_included: boolean;
}

export default function MainRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const hotelData = await getHotelRooms(3);
        setRooms(hotelData.rooms);
      } catch (err) {
        setError('خطا در دریافت اطلاعات اتاق‌ها');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {rooms.map((room) => (
          <RoomDetailCard
            key={room.id}
            title={room.name}
            subtitle={room.breakfast_included ? "(صبحانه)" : "(بدون صبحانه)"}
            image="https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/main.jpg?width=600"
            price={room.price_per_night}
            currency="ریال"
            loyaltyPoints={Math.floor(parseInt(room.price_per_night) / 1000000)}
            bookingUrl={`/hotel/book/${room.id}`}
          />
        ))}
      </div>
    </div>
  );
}