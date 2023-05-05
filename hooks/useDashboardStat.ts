import { useEffect, useState } from "react";
import { getFlipPerUser } from "libs/apis/statisticapi";
import {
  getTopStreakToday,
  getFlipDashboardStat,
} from "libs/apis/statisticapi";
import { useSiteContext } from "contexts/SiteContext";

// This is sort function for userFlipStat
function matchValue(str: string): any {
  const matches = str.match(/\d+/g);
  if (matches != null) {
    const value = matches.length > 1 ? matches[1] : matches[0];
    return value;
  }
}

function sortFunction([a]: any, [b]: any) {
  if (matchValue(a) - matchValue(b) > 0) {
    return 1;
  } else {
    return -1;
  }
}
// -----

export function useDashboardStat() {
  const { setIsLoading } = useSiteContext();
  const [statistic, setStatistic] = useState({
    error: {
      haveFlipped: false,
      errorMessage: "",
    },
    streak: {
      winStreak: 0,
      lossStreak: 0,
      username: "",
      winWallet: "",
    },
    flipDashboardStat: {},
    userFlipStat: {},
    totalUser: 0,
  });

  useEffect(() => {
    async function getData() {
      try {
        const [streakResult, statResult, flipResult] = await Promise.all([
          getTopStreakToday(),
          getFlipDashboardStat(),
          getFlipPerUser(),
        ]);
        // Streak data
        const streakData = streakResult.data.data;
        if (streakData != null) {
          setStatistic((prev) => ({
            ...prev,
            streak: {
              winStreak: streakData.highestWinStreak.maxStreakLength,
              lossStreak: streakData.highestLossStreak.maxStreakLength,
              username: streakData.highestWinStreak.username,
              winWallet: streakData.highestWinStreak.wallet,
            },
            error: {
              ...prev.error,
              haveFlipped: true,
            },
          }));
        } else {
          setStatistic((prev) => ({
            ...prev,
            error: {
              haveFlipped: false,
              errorMessage: streakResult.data.meta.error_message,
            },
          }));
        }
        // Stat data
        const statData = statResult.data.data;
        if (statData != null) {
          setStatistic((prev) => ({
            ...prev,
            flipDashboardStat: statData,
            error: { ...prev.error, haveFlipped: true },
          }));
        } else {
          setStatistic((prev) => ({
            ...prev,
            error: {
              haveFlipped: false,
              errorMessage: statResult.data.meta.error_message,
            },
          }));
        }
        // Flip data
        const flipData = flipResult.data.data;
        if (flipData != null) {
          const sortedFlip = (
            Object.entries(flipData.userFlipStat) as any
          ).toSorted(sortFunction);
          setStatistic((prev) => ({
            ...prev,
            userFlipStat: sortedFlip,
            totalUser: flipData.totalUser,
            error: {
              ...prev.error,
              haveFlipped: true,
            },
          }));
        } else {
          setStatistic((prev) => ({
            ...prev,
            error: {
              haveFlipped: false,
              errorMessage: flipResult.data.meta.error_message,
            },
          }));
        }
      } catch (err) {
        throw new Error("Something went wrong", { cause: err });
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    getData();
  }, [setIsLoading]);

  return { ...statistic };
}
