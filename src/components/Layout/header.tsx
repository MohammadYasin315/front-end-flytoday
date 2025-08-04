import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./header.module.css";
import AuthModal from "../UI/Modal/AuthModal";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../store/authSlice";
import { RootState } from "@/store/store";
import { removeTokens } from "../utils/auth";
import { useAuth } from "@/hooks/useAuth"

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { phoneNumber, isAuthenticated } = useAuth()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  // const handleLoginSuccess = (number: string) => {
  //   dispatch(loginSuccess(number));
  //   setIsAuthModalOpen(false);
  // };

  const handleLogout = () => {
    removeTokens();
    localStorage.removeItem("phoneNumber");
    dispatch(logout());
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <div className={styles.notificationArea}></div>
      <div className={styles.spacer} dir="rtl"></div>
      <div
        id="back-to-top-anchor"
        className={clsx(
          styles.headerWrapper,
          !isVisible && styles.headerHidden
        )}
      >
        <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles.leftSection}>
              <a
                className={styles.logo}
                aria-label="company logo which is linked to home page"
                href="/"
              >
                <img
                  alt="logo"
                  fetchPriority="high"
                  width="165"
                  height="50"
                  decoding="async"
                  data-nimg="1"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/white-labels/flytoday/images/logo.svg"
                />
              </a>
              <nav className={styles.navigation}>
                <div className={styles.navItems}>
                  <a className={styles.navLink} href="/flight">
                    <button
                      className={styles.navButton}
                      type="submit"
                      aria-label="flight link"
                    >
                      پرواز
                    </button>
                  </a>
                  <a
                    className={clsx(styles.navLink, styles.active)}
                    href="/hotel"
                  >
                    <button
                      className={styles.navButton}
                      type="submit"
                      aria-label="hotel link"
                    >
                      هتل
                    </button>
                  </a>
                  <a className={styles.navLink} href="/train">
                    <button
                      className={styles.navButton}
                      type="submit"
                      aria-label="train link"
                    >
                      قطار
                    </button>
                  </a>
                  <a className={styles.navLink} href="/activities">
                    <button
                      className={styles.navButton}
                      type="submit"
                      aria-label="citytour link"
                    >
                      تور
                    </button>
                  </a>
                  <div className={styles.dropdownWrapper}>
                    <div
                      className={clsx(
                        styles.dropdown,
                        dropdownOpen && styles.open
                      )}
                      ref={dropdownRef}
                    >
                      <button
                        className={styles.dropdownButton}
                        onClick={toggleDropdown}
                      >
                        <span>بیشتر</span>
                        <span className={styles.dropdownIcon}></span>
                      </button>
                      {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                          <div className={styles.dropdownContent}>
                            <div className={styles.dropdownItem}>
                              <a href="/packagetour">
                                <div className={styles.dropdownLink}>تور</div>
                              </a>
                            </div>
                            <div className={styles.dropdownItem}>
                              <a href="/visa">
                                <div className={styles.dropdownLink}>ویزا</div>
                              </a>
                            </div>
                            <div className={styles.dropdownItem}>
                              <a href="/anywhere-anytime/flight/thr">
                                <div className={styles.dropdownLink}>
                                  کِی‌کُجا
                                </div>
                              </a>
                            </div>
                            <div className={styles.dropdownItem}>
                              <a href="/cip">
                                <div className={styles.dropdownLink}>
                                  CIP فرودگاهی
                                </div>
                              </a>
                            </div>
                            <div className={styles.dropdownItem}>
                              <a href="/insurance">
                                <div className={styles.dropdownLink}>
                                  بیمه مسافرتی
                                </div>
                              </a>
                            </div>
                            <div className={styles.dropdownItem}>
                              <a href="https://flytoday.ir/blog/">
                                <div className={styles.dropdownLink}>
                                  مجله فلای تودی
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div className={styles.rightSection}>
              <button className={styles.registerButton} type="submit">
                <span className={styles.registerIcon}></span>
                ثبت اقامتگاه
              </button>
              <a target="_blank" href="/getapp" rel="noreferrer">
                <button
                  className={styles.appButton}
                  type="submit"
                  aria-label="appButton"
                >
                  <span className={styles.appIcon}></span>
                  <span className={styles.appText}>دریافت اَپ</span>
                </button>
              </a>

              {isAuthenticated && phoneNumber ? (
                <div className={styles.authButtons}>
                  <div className={styles.profileIcon}>
                    <span className={styles.profileIconSvg}></span>
                  </div>
                  <div className={styles.phoneBox}>{phoneNumber}</div>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <button
                  className={styles.authButton}
                  type="submit"
                  onClick={toggleAuthModal}
                >
                  <div className={styles.profileIcon}>
                    <span className={styles.profileIconSvg}></span>
                  </div>
                  <div className={styles.authText}>
                    <span className={styles.authLabel}>ورود</span>
                    <span className={styles.authDivider}></span>
                    <span className={styles.authLabel}>ثبت‌نام</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </header>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={toggleAuthModal}
        // onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
