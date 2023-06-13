import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";

function useLoyaltyJackpot() {
  const [loading, setLoading] = useState({
    leaderboard: true,
    history: true,
  });
  const [season, setSeason] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState({
    currentSeason: 1,
    leaderboardList: [
      {
        rank: 1,
        wallet: "",
        userName: "",
        avatarId: 0,
        tossPoint: 0,
      },
    ],
    connectWallet: {
      rank: 1,
      wallet: "",
      userName: "",
      avatarId: 0,
      tossPoint: 0,
    },
  });
  const [seasonInfo, setSeasonInfo] = useState({
    currentSeason: 0,
    currentReward: 0,
    connectWalletTossPoint: 0,
    tossPointRequire: 0,
    startTime: "",
  });
  const [history, setHistory] = useState({
    endTime: "",
    jackpot: 0,
    startTime: "",
    tossPointRequire: 0,
    userTossPoint: 0,
    winnerAvatarId: 0,
    winnerUserName: "null",
    winnerWallet: "null",
  });
  const { walletAddress, walletIsConnected } = useWalletContext();

  // Get data for jackpot banner section, and get number of seasons for select list at page load
  useEffect(() => {
    const getData = async () => {
      const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
      if (promiseResult.status === 200) {
        const data = promiseResult.data.data;
        setSeasonInfo({
          currentSeason: data.currentSeason,
          currentReward: Math.round(data.currentReward * 1000) / 1000,
          connectWalletTossPoint: data.connectWalletTossPoint,
          tossPointRequire: data.tossPointRequire,
          startTime: data.startTime,
        });
        setLeaderboard((prev) => ({
          ...prev,
          currentSeason: data.currentSeason,
        }));
      } else {
        throw new Error("No data");
      }
    };
    getData();
  }, [walletAddress]);

  // Get data for leaderboard and history tab when user select season
  useEffect(() => {
    if (walletIsConnected) {
      const controller = new AbortController();
      const getData = async () => {
        try {
          if (season === 0) {
            // If user want to see current season data, use this API
            const seasonResult = await getLoyaltyJackpotBoardCurrent(
              walletAddress,
              controller.signal
            );
            if (seasonResult.status === 200 && seasonResult.data != null) {
              const leaderboardData = seasonResult.data.data;
              setLeaderboard((prev) => {
                return {
                  ...prev,
                  leaderboardList: leaderboardData.dashboard.dashboard,
                  connectWallet: leaderboardData.dashboard.connectWallet,
                };
              });
              setLoading((prev) => ({ ...prev, leaderboard: false }));
              // Fetch for history data after knowing current season value
              const historyResult = await getLoyaltyHistoryJackpot(
                walletAddress,
                leaderboardData.currentSeason,
                controller.signal
              );
              if (historyResult.status === 200 && historyResult.data != null) {
                const historyData = historyResult.data.data;
                setHistory(historyData);
                setLoading((prev) => ({ ...prev, history: false }));
              } else {
                throw new Error("Can't connect to the API");
              }
            } else {
              throw new Error("Can't connect to the API");
            }
          } else {
            // If the user want to see data of season other than current, use this API
            const leaderboardResult = await getLoyaltyJackpotBoardHistory(
              walletAddress,
              season,
              controller.signal
            );
            if (
              leaderboardResult.status === 200 &&
              leaderboardResult.data != null
            ) {
              const leaderboardData = leaderboardResult.data.data;
              setLeaderboard((prev) => {
                return {
                  ...prev,
                  leaderboardList: leaderboardData.dashboard,
                  connectWallet: leaderboardData.connectWallet,
                };
              });
              setLoading((prev) => ({ ...prev, leaderboard: false }));
            } else {
              throw new Error("Can't connect to the API");
            }
            const historyResult = await getLoyaltyHistoryJackpot(
              walletAddress,
              season,
              controller.signal
            );
            if (historyResult.status === 200 && historyResult.data != null) {
              const historyData = historyResult.data.data;
              setHistory(historyData);
              setLoading((prev) => ({ ...prev, history: false }));
            } else {
              throw new Error("Can't connect to the API");
            }
          }
        } catch (err) {
          console.log("Cancelled Input");
        }
      };

      setLoading({ leaderboard: true, history: true });
      getData();
      return () => {
        controller.abort("User's just sent another input!");
      };
    }
  }, [season, walletAddress, walletIsConnected]);

  return { setSeason, leaderboard, seasonInfo, history, loading };
}

export default useLoyaltyJackpot;
