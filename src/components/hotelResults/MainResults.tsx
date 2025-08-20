import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./Main-Results.module.css";
import FilterBar from "./FilterBar/FilterBar";
import HotelSortList from "./HotelDetail/HotelSortList";
import HotelImageSlider from "./HotelDetail/HotelImageSlider";
import { toast, ToastContainer } from "react-toastify";

interface Hotel {
  id: number;
  hotelName: string;
  hotelType: string;
  starRating: number;
  address: string;
  roomType: string;
  hasBreakfast: boolean;
  amenities: string[];
  rating: number;
  remainingRooms: number;
  priceFrom: number;
  images: { src: string; alt: string }[];
  isFeatured: boolean;
}

export default function MainResults() {
  const router = useRouter();
  const { city_id } = router.query;

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateStarRating = (rating: number) => {
    if (rating >= 10) return 5;
    if (rating >= 8) return 4;
    if (rating >= 6) return 3;
    if (rating >= 4) return 2;
    if (rating >= 2) return 1;
    return 0;
  };

  useEffect(() => {
    if (!city_id) return;

    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/hotels/", {
          params: { city_id },
        });

        const rawHotels = response.data.hotels || [];

        const formattedHotels: Hotel[] = rawHotels.map((hotel: any) => ({
          id: hotel.id,
          hotelName: hotel.name || "بدون نام",
          hotelType: "هتل",
          starRating: calculateStarRating(parseFloat(hotel.rating) || 0),
          address: hotel.location || "آدرس ثبت نشده",
          roomType: hotel.rooms?.[0]?.name || "نامشخص",
          hasBreakfast: hotel.rooms?.[0]?.breakfast_included,
          amenities: ["وای فای", "پارکینگ", "رستوران", "آسانسور"],
          rating: parseFloat(hotel.rating) || 0,
          remainingRooms: hotel.rooms?.length || 0,
          priceFrom: hotel.starting_price || 0,
          images: [
            {
              src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/main.jpg?width=412",
              alt: hotel.name || "هتل",
            },
            {
              src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/1.jpg?width=412",
              alt: hotel.name || "هتل",
            },
            {
              src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/7.jpg?width=412",
              alt: hotel.name || "هتل",
            },
            {
              src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/3.jpg?width=412",
              alt: hotel.name || "هتل",
            },
            {
              src: "https://cdn-a-hid.cdnfl2.ir/upload/hotelimagesdomestic/4/4.jpg?width=412",
              alt: hotel.name || "هتل",
            },
          ],
          isFeatured: false,
        }));

        setHotels(formattedHotels);
      } catch (error) {
        toast.error(
          "هیچ هتلی برای این شهر پیدا نشد. لطفا شهر را تغییر داده و دوباره تلاش کنید."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city_id]);

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={styles.customToastContainer}
        toastClassName={styles.customToast}
      />
      <div className={styles.mainLayout}>
        <div className={styles.filterColumn}>
          <FilterBar />
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.sortHeader}>
            <HotelSortList />
          </div>

          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : hotels.length > 0 ? (
            hotels.map((hotel) => (
              <HotelImageSlider
                hotelId={hotel.id}
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
            ))
          ) : (
            <p className={styles.apiError}></p>
          )}
        </div>
      </div>
    </div>
  );
}
