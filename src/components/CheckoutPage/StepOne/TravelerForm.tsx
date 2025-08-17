import type React from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import styles from "./Traveler-Form.module.css";
import { useCheckout } from "../contexts/CheckoutContext";


export default function TravelerInfoForm() {
  const { travelerInfo, setTravelerInfo } = useCheckout();
  const [firstName, setFirstName] = useState(travelerInfo.firstName || "");
  const [lastName, setLastName] = useState(travelerInfo.lastName || "");
  const [nationalId, setNationalId] = useState(travelerInfo.nationalId || "");
  const [selectedGender, setSelectedGender] = useState<string | null>(
    travelerInfo.gender || null
  );
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [genderTouched, setGenderTouched] = useState(false);

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [nationalIdError, setNationalIdError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const genderDropdownRef = useRef<HTMLDivElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const nationalIdInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenderDropdownOpen(false);
        // Validate gender when dropdown closes if it was touched but nothing selected
        if (genderTouched && !selectedGender) {
          setGenderError("لطفا جنسیت را انتخاب کنید.");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedGender, genderTouched]);

  const validateName = (value: string, fieldName: string) => {
    if (!value.trim()) {
      return `لطفا ${fieldName} را به فارسی وارد کنید.`;
    }
    if (value.length === 1) {
      return `${fieldName} درست نیست.`;
    }
    // Regex for Persian characters (including spaces)
    const persianRegex = /^[\u0600-\u06FF\s]+$/;
    if (!persianRegex.test(value)) {
      // Check for English characters
      const englishRegex = /[a-zA-Z]/;
      if (englishRegex.test(value)) {
        return `لطفا ${fieldName} را به فارسی وارد کنید.`;
      }
      // Check for numbers or special characters
      const specialCharOrNumberRegex =
        /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
      if (specialCharOrNumberRegex.test(value)) {
        return "فقط حروف الفبا قابل قبول است.";
      }
    }
    return null;
  };

  const validateNationalId = (value: string) => {
    if (!value.trim() || value.length < 10) {
      return "لطفا کدملی را وارد کنید.";
    }
    const numericRegex = /^\d+$/;
    if (!numericRegex.test(value)) {
      return "کد ملی درست نیست.";
    }
    return null;
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateName(value, "نام"));
    setTravelerInfo({ ...travelerInfo, firstName: value });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateName(value, "نام خانوادگی"));
    setTravelerInfo({ ...travelerInfo, lastName: value });
  };

  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNationalId(value);
    setNationalIdError(validateNationalId(value));
    setTravelerInfo({ ...travelerInfo, nationalId: value });
  };

  const handleFirstNameBlur = () => {
    setFirstNameError(validateName(firstName, "نام"));
    setFocusedField(null);
  };

  const handleLastNameBlur = () => {
    setLastNameError(validateName(lastName, "نام خانوادگی"));
    setFocusedField(null);
  };

  const handleNationalIdBlur = () => {
    setNationalIdError(validateNationalId(nationalId));
    setFocusedField(null);
  };

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleLabelClick = (fieldName: string) => {
    setFocusedField(fieldName);
    switch (fieldName) {
      case "firstName":
        firstNameInputRef.current?.focus();
        break;
      case "lastName":
        lastNameInputRef.current?.focus();
        break;
      case "nationalId":
        nationalIdInputRef.current?.focus();
        break;
    }
  };

  const toggleGenderDropdown = () => {
    setGenderTouched(true);
    setIsGenderDropdownOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Opening dropdown - set focus
        setFocusedField("gender");
        setGenderError(null); // Clear error when opening
      } else {
        // Closing dropdown - check if selection was made
        setFocusedField(null);
        if (!selectedGender) {
          setGenderError("لطفا جنسیت را انتخاب کنید.");
        }
      }
      return newState;
    });
  };

  const handleGenderBlur = () => {
    // Don't immediately remove focus if dropdown is open
    if (!isGenderDropdownOpen) {
      setFocusedField(null);
      if (genderTouched && !selectedGender) {
        setGenderError("لطفا جنسیت را انتخاب کنید.");
      }
    }
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setIsGenderDropdownOpen(false);
    setGenderError(null);
    setFocusedField(null);
    setTravelerInfo({ ...travelerInfo, gender }); // Remove focus after selection
  };

  const getFieldBorderClass = (
    error: string | null,
    value: string,
    fieldName: string
  ) => {
    if (error) {
      return styles.fieldError;
    }
    if (focusedField === fieldName) {
      return styles.fieldFocused;
    }
    return styles.fieldDefault;
  };

  const getGenderBorderClass = () => {
    if (genderError) {
      return styles.fieldError;
    }
    if (focusedField === "gender") {
      return styles.fieldFocused;
    }
    return styles.fieldDefault;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>اطلاعات مسافران</div>
      <div className={styles.formWrapper}>
        <div className={styles.roomCard}>
          <h3 className={styles.roomHeader}>
            <div className={styles.roomTitle}>اتاق اول،</div>
            <div className={styles.roomDetails}>
              <div className={styles.roomTitle}>اتاق دو تخته تویین</div>
              <div className={styles.roomMeal}>(صبحانه)</div>
            </div>
          </h3>
          <div className={styles.formContent}>
            <div className={styles.passengerHeader}>
              <div className={styles.passengerInfo}>
                <h2 className={styles.passengerTitle}>
                  <span className={styles.passengerName}>بزرگسال اول</span>
                  <div className={styles.passengerRole}>
                    <span>(سرپرست)</span>
                  </div>
                </h2>
              </div>
              <span className={styles.passengerBooklet}>دفترچه مسافران</span>
            </div>
            <div className={styles.fieldsGrid}>
              {/* Nationality Field */}
              <div className={styles.fieldContainer}>
                <button
                  className={clsx(styles.fieldBase, styles.fieldDefault)}
                  type="button"
                >
                  <img
                    alt="ایران"
                    width="17.5"
                    height="12"
                    className={styles.countryFlag}
                    src="https://cdn-c.cdnfl2.com/upload/flytoday/public/assets/countries-flags/ir.svg"
                  />
                  <div className={styles.fieldLabelValueWrapper}>
                    <label
                      className={clsx(
                        styles.nationalityLabel,
                        styles.nationalityLabelScaled
                      )}
                    >
                      ملیت
                    </label>
                    <span
                      className={clsx(
                        styles.fieldValue,
                        styles.fieldValueWithLabel
                      )}
                    >
                      ایران
                    </span>
                  </div>
                </button>
              </div>

              {/* Gender Select Field */}
              <div className={styles.fieldContainer} ref={genderDropdownRef}>
                <button
                  className={clsx(styles.fieldBase, getGenderBorderClass())}
                  type="button"
                  name="gender-0-0"
                  onClick={toggleGenderDropdown}
                  onFocus={() => handleFieldFocus("gender")}
                  onBlur={handleGenderBlur}
                >
                  <div className={styles.fieldLabelValueWrapper}>
                    <label
                      className={clsx(
                        styles.fieldLabel,
                        selectedGender && styles.fieldLabelScaled
                      )}
                    >
                      جنسیت
                    </label>
                    {selectedGender && (
                      <span
                        className={clsx(
                          styles.fieldValue,
                          styles.fieldValueWithLabel
                        )}
                      >
                        {selectedGender}
                      </span>
                    )}
                  </div>
                  <div className={styles.iconWrapper}>
                    <ChevronDown
                      className={clsx(
                        styles.chevronIcon,
                        isGenderDropdownOpen && styles.iconRotate
                      )}
                    />
                  </div>
                </button>
                {genderError && (
                  <p className={styles.errorText}>{genderError}</p>
                )}
                {isGenderDropdownOpen && (
                  <div className={styles.dropdownOptions}>
                    <div
                      className={styles.dropdownOption}
                      onClick={() => handleGenderSelect("مرد")}
                    >
                      مرد
                    </div>
                    <div
                      className={styles.dropdownOption}
                      onClick={() => handleGenderSelect("زن")}
                    >
                      زن
                    </div>
                  </div>
                )}
              </div>

              {/* First Name Field */}
              <div className={styles.fieldContainer}>
                <div
                  className={clsx(
                    styles.fieldBase,
                    getFieldBorderClass(firstNameError, firstName, "firstName")
                  )}
                  onClick={() => handleLabelClick("firstName")}
                >
                  <div className={styles.fieldLabelValueWrapper}>
                    <label
                      htmlFor="firstName"
                      className={clsx(
                        styles.fieldLabel,
                        (firstName || focusedField === "firstName") &&
                          styles.fieldLabelScaled
                      )}
                      onClick={() => handleLabelClick("firstName")}
                    >
                      نام
                    </label>
                    <input
                      id="firstName"
                      ref={firstNameInputRef}
                      className={clsx(
                        styles.fieldValue,
                        styles.fieldInput,
                        (firstName || focusedField === "firstName") &&
                          styles.fieldValueWithLabel
                      )}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={41}
                      value={firstName}
                      name="passengerFirstName-0-0"
                      onChange={handleFirstNameChange}
                      onBlur={handleFirstNameBlur}
                      onFocus={() => handleFieldFocus("firstName")}
                    />
                  </div>
                </div>
                {firstNameError && (
                  <p className={styles.errorText}>{firstNameError}</p>
                )}
              </div>

              {/* Last Name Field */}
              <div className={styles.fieldContainer}>
                <div
                  className={clsx(
                    styles.fieldBase,
                    getFieldBorderClass(lastNameError, lastName, "lastName")
                  )}
                  onClick={() => handleLabelClick("lastName")}
                >
                  <div className={styles.fieldLabelValueWrapper}>
                    <label
                      htmlFor="lastName"
                      className={clsx(
                        styles.fieldLabel,
                        (lastName || focusedField === "lastName") &&
                          styles.fieldLabelScaled
                      )}
                      onClick={() => handleLabelClick("lastName")}
                    >
                      نام خانوادگی
                    </label>
                    <input
                      id="lastName"
                      ref={lastNameInputRef}
                      className={clsx(
                        styles.fieldValue,
                        styles.fieldInput,
                        (lastName || focusedField === "lastName") &&
                          styles.fieldValueWithLabel
                      )}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={41}
                      value={lastName}
                      name="passengerLastName-0-0"
                      onChange={handleLastNameChange}
                      onBlur={handleLastNameBlur}
                      onFocus={() => handleFieldFocus("lastName")}
                    />
                  </div>
                </div>
                {lastNameError && (
                  <p className={styles.errorText}>{lastNameError}</p>
                )}
              </div>

              {/* National ID Field */}
              <div className={styles.fieldContainer}>
                <div
                  className={clsx(
                    styles.fieldBase,
                    getFieldBorderClass(
                      nationalIdError,
                      nationalId,
                      "nationalId"
                    )
                  )}
                  onClick={() => handleLabelClick("nationalId")}
                >
                  <div className={styles.fieldLabelValueWrapper}>
                    <label
                      htmlFor="nationalId"
                      className={clsx(
                        styles.fieldLabel,
                        (nationalId || focusedField === "nationalId") &&
                          styles.fieldLabelScaled
                      )}
                      onClick={() => handleLabelClick("nationalId")}
                    >
                      کد ملی
                    </label>
                    <input
                      id="nationalId"
                      ref={nationalIdInputRef}
                      className={clsx(
                        styles.fieldValue,
                        styles.fieldInput,
                        (nationalId || focusedField === "nationalId") &&
                          styles.fieldValueWithLabel,
                        styles.ltrInput
                      )}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={10}
                      value={nationalId}
                      name="nationalId-0-0"
                      onChange={handleNationalIdChange}
                      onBlur={handleNationalIdBlur}
                      onFocus={() => handleFieldFocus("nationalId")}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
                {nationalIdError && (
                  <p className={styles.errorText}>{nationalIdError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
