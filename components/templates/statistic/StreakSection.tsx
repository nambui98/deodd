import { Grid, Typography, Box } from "@mui/material";
import { bgWinStreakImage, bgLossStreakImage } from "utils/Images";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";

type StreakPropsType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  streak: any;
};

export function StreakSection({ error, streak }: StreakPropsType) {
  return (
    <>
      <Grid item md={6} xs={12}>
        <DashboardCard
          justifyContent={"center"}
          position={"relative"}
          height="15.5rem"
          sx={{
            backgroundImage: `url(${bgWinStreakImage})`,
            backgroundSize: "cover",
          }}
        >
          <TitleTextAbsolute text="highest win streak" />
          <Box
            display={"flex"}
            gap={1}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {error.haveFlipped ? (
              <>
                <Typography variant="h1">
                  {streak.winStreak < 10 && streak.winStreak >= 1
                    ? `0${streak.winStreak}`
                    : streak.winStreak}
                </Typography>
                <Typography>
                  {streak.username ? streak.username : "Unknown"}
                </Typography>
              </>
            ) : (
              <Typography variant="h3">{error.errorMessage}</Typography>
            )}
          </Box>
        </DashboardCard>
      </Grid>
      <Grid item md={6} xs={12}>
        <DashboardCard
          justifyContent={"center"}
          position={"relative"}
          height="15.5rem"
          sx={{
            backgroundImage: `url(${bgLossStreakImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        >
          <TitleTextAbsolute text="highest loss streak" />
          {error.haveFlipped ? (
            <Typography variant="h1">
              {streak.lossStreak < 10 && streak.lossStreak >= 1
                ? `0${streak.lossStreak}`
                : streak.lossStreak}
            </Typography>
          ) : (
            <Typography variant="h3">{error.errorMessage}</Typography>
          )}
        </DashboardCard>
      </Grid>
    </>
  );
}
