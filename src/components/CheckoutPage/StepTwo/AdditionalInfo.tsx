"use client";

import { useState } from "react";
import clsx from "clsx";
import styles from "./Additional-Info.module.css";

export default function AdditionalInfo() {
  const [description, setDescription] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 400;
  const remainingChars = maxLength - description.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setDescription(e.target.value);
    }
  };

  const isActive = isFocused || description.length > 0;

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
            value={description}
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
