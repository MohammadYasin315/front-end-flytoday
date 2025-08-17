import type React from "react";

import { useState } from "react";
import clsx from "clsx";
import styles from "./footer.module.css";

const Footer = () => {
  const [showMore, setShowMore] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const toggleShowMore = () => {
    setShowMore(true);
  };

  const validateEmail = (email: string) => {
    const persianRegex = /[\u0600-\u06FF]/;
    if (persianRegex.test(email)) {
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("لطفا ایمیل را وارد کنید");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("ایمیل را درست وارد کنید");
      return;
    }

    console.log("Email submitted:", email);
    setEmailError("");

    setEmail("");
    setHasBlurred(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (hasBlurred && value) {
      if (!validateEmail(value)) {
        setEmailError("ایمیل را درست وارد کنید");
      } else {
        setEmailError("");
      }
    } else if (emailError && value) {
      setEmailError("");
    }
  };

  const handleEmailFocus = () => {
    setIsFocused(true);
    if (emailError) setEmailError("");
  };

  const handleEmailBlur = () => {
    setIsFocused(false);
    setHasBlurred(true);

    if (!email) {
      setEmailError("لطفا ایمیل را وارد کنید");
    } else if (!validateEmail(email)) {
      setEmailError("ایمیل را درست وارد کنید");
    }
  };

  const isEmailValid = email && validateEmail(email) && !emailError;
  const shouldFloatLabel = isFocused || email;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.leftSection}>
            <div className={styles.columnsWrapper}>
              {/* خدمات */}
              <ul className={styles.linksList}>
                <li className={styles.listTitle}>خدمات</li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/flight"
                  >
                    بلیط هواپیما
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/hotel"
                  >
                    رزرو هتل
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/anywhere-anytime/flight/thr"
                  >
                    کِی‌کُجا
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/train"
                  >
                    بلیط قطار
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/packagetour"
                  >
                    تور
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/visa"
                  >
                    ویزا
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/flight-information"
                  >
                    اطلاعات پرواز فرودگاه‌ها
                  </a>
                </li>
              </ul>

              {/* اطلاعات تکمیلی */}
              <ul className={styles.linksList}>
                <li className={styles.listTitle}>اطلاعات تکمیلی</li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/refund-guide/international-flight"
                  >
                    راهنمای استرداد
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/order-guide/international-flight"
                  >
                    راهنمای خرید
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/privacypolicy"
                  >
                    قوانین و مقررات
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/faq"
                  >
                    سوالات متداول
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/club"
                  >
                    باشگاه مشتریان
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/page/%D9%BE%D8%B1%D8%AF%D8%A7%D8%AE%D8%AA-%D8%B9%D9%88%D8%A7%D8%B1%D8%B6-%D8%AE%D8%B1%D9%88%D8%AC-%D8%A7%D8%B2-%DA%A9%D8%B4%D9%88%D8%B1"
                  >
                    عوارض خروج از کشور
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/organization"
                  >
                    راهکارهای سازمانی
                  </a>
                </li>
              </ul>

              {/* فلای‌تودی */}
              <ul className={styles.linksList}>
                <li className={styles.listTitle}>فلای‌تودی</li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/about"
                  >
                    درباره ما
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/contact"
                  >
                    تماس با ما
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/career"
                  >
                    فرصت‌های شغلی
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://flytoday.ir/blog/"
                  >
                    مجله گردشگری
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/safarcard"
                  >
                    سفر کارت
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/getapp"
                  >
                    دریافت اپلیکیشن
                  </a>
                </li>
                <li className={styles.listItem}>
                  <a
                    className={styles.linkItem}
                    target="_blank"
                    href="https://www.flytoday.ir/media"
                  >
                    رسانه
                  </a>
                </li>
              </ul>
            </div>

            {/* بخش لینک‌های بیشتر */}
            <div
              className={clsx(styles.moreLinksSection, {
                [styles.moreLinksExpanded]: showMore,
              })}
            >
              <span className={styles.linkGroup}>
                <a target="_blank" href="https://www.flytoday.ir/visa/dubai">
                  <p className={styles.linkText}>ویزای دبی</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/packagetour/united-arab-emirates/dubai"
                >
                  <p className={styles.linkText}>تور دبی</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/packagetour/turkey/istanbul"
                >
                  <p className={styles.linkText}>تور استانبول</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/packagetour/turkey"
                >
                  <p className={styles.linkText}>تور ترکیه</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/page/%D8%A8%D9%84%DB%8C%D8%B7-%DA%86%D8%A7%D8%B1%D8%AA%D8%B1"
                >
                  <p className={styles.linkText}>بلیط چارتر</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a target="_blank" href="https://www.flytoday.ir/airline">
                  <p className={styles.linkText}>ایرلاین ها</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/flight/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D8%A8%D9%88%D9%84"
                >
                  <p className={styles.linkText}>بلیط استانبول</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/flight/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D8%AF%D8%A8%DB%8C"
                >
                  <p className={styles.linkText}>بلیط دبی</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/flight/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D9%85%D8%B4%D9%87%D8%AF"
                >
                  <p className={styles.linkText}>بلیط مشهد</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%D8%A8%D9%88%D9%84"
                >
                  <p className={styles.linkText}>هتل استانبول</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D8%AF%D8%A8%DB%8C"
                >
                  <p className={styles.linkText}>هتل دبی</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%D9%85%D8%B4%D9%87%D8%AF"
                >
                  <p className={styles.linkText}>هتل مشهد</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/hotel/%D9%87%D8%AA%D9%84-%D9%87%D8%A7%DB%8C-%DA%A9%DB%8C%D8%B4"
                >
                  <p className={styles.linkText}>هتل کیش</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/flight/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%DA%A9%DB%8C%D8%B4"
                >
                  <p className={styles.linkText}>بلیط کیش</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/page/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D8%AA%D8%B1%DA%A9%DB%8C%D9%87"
                >
                  <p className={styles.linkText}>بلیط ترکیه</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/page/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%DA%A9%D8%A7%D9%86%D8%A7%D8%AF%D8%A7"
                >
                  <p className={styles.linkText}>بلیط کانادا</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/page/%D8%A8%D9%84%DB%8C%D8%B7-%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7-%D8%A2%D9%85%D8%B1%DB%8C%DA%A9%D8%A7"
                >
                  <p className={styles.linkText}>بلیط آمریکا</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/page/%D8%A8%D9%84%DB%8C%D8%B7-%D9%84%D8%AD%D8%B8%D9%87-%D8%A2%D8%AE%D8%B1%DB%8C"
                >
                  <p className={styles.linkText}>بلیط لحظه آخری</p>
                </a>
                <p className={styles.separator}>|</p>
              </span>
              <span className={styles.linkGroup}>
                <a
                  target="_blank"
                  href="https://www.flytoday.ir/flight-with-insurance"
                >
                  <p className={styles.linkText}>سرویس پرواز + بیمه</p>
                </a>
              </span>
            </div>

            {!showMore && (
              <div className={styles.showMoreButton}>
                <div
                  className={styles.showMoreContent}
                  role="button"
                  onClick={toggleShowMore}
                >
                  مشاهده بیشتر
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={styles.arrowIcon}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className={styles.arrowIcon}></span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.rightSection}>
            {/* بخش خبرنامه */}
            <div className={styles.newsletterSection}>
              <p className={styles.newsletterText}>
                زودتر از همه از پیشنهاد‌های ویژه و خبرها مطلع شوید
              </p>
              <form onSubmit={handleSubmit}>
                <div className={styles.newsletterForm}>
                  <div className={styles.emailInputWrapper}>
                    <div className={styles.emailField}>
                      <div className={styles.emailLabelWrapper}>
                        <label
                          className={clsx(styles.emailLabel, {
                            [styles.emailLabelFloating]: shouldFloatLabel,
                            [styles.emailLabelActive]:
                              isFocused || isEmailValid,
                            [styles.emailLabelError]: emailError,
                          })}
                        >
                          آدرس ایمیل
                        </label>
                        <input
                          name="email"
                          className={clsx(styles.emailInput, {
                            [styles.emailInputError]: emailError,
                            [styles.emailInputValid]: isEmailValid,
                          })}
                          autoComplete="off"
                          maxLength={64}
                          value={email}
                          onChange={handleEmailChange}
                          onFocus={handleEmailFocus}
                          onBlur={handleEmailBlur}
                        />
                        {emailError && (
                          <p className={styles.errorMessage}>{emailError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className={styles.submitButton} type="submit">
                    ثبت ايميل
                  </button>
                </div>
              </form>
            </div>

            {/* بخش اطلاعات تماس */}
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <span className={styles.contactLabel}>تلفن پشتیبانی</span>
                <a href="tel:02142405000" className={styles.contactLink}>
                  021-42405000
                </a>
              </div>
              <div className={styles.contactRowLast}>
                <span className={styles.contactLabel}>ایمیل پشتیبانی</span>
                <a
                  href="mailto:support@flytoday.ir"
                  className={styles.contactLink}
                >
                  support@flytoday.ir
                </a>
              </div>
            </div>

            {/* بخش لوگوها */}
            <div className={styles.logosSection}>
              <div className={styles.logoItem}>
                <img
                  alt="cao"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/assets/logo/cao.svg"
                />
              </div>
              <div className={styles.logoItem}>
                <img
                  alt="cao-paxrights"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/assets/logo/cao-paxright.svg"
                />
              </div>
              <div className={styles.logoItem}>
                <img
                  alt="aira"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/assets/logo/aira.png?width=48&height=48"
                />
              </div>
              <div className={styles.logoItem}>
                <img
                  alt="enamad"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://trustseal.enamad.ir/logo.aspx?id=64082&code=TZhscBCSCSlZtGn9N0JD?width=48&height=48"
                />
              </div>
              <div className={styles.logoItem}>
                <img
                  alt="کسب و کار های مجازی"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/assets/logo/majazi.jpg?width=48&height=48"
                />
              </div>
              <div className={styles.logoItem}>
                <img
                  alt="logo-samandehi"
                  width="48"
                  height="48"
                  className={styles.logoImage}
                  src="https://cdn-a.flytoday.ir/upload/flytoday/public/assets/logo/samandehi.png?width=48&height=48"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش کپی‌رایت */}
      <div className={styles.copyrightSection}>
        <div className={clsx(styles.container, styles.copyrightContent)}>
          <div>
            <p className={styles.copyrightText}>
              استفاده از مطالب این وب سایت فقط برای مقاصد غیر تجاری و با ذکر
              منبع بلامانع است. کلیه حقوق این سایت متعلق به
              <a
                href="https://www.flytoday.ir"
                target="_blank"
                className={styles.copyrightLink}
              >
                {" "}
                فلای‌تودی{" "}
              </a>
              می‌باشد.
            </p>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://www.aparat.com/flytoday.ir"
              target="_blank"
              rel="noreferrer nofollow"
              title="aparat"
              className={clsx(styles.socialLink, styles.iconAparat)}
            ></a>
            <a
              href="https://www.linkedin.com/company/flytodayir"
              target="_blank"
              rel="noreferrer nofollow"
              title="linkedin"
              className={clsx(styles.socialLink, styles.iconLinkedin)}
            ></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
