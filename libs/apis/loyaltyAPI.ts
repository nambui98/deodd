import vhIdRequest from "@/utils/vhIdRequest";

const baseURL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
    ? "/deodd"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION"
      ? "/deodd"
      : "";

export const getLoyaltyJackpotBoardCurrent = async (
  wallet: string,
  signal?: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/board/current?wallet=${wallet}`,
    method: "get",
    signal: signal,
  });
};

export const getLoyaltyJackpotBoardHistory = async (
  wallet: string,
  season: number,
  signal?: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/board/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};

export const getLoyaltyHistoryJackpot = async (
  wallet: string,
  season: number,
  signal?: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/history/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};

export const claimNFTReward = async (address: string) => {
  return await vhIdRequest({
    url: baseURL + `/users/nft/claim`,
    method: 'post',
    data: JSON.stringify({
      destination: address,
    })
  })
}

export const getJackpotBoom = async () => {
  return await vhIdRequest({
    url: baseURL + `/jackpot/boom`,
    method: 'get',
  })
}

export const getNftPoolPeriodsInfo = async () => {
  return await vhIdRequest({
    url: baseURL + `/nft/staking/pools`,
    method: 'get',
  })
}

export const getNftHistoryInfo = async (poolId: string) => {
  return await vhIdRequest({
    url: baseURL + `/nft/staking/nft-staked?poolId=${poolId}`,
    method: 'get',
  })
}

export const getNftLeaderboardInfo = async (poolId: string) => {
  return await vhIdRequest({
    url: baseURL + `/nft/staking/leaderboard?poolId=${poolId}`,
    method: 'get',
  })
}
