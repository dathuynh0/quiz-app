import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

const CountDownTimer = ({ initSeconds }) => {
  const [time, setTime] = useState(initSeconds);

  useEffect(() => {
    if (time < 0) {
      alert("Hết thời gian làm bài");
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const second = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(second).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
      <Timer className="text-blue-500" />
      <p className="font-bold">{formatTime(time)}</p>
    </div>
  );
};

export default CountDownTimer;
