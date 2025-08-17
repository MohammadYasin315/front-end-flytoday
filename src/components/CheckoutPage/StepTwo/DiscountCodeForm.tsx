import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import styles from "./Discount-Code-Form.module.css";

export default function DiscountCodeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    console.log("کد تخفیف ارسال شد:", code);
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.accordion}>
        <button
          type="button"
          className={styles.accordionHeader}
          aria-expanded={isOpen}
          aria-controls="discount-content"
          onClick={() => setIsOpen((p) => !p)}
        >
          <div className={styles.headerTitle}>
            <span className={styles.headerText}>کد تخفیف</span>
          </div>
          <ChevronDown
            className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
            aria-hidden="true"
          />
        </button>

        <div
          id="discount-content"
          className={clsx(
            styles.accordionContent,
            isOpen && styles.accordionContentOpen
          )}
          role="region"
        >
          <div className={styles.contentInner}>
            <form onSubmit={onSubmit} className={styles.formRow}>
              <div
                className={clsx(
                  styles.field,
                  (isFocused || code.length > 0) && styles.fieldActive
                )}
              >
                <label className={styles.label} htmlFor="discount-input">
                  کد تخفیف
                </label>

                <input
                  id="discount-input"
                  name="discount"
                  type="text"
                  maxLength={16}
                  autoComplete="off"
                  spellCheck={false}
                  className={styles.input}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  aria-label="Discount code"
                />

                <button
                  type="button"
                  onClick={() => {
                    console.log("کد تخفیف ارسال شد:", code);
                  }}
                  className={styles.submitButton}
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
