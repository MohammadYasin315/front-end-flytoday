import type React from "react";
import { useState } from "react";
import clsx from "clsx";
import styles from "./App-Download.module.css";

export default function AppDownload() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const validateInput = (value: string) => {
    if (!value.trim()) {
      return "لطفا ایمیل یا شماره موبایل را وارد کنید";
    }

    if (value.startsWith("09")) {

      const phoneRegex = /^09\d{9}$/;
      if (!phoneRegex.test(value)) {
        return "لطفا به فرمت ورودی توجه کنید";
      }
      return "";
    } else {

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const persianRegex = /[\u0600-\u06FF]/;

      if (persianRegex.test(value) || !emailRegex.test(value)) {
        return "لطفا به فرمت ورودی توجه کنید";
      }
      return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmailOrPhone(value)

    if (hasBlurred) {
      if (!value.trim()) {
        setError("لطفا ایمیل یا شماره موبایل را وارد کنید")
      } else {
        const errorMessage = validateInput(value)
        setError(errorMessage)
      }
    }
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    if (error === "لطفا ایمیل یا شماره موبایل را وارد کنید") {
      setError("")
    }
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    setHasBlurred(true)

    if (!emailOrPhone.trim()) {
      setError("لطفا ایمیل یا شماره موبایل را وارد کنید")
    } else {
      const errorMessage = validateInput(emailOrPhone)
      setError(errorMessage)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!emailOrPhone.trim()) {
      setError("لطفا ایمیل یا شماره موبایل را وارد کنید")
      setHasBlurred(true)
      return
    }

    const errorMessage = validateInput(emailOrPhone)
    if (errorMessage) {
      setError(errorMessage)
      setHasBlurred(true)
      return
    }

    console.log("Sending download link to:", emailOrPhone)

    setEmailOrPhone("")
    setError("")
    setHasBlurred(false)
    setIsFocused(false)

    //alert("لینک دانلود با موفقیت ارسال شد!")
  }
  const isInputValid = emailOrPhone && !error && hasBlurred;
  const shouldFloatLabel = isFocused || emailOrPhone;

  return (
    <div className={styles.container}>
      <div className={styles.downloadSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>
              صفر تا صد سفر در اپلیکیشن فلای‌تودی
            </h2>
            <p className={styles.subtitle}>
              دسـترسـی سریع و آسان به خـدمات سفر
            </p>
          </div>

          <div className={styles.downloadButtonsWrapper}>
            <div className={styles.downloadButtons}>
              <div className={styles.buttonRow}>
                <div className={styles.downloadButton}>
                  <a
                    href="https://redirect.appmetrica.yandex.com/serve/461324009238181220"
                    rel="nofollow"
                  >
                    <img
                      src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/stores/playStore-desktop-v2.png"
                      alt="نسخه دانلود از گوگل پلی"
                      width="183"
                      height="48"
                    />
                  </a>
                </div>
                <div className={styles.downloadButton}>
                  <a
                    href="https://redirect.appmetrica.yandex.com/serve/1037783200153240785"
                    rel="nofollow"
                  >
                    <img
                      src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/stores/bazar-desktop-v2.png"
                      alt="نسخه دانلود از بازار"
                      width="183"
                      height="48"
                    />
                  </a>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <div className={styles.downloadButton}>
                  <a
                    href="https://redirect.appmetrica.yandex.com/serve/605437931221424966"
                    rel="nofollow"
                  >
                    <img
                      src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/stores/myket-desktop-v2.png"
                      alt="نسخه دانلود از مایکت"
                      width="183"
                      height="48"
                    />
                  </a>
                </div>
                <div className={styles.downloadButtonStart}>
                  <a
                    href="https://redirect.appmetrica.yandex.com/serve/245302038508936413"
                    rel="nofollow"
                    download
                  >
                    <img
                      src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/stores/download-apk-desktop-v2.png"
                      alt="نسخه دانلودی مستقیم"
                      width="183"
                      height="48"
                    />
                  </a>
                </div>
              </div>

              <div className={styles.buttonRowCenter}>
                <div className={styles.downloadButtonCenter}>
                  <img
                    src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/stores/install-pwa-desktop-v2.png"
                    alt="PWA نسخه"
                    width="183"
                    height="48"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputField}>
                    <div className={styles.inputLabelWrapper}>
                      <label
                        className={clsx(styles.inputLabel, {
                          [styles.inputLabelFloating]: shouldFloatLabel,
                          [styles.inputLabelActive]: isFocused || isInputValid,
                          [styles.inputLabelError]: error,
                        })}
                      >
                        ایمیل یا شماره موبایل
                      </label>
                      <input
                        name="emailOrMobileNumber"
                        className={clsx(styles.input, {
                          [styles.inputError]: error,
                          [styles.inputValid]: isInputValid,
                        })}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        maxLength={64}
                        value={emailOrPhone}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                      {error && <p className={styles.errorMessage}>{error}</p>}
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                  ارسال لینک دانلود
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.qrSection}>
          <div className={styles.qrWrapper}>
            <img
              className={styles.qrCode}
              src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/white-labels/flytoday/images/qrcode.png?d=050203"
              alt="application QR code"
              width="192"
              height="191"
            />
            <span className={styles.qrText}>برای دانلود سريع، اسکن کنيد</span>
          </div>
        </div>

        <div className={styles.appImageSection}>
          <img
            className={styles.appImage}
            src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/assets/home-page/download-app/appScreenshot.jpg?d=542209"
            alt="download application"
          />
        </div>
      </div>
    </div>
  );
}
