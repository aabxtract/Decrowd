'use client';

import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  deadline: number;
}

const CountdownTimer = ({ deadline }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(deadline, new Date()));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft <= 0) {
    return <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" /> Ended</span>;
  }

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);

  let displayString = '';
  if (days > 0) {
    displayString = `${days}d ${hours}h left`;
  } else if (hours > 0) {
    displayString = `${hours}h ${minutes}m left`;
  } else {
    displayString = `${minutes}m left`;
  }


  return <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" /> {displayString}</span>;
};

export default CountdownTimer;
