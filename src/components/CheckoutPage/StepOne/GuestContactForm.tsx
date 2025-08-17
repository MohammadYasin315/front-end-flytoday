import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./Guest-Contact-Form.module.css";
import { ChevronDown } from "lucide-react";
import { useCheckout } from "../contexts/CheckoutContext";

interface FormData {
  email: string;
  mobile: string;
  lateCheckIn: boolean;
  arrivalTime: string;
}

interface FormErrors {
  email?: string;
  mobile?: string;
}

const timeOptions = [
  "8 الی 9 شب همان روز",
  "9 الی 10 شب همان روز",
  "10 الی 11 شب همان روز",
  "11 الی 12 شب همان روز",
  "12 شب الی 1 بامداد روز بعد",
  "1 بامداد الی 2 بامداد",
  "2 بامداد الی 3 بامداد",
  "3 بامداد الی 4 بامداد",
  "4 بامداد الی 5 بامداد",
  "5 بامداد الی 6 بامداد",
];

export default function GuestContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    mobile: "",
    lateCheckIn: false,
    arrivalTime: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setContactInfo } = useCheckout();

  useEffect(() => {
    setContactInfo(formData);
  }, [formData, setContactInfo]);

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "لطفا ایمیل را وارد کنید";
    }

    // Check if email contains Persian characters
    const persianRegex = /[\u0600-\u06FF]/;
    if (persianRegex.test(email)) {
      return "لطفا ایمیل را درست وارد کنید";
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "لطفا ایمیل را درست وارد کنید";
    }

    return undefined;
  };

  const validateMobile = (mobile: string): string | undefined => {
    if (!mobile.trim()) {
      return "لطفا شماره موبایل را وارد کنید";
    }

    // Basic mobile validation for Iranian numbers
    const mobileRegex = /^09\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return "لطفا شماره موبایل را درست وارد کنید";
    }

    return undefined;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    let error: string | undefined;
    if (field === "email") {
      error = validateEmail(value);
    } else if (field === "mobile") {
      error = validateMobile(value);
    }

    setErrors((prev) => ({ ...prev, [field]: error }));

    // Mark field as touched when user starts typing
    if (value.trim()) {
      setTouchedFields((prev) => new Set(prev).add(field));
    }
  };

  const handleInputFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleInputBlur = (field: string) => {
    setFocusedField(null);
    setTouchedFields((prev) => new Set(prev).add(field));

    // Validate on blur
    if (field === "email") {
      const error = validateEmail(formData.email);
      setErrors((prev) => ({ ...prev, email: error }));
    } else if (field === "mobile") {
      const error = validateMobile(formData.mobile);
      setErrors((prev) => ({ ...prev, mobile: error }));
    }
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      lateCheckIn: !prev.lateCheckIn,
      arrivalTime: prev.lateCheckIn ? "" : prev.arrivalTime,
    }));

    if (!formData.lateCheckIn) {
      setIsDropdownOpen(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (isDropdownOpen && formData.lateCheckIn) {
      setFormData((prev) => ({ ...prev, arrivalTime: time }));
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (formData.lateCheckIn) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isEmailValid =
    !errors.email && formData.email && touchedFields.has("email");
  const isMobileValid =
    !errors.mobile && formData.mobile && touchedFields.has("mobile");

  const isArrivalTimeSelected = !!formData.arrivalTime;

  return (
    <div className={styles.container}>
      <span className={styles.description}>
        کاربر گرامی، لطفا از صحت اطلاعات وارد شده (شماره موبایل و ایمیل) اطمینان
        حاصل کنید تا در مواقع ضروری امکان تماس با شما فراهم باشد.
      </span>

      <div className={clsx(styles.fieldsGrid, styles.fieldsGridMd)}>
        {/* Email Field - Now First */}
        <div className={styles.fieldWrapper}>
          <div
            className={clsx(styles.inputField, {
              [styles.inputFieldFocused]: focusedField === "email",
              [styles.inputFieldError]: errors.email,
              [styles.inputFieldValid]: isEmailValid,
            })}
          >
            <div className={styles.labelWrapper}>
              <label
                className={clsx(styles.floatingLabel, {
                  [styles.floatingLabelFloated]:
                    focusedField === "email" || formData.email,
                })}
              >
                ایمیل
              </label>
              <input
                className={styles.textInput}
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => handleInputFocus("email")}
                onBlur={() => handleInputBlur("email")}
                // autoComplete="email"
                maxLength={65}
              />
            </div>
          </div>
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email}</div>
          )}
        </div>

        {/* Mobile Field - Now Second */}
        <div className={styles.fieldWrapper}>
          <div
            className={clsx(styles.inputField, {
              [styles.inputFieldFocused]: focusedField === "mobile",
              [styles.inputFieldError]: errors.mobile,
              [styles.inputFieldValid]: isMobileValid,
            })}
          >
            <div className={styles.labelWrapper}>
              <label
                className={clsx(styles.floatingLabel, {
                  [styles.floatingLabelFloated]:
                    focusedField === "mobile" || formData.mobile,
                })}
              >
                موبایل
              </label>
              <input
                className={styles.textInput}
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                onFocus={() => handleInputFocus("mobile")}
                onBlur={() => handleInputBlur("mobile")}
                // autoComplete="tel-national"
                maxLength={11}
              />
            </div>
          </div>
          {errors.mobile && (
            <div className={styles.errorMessage}>{errors.mobile}</div>
          )}
        </div>
      </div>

      <div className={styles.checkboxSection}>
        <label className={styles.checkboxLabel}>
          <span className={styles.checkboxText}>ورود دیرهنگام به هتل</span>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.hiddenCheckbox}
              checked={formData.lateCheckIn}
              onChange={handleCheckboxChange}
            />
            <div
              className={clsx(styles.customCheckbox, {
                [styles.customCheckboxChecked]: formData.lateCheckIn,
              })}
            >
              <svg
                className={clsx(styles.checkboxIcon, {
                  [styles.checkboxIconVisible]: formData.lateCheckIn,
                })}
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </label>

        <p className={styles.descriptions}>
          در صورتی که زمان ورود شما به هتل پس از ساعت ۸ شب به وقت مقصد می‌باشد،
          لطفا ساعات ورود خود را به هتل انتخاب کنید، در غیر اینصورت فلای‌تودی
          هیچ‌گونه مسئولیتی در خصوص لغو یا کنسلی هتل نمی‌پذیرد.
        </p>

        <div className={clsx(styles.selectWrapper, styles.selectWrapperMd)}>
          <div className={styles.selectField} ref={dropdownRef}>
            <button
              type="button"
              className={clsx(styles.selectButton, {
                [styles.selectButtonDisabled]: !formData.lateCheckIn,
                [styles.selectButtonEnabled]:
                  formData.lateCheckIn && isDropdownOpen,
              })}
              onClick={toggleDropdown}
              disabled={!formData.lateCheckIn}
            >
              <ChevronDown
                className={clsx(styles.selectIcon, {
                  [styles.selectIconRotated]: isDropdownOpen,
                  [styles.selectIconDisabled]: !formData.lateCheckIn,
                })}
              />
              <div className={styles.labelWrapper}>
                <label
                  className={clsx(styles.selectLabel, {
                    [styles.selectLabelDisabled]: !formData.lateCheckIn,
                    [styles.selectLabelFloated]: isArrivalTimeSelected,
                  })}
                >
                  ساعت ورود
                </label>
                {isArrivalTimeSelected && (
                  <div className={styles.selectValue}>
                    {formData.arrivalTime}
                  </div>
                )}
              </div>
            </button>

            {formData.lateCheckIn && (
              <div
                className={clsx(styles.dropdown, {
                  [styles.dropdownVisible]: isDropdownOpen,
                })}
              >
                {timeOptions.map((time, index) => (
                  <div
                    key={index}
                    className={styles.dropdownOption}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
