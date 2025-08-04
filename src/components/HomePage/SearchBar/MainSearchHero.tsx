import styles from "./Main-Search-Hero.module.css";
import clsx from "clsx";
import { useState } from "react";

interface MainSearchHeroProps {
  className?: string;
}

export default function MainSearchHero({ className }: MainSearchHeroProps) {
  const [activeTab, setActiveTab] = useState<"domestic" | "foreign">(
    "domestic"
  );

  return (
    <div className={clsx(styles.heroContainer, className)}>
      <div className={styles.backgroundImage}>
        <img
          alt="landing image"
          width="1200"
          height="145"
          className={styles.heroImage}
          src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/white-labels/flytoday/images/landing-banner.jpg"
        />
      </div>

      <h1 className={styles.title}>رزرو هتل</h1>

      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <section>
            <div className={styles.tabSection}>
              <ul className={styles.tabsList}>
                <li
                  className={clsx(styles.tabItem, styles.hoverTab, {
                    [styles.activeTab]: activeTab === "foreign",
                  })}
                  onClick={() => setActiveTab("foreign")}
                >
                  <div className={styles.tabText}>هتل خارجی</div>
                  <span className={styles.hoverIndicator}></span>
                  {activeTab === "foreign" && (
                    <div className={styles.activeIndicator}></div>
                  )}
                </li>
                <li
                  className={clsx(styles.tabItem, styles.hoverTab, {
                    [styles.activeTab]: activeTab === "domestic",
                  })}
                  onClick={() => setActiveTab("domestic")}
                >
                  <div className={styles.tabText}>هتل داخلی</div>
                  <span className={styles.hoverIndicator}></span>
                  {activeTab === "domestic" && (
                    <div className={styles.activeIndicator}></div>
                  )}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
