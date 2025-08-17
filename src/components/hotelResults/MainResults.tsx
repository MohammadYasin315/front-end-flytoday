import styles from "./Main-Results.module.css";
import FilterBar from "./FilterBar/FilterBar";
import HotelSortList from "./HotelDetail/HotelSortList";
import HotelImageSlider from "./HotelDetail/HotelImageSlider";

const hotelsData = [
  {
    id: 1,
    hotelName: "آناتا تهران",
    hotelType: "هتل",
    starRating: 5,
    address:
      "تهران، خیابان آزادی، نرسیده به میدان انقلاب، روبروی دانشکده دامپزشکی، انتهای خیابان زارع، پلاک ۱",
    roomType: "اتاق یک تخته",
    hasBreakfast: true,
    amenities: ["وای فای", "پارکینگ", "رستوران", "آسانسور"],
    rating: 6.7,
    remainingRooms: 2,
    priceFrom: 43500000,
    images: [
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/main.jpg?width=720",
        alt: "Hotel Exterior",
      },
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/1.jpg?width=360",
        alt: "Hotel Room Interior",
      },
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/2.jpg?width=360",
        alt: "Another Hotel Room",
      },
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/111/3.jpg?width=360",
        alt: "Hotel Pool",
      },
    ],
    isFeatured: true,
  },
  {
    id: 2,
    hotelName: "هتل اسپیناس تهران",
    hotelType: "هتل",
    starRating: 4,
    address: "تهران، خیابان ولیعصر، نرسیده به میدان ولیعصر",
    roomType: "سوئیت دو تخته",
    hasBreakfast: false,
    amenities: ["وای فای", "استخر", "رستوران", "سالن ورزشی"],
    rating: 8.2,
    remainingRooms: 5,
    priceFrom: 62000000,
    images: [
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/222/main.jpg?width=720",
        alt: "Hotel Exterior",
      },
      {
        src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/222/1.jpg?width=360",
        alt: "Hotel Room Interior",
      },
    ],
    isFeatured: false,
  },
];

export default function MainResults() {
  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        <div className={styles.filterColumn}>
          <FilterBar />
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.sortHeader}>
            <HotelSortList />
          </div>
          {hotelsData.map((hotel) => (
            <HotelImageSlider
              key={hotel.id}
              images={hotel.images}
              isFeatured={hotel.isFeatured}
              hotelName={hotel.hotelName}
              hotelType={hotel.hotelType}
              starRating={hotel.starRating}
              address={hotel.address}
              roomType={hotel.roomType}
              hasBreakfast={hotel.hasBreakfast}
              amenities={hotel.amenities}
              rating={hotel.rating}
              remainingRooms={hotel.remainingRooms}
              priceFrom={hotel.priceFrom}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
