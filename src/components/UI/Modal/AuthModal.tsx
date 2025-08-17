import React from "react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./auth-modal.module.css";
import PasswordModal from "./PasswordModal";
import RegisterModal from "./RegisterModal";
import api from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/authSlice";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onLoginSuccess: (phoneNumber: string) => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  // Modal state
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const dispatch = useDispatch();
  // Login state
  const [loginInput, setLoginInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setLoginInput("");
        setTouched(false);
        setIsValid(false);
        setShowPasswordModal(false);
        setShowRegisterModal(false);
        setApiError("");
      }, 300);
    } else {
      // Auto focus input when modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Validate login input
  useEffect(() => {
    // Validate phone/email
    if (!loginInput.trim()) {
      setIsValid(false);
      setErrorMessage("کادر ورودی نمیتواند خالی باشد");
      return;
    }

    // Check if input is a valid phone number (starts with 09 followed by 9 more digits)
    const isPhoneValid = /^09\d{9}$/.test(loginInput);

    // Check if input is a valid email
    const isEmailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput) &&
      !/[\u0600-\u06FF]/.test(loginInput);

    if (isPhoneValid || isEmailValid) {
      setIsValid(true);
      setErrorMessage("");
    } else if (loginInput.match(/^\d+$/)) {
      setIsValid(false);
      setErrorMessage("لطفا به فرمت ورودی توجه کنید");
    } else if (loginInput.includes("@") && /[\u0600-\u06FF]/.test(loginInput)) {
      setIsValid(false);
      setErrorMessage("ایمیل باید فقط شامل حروف انگلیسی باشد");
    } else if (loginInput.includes("@")) {
      setIsValid(false);
      setErrorMessage("لطفا به فرمت ورودی توجه کنید");
    } else {
      setIsValid(false);
      setErrorMessage("لطفا به فرمت ورودی توجه کنید");
    }
  }, [loginInput]);

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput(e.target.value);

    if (!touched) setTouched(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSuccess = (phoneNumber: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("phoneNumber", phoneNumber);
    }
    dispatch(loginSuccess(phoneNumber));
    onClose();
  };

  const handleContinue = async () => {
    if (isValid && !isLoading) {
      setIsLoading(true);
      try {
        const isEmail = loginInput.includes("@");
        const checkData = isEmail
          ? { email: loginInput }
          : { phone: loginInput };

        await api.post("/accounts/login/", checkData);
        setShowPasswordModal(true);
      } catch (error: any) {
        if (error.request && !error.response) {
          toast.error(
            "خطا در ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید"
          );
        } else {
          setShowPasswordModal(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const switchToRegister = () => {
    setShowRegisterModal(true);
  };

  if (!isOpen) return null;

  if (showPasswordModal) {
    return (
      <PasswordModal
        isOpen={true}
        onClose={onClose}
        onBack={() => setShowPasswordModal(false)}
        loginInput={loginInput}
        onLoginSuccess={handleLoginSuccess}
        />
      );
    }
    
    if (showRegisterModal) {
      return (
        <RegisterModal
        isOpen={true}
        onClose={onClose}
        onBack={() => setShowRegisterModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

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
      <div className={styles.dialogModal}>
        <div className={styles.modalContent}>
          {/* Header with close button */}
          <div className={styles.modalHeader}>
            <button
              onClick={() => {
                onClose();
              }}
              className={styles.closeButton}
            >
              <svg
                width="24"
                height="24"
                stroke="#3662db"
                strokeWidth="2"
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
              src="https://cdn-a.flytoday.ir/upload/flytoday/public/white-labels/flytoday/images/logo.svg"
            />
          </div>

          {/* Title */}
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>ورود یا ثبت‌نام</h2>
          </div>

          {/* Login Form */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              placeholder="شماره موبایل یا ایمیل"
              value={loginInput}
              onChange={handleLoginInputChange}
              className={clsx(styles.inputField, {
                [styles.valid]: isValid && loginInput.trim(),
                [styles.invalid]: touched && !isValid,
              })}
              onBlur={() => {
                setTouched(true);
                if (inputRef.current) {
                  if (!loginInput.trim()) {
                    setIsValid(false);
                    inputRef.current.classList.add("invalid");
                  } else if (!isValid) {
                    inputRef.current.classList.add("invalid");
                  }
                }
              }}
            />
            <label className={styles.floatingLabel}>
              شماره موبایل یا ایمیل
            </label>
          </div>

          {/* Error message */}
          {touched && (!isValid || !loginInput.trim()) && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          {/* Continue button with loading animation */}
          <button
            className={clsx(styles.actionButton, {
              [styles.loading]: isLoading,
              [styles.valid]: !isLoading && isValid,
              [styles.invalid]: !isLoading && !isValid,
            })}
            onClick={handleContinue}
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
              "ادامه"
            )}
          </button>

          {/* Register link */}
          <div className={styles.registerLinkContainer}>
            <button
              onClick={() => {
                switchToRegister();
              }}
              className={styles.linkButton}
            >
              ثبت‌نام کنید
            </button>
            <span className={styles.me2}> قبلا ثبت‌نام نکرده‌اید؟</span>
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
