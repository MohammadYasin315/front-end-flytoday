import React from "react";
import styles from "./Booking-Steps.module.css";
import clsx from "clsx";
import {
  CheckCircleIcon,
  CreditCardIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "current" | "upcoming";
}

interface BookingStepsProps {
  currentStep?: number;
}

export default function BookingSteps({ currentStep = 1 }: BookingStepsProps) {
  const steps: Step[] = [
    {
      id: 1,
      label: "اطلاعات مسافرها",
      icon: CheckCircleIcon,
      status: currentStep >= 1 ? "completed" : "upcoming",
    },
    {
      id: 2,
      label: "تایید و پرداخت",
      icon: CreditCardIcon,
      status:
        currentStep >= 2
          ? currentStep === 2
            ? "current"
            : "completed"
          : "upcoming",
    },
    {
      id: 3,
      label: "دریافت واچر",
      icon: ArrowDownTrayIcon,
      status: currentStep >= 3 ? "completed" : "upcoming",
    },
  ];

  return (
    <div className={styles.stepsContainer}>
      <div className={styles.stepsWrapper}>
        <div className={styles.stepsHeader}>
          <div className={styles.stepsRow}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={styles.stepItem}>
                  <div
                    className={clsx(styles.stepContent, {
                      [styles.stepContentActive]:
                        step.status === "completed" ||
                        step.status === "current",
                      [styles.stepContentInactive]: step.status === "upcoming",
                    })}
                  >
                    <step.icon className={styles.stepIcon} />
                    <span className={styles.stepLabel}>{step.label}</span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={clsx(styles.stepConnector, {
                      [styles.stepConnectorActive]:
                        steps[index + 1].status === "completed" ||
                        steps[index + 1].status === "current",
                    })}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>  
  );
}
