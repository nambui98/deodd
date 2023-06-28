import { useState, useEffect } from "react";
import { useWalletContext } from "contexts/WalletContext";
import {
  getLoyaltyNFTCurrent,
  getLoyaltyNFTBoardBySeason,
  getNFTItemProfitBySeason,
} from "libs/apis/loyaltyAPI";
import { useQuery } from "@tanstack/react-query";
import { LoyaltyHolderPeriodInfoType, LoyaltyHolderLeaderboardType, LoyaltyHolderHistoryType } from "libs/types/loyaltyTypes";

function useLoyaltyHolder() {
  const { walletAddress, walletIsConnected } = useWalletContext();

  const [period, setPeriod] = useState<number>(0);

  const [reset, setReset] = useState(false); // state to reset when reaching new period

  // Data for NFT holder banner.
  const periodInfo = useQuery({
    queryKey: ["periodInfo", reset, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderPeriodInfoType> => {
      const promiseResult = await getLoyaltyNFTCurrent(walletAddress);
      if (promiseResult.data.data != null) {
        const promiseData = promiseResult.data.data;
        return {
          currentPeriod: promiseData.num_period,
          startTime: promiseData.start_time,
          endTime: promiseData.end_time,
          currentPrize: promiseData.current_prize,
          currentReward: promiseData.current_reward,
          totalReward: promiseData.total_reward,
          isActive: promiseData.is_active,
        }
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    },
    enabled: walletIsConnected,
    staleTime: 2500,
    refetchInterval: 5000, // refetch every 5 seconds
  });

  // Data for NFT holder leaderboard tab.
  const leaderboard = useQuery({
    queryKey: ["holderLeaderboard", period, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderLeaderboardType> => {
      const promiseResult = await getLoyaltyNFTBoardBySeason(walletAddress, period);
      if (promiseResult.data.data != null) {
        return {
          leaderboardList: promiseResult.data.data.dashboard,
          connectWallet: promiseResult.data.data.connectWallet,
        }
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    },
    enabled: walletIsConnected,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Data for NFT holder history tab.
  const history = useQuery({
    queryKey: ["holderHistory", period, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderHistoryType> => {
      const promiseResult = await getNFTItemProfitBySeason(walletAddress, period);
      if (promiseResult.data.data != null) {
        return promiseResult.data.data.nftItemProfits.map(
          (obj: {
            token_id: string;
            type_id: string;
            profit: number;
          }) => ({
            tokenId: obj.token_id,
            typeId: obj.type_id,
            profit: obj.profit,
          })
        );
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    }
  });


  return { periodInfo, leaderboard, history, setPeriod, setReset };
}

export default useLoyaltyHolder;
