import React, { useState } from 'react';

function useErrorBoundary() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resetErrorBoundary = () => {
    setHasError(false);
    setError(null);
  };

  const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
    if (hasError) {
      return (
        <div>
          <p>Something went wrong: {error?.message}</p>
          <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
      );
    }

    return <>{children}</>;
  };

  const handleError = (err: Error) => {
    setHasError(true);
    setError(err);
  };

  return { ErrorBoundaryWrapper, handleError, resetErrorBoundary };
}

export default useErrorBoundary;