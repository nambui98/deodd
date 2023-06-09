import { useState, useEffect, useRef } from "react";
import useLoyaltyHolder from "./useLoyaltyHolder";
import { GetLoyaltyNFTCurrent } from "libs/apis/loyaltyAPI";
import { formatDistanceToNowStrict } from "date-fns";
import { useWalletContext } from "contexts/WalletContext";

function formatTime(time: number) {
  const day = Math.floor(time / 86400);
  const hour = Math.floor(time / 3600) % 24;
  const minute = Math.floor(time / 60) % 60;
  const second = Math.floor(time % 60);

  if (time === 0) {
    return "Loading...";
  }

  return (
    // If the state does not change fast enough, display "--" instead of negative number
    // else when < 10 display a "0" in front of each number
    (day > 0 ? `${day} day${day > 1 ? "s" : ""} and ` : "") +
    (hour < 0 ? "--" : hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 0 ? "--" : minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 0 ? "--" : second < 10 ? "0" + second : second)
  );
}

function useHolderTimer() {
  const { walletAddress } = useWalletContext();
  const [time, setTime] = useState({
    endDate: "",
    timeLeft: 0,
  });

  // Get end date from the database. Call only once.
  useEffect(() => {
    async function getEndDate() {
      const promiseResult = await GetLoyaltyNFTCurrent(walletAddress);
      if (promiseResult.status === 200 && promiseResult.data != null) {
        const promiseData = promiseResult.data.data;
        setTime((prev) => ({
          ...prev,
          endDate: promiseData.end_time,
        }));
      }
    }
    if (!time.endDate) {
      getEndDate();
    }
  }, [walletAddress, time.endDate]);

  // Set time left based on the end date fetched from the database
  useEffect(() => {
    const interval = setInterval(() => {
      if (time.endDate) {
        const secondLeft = parseInt(
          formatDistanceToNowStrict(new Date(time.endDate), { unit: "second" })
        );
        setTime((prev) => ({
          ...prev,
          timeLeft: secondLeft,
        }));
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return formatTime(time.timeLeft);
}

export default useHolderTimer;
