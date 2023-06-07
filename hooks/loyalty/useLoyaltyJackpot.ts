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
    async function getData() {
      if (season === "current") {
        const seasonPromise = await getLoyaltyJackpotBoardCurrent(
          walletAddress
        );
        if (seasonPromise.status === 200 && seasonPromise.data != null) {
          const leaderboardData = seasonPromise.data.data.dashboard.dashboard;
          setLeaderboard((prev) => {
            return {
              ...prev,
              leaderboardList: leaderboardData,
            };
          });
        } else {
          throw new Error("Can't connect to the API");
        }
      } else {
        const leaderboardPromise = await getLoyaltyJackpotBoardHistory(
          walletAddress,
          season
        );
        if (
          leaderboardPromise.status === 200 &&
          leaderboardPromise.data != null
        ) {
          const leaderboardData = leaderboardPromise.data.data.dashboard;
          setLeaderboard((prev) => {
            return {
              ...prev,
              leaderboardList: leaderboardData,
            };
          });
        } else {
          throw new Error("Can't connect to the API");
        }
      }
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
    }
    getData();
  }, [walletAddress]);

  return { setSeason, leaderboard, seasonInfo };
}

export default useLoyaltyJackpot;
