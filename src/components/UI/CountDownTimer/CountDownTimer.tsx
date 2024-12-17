import { useEffect, useState } from "react";

const CountdownTimer = ({ saleEndTime }: { saleEndTime: string }) => {
  const calculateTimeLeft = (endTime: string) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(saleEndTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(saleEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [saleEndTime]);

  return (
    <div className="countdown-timer">
      <span>{timeLeft.days}Day </span>
      <span>{timeLeft.hours.toString().padStart(2, "0")}h </span>
      <span>{timeLeft.minutes.toString().padStart(2, "0")}m </span>
      <span>{timeLeft.seconds.toString().padStart(2, "0")}s</span>
    </div>
  );
};

export default CountdownTimer;
