import { useState, useEffect } from "react";
import { useWalletContext } from "contexts/WalletContext";
import {
  getLoyaltyNFTCurrent,
  getLoyaltyNFTBoardBySeason,
  getNFTItemProfitBySeason,
} from "libs/apis/loyaltyAPI";

function useLoyaltyHolder() {
  const { walletAddress, walletIsConnected } = useWalletContext();
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
    currentReward: 0,
    totalReward: 0,
    isActive: false,
  });
  const [reset, setReset] = useState(false); // state to reset when reaching new period
  const [history, setHistory] = useState([
    {
      tokenId: "",
      typeId: "",
      profit: 0,
    },
  ]);

  // Get data for holder banner section, and get number of periods for select list at page load
  useEffect(() => {
    const getData = async () => {
      const promiseResult = await getLoyaltyNFTCurrent(walletAddress);
      if (promiseResult.status === 200 && promiseResult.data != null) {
        const promiseData = promiseResult.data.data;
        setPeriodInfo({
          currentPeriod: promiseData.num_period,
          startTime: promiseData.start_time,
          endTime: promiseData.end_time,
          currentPrize: promiseData.current_prize,
          currentReward: promiseData.current_reward,
          totalReward: promiseData.total_reward,
          isActive: promiseData.is_active,
        });
        setLeaderboard((prev) => ({
          ...prev,
          currentPeriod: promiseData.num_period,
        }));
      }
    };
    getData();
  }, [walletAddress, reset]);

  useEffect(() => {
    if (walletIsConnected) {
      const controller = new AbortController();
      const getData = async () => {
        try {
          const leaderboardResult = await getLoyaltyNFTBoardBySeason(
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
          const historyResult = await getNFTItemProfitBySeason(
            walletAddress,
            period,
            controller.signal
          );
          if (historyResult.status === 200 && historyResult.data != null) {
            const historyData = historyResult.data.data;
            setHistory(
              historyData.nftItemProfits.map(
                (obj: {
                  token_id: string;
                  type_id: string;
                  profit: number;
                }) => ({
                  tokenId: obj.token_id,
                  typeId: obj.type_id,
                  profit: obj.profit,
                })
              )
            );
            setLoading((prev) => ({ ...prev, history: false }));
          } else {
            throw new Error("Can't connect to the API");
          }
        } catch (err) {
          console.log(err);
        }
      };

      setLoading({
        leaderboard: true,
        history: true,
      });
      getData();
      return () => controller.abort();
    }
  }, [period, walletAddress, leaderboard.currentPeriod, walletIsConnected]);

  return { leaderboard, setPeriod, periodInfo, loading, history, setReset };
}

export default useLoyaltyHolder;
