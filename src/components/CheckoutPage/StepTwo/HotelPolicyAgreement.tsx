import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/solid";
import styles from "./Hotel-Policy-Agreement.module.css";
import { useCheckout } from "../contexts/CheckoutContext";

interface HotelPolicyAgreementProps {
  onTermsClick?: () => void;
}

export default function HotelPolicyAgreement({
  onTermsClick,
}: HotelPolicyAgreementProps) {
  const { acceptedTerms, setAcceptedTerms } = useCheckout();

  const handleCheckboxChange = () => {
    const newChecked = !acceptedTerms;
    setAcceptedTerms(newChecked);
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
            [styles.checked]: acceptedTerms,
          })}
        >
          <CheckIcon
            className={clsx(styles.checkIcon, {
              [styles.visible]: acceptedTerms,
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
            checked={acceptedTerms}
            onChange={handleCheckboxChange}
            className={styles.hiddenCheckbox}
          />
        </div>
      </label>
    </div>
  );
}
