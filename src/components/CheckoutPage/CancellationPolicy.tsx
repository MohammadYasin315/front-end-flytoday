import clsx from "clsx";
import styles from "./Cancellation-Policy.module.css";

export default function CancellationPolicy() {
  return (
    <div className={clsx(styles.cancellationPolicyCard, true && "block")}>
      <div className={styles.cardTitle}>{"قوانین کنسلی"}</div>
      <div className={styles.cardDescription}>
        {
          "قوانین کنسلی هتل، با توجه به زمان درخواستی شما، متغیر است؛ برای استعلام با پشتیبانی در ارتباط باشید."
        }
      </div>
    </div>
  );
}
