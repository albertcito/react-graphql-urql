import { useEffect, useCallback } from 'react';

const useUnauthorized = (delSession: () => void) => {
  const rejectionServerCalls = useCallback((event: PromiseRejectionEvent) => {
    console.log(event);
    if (
      event.reason && event.reason.response
      && (event.reason.response.status === 401)
    ) {
      delSession();
      event.preventDefault();
    }
  }, [delSession]);

  useEffect(() => {
    window.addEventListener('unhandledrejection', rejectionServerCalls);
    return () => {
      window.removeEventListener('unhandledrejection', rejectionServerCalls);
    };
  }, [rejectionServerCalls]);
};

export default useUnauthorized;
