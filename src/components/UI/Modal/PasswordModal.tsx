import type React from "react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./password-modal.module.css";
import api from "../../utils/api";
import { setTokens } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  loginInput: string;
  onLoginSuccess: (phoneNumber: string) => void;
}

export default function PasswordModal({
  isOpen,
  onClose,
  onBack,
  loginInput,
  onLoginSuccess,
}: PasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPassword("");
        setTouched(false);
        setIsValid(false);
        setApiError("");
      }, 300);
    } else {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!password.trim()) {
      setIsValid(false);
      setErrorMessage("کادر ورودی نمیتواند خالی باشد");
    } else if (password.length < 6) {
      setIsValid(false);
      setErrorMessage("لطفا کلمه عبور را درست وارد کنید");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  }, [password]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!touched) setTouched(true);
    setApiError("");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const handleLogin = () => {
    if (isValid && !isLoading) {
      setIsLoading(true);

      const loginData = {
        username: loginInput,
        password,
      };
      console.log("🔑 Login data being sent:", loginData);
      api
        .post("/accounts/login/", loginData)
        .then((response) => {
          console.log("✅ Login API response:", response);
          if (response.data.access && response.data.refresh) {
            setTokens(response.data.access, response.data.refresh);
            toast.success("ورود با موفقیت انجام شد!");
            setTimeout(() => {
              onLoginSuccess(loginInput);
              onClose();
            }, 2500);
          } else {
            console.warn(
              "⚠️ Login response did not include tokens:",
              response.data
            );
            toast.error("ورود ناموفق بود. دوباره تلاش کنید");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);

          if (error.request && !error.response && error.response?.status === 400) {
            toast.error(
              "خطا در ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید"
            );
          } else if (error.response?.status === 400) {
            toast.error("نام کاربری یا رمز عبور اشتباه است");
          } else {
            toast.error("خطا در ورود. دوباره تلاش کنید");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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
            <h2 className={styles.title}>وارد شوید</h2>
          </div>

          {/* Password Input */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              dir="rtl"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {
                setTouched(true);
                if (inputRef.current) {
                  if (!password.trim()) {
                    setIsValid(false);
                    setErrorMessage("کادر ورودی نمیتواند خالی باشد");
                    inputRef.current.classList.add("invalid");
                  } else if (!isValid) {
                    inputRef.current.classList.add("invalid");
                  }
                }
              }}
              className={clsx(styles.inputField, {
                [styles.valid]: isValid && password.trim(),
                [styles.invalid]: touched && !isValid,
              })}
            />
            <label className={styles.floatingLabel}>رمز عبور</label>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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

          {/* Error message */}
          {touched && (!isValid || !password.trim()) && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          {apiError && <div className={styles.errorMessage}>{apiError}</div>}

          {/* Login button */}
          <button
            className={clsx(styles.actionButton, {
              [styles.loading]: isLoading,
              [styles.valid]: !isLoading && isValid,
              [styles.invalid]: !isLoading && !isValid,
            })}
            disabled={!isValid || isLoading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogin();
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
              "ورود"
            )}
          </button>

          {/* One-time password button */}
          <div className={styles.linkContainer}>
            <button className={styles.secondaryButton}>
              ورود با رمز یکبار مصرف
            </button>
          </div>

          {/* Forgot password link */}
          <div className={styles.linkContainer}>
            <button className={styles.linkButton}>
              رمز عبور خود را فراموش کرده‌اید؟
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

