import vhIdRequest from "@/utils/vhIdRequest";

const baseURL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
    ? "/deodd"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION"
    ? "/deodd-pretest"
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
  season: string | number,
  signal: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/board/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};

export const getLoyaltyHistoryJackpot = async (
  wallet: string,
  season: string | number,
  signal: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/history/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};

export const GetLoyaltyNFTCurrent = async (
  wallet: string,
  signal?: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/nft/board/current?wallet=${wallet}`,
    method: "get",
    signal: signal,
  });
};

export const GetLoyaltyNFTBoardBySeason = async (
  wallet: string,
  season: number,
  signal: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/nft/board/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};

export const GetNFTItemProfitBySeason = async (
  wallet: string,
  season: number,
  signal: AbortSignal
) => {
  return vhIdRequest({
    url: baseURL + `/nft/profit/season?wallet=${wallet}&season=${season}`,
    method: "get",
    signal: signal,
  });
};
