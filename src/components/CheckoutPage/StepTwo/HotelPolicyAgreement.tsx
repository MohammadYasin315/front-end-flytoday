import { useState } from "react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/solid";
import styles from "./Hotel-Policy-Agreement.module.css";

interface HotelPolicyAgreementProps {
  onAcceptanceChange?: (accepted: boolean) => void;
  onTermsClick?: () => void;
}

export default function HotelPolicyAgreement({
  onAcceptanceChange,
  onTermsClick,
}: HotelPolicyAgreementProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onAcceptanceChange?.(newChecked);
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTermsClick?.();
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} onClick={handleCheckboxChange}>
            <div
              className={clsx(styles.customCheckbox, {
                [styles.checked]: isChecked,
              })}
            >
              <CheckIcon
                className={clsx(styles.checkIcon, {
                  [styles.visible]: isChecked,
                })}
              />
            </div>
        <div className={styles.textContent}>
          <div className={styles.text}>
            اینجانب{" "}
            <button
              className={styles.linkButton}
              onClick={handleTermsClick}
              type="button"
            >
              قوانین و مقررات
            </button>{" "}
            را مطالعه نموده و کلیه شرایط را می پذیرم.
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={styles.hiddenCheckbox}
          />
        </div>
      </label>
    </div>
  );
}
