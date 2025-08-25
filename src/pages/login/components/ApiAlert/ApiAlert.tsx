import { AlertCircle, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { formatApiError } from "@/utils/formatApiError";

import styles from "./ApiAlert.module.css";

interface ApiErrorProps {
  error: string | null;
  onDismiss?: () => void;
}

export const ApiAlert = ({ error, onDismiss }: ApiErrorProps) => {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  if (!error) return null;

  const humanReadableError = formatApiError(error);

  return (
    <div
      className={styles.container}
      ref={errorRef}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      <AlertCircle size={20} className={styles.alertIcon} aria-hidden="true" />

      <div>
        <div className={styles.errorHeading}>Error</div>
        <div className={styles.errorMessage}>{humanReadableError}</div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error message"
          className={styles.dismissButton}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
