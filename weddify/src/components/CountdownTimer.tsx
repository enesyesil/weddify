'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="text-center mb-8 font-minecraft">
      {Object.keys(timeLeft).length === 0 ? (
        <span className="text-white">Time&apos;s up!</span>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center text-white bg-green-100 border-4 border-brown-600 p-4 rounded-none shadow-inner w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            >
              <span className="text-md sm:text-lg md:text-xl lg:text-2xl">{value as number}</span>
              <span className="text-sm sm:text-base md:text-md lg:text-lg">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
