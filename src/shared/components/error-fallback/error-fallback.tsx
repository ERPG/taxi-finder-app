import { useState } from "react";
import styles from "./error-fallback.module.css";

const ErrorFallback = ({ refetch }: { refetch: () => void }) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    refetch();
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <p className={styles.errorMessage}>⚠️ Oops! We’re having trouble connecting.</p>
        <p className={styles.errorSubtext}>Please check your internet connection and try again.</p>
        <button className={styles.retryButton} onClick={handleRetry} disabled={retrying}>
          {retrying ? "Retrying..." : "Try Again"}
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;