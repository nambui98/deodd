import { useState, useEffect } from "react";
import {
  getLoyaltyJackpotBoardCurrent,
  getLoyaltyJackpotBoardHistory,
  getLoyaltyHistoryJackpot,
} from "libs/apis/loyaltyAPI";
import { useWalletContext } from "contexts/WalletContext";
import { useQuery } from "@tanstack/react-query";

function useLoyaltyJackpot() {
  const { walletAddress, walletIsConnected } = useWalletContext();

  const [season, setSeason] = useState<number>(0);

  // Data for Jackpot banner
  const {
    data: seasonInfo,
    isError: seasonInfoIsError,
    isLoading: seasonInfoIsLoading,
  } = useQuery({
    queryKey: ["jackpotSeasonInfo"],
    queryFn: async () => {
      const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
      return (promiseResult.data.data);
    },
    enabled: walletIsConnected,
    staleTime: 2500,
    refetchInterval: 5000, // refetch every 5 seconds
  });

  // Data for Jackpot leaderboard tab
  const {
    data: leaderboard,
    isError: leaderboardIsError,
    isLoading: leaderboardIsLoading,
  } = useQuery({
    queryKey: ["leaderboard", season],
    queryFn: async () => {
      if (season === 0) {
        const promiseResult = await getLoyaltyJackpotBoardCurrent(walletAddress);
        if (promiseResult.data != null) {
          const leaderboardList = promiseResult.data.data.dashboard.dashboard;
          const connectWallet = promiseResult.data.data.dashboard.connectWallet;
          return {
            leaderboardList,
            connectWallet,
          }
        }
      } else {
        const promiseResult = await getLoyaltyJackpotBoardHistory(walletAddress, season);
        if (promiseResult.data != null) {
          return promiseResult.data.data;
        }
      }
    },
    enabled: walletIsConnected,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Data for Jackpot history tab
  const {
    data: history,
    isError: historyIsError,
    isLoading: historyIsLoading,
  } = useQuery({
    queryKey: ["jackpotHistory", season],
    queryFn: async () => {
      const promiseResult = await getLoyaltyHistoryJackpot(walletAddress, season);
      return promiseResult.data.data;
    },
    enabled: walletIsConnected,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    setSeason,
    leaderboard,
    leaderboardIsLoading,
    leaderboardIsError,
    history,
    historyIsLoading,
    historyIsError,
    seasonInfo,
    seasonInfoIsLoading,
    seasonInfoIsError,
  };
}

export default useLoyaltyJackpot;
