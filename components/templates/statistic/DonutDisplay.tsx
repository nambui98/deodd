import { Donut } from "components/ui/donuts";
import { Box, Typography } from "@mui/material";

type DonutDisplayType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  flipDashboardStat: any;
  tail: string;
  head: string;
};

// tail and head is for choosing from result or user's choice
export function DonutDisplay({
  error,
  flipDashboardStat,
  tail,
  head,
}: DonutDisplayType) {
  return (
    <Box
      sx={{ width: "10rem" }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <Box
        position={"absolute"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h2" fontWeight={"700"}>
          {/* If user have not flipped, return 0. If yes, check if it's smaller than 10 and append 0 before it */}
          {!error.haveFlipped
            ? "0"
            : flipDashboardStat.numberFlipToday < 10
            ? "0" + flipDashboardStat.numberFlipToday
            : flipDashboardStat.numberFlipToday}
        </Typography>
        <Typography variant="body2" textTransform={"uppercase"}>
          times
        </Typography>
      </Box>
      <Donut data={[flipDashboardStat[tail], flipDashboardStat[head]]} />
    </Box>
  );
}
