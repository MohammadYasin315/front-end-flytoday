import clsx from "clsx";
import styles from "./Hotel-Policies.module.css";

export default function HotelPolicies() {
  return (
    <div className={clsx(styles.hotelPoliciesCard, true && "block")}>
      <div className={styles.mainTitle}>{"قوانین هتل"}</div>
      <div className={styles.timeGrid}>
        <div className={styles.timeItem}>
          <div className={styles.timeLabel}>{"زمان ورود:"}</div>
          <p className={styles.timeValue}>{"14:00"}</p>
        </div>
        <div className={styles.timeItem}>
          <div className={styles.timeLabel}>{"زمان خروج:"}</div>
          <p className={styles.timeValue}>{"12:00"}</p>
        </div>
      </div>
      <div className={styles.instructionsSection}>
        <div className={styles.instructionBlock}>
          <div className={styles.instructionTitle}>{"دستورالعمل ها"}</div>
          <div className={styles.instructionContent}>
            {
              "ارائه مدارک شناسایی معتبر (شناسنامه و کارت ملی) برای همه افراد و مدارک محرمیت (شناسنامه) برای زوجین الزامی است\nپذیرش صیغه نامه معتبر زوجین ایرانی غیر بومی با مهر برجسته و ارائه شناسنامه و کارت ملی زوجین (خانم و آقا) امکان پذیر است\nنرخ اقامت میهمان غیرایرانی متفاوت است. به منظور استعلام دقیق نرخ لطفا با پشتیبانی تماس حاصل فرمایید.\nمدارک مورد نیاز برای پذیرش میهمان خارجی شامل اصل پاسپورت به همراه ویزا و مهر ورود به ایران با تاریخ اعتبار و انقضا می\u200cباشد\nامکان تغییر نام برای رزرو ثبت شده فراهم نمی\u200cباشد و اتاق فقط به شخصی که رزرو به نام ایشان باشد تحویل می\u200cگردد. در حین ثبت رزرو\nمشخصات تمامی میهمانان باید به درستی درج گردد. حداقل سن جهت اخذ اتاق بصورت انفرادی ۱۸ سال الزامی می\u200cباشد.\nتمامی افراد بزرگسال داخل یک اتاق می بایست محرم باشند. پذیرش ملیت ایرانی و خارجی در یک اتاق/ سوییت/کلبه/ آپارتمان/ ویلا به شرط\nاحراز محرمیت است.\nمجموعه از پذیرش حیوانات خانگی معذور است.\nطبق قوانین هتل در صورت نقص مدارک شناسایی و عدم احراز هویت یا عدم رعایت هر یک از قوانین ذکر شده امکان پذیرش وجود ندارد و\nهزینه پرداخت شده مسترد نمی گردد. در این خصوص مسئولیتی متوجه هتل یا این شرکت نیست."
            }
          </div>
        </div>
        <div className={styles.instructionBlock}>
          <div className={styles.instructionTitle}>{"دستورالعمل های ویژه"}</div>
          <div className={styles.instructionContent}>
            {
              "اتاق ها و سوئیت ها ظرفیت برای سرویس خواب اضافی ندارند. مجموعه آبی و ورزشی هتل دارای هزینه مجزا طبق تعرفه می باشند."
            }
          </div>
        </div>
        <div className={styles.instructionBlock}>
          <div className={styles.instructionTitle}>{"پذیرش خانم مجرد"}</div>
          <div className={styles.instructionContent}>
            {
              "در این هتل پذیرش خانم مجرد و تنها بالای 18 سال و غیر بومی، با ارائه مدارک شناسایی معتبر شامل شناسنامه عکس دار و کارت ملی هوشمند امکان پذیر می باشد. هتل از پذیرش خانم مجرد و تنها بومی معذور است."
            }
          </div>
        </div>
        <div className={styles.instructionBlock}>
          <div className={styles.instructionTitle}>{"قوانین کودک و نوزاد"}</div>
          <div className={styles.instructionContent}>
            {
              "اقامت کودک زیر 2 سال در صورت عدم استفاده از سرویس رایگان می باشد. هزینه اقامت کودک بالای 2 سال به صورت کامل محاسبه می\u200cگردد. لازم به ذکر است که اقامت رایگان و نیم بها فقط برای یک کودک در نظر گرفته می شود."
            }
          </div>
        </div>
      </div>
    </div>
  );
}
