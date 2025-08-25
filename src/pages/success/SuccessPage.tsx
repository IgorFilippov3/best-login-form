import JSConfetti from "js-confetti";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { ThemeSwitcher } from "../login/components/ThemeSwitcher/ThemeSwitcher";

import styles from "./SuccessPage.module.css";

export const SuccessPage = () => {
  useEffect(() => {
    const jsConfetti = new JSConfetti();

    const timer = setTimeout(() => {
      jsConfetti.addConfetti({
        confettiColors: [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#96ceb4",
          "#ffeaa7",
          "#dda0dd",
          "#f39c12",
          "#e74c3c",
          "#9b59b6",
        ],
        confettiRadius: 6,
        confettiNumber: 150,
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      jsConfetti.clearCanvas();
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Login
        </Link>
        <ThemeSwitcher />
      </div>
      <main className={styles.mainContent}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={64} color="white" aria-hidden="true" role="img" />
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Success!</h1>

          <p className={styles.subtitle}>You have successfully logged in! 🎉</p>
        </div>
      </main>
    </div>
  );
};
