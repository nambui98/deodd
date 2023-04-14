import vhIdRequest from "../utils/vhIdRequest";

const apiRouter = "https://testapi.befitter.io/deodd";

export const getTopStreakToday = async () => {
  return vhIdRequest({
    url: `${apiRouter}//topstreak/today`,
    method: "get",
  });
};

export const getFlipPerUser = async () => {
  return vhIdRequest({
    url: `${apiRouter}//dashboard/flipperuser`,
    method: "get",
  });
};

export const getFlipDashboardStat = async () => {
  return vhIdRequest({
    url: `${apiRouter}//dashboard/flip`,
    method: "get",
  });
};
