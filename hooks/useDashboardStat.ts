import { useEffect, useState } from "react";
import { getFlipPerUser } from "libs/apis/statisticapi";
import {
  getTopStreakToday,
  getFlipDashboardStat,
} from "libs/apis/statisticapi";
import { useSiteContext } from "contexts/SiteContext";
import { DashboardErrorType, DashboardStreakType, DashboardFlipType, DashboardUserFlipType } from "libs/types/dashboardTypes";

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

type StatisticType = {
  error: DashboardErrorType;
  streak: DashboardStreakType;
  flipDashboardStat: DashboardFlipType;
  userFlipStat: DashboardUserFlipType;
}

export function useDashboardStat() {
  const { setIsLoading } = useSiteContext();
  const [statistic, setStatistic] = useState<StatisticType>({
    error: {
      streakData: {
        noData: true,
        errorMessage: "",
      },
      statData: {
        noData: true,
        errorMessage: "",
      },
      flipData: {
        noData: true,
        errorMessage: "",
      },
    },
    streak: {
      winStreak: 0,
      lossStreak: 0,
      username: "",
      winWallet: "",
    },
    flipDashboardStat: {
      tailResult: 0,
      headResult: 0,
      tailResultPercentage: 0,
      headResultPercentage: 0,
      tailChoice: 0,
      headChoice: 0,
      tailChoicePercentage: 0,
      headChoicePercentage: 0,
      numberFlipToday: 0,
      flipCompareYesterdayPercentage: 0,
      feeTotal: 0,
      feeTotalCompareYesterdayPercentage: 0,
      amountToday: 0,
      amountCompareYesterdayPercentage: 0,
      flipWinPercentage: 0,
    },
    userFlipStat: [],
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
        // Streak data - Streak Section
        if (streakResult.status === "fulfilled") {
          // If SUCCESSFULLY fetched data for streak section
          const streakData = streakResult.value.data.data;
          if (streakData != null) {
            // If there is data, meaning user have flipped, set data and remove error
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
                streakData: {
                  noData: false,
                  errorMessage: "",
                }
              },
            }));
          } else {
            // Else if there is no data, meaning user have not flipped, set error to true
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                streakData: {
                  noData: true,
                  errorMessage: streakResult.value.data.meta.error_message,
                },
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          // If FAILED to fetch data for streak section
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              streakData: {
                noData: true,
                errorMessage: "No Data",
              }
            },
          }));
        }
        // Stat data - Flip Result Section
        if (statResult.status === "fulfilled") {
          // If SUCCESSFULLY fetched data for Flip Result section
          const statData = statResult.value.data.data;
          if (statData != null) {
            // If there is data, meaning user have flipped, set data and remove error
            setStatistic((prev) => ({
              ...prev,
              flipDashboardStat: statData,
              error: {
                ...prev.error,
                statData: {
                  noData: false,
                  errorMessage: "",
                }
              },
            }));
          } else {
            // Else if there is no data, meaning user have not flipped, set error to true
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                statData: {
                  noData: true,
                  errorMessage: statResult.value.data.meta.error_message,
                }
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          // If FAILED to fetch data for Flip Result section
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              statData: {
                noData: true,
                errorMessage: "No Data",
              }
            },
          }));
        }
        // Flip data - Total Section
        if (flipResult.status === "fulfilled") {
          // If SUCCESSFULLY fetched data for Total section
          const flipData = flipResult.value.data.data;
          if (flipData != null) {
            // If there is data, meaning user have flipped, set data and remove error
            const sortedFlip = (
              Object.entries(flipData.flipStat) as any
            ).toSorted(sortFunction);
            setStatistic((prev) => ({
              ...prev,
              userFlipStat: sortedFlip,
              error: {
                ...prev.error,
                flipData: {
                  noData: false,
                  errorMessage: "",
                }
              },
            }));
          } else {
            // Else if there is no data, meaning user have not flipped, set error to true
            setStatistic((prev) => ({
              ...prev,
              error: {
                ...prev.error,
                flipData: {
                  noData: true,
                  errorMessage: flipResult.value.data.meta.error_message,
                }
              },
            }));
          }
        } else if (streakResult.status === "rejected") {
          // If FAILED to fetch data for Total section
          setStatistic((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              flipData: {
                noData: true,
                errorMessage: "No Data",
              }
            },
          }));
        }
      } catch (err) {
        console.log(`Something went wrong: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    getData();
  }, [setIsLoading]);

  return { ...statistic };
}
