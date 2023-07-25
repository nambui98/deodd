import vhIdRequest from "../utils/vhIdRequest";

const baseURL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? '/deodd'
    : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
      ? '/deodd' : ''
export const getTopStreakToday = async (timeStatus: 'TODAY' | 'UNTIL_NOW') => {
  return vhIdRequest({
    url: baseURL + `/topstreak/today?time=${timeStatus}`,
    method: "get",
  });
};

export const getFlipPerUser = async (timeStatus: 'TODAY' | 'UNTIL_NOW') => {
  return vhIdRequest({
    url: baseURL + `/dashboard/flipperuser?time=${timeStatus}`,
    method: "get",
  });
};

export const getFlipDashboardStat = async (timeStatus: 'TODAY' | 'UNTIL_NOW') => {
  return vhIdRequest({
    url: baseURL + `/dashboard/flip?time=${timeStatus}`,
    method: "get",
  });
};
