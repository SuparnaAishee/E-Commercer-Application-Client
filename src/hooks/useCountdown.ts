import { useEffect, useState } from "react";

export type CountdownState = {
  hours: number;
  minutes: number;
  seconds: number;
};

export const useCountdown = (initial: CountdownState): CountdownState => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(id);
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
};
