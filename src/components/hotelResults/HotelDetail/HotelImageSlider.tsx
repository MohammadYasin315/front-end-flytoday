import * as React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Hotel-Image-Slider.module.css";
import { HotelInfo } from "./HotelInfo";

interface HotelImageSliderProps {
  images: { src: string; alt: string }[];
  isFeatured?: boolean;
  hotelName?: string;
  hotelType?: string;
  starRating?: number;
  address?: string;
  roomType?: string;
  hasBreakfast?: boolean;
  amenities?: string[];
  rating?: number;
  remainingRooms?: number;
  priceFrom?: number;
}

export function HotelImageSlider({
  images,
  isFeatured = false,
  hotelName,
  hotelType,
  starRating,
  address,
  roomType,
  hasBreakfast,
  amenities,
  rating,
  remainingRooms,
  priceFrom,
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
        remainingRooms={remainingRooms}
        priceFrom={priceFrom}
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
                  src={images[currentImageIndex].src}
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
