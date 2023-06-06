import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";

function useLoyaltyJackpot() {
  const [season, setSeason] = useState(4);
  const [leaderboard, setLeaderboard] = useState({
    currentSeason: 4,
    leaderboardList: [
      {
        rank: 1,
        wallet: "",
        userName: "",
        avatarId: 0,
        tossPoint: 0,
      },
    ],
  });
  const [seasonInfo, setSeasonInfo] = useState({
    currentSeason: 0,
    currentReward: 0,
    connectWalletTossPoint: 0,
    tossPointRequire: 0,
    startTime: "",
  });
  const { walletAddress } = useWalletContext();

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

  useEffect(() => {
    async function getData() {
      const promiseResult = await getLoyaltyJackpotBoardHistory(
        walletAddress,
        season
      );
      const dashboardData = promiseResult.data.data.dashboard;
      setLeaderboard((prev) => {
        return {
          ...prev,
          leaderboardList: dashboardData,
        };
      });
    }
    getData();
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
      setSeason(data.currentSeason);
    }
    getData();
  }, [walletAddress]);

  return { setSeason, leaderboard, seasonInfo };
}

export default useLoyaltyJackpot;
