import { useEffect, useState } from 'react';

export const useCountdown = (expiryISO: string) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiryISO) return;

    const expiryTime = new Date(expiryISO).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryISO]);


  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // const totalSeconds = Math.floor(timeLeft / 1000);
  // const minutes = Math.floor(totalSeconds / 60);
  // const seconds = totalSeconds % 60;

return {
  minutes,
  seconds,
  isExpired: timeLeft <= 0,
};
};
