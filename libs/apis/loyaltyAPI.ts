import vhIdRequest from "@/utils/vhIdRequest";

const baseURL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
    ? "/deodd"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION"
    ? "/deodd-pretest"
    : "";

export const getLoyaltyJackpotBoardCurrent = async (wallet: string) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/board/current?wallet=${wallet}`,
    method: "get",
  });
};

export const getLoyaltyJackpotBoardHistory = async (
  wallet: string,
  season: string | number
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/board/season?wallet=${wallet}&season=${season}`,
    method: "get",
  });
};

export const getLoyaltyHistoryJackpot = async (
  wallet: string,
  season: string | number
) => {
  return vhIdRequest({
    url: baseURL + `/jackpot/history/season?wallet=${wallet}&season=${season}`,
    method: "get",
  });
};
