import vhIdRequest from "../utils/vhIdRequest";


export const getTopStreakToday = async () => {
  return vhIdRequest({
    url: `/deodd/topstreak/today`,
    method: "get",
  });
};

export const getFlipPerUser = async () => {
  return vhIdRequest({
    url: `/deodd/dashboard/flipperuser`,
    method: "get",
  });
};

export const getFlipDashboardStat = async () => {
  return vhIdRequest({
    url: `/deodd/dashboard/flip`,
    method: "get",
  });
};
