import RoomDetailCard from "./RoomDetailCard";
import styles from "./Main-Room.module.css";

export default function MainRooms() {
  const rooms = [
    {
      title: "اتاق دو تخته (اقامت ساعتی 9 تا 18)",
      subtitle: "(بدون وعده غذایی)",
      image:
        "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/main.jpg?width=600",
      price: "55,000,000",
      currency: "ریال",
      loyaltyPoints: 55,
      bookingUrl: "/hotel/book/81347150-1?dateLang=fa&isDomestic=true",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        {rooms.map((room, index) => {
          console.log(`room: ${room.title}`);
          console.log(`room: ${room.subtitle}`);
          console.log(`room: ${room.price}`);
          console.log(`room: ${room.currency}`);
          console.log(`index room: ${index}`);
          return <RoomDetailCard key={index} {...room} />;
        })}
      </div>
    </div>
  );
}

