import type React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import clsx from "clsx";
import styles from "./Location-Search-Dropdown.module.css";
import { MapPinIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
interface City {
  id: number;
  city_name: string;
  accommodationCount: number;
  province: string;
  country: string;
}

interface LocationSearchDropdownProps {
  onSelect?: (city: City) => void;
  placeholder?: string;
  apiEndpoint?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const popularCities: City[] = [
  {
    id: 1,
    city_name: "تهران",
    accommodationCount: 182,
    province: "تهران",
    country: "ایران",
  },
  {
    id: 2,
    city_name: "مشهد",
    accommodationCount: 418,
    province: "خراسان رضوی",
    country: "ایران",
  },
  {
    id: 3,
    city_name: "کیش",
    accommodationCount: 61,
    province: "هرمزگان",
    country: "ایران",
  },
  {
    id: 4,
    city_name: "شیراز",
    accommodationCount: 134,
    province: "فارس",
    country: "ایران",
  },
  {
    id: 5,
    city_name: "اصفهان",
    accommodationCount: 128,
    province: "اصفهان",
    country: "ایران",
  },
  {
    id: 6,
    city_name: "تبریز",
    accommodationCount: 44,
    province: "آذربایجان شرقی",
    country: "ایران",
  },
  {
    id: 7,
    city_name: "قشم",
    accommodationCount: 92,
    province: "هرمزگان",
    country: "ایران",
  },
  {
    id: 8,
    city_name: "رامسر",
    accommodationCount: 26,
    province: "مازندران",
    country: "ایران",
  },
  {
    id: 9,
    city_name: "رشت",
    accommodationCount: 23,
    province: "گیلان",
    country: "ایران",
  },
  {
    id: 10,
    city_name: "یزد",
    accommodationCount: 107,
    province: "یزد",
    country: "ایران",
  },
  {
    id: 11,
    city_name: "گرگان",
    accommodationCount: 20,
    province: "گلستان",
    country: "ایران",
  },
  {
    id: 12,
    city_name: "اهواز",
    accommodationCount: 20,
    province: "خوزستان",
    country: "ایران",
  },
  {
    id: 13,
    city_name: "بندر عباس",
    accommodationCount: 17,
    province: "هرمزگان",
    country: "ایران",
  },
  {
    id: 14,
    city_name: "زاهدان",
    accommodationCount: 6,
    province: "سیستان و بلوچستان",
    country: "ایران",
  },
];

export default function LocationSearchDropdown({
  onSelect,
  placeholder = "جستجوی شهر یا هتل",
  isOpen = false,
  onToggle,
}: LocationSearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>(popularCities);
  const [filteredCities, setFilteredCities] = useState<City[]>(popularCities);
  const [loading, setLoading] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch cities from API
  const fetchCities = async (query?: string) => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/cities/", {
        params: query ? { search: query } : {},
      });
      const fetchedCities = response.data || [];
      const formattedCities = fetchedCities.map((city: any) => ({
        id: city.id,
        city_name: city.city_name,
        province: city.province || "نامشخص",
        country: city.country || "نامشخص",
        accommodationCount: city.accommodationCount || 10,
      }));
      setCities(formattedCities.length > 0 ? formattedCities : popularCities);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "request" in error &&
        !("response" in error)
      ) {
        toast.error(
          "خطا در ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید"
        );
      }
      setCities(popularCities);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowClearIcon(value.length > 0);

    // Check if input contains English characters or numbers
    const englishRegex = /[a-zA-Z0-9]/;
    setIsEnglish(englishRegex.test(value));

    if (value.length >= 2) {
      const citiesToFilter = Array.isArray(cities) ? cities : popularCities;
      console.log(citiesToFilter);
      const filtered = citiesToFilter.filter((city: any) =>
        city.city_name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      fetchCities(value);
    } else if (value.length === 0) {
      setFilteredCities(popularCities);
    } else {
      setFilteredCities(popularCities);
    }
  };

  // Clear input
  const clearInput = () => {
    setSearchTerm("");
    setShowClearIcon(false);
    setFilteredCities(popularCities);
    setIsEnglish(false);
    setSelectedCity(null);
    inputRef.current?.focus();
  };

  // Handle city selection
  const handleCitySelect = (city: City) => {
    setSearchTerm(city.city_name);
    setShowClearIcon(true);
    onSelect?.(city);
    onToggle?.();
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (!isOpen) {
      onToggle?.();
    }
    // If a city is selected, clear the search term to show all cities for easy selection
    if (selectedCity) {
      setSearchTerm("");
      setShowClearIcon(false);
      setFilteredCities(popularCities);
    } else if (searchTerm.length < 2) {
      setFilteredCities(popularCities);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Initialize with popular cities
  useEffect(() => {
    fetchCities();
  }, []);

  const displayCities = searchTerm.length >= 2 ? filteredCities : popularCities;

  return (
    <div className={styles.container} ref={dropdownRef}>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={clsx(styles.input, {
            [styles.englishInput]: isEnglish,
          })}
        />
        {showClearIcon && (
          <button
            onClick={clearInput}
            className={clsx(styles.clearButton, {
              [styles.clearButtonEnglish]: isEnglish,
            })}
            type="button"
          >
            <XCircleIcon className={styles.crossCircleIcon} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.separator}></div>
          <div className={styles.optionsWrapper}>
            {searchTerm.length < 2 && (
              <p className={styles.sectionTitle}>محبوب‌ترین‌ها</p>
            )}

            {loading ? (
              <div className={styles.loading}>در حال بارگذاری...</div>
            ) : displayCities.length > 0 ? (
              displayCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className={styles.option}
                  role="button"
                  tabIndex={0}
                >
                  <MapPinIcon className={styles.locationIcon} />
                  <div className={styles.cityInfo}>
                    <p className={styles.cityName}>
                      <span className={styles.normalWeight}>
                        <strong>{city.city_name}</strong> (
                        {city.accommodationCount} اقامتگاه)
                      </span>
                    </p>
                    <p className={styles.cityDescription}>
                      {city.city_name}، {city.province}، {city.country}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>موردی یافت نشد.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
