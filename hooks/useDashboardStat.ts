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
    return 0;
  }
}
// -----

export function useDashboardStat() {
  const { setIsLoading } = useSiteContext();
  const [statistic, setStatistic] = useState({
    error: {
      streakData: false,
      statData: false,
      flipData: false,
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
        const [streakResult, statResult, flipResult] = await Promise.allSettled([
          getTopStreakToday(),
          getFlipDashboardStat(),
          getFlipPerUser(),
        ]);
        console.log(streakResult, statResult);
        // Streak data
        if (streakResult.status === "fulfilled") {
          const streakData = streakResult.value.data.data;
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
                streakData: true,
              },
            }));
          } else {
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                streakData: false,
                errorMessage: streakResult.value.data.meta.error_message,
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              streakData: false,
              errorMessage: "No data",
            },
          }));
        }
        // Stat data
        if (statResult.status === "fulfilled") {
          const statData = statResult.value.data.data;
          if (statData != null) {
            setStatistic((prev) => ({
              ...prev,
              flipDashboardStat: statData,
              error: { ...prev.error, statData: true },
            }));
          } else {
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                statData: false,
                errorMessage: statResult.value.data.meta.error_message,
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              statData: false,
              errorMessage: "No data",
            },
          }));
        }
        // Flip data
        if (flipResult.status === "fulfilled") {
          const flipData = flipResult.value.data.data;
          if (flipData != null) {
            const sortedFlip = (
              Object.entries(flipData.flipStat) as any
            ).toSorted(sortFunction);
            setStatistic((prev) => ({
              ...prev,
              userFlipStat: sortedFlip,
              totalUser: flipData.totalUser,
              error: {
                ...prev.error,
                flipData: true,
              },
            }));
          } else {
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                flipData: false,
                errorMessage: flipResult.value.data.meta.error_message,
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              flipData: false,
              errorMessage: "No data",
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
