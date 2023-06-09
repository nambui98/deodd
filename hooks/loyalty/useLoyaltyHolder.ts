import { useState, useEffect, useInsertionEffect } from "react";
import {} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";
import {
  GetLoyaltyNFTCurrent,
  GetLoyaltyNFTBoardBySeason,
  GetNFTItemProfitBySeason,
} from "libs/apis/loyaltyAPI";

function useLoyaltyHolder() {
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState({
    leaderboard: true,
    history: true,
  });
  const [period, setPeriod] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState({
    currentPeriod: 1,
    leaderboardList: [
      {
        rank: 0,
        owner: "",
        userName: "",
        avatarId: 0,
        totalDiamondNFT: 0,
        totalGoldNFT: 0,
        totalBronzeNFT: 0,
      },
    ],
    connectWallet: {
      rank: 0,
      owner: "",
      userName: "",
      avatarId: 0,
      totalDiamondNFT: 0,
      totalGoldNFT: 0,
      totalBronzeNFT: 0,
    },
  });
  const [periodInfo, setPeriodInfo] = useState({
    currentPeriod: 0,
    startTime: "",
    endTime: "",
    currentPrize: 0,
    userReward: "",
  });
  const [history, setHistory] = useState({});

  // Get data for holder banner section, and get number of periods for select list at page load
  useEffect(() => {
    async function getData() {
      const promiseResult = await GetLoyaltyNFTCurrent(walletAddress);
      if (promiseResult.status === 200 && promiseResult.data != null) {
        const promiseData = promiseResult.data.data;
        setPeriodInfo({
          currentPeriod: promiseData.num_period,
          startTime: promiseData.start_time,
          endTime: promiseData.end_time,
          currentPrize: promiseData.current_prize,
          userReward: promiseData.user_reward,
        });
        setLeaderboard((prev) => ({
          ...prev,
          currentPeriod: promiseData.num_period,
        }));
      }
    }
    getData();
  }, [walletAddress]);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const seasonResult = await GetLoyaltyNFTBoardBySeason(
          walletAddress,
          period,
          controller.signal
        );
        if (seasonResult.status === 200 && seasonResult.data != null) {
          const seasonData = seasonResult.data.data;
          setLeaderboard((prev) => ({
            ...prev,
            leaderboardList: seasonData.dashboard,
            connectWallet: seasonData.connectWallet,
          }));
          setLoading((prev) => ({ ...prev, leaderboard: false }));
        } else {
          throw new Error("Can't connect to the API");
        }
      } catch (err) {
        console.log(err);
      }
    }

    setLoading({
      leaderboard: true,
      history: true,
    });
    getData();

    return () => controller.abort();
  }, [period, walletAddress, leaderboard.currentPeriod]);

  return { leaderboard, setPeriod, periodInfo, loading };
}

export default useLoyaltyHolder;
