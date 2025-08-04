import type React from "react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./register-modal.module.css";
import api from "../../utils/api";
import { setTokens } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onLoginSuccess: (phoneNumber: string) => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onBack,
  onLoginSuccess,
}: RegisterModalProps) {
  // Modal state
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    phone: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState({
    phone: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    phone: "",
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");

  // Registration input state
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Refs for inputs
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPhone("");
        setEmail("");
        setPassword("");
        setTouched({ phone: false, email: false, password: false });
        setIsValid({ phone: false, email: false, password: false });
        setErrorMessage({ phone: "", email: "", password: "" });
        setApiError("");
      }, 300);
    } else {
      // Auto focus first input when modal opens
      setTimeout(() => {
        if (phoneInputRef.current) {
          phoneInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Validate phone number
  useEffect(() => {
    if (!phone.trim()) {
      setIsValid((prev) => ({ ...prev, phone: false }));
      setErrorMessage((prev) => ({
        ...prev,
        phone: "شماره تماس را وارد کنید",
      }));
    } else if (!phone.startsWith("09")) {
      setIsValid((prev) => ({ ...prev, phone: false }));
      setErrorMessage((prev) => ({
        ...prev,
        phone: "شماره موبایل باید با 09 شروع شود",
      }));
    } else if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      setIsValid((prev) => ({ ...prev, phone: false }));
      setErrorMessage((prev) => ({
        ...prev,
        phone: "شماره موبایل باید 11 رقم باشد",
      }));
    } else {
      setIsValid((prev) => ({ ...prev, phone: true }));
      setErrorMessage((prev) => ({ ...prev, phone: "" }));
    }
  }, [phone]);

  // Validate email
  useEffect(() => {
    if (!email.trim()) {
      setIsValid((prev) => ({ ...prev, email: false }));
      setErrorMessage((prev) => ({
        ...prev,
        email: "لطفا ایمیل را وارد کنید",
      }));
    } else if (/[\u0600-\u06FF]/.test(email)) {
      setIsValid((prev) => ({ ...prev, email: false }));
      setErrorMessage((prev) => ({
        ...prev,
        email: "ایمیل باید فقط شامل حروف انگلیسی باشد",
      }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsValid((prev) => ({ ...prev, email: false }));
      setErrorMessage((prev) => ({
        ...prev,
        email: "لطفا ایمیل را درست وارد کنید",
      }));
    } else {
      setIsValid((prev) => ({ ...prev, email: true }));
      setErrorMessage((prev) => ({ ...prev, email: "" }));
    }
  }, [email]);

  // Validate password
  useEffect(() => {
    if (!password.trim()) {
      setIsValid((prev) => ({ ...prev, password: false }));
      setErrorMessage((prev) => ({
        ...prev,
        password: "لطفا یک رمز عبور برای ایجاد پروفایل وارد کنید",
      }));
    } else if (password.length < 8) {
      setIsValid((prev) => ({ ...prev, password: false }));
      setErrorMessage((prev) => ({
        ...prev,
        password: "رمز عبور باید حداقل شامل 8 کاراکتر باشد",
      }));
    } else if (/^[a-zA-Z]+$/.test(password)) {
      setIsValid((prev) => ({ ...prev, password: false }));
      setErrorMessage((prev) => ({
        ...prev,
        password:
          "کلمه عبور باید ترکیبی از اعداد و حروف انگلیسی باشد. کاراکترهای خاص مجاز عبارتند از $ ! @ # % ^ & * ? (استفاده از کاراکترهای خاص اختیاری می باشد).",
      }));
    } else if (/^[0-9]+$/.test(password)) {
      setIsValid((prev) => ({ ...prev, password: false }));
      setErrorMessage((prev) => ({
        ...prev,
        password:
          "کلمه عبور باید ترکیبی از اعداد و حروف انگلیسی باشد. کاراکترهای خاص مجاز عبارتند از $ ! @ # % ^ & * ? (استفاده از کاراکترهای خاص اختیاری می باشد).",
      }));
    } else {
      setIsValid((prev) => ({ ...prev, password: true }));
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }
  }, [password]);

  // Input change handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);

    if (!touched.phone) setTouched((prev) => ({ ...prev, phone: true }));
    setApiError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
    setApiError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (!touched.password) setTouched((prev) => ({ ...prev, password: true }));
    setApiError("");
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  // Handle register button click
  const handleRegister = () => {
    const allFieldsValid = isValid.phone && isValid.email && isValid.password;

    if (allFieldsValid && !isLoading) {
      setIsLoading(true);
      setApiError("");

      const registerData = {
        username: phone,
        phone_number: phone,
        email: email,
        password: password,
      };

      console.log("registerData", registerData);

      axios
        .post("http://127.0.0.1:8000/accounts/register/", registerData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.access && response.data.refresh) {
            setTokens(response.data.access, response.data.refresh);
            console.log("Registration successful:", response.data);
            toast.success("ثبت‌نام با موفقیت انجام شد!");
            setTimeout(() => {
              onLoginSuccess(phone);
              onClose();
            }, 2500);
          } else {
            console.log(
              "Registration successful, but no tokens received:",
              response.data
            );
            toast.info("ثبت‌نام انجام شد. برای تکمیل فرآیند وارد شوید.");
            onClose();
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);

          if (error.response?.data) {
            if (error.response.data.phone_number) {
              toast.error(
                "این شماره موبایل قبلاً ثبت‌نام کرده است. لطفاً وارد شوید."
              );
            } else if (error.response.data.email) {
              toast.error("این ایمیل قبلاً ثبت‌نام کرده است. لطفاً وارد شوید.");
            } else {
              toast.error("خطا در ثبت‌نام. لطفاً اطلاعات را بررسی کنید.");
            }
          } else {
            toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Check if all fields are valid for enabling the register button
  const isFormValid = isValid.phone && isValid.email && isValid.password;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
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
      <div className={styles.dialogModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          {/* Header with back and close buttons */}
          <div className={styles.modalHeader}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBack();
              }}
              className={styles.backButton}
              aria-label="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className={styles.closeButton}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3662db"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className={styles.logoContainer}>
            <img
              alt="logo"
              fetchPriority="high"
              width="170"
              height="51"
              decoding="async"
              data-nimg="1"
              className="max-w-full object-contain"
              src="https://cdn-a.flytoday.ir/upload/flytoday/public/white-labels/flytoday/images/logo.svg"
              style={{ color: "transparent" }}
            />
          </div>

          {/* Title */}
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>ثبت‌نام کنید</h2>
          </div>

          {/* API Error message */}
          {apiError && <div className={styles.errorMessage}>{apiError}</div>}

          {/* Phone Input */}
          <div className={styles.inputContainer}>
            <input
              ref={phoneInputRef}
              dir="rtl"
              type="tel"
              placeholder="شماره تماس خود را وارد کنید"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, phone: true }));
                if (phoneInputRef.current) {
                  if (!phone.trim()) {
                    setIsValid((prev) => ({ ...prev, phone: false }));
                    setErrorMessage((prev) => ({
                      ...prev,
                      phone: "کادر ورودی نمیتواند خالی باشد",
                    }));
                    phoneInputRef.current.classList.add("invalid");
                  } else if (!isValid.phone) {
                    phoneInputRef.current.classList.add("invalid");
                  }
                }
              }}
              className={clsx(styles.inputField, {
                [styles.valid]: touched.phone && isValid.phone && phone.trim(),
                [styles.invalid]:
                  touched.phone && (!isValid.phone || !phone.trim()),
              })}
            />
            <label className={styles.floatingLabel}>شماره موبایل</label>
          </div>
          {touched.phone && (!isValid.phone || !phone.trim()) && (
            <div className={styles.errorMessage}>{errorMessage.phone}</div>
          )}

          {/* Email Input */}
          <div className={styles.inputContainer}>
            <input
              ref={emailInputRef}
              dir="rtl"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, email: true }));
                if (emailInputRef.current) {
                  if (!email.trim()) {
                    setIsValid((prev) => ({ ...prev, email: false }));
                    setErrorMessage((prev) => ({
                      ...prev,
                      email: "کادر ورودی نمیتواند خالی باشد",
                    }));
                    emailInputRef.current.classList.add("invalid");
                  } else if (!isValid.email) {
                    emailInputRef.current.classList.add("invalid");
                  }
                }
              }}
              className={clsx(styles.inputField, {
                [styles.valid]: touched.email && isValid.email && email.trim(),
                [styles.invalid]:
                  touched.email && (!isValid.email || !email.trim()),
              })}
            />
            <label className={styles.floatingLabel}>ایمیل</label>
          </div>
          {touched.email && (!isValid.email || !email.trim()) && (
            <div className={styles.errorMessage}>{errorMessage.email}</div>
          )}

          {/* Password Input */}
          <div className={styles.inputContainer}>
            <input
              ref={passwordInputRef}
              dir="rtl"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, password: true }));
                if (passwordInputRef.current) {
                  if (!password.trim()) {
                    setIsValid((prev) => ({ ...prev, password: false }));
                    setErrorMessage((prev) => ({
                      ...prev,
                      password: "کادر ورودی نمیتواند خالی باشد",
                    }));
                    passwordInputRef.current.classList.add("invalid");
                  } else if (!isValid.password) {
                    passwordInputRef.current.classList.add("invalid");
                  }
                }
              }}
              className={clsx(styles.inputField, {
                [styles.valid]: touched.password && isValid.password,
                [styles.invalid]: touched.password && !isValid.password,
              })}
            />
            <label className={styles.floatingLabel}>رمز عبور</label>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
          {touched.password && (!isValid.password || !password.trim()) && (
            <div className={styles.errorMessage}>{errorMessage.password}</div>
          )}

          {/* Register button */}
          <button
            className={clsx(styles.actionButton, {
              [styles.loading]: isLoading,
              [styles.valid]: !isLoading && isValid,
              [styles.invalid]: !isLoading && !isValid,
            })}
            disabled={!isFormValid || isLoading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRegister();
            }}
          >
            {isLoading ? (
              <div className={styles.loadingAnimation}>
                <div className={styles.loadingDots}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
            ) : (
              "ثبت‌نام"
            )}
          </button>

          {/* Login link */}
          <div
            className={styles.loginLinkContainer}
            style={{
              textAlign: "center",
              fontSize: "0.85rem",
              margin: "0.5rem 0",
              color: "#000000",
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBack();
              }}
              className={styles.loginLinkButton}
            >
              وارد شوید
            </button>
            <span className={styles.m2}>قبلا ثبت‌نام کرده‌اید؟</span>
          </div>

          {/* Terms */}
          <div className={styles.termsContainer}>
            <p>
              ورود یا ثبت‌نام شما در فلای‌تودی به منزله قبول{" "}
              <a href="#" className={styles.termsLink}>
                قوانین و مقررات
              </a>{" "}
              استفاده از سرویس‌های فلای‌تودی و قوانین حریم خصوصی است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
