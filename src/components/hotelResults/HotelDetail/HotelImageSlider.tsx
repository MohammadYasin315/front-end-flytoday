import * as React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Hotel-Image-Slider.module.css";
import { HotelInfo } from "./HotelInfo";

interface HotelImageSliderProps {
  images?: { src: string; alt: string }[];
  isFeatured?: boolean;
  hotelId?: string;
  cityId?: string;
  checkIn?: string;
  checkOut?: string;
  adt?: number[];
  chd?: number[];
  chdAges?: string[];
  dateLang?: string;
  isDomestic?: boolean;
  countryCode?: string;
  hotelName?: string;
  hotelType?: string;
  starRating?: number;
  address?: string;
  roomType?: string;
  hasBreakfast?: boolean;
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  remainingRooms?: number;
  priceFrom?: number;
  currency?: string;
}

export function HotelImageSlider({
  images = [
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
  isFeatured = false,
  hotelId = "111",
  cityId = "1",
  checkIn = "2025-07-12",
  checkOut = "2025-07-13",
  adt = [1],
  chd = [0],
  chdAges = [],
  dateLang = "fa",
  isDomestic = true,
  countryCode = "IR",
  hotelName,
  hotelType,
  starRating,
  address,
  roomType,
  hasBreakfast,
  amenities,
  rating,
  reviewCount,
  remainingRooms,
  priceFrom,
  currency,
}: HotelImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showBookmarkTooltip, setShowBookmarkTooltip] = React.useState(false);
  const [hasInteractedWithSlider, setHasInteractedWithSlider] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const totalImages = images.length;

  const handleImageChange = (newIndex: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setHasInteractedWithSlider(true);
      setIsLoading(false);
    }, 500);
  };

  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
    handleImageChange(newIndex);
  };

  const handleNextImage = () => {
    const newIndex =
      currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
    handleImageChange(newIndex);
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked((prev) => !prev);
  };

  const handleShowRooms = () => {
    const hotelAvailabilityUrl = `/hotel/search/hotelavailability?hotelId=${hotelId}&cityId=${cityId}&checkIn=${checkIn}&checkOut=${checkOut}&adt[0]=${
      adt[0]
    }&chd[0]=${chd[0]}&chdAges[0]=${
      chdAges[0] || ""
    }&dateLang=${dateLang}&isDomestic=${isDomestic}&countryCode=${countryCode}`;

    window.open(hotelAvailabilityUrl, "_blank");
  };

  const hotelAvailabilityUrl = `/hotel/search/hotelavailability?hotelId=${hotelId}&cityId=${cityId}&checkIn=${checkIn}&checkOut=${checkOut}&adt[0]=${
    adt[0]
  }&chd[0]=${chd[0]}&chdAges[0]=${
    chdAges[0] || ""
  }&dateLang=${dateLang}&isDomestic=${isDomestic}&countryCode=${countryCode}`;

  return (
    <a
      target="_blank"
      className={clsx(
        styles.mainContainer,
        styles.linkToDefault,
        styles.cardBase,
        {
          [styles.featuredBorder]: isFeatured,
          [styles.normalBorder]: !isFeatured,
        }
      )}
      href={hotelAvailabilityUrl}
      rel="noreferrer"
    >
      {/* Hotel Info Section - Left */}
      <HotelInfo
        hotelName={hotelName}
        hotelType={hotelType}
        starRating={starRating}
        address={address}
        roomType={roomType}
        hasBreakfast={hasBreakfast}
        amenities={amenities}
        rating={rating}
        reviewCount={reviewCount}
        remainingRooms={remainingRooms}
        priceFrom={priceFrom}
        currency={currency}
        onShowRooms={handleShowRooms}
      />

      {/* Image Slider Section - Right */}
      <div className={styles.imageSection}>
        <div className={styles.bookmarkButtonWrapper}>
          <div
            className={styles.tooltipWrapper}
            onMouseEnter={() => setShowBookmarkTooltip(true)}
            onMouseLeave={() => setShowBookmarkTooltip(false)}
          >
            <button
              className={clsx(styles.bookmarkButtonBase, styles.bookmarkButton)}
              onClick={handleBookmarkToggle}
              aria-label="bookmark hotel"
            >
              <Heart
                className={styles.heartIcon}
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
              />
            </button>
            {showBookmarkTooltip && (
              <div className={styles.bookmarkTooltip}>{"نشان کردن"}</div>
            )}
          </div>
        </div>
        <div className={clsx(styles.sliderWrapper, styles.sliderContainer)}>
          <div className={styles.sliderInner}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  alt={images[currentImageIndex].alt}
                  loading="eager"
                  decoding="async"
                  data-nimg="1"
                  className={styles.hotelImage}
                  src={images[currentImageIndex].src || "/placeholder.svg"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {isLoading && (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.loadingDots}>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                    </div>
                  </div>
                )}
                <div className={styles.navigationOverlay}>
                  <button
                    className={clsx(styles.navButton, styles.navButtonSpacing)}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrevImage();
                    }}
                    disabled={isLoading}
                    aria-label="Previous image"
                  >
                    <ChevronRight className={styles.navIcon} />
                  </button>
                  <button
                    className={clsx(styles.navButton, styles.navButtonSpacing)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNextImage();
                    }}
                    disabled={isLoading}
                    aria-label="Next image"
                  >
                    <ChevronLeft className={styles.navIcon} />
                  </button>
                </div>
                {hasInteractedWithSlider && (
                  <div className={styles.imageCounter}>{`${
                    currentImageIndex + 1
                  } / ${totalImages}`}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default HotelImageSlider;
