import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Additional-Info.module.css";
import { useCheckout } from "../contexts/CheckoutContext";

export default function AdditionalInfo() {
  const [isFocused, setIsFocused] = useState(false);
  const { additionalInfo, setAdditionalInfo } = useCheckout();
  const maxLength = 400;
  const remainingChars = maxLength - additionalInfo.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setAdditionalInfo(e.target.value);
    }
  };

  const isActive = isFocused;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>توضیحات رزرو</h3>
      <p className={styles.subtitle}>
        چنانچه برای رزرو خود توضیحاتی دارید، اینجا بنویسید
      </p>

      <div
        className={clsx(styles.fieldWrapper, {
          [styles.focused]: isFocused,
        })}
      >
        <div className={styles.inputContainer}>
          <label
            className={clsx(styles.label, {
              [styles.labelActive]: isActive,
            })}
          >
            متن توضیحات
          </label>
          <textarea
            className={styles.textarea}
            value={additionalInfo}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={5}
            maxLength={maxLength}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <span className={styles.charCounter}>{remainingChars} کاراکتر</span>
      </div>
    </div>
  );
}
