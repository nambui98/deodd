import { useEffect, useState } from "react";
import { useSiteContext } from "contexts/SiteContext";

function formatTime(time: number) {
  const hour = Math.floor(time / 3600);
  const minute = Math.floor(time / 60) % 60;
  const second = Math.floor(time % 60);

  return (
    // If the state does not change fast enough, display "00" instead of negative number
    // else when < 10 display a "0" in front of each number
    (hour < 0 ? "00" : hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 0 ? "00" : minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 0 ? "00" : second < 10 ? "0" + second : second)
  );
}

type TimelineProps = {
  startHour: number;
  endHour: number;
};

type CountdownProps = {
  timeCurrent: number;
  timeLeft: number;
};

function getUTCHour(time: number) {
  // Get milliseconds have elapsed in UTC time, convert it to elapsed days and floor the number.
  // The number we get will be 00:00 of today, now convert it to elapsed hours.
  // Add the amount of hours we want and convert it to seconds. 
  const startOfTheDay =
    Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24) * 24;
  return (startOfTheDay + time) * 60 * 60;
}

export function useGoldenHour() {
  const [timeline] = useState<TimelineProps>({
    startHour: getUTCHour(14),
    endHour: getUTCHour(16),
  });

  const [countdown, setCountdown] = useState<CountdownProps>({
    timeCurrent: new Date().getTime() / 1000,
    timeLeft: 0,
  });

  const { isGoldenHour, setIsGoldenHour } = useSiteContext();

  // Set isGoldenHour state
  useEffect(() => {
    if (
      countdown.timeCurrent >= timeline.startHour &&
      countdown.timeCurrent < timeline.endHour
    ) {
      if (!isGoldenHour) {
        setIsGoldenHour(true);
      }
    } else {
      if (isGoldenHour) {
        setIsGoldenHour(false);
      }
    }
  }, [
    isGoldenHour,
    setIsGoldenHour,
    countdown.timeCurrent,
    timeline.startHour,
    timeline.endHour,
  ]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => ({
        ...prev,
        timeCurrent: new Date().getTime() / 1000,
      }));

      if (
        countdown.timeCurrent >= 0 &&
        countdown.timeCurrent < timeline.startHour
      ) {
        setCountdown((prev) => ({
          ...prev,
          timeLeft: timeline.startHour - prev.timeCurrent,
        }));
      } else if (
        countdown.timeCurrent >= timeline.startHour &&
        countdown.timeCurrent < timeline.endHour
      ) {
        setCountdown((prev) => ({
          ...prev,
          timeLeft: timeline.endHour - prev.timeCurrent,
        }));
      } else {
        setCountdown((prev) => ({
          ...prev,
          timeLeft: timeline.startHour + 24 * 60 * 60 - prev.timeCurrent,
        }));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [countdown.timeCurrent, timeline.endHour, timeline.startHour]);

  return {
    displayTime: formatTime(countdown.timeLeft),
  };
}
