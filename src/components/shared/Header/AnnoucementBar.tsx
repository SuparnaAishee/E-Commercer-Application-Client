"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Clock } from "lucide-react";

const AnimatedAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 relative overflow-hidden pl-8 pr-8">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 py-2 relative">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-white">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <div className="bg-white text-purple-600 px-2 py-1 rounded-md font-bold text-sm animate-pulse">
              EXCLUSIVE
            </div>
            <span className="font-medium">Summer Collection Launch</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <div className="flex items-center space-x-1 text-sm font-mono">
                <div className="bg-white bg-opacity-20 rounded px-1.5 py-0.5">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="bg-white bg-opacity-20 rounded px-1.5 py-0.5">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span>:</span>
                <div className="bg-white bg-opacity-20 rounded px-1.5 py-0.5">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>

            <a
              href="/collection/summer"
              className="group bg-white text-purple-600 hover:bg-purple-700 hover:text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 flex items-center"
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AnimatedAnnouncementBar;
