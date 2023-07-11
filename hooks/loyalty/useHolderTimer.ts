import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useWalletContext } from "contexts/WalletContext";
import { LoyaltyHolderPeriodsInfoType } from "libs/types/loyaltyTypes";
import { UseQueryResult } from "@tanstack/react-query";

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

type PropsType = {
  setReset: Dispatch<SetStateAction<boolean>>;
  periodsInfo: UseQueryResult<LoyaltyHolderPeriodsInfoType, unknown>;
}

function useHolderTimer({ setReset, periodsInfo }: PropsType) {
  const { walletIsConnected } = useWalletContext();
  const [timeLeft, setTimeLeft] = useState(0);

  // Set time left based on the end date fetched from the database
  useEffect(() => {
    if (walletIsConnected) {
      const interval = setInterval(() => {
        if (!periodsInfo.isLoading && !periodsInfo.isError && periodsInfo.data[0].end_time) {
          const secondLeftString = formatDistanceToNowStrict(new Date(periodsInfo.data[0].end_time), { unit: "second", addSuffix: true });
          if (secondLeftString.includes("ago")) {
            // Set timer to 0.
            setTimeLeft(0);
            // Change state to fetch new season data.
            setReset(prev => !prev);
          } else {
            const secondLeft = parseInt(secondLeftString.replaceAll("in", ""));
            setTimeLeft(secondLeft);
          }
        }
      }, 500);

      return () => { clearInterval(interval) };
    }
  }, [periodsInfo.isLoading, periodsInfo.isError, periodsInfo.data, walletIsConnected, setReset]);

  return formatTime(timeLeft);
}

export default useHolderTimer;
