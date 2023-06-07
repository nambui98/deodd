import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";

function useLoyaltyJackpot() {
  const [season, setSeason] = useState<string | number>("current");
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
  const { walletAddress } = useWalletContext();

  // Get data for jackpot banner section
  useEffect(() => {
    async function getData() {
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
      }
    }
    getData();
  }, [walletAddress]);

  // Get leaderboard data
  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        if (season === "current") {
          const seasonPromise = await getLoyaltyJackpotBoardCurrent(
            walletAddress,
            controller.signal
          );
          if (seasonPromise.status === 200 && seasonPromise.data != null) {
            const promiseData = seasonPromise.data.data;
            setLeaderboard((prev) => {
              return {
                ...prev,
                leaderboardList: promiseData.dashboard.dashboard,
                connectWallet: promiseData.connectWallet,
              };
            });
          } else {
            throw new Error("Can't connect to the API");
          }
        } else {
          const leaderboardPromise = await getLoyaltyJackpotBoardHistory(
            walletAddress,
            season,
            controller.signal
          );
          if (
            leaderboardPromise.status === 200 &&
            leaderboardPromise.data != null
          ) {
            const promiseData = leaderboardPromise.data.data;
            setLeaderboard((prev) => {
              return {
                ...prev,
                leaderboardList: promiseData.dashboard,
                connectWallet: promiseData.connectWallet,
              };
            });
          } else {
            throw new Error("Can't connect to the API");
          }
        }
      } catch (err) {
        console.log("Cancelled Input");
      }
    }
    getData();

    return () => {
      controller.abort("User's just sent another input!");
    };
  }, [season, walletAddress]);

  // Get number of seasons for select list
  useEffect(() => {
    async function getData() {
      const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
      const data = promiseResult.data.data;
      setLeaderboard((prev) => ({
        ...prev,
        currentSeason: data.currentSeason,
      }));
    }
    getData();
  }, [walletAddress]);

  // Get data for history tab
  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        if (season === "current") {
          const currentSeasonPromise = await getLoyaltyJackpotBoardCurrent(
            walletAddress,
            controller.signal
          );
          const currentSeason = currentSeasonPromise.data.data.currentSeason;
          const promiseResult = await getLoyaltyHistoryJackpot(
            walletAddress,
            currentSeason,
            controller.signal
          );
          if (promiseResult.status === 200) {
            const promiseData = promiseResult.data.data;
            setHistory(promiseData);
          }
        } else {
          const promiseResult = await getLoyaltyHistoryJackpot(
            walletAddress,
            season,
            controller.signal
          );
          if (promiseResult.status === 200) {
            const promiseData = promiseResult.data.data;
            setHistory(promiseData);
          }
        }
      } catch (err) {
        console.log("Cancelled Input");
      }
    }
    getData();

    return () => {
      controller.abort("User's just sent another input!");
    };
  }, [season, walletAddress]);

  return { setSeason, leaderboard, seasonInfo, history };
}

export default useLoyaltyJackpot;
