import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";
import { useQuery } from "@tanstack/react-query";
import { LoyaltyJackpotLeaderboardType, LoyaltyJackpotHistoryType, LoyaltyJackpotSeasonInfoType } from "libs/types/loyaltyTypes";

function useLoyaltyJackpot() {
  const { walletAddress, walletIsConnected } = useWalletContext();

  const [season, setSeason] = useState<number>(0);

  // Data for Jackpot banner
  const seasonInfo = useQuery({
    queryKey: ["jackpotSeasonInfo", walletAddress],
    queryFn: async (): Promise<LoyaltyJackpotSeasonInfoType> => {
      const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
      if (promiseResult.data.data != null) {
        return (promiseResult.data.data);
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    },
    staleTime: 2500,
    refetchInterval: 5000, // refetch every 5 seconds
  });

  // Data for Jackpot leaderboard tab
  const leaderboard = useQuery({
    queryKey: ["jackpotLeaderboard", season, walletAddress],
    queryFn: async (): Promise<LoyaltyJackpotLeaderboardType> => {
      if (season === 0) {
        const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
        if (promiseResult.data.data != null) {
          const leaderboardList = promiseResult.data.data.dashboard.dashboard;
          const connectWallet = promiseResult.data.data.dashboard.connectWallet;
          return {
            leaderboardList,
            connectWallet,
          }
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      } else {
        const promiseResult = await getLoyaltyJackpotBoardHistory(walletAddress, season);
        if (promiseResult.data.data != null) {
          const leaderboardList = promiseResult.data.data.dashboard;
          const connectWallet = promiseResult.data.data.connectWallet;
          return {
            leaderboardList,
            connectWallet,
          }
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      }
    },
    enabled: walletIsConnected,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Data for Jackpot history tab
  const history = useQuery({
    queryKey: ["jackpotHistory", season, walletAddress],
    queryFn: async (): Promise<LoyaltyJackpotHistoryType> => {
      const promiseResult = await getLoyaltyHistoryJackpot(walletAddress, season);
      if (promiseResult.data.data != null) {
        return promiseResult.data.data;
      } else {
        // Throw error when response if ok but there is no data
        throw new Error("No Data");
      }
    },
    enabled: walletIsConnected,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    setSeason,
    leaderboard,
    history,
    seasonInfo,
  };
}

export default useLoyaltyJackpot;
