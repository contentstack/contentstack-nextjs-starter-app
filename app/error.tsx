'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="error-page">
      <h1>Something went wrong!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button
        className="btn primary-btn"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}