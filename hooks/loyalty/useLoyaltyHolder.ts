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
        const leaderboardResult = await GetLoyaltyNFTBoardBySeason(
          walletAddress,
          period,
          controller.signal
        );
        if (
          leaderboardResult.status === 200 &&
          leaderboardResult.data != null
        ) {
          const leaderboardData = leaderboardResult.data.data;
          setLeaderboard((prev) => ({
            ...prev,
            leaderboardList: leaderboardData.dashboard,
            connectWallet: leaderboardData.connectWallet,
          }));
          setLoading((prev) => ({ ...prev, leaderboard: false }));
        } else {
          throw new Error("Can't connect to the API");
        }
        const historyResult = await GetNFTItemProfitBySeason(
          walletAddress,
          period,
          controller.signal
        );
        if (historyResult.status === 200 && historyResult.data != null) {
          const historyData = historyResult.data.data;
          // setHistory()
          setLoading((prev) => ({ ...prev, history: false }));
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
