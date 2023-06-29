import { useState } from "react";
import { useWalletContext } from "contexts/WalletContext";
import {
  getNftPoolPeriodsInfo,
  getNftHistoryInfo,
  getNftLeaderboardInfo
} from "libs/apis/loyaltyAPI";
import { useQuery } from "@tanstack/react-query";
import { LoyaltyHolderLeaderboardType, LoyaltyHolderHistoryType, LoyaltyHolderPeriodsInfoType } from "libs/types/loyaltyTypes";

function useLoyaltyHolder() {
  const { walletAddress, walletIsConnected } = useWalletContext();

  const [period, setPeriod] = useState<number>(0);

  const [reset, setReset] = useState(false); // state to reset when reaching new period

  // Data for NFT holder banner and select list.
  const periodsInfo = useQuery({
    queryKey: ["periodsInfo", reset],
    queryFn: async (): Promise<LoyaltyHolderPeriodsInfoType> => {
      const promiseResult = await getNftPoolPeriodsInfo();
      if (promiseResult.data.data != null) {
        return promiseResult.data.data;
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Data for NFT holder leaderboard tab.
  const leaderboard = useQuery({
    queryKey: ["holderLeaderboard", period, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderLeaderboardType> => {
      if (periodsInfo.data != null) {
        const promiseResult = await getNftLeaderboardInfo(periodsInfo.data[period].id);
        if (promiseResult.data.data != null) {
          console.log("leaderboard", promiseResult.data.data);
          return promiseResult.data.data;
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      } else {
        throw new Error("No data to fetch");
      }
    },
    enabled: walletIsConnected && !!periodsInfo.data ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Data for NFT holder history tab.
  const history = useQuery({
    queryKey: ["holderHistory", period, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderHistoryType> => {
      if (periodsInfo.data != null) {
        const promiseResult = await getNftHistoryInfo(periodsInfo.data[period].id);
        if (promiseResult.data.data != null) {
          console.log("history", promiseResult.data.data);
          return promiseResult.data.data
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      } else {
        throw new Error("No data to fetch");
      }
    },
    enabled: walletIsConnected && !!periodsInfo.data ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { periodsInfo, leaderboard, history, setPeriod, setReset };
}

export default useLoyaltyHolder;
