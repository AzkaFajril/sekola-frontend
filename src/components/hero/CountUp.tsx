import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number; // in ms
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1200, className }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className={className}>{count.toLocaleString()}</span>;
};

export default CountUp; 