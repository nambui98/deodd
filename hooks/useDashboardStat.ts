import { useEffect, useReducer, useState } from "react";
import { getFlipPerUser } from "libs/apis/statisticapi";
import {
  getTopStreakToday,
  getFlipDashboardStat,
} from "libs/apis/statisticapi";

// This is sort function for userPerFlip
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
  const [statistic, setStatistic] = useState({
    error: {
      haveFlipped: true,
      errorMessage: "",
    },
    streak: {
      winStreak: 0,
      lossStreak: 0,
      username: "",
    },
    flipDashboardStat: {},
    userPerFlip: [],
    totalUser: 0,
  });

  useEffect(() => {
    async function returnStreakToday() {
      const promiseResult = await getTopStreakToday();
      const data = promiseResult.data.data;
      if (data != null) {
        setStatistic((prev) => ({
          ...prev,
          streak: {
            winStreak: data.highestWinStreak.currentStreakLength,
            lossStreak: data.highestLossStreak.currentStreakLength,
            username: data.highestWinStreak.username,
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
            ...prev.error,
            errorMessage: promiseResult.data.meta.error_message,
          },
        }));
      }
    }
    returnStreakToday();

    async function returnFlipDashboardStat() {
      const promiseResult = await getFlipDashboardStat();
      const data = promiseResult.data.data;
      if (data != null) {
        setStatistic((prev) => ({
          ...prev,
          flipDashboardStat: data,
          error: { ...prev.error, haveFlipped: true },
        }));
      } else {
        setStatistic((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            errorMessage: promiseResult.data.meta.error_message,
          },
        }));
      }
    }
    returnFlipDashboardStat();

    async function returnFlipPerUser() {
      const promiseResult = await getFlipPerUser();
      const data = promiseResult.data.data;
      if (data != null) {
        const sortedFlip = (Object.entries(data.userPerFlip) as any).toSorted(
          sortFunction
        );
        setStatistic((prev) => ({
          ...prev,
          userPerFlip: sortedFlip,
          totalUser: data.totalUser,
          error: {
            ...prev.error,
            haveFlipped: true,
          },
        }));
      } else {
        setStatistic((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            errorMessage: promiseResult.data.meta.error_message,
          },
        }));
      }
    }
    returnFlipPerUser();
  }, []);

  return { ...statistic };
}
