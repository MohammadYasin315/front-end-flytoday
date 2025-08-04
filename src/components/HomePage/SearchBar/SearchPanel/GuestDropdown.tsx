import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import clsx from "clsx";
import styles from "./Guest-Dropdown.module.css";

interface GuestData {
  adults: number;
  children: number;
  rooms: number;
}

interface GuestDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (data: GuestData) => void;
  apiEndpoint?: string;
}

export default function GuestDropdown({
  isOpen,
  onToggle,
  onSelect,
  apiEndpoint = "/api/guests",
}: GuestDropdownProps) {
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch guest data from API
  const fetchGuestData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiEndpoint);
      if (response.data) {
        setRooms(response.data.rooms || [{ adults: 1, children: 0 }]);
      }
    } catch (error) {
      console.warn("API not available, using default data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get current guest data
  const getCurrentGuestData = useCallback(() => {
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
    return {
      adults: totalAdults,
      children: totalChildren,
      rooms: rooms.length,
    };
  }, [rooms]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      fetchGuestData();
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Update guest count with immediate search bar update
  const updateGuestCount = useCallback(
    (roomIndex: number, type: "adults" | "children", increment: boolean) => {
      setRooms((prevRooms) => {
        const newRooms = [...prevRooms];
        const room = { ...newRooms[roomIndex] };
        const currentCount = room[type];
        let newCount = currentCount;

        if (increment) {
          const maxCount = type === "adults" ? 14 : 6;
          newCount = Math.min(currentCount + 1, maxCount);
        } else {
          const minCount = type === "adults" ? 1 : 0;
          newCount = Math.max(currentCount - 1, minCount);
        }

        if (newCount !== currentCount) {
          room[type] = newCount;
          newRooms[roomIndex] = room;

          const totalAdults = newRooms.reduce((sum, r) => sum + r.adults, 0);
          const totalChildren = newRooms.reduce(
            (sum, r) => sum + r.children,
            0
          );

          // استفاده از setTimeout برای جلوگیری از double invocation
          setTimeout(() => {
            onSelect({
              adults: totalAdults,
              children: totalChildren,
              rooms: newRooms.length,
            });
          }, 0);
        }

        return newRooms;
      });
    },
    [onSelect]
  );

  // Add new room with immediate search bar update
  const addRoom = useCallback(() => {
    setRooms((prevRooms) => {
      const newRooms = [...prevRooms, { adults: 1, children: 0 }];

      // Update search bar immediately
      const totalAdults = newRooms.reduce((sum, room) => sum + room.adults, 0);
      const totalChildren = newRooms.reduce(
        (sum, room) => sum + room.children,
        0
      );
      onSelect({
        adults: totalAdults,
        children: totalChildren,
        rooms: newRooms.length,
      });

      return newRooms;
    });
  }, [onSelect]);

  // تابع حذف اتاق
  const deleteRoom = useCallback(
    (roomIndex: number) => {
      setRooms((prevRooms) => {
        const newRooms = prevRooms.filter((_, index) => index !== roomIndex);

        // آپدیت وضعیت پس از حذف
        const totalAdults = newRooms.reduce(
          (sum, room) => sum + room.adults,
          0
        );
        const totalChildren = newRooms.reduce(
          (sum, room) => sum + room.children,
          0
        );

        onSelect({
          adults: totalAdults,
          children: totalChildren,
          rooms: newRooms.length,
        });

        return newRooms;
      });
    },
    [onSelect]
  );

  // Confirm selection
  const handleConfirm = useCallback(() => {
    onSelect(getCurrentGuestData());
    onToggle();
  }, [getCurrentGuestData, onSelect, onToggle]);

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.content}>
        {rooms.map((room, roomIndex) => (
          <div key={roomIndex} className={styles.roomSection}>
            <div className={styles.roomHeader}>
              <span className={styles.roomTitle}>اتاق {roomIndex + 1}</span>
              {/* Show delete button when there are 2+ rooms */}
              {rooms.length > 1 && (
                <button
                  className={styles.deleteRoomButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteRoom(roomIndex);
                  }}
                >
                  پاک کردن
                </button>
              )}
            </div>

            {/* Adults */}
            <div className={styles.guestRow}>
              <div className={styles.guestInfo}>
                <span className={styles.guestType}>بزرگسال</span>
                <span className={styles.guestAge}>بالای 12 سال</span>
              </div>
              <div className={styles.quantityPicker}>
                <button
                  className={clsx(styles.quantityButton, {
                    [styles.quantityButtonDisabled]: room.adults >= 14,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateGuestCount(roomIndex, "adults", true);
                  }}
                  disabled={room.adults >= 14}
                >
                  +
                </button>
                <span className={styles.quantityValue}>{room.adults}</span>
                <button
                  className={clsx(styles.quantityButton, {
                    [styles.quantityButtonDisabled]: room.adults <= 1,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateGuestCount(roomIndex, "adults", false);
                  }}
                  disabled={room.adults <= 1}
                >
                  −
                </button>
              </div>
            </div>

            {/* Children */}
            <div className={styles.guestRow}>
              <div className={styles.guestInfo}>
                <span className={styles.guestType}>کودک</span>
                <span className={styles.guestAge}>تا 12 سال</span>
              </div>
              <div className={styles.quantityPicker}>
                <button
                  className={clsx(styles.quantityButton, {
                    [styles.quantityButtonDisabled]: room.children >= 6,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateGuestCount(roomIndex, "children", true);
                  }}
                  disabled={room.children >= 6}
                >
                  +
                </button>
                <span className={styles.quantityValue}>{room.children}</span>
                <button
                  className={clsx(styles.quantityButton, {
                    [styles.quantityButtonDisabled]: room.children <= 0,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    updateGuestCount(roomIndex, "children", false);
                  }}
                  disabled={room.children <= 0}
                >
                  −
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={clsx(styles.addRoomButton, {
            [styles.addRoomButtonDisabled]: rooms.length >= 4,
          })}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addRoom();
          }}
          disabled={rooms.length >= 4}
        >
          + افزودن اتاق
        </button>
        <button className={styles.confirmButton} onClick={handleConfirm}>
          تایید
        </button>
      </div>
    </div>
  );
}
