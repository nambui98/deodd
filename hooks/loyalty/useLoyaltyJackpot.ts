import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";

function useLoyaltyJackpot() {
  const [season, setSeason] = useState(1);
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
  });
  const { walletAddress } = useWalletContext();

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

  return { setSeason, leaderboard };
}

export default useLoyaltyJackpot;
