import vhIdRequest from "../utils/vhIdRequest";

const baseURL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? '/deodd'
    : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
      ? '/deodd' : ''
export const getTopStreakToday = async () => {
  return vhIdRequest({
    url: baseURL + `/topstreak/today`,
    method: "get",
  });
};

export const getFlipPerUser = async () => {
  return vhIdRequest({
    url: baseURL + `/dashboard/flipperuser`,
    method: "get",
  });
};

export const getFlipDashboardStat = async () => {
  return vhIdRequest({
    url: baseURL + `/dashboard/flip`,
    method: "get",
  });
};
