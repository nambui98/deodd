import { useState } from "react";
import { useWalletContext } from "contexts/WalletContext";
import {
  getNftPoolPeriodsInfo,
  getNftHistoryInfo,
  getNftLeaderboardInfo,
} from "libs/apis/loyaltyAPI";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import {
  LoyaltyHolderLeaderboardType,
  LoyaltyHolderHistoryType,
  LoyaltyHolderPeriodsInfoType,
} from "libs/types/loyaltyTypes";
import { deoddNFTContract } from "libs/contract";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";

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
        const promiseResult = await getNftLeaderboardInfo(
          periodsInfo.data[period].id
        );
        if (promiseResult.data.data != null) {
          return promiseResult.data.data;
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      } else {
        throw new Error("No data to fetch");
      }
    },
    enabled: !!walletIsConnected && !!periodsInfo.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Data for NFT holder history tab.
  const history = useQuery({
    queryKey: ["holderHistory", period, walletAddress],
    queryFn: async (): Promise<LoyaltyHolderHistoryType> => {
      if (periodsInfo.data != null) {
        const promiseResult = await getNftHistoryInfo(
          periodsInfo.data[period].id
        );
        if (promiseResult.data.data != null) {
          return promiseResult.data.data;
        } else {
          // Throw error when response if ok but there is no data
          throw new Error("No Data");
        }
      } else {
        throw new Error("No data to fetch");
      }
    },
    enabled: !!walletIsConnected && !!periodsInfo.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  function useIsNFTHolder() {
    // Check if user have NFT in balance.
    const haveBalanceNFT = useQuery({
      queryKey: ["haveBalanceNFT", walletAddress],
      queryFn: async (): Promise<boolean> => {
        const promiseResult = await DeoddService.getAssetsBalance(
          walletAddress
        );

        if (promiseResult.data.data != null) {
          const nftQuantity = promiseResult.data.data.nftItemHoldingDTOForUser;

          if (
            nftQuantity.totalDiamondNFT > 0 ||
            nftQuantity.totalGoldNFT > 0 ||
            nftQuantity.totalBronzeNft > 0
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          throw new Error("No Data");
        }
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

    // Check if user have NFT in wallet
    const walletNFT = useContractRead({
      address: deoddNFTContract.address,
      abi: deoddNFTContract.abi,
      functionName: "getWalletTokens",
      args: [walletAddress],
    });

    const walletNFTArray = walletNFT?.data as BigNumber[];
    const haveWalletNFT =
      walletNFTArray == null ? false : walletNFTArray.length > 0 ? true : false;

    if (haveWalletNFT || haveBalanceNFT.data) {
      return true;
    } else {
      return false;
    }
  }

  return {
    periodsInfo,
    leaderboard,
    history,
    setPeriod,
    setReset,
    useIsNFTHolder,
  };
}

export default useLoyaltyHolder;
