import { Typography, Box } from "@mui/material";
import { bgWinStreakImage, bgLossStreakImage } from "utils/Images";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";
import { Convert } from "utils/convert";

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
      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 3"
          },
          backgroundImage: `url(${bgWinStreakImage})`,
          backgroundSize: "cover",
        })}
        justifyContent={"center"}
        position={"relative"}
        height="13.5rem"

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
              <Typography variant="h1" fontSize={"3rem"} lineHeight={"3.795rem"}>
                {streak.winStreak < 10 && streak.winStreak >= 1
                  ? `0${streak.winStreak}`
                  : streak.winStreak}
              </Typography>
              <Typography fontSize={"1rem"} textAlign={"center"}>
                {streak.username ? streak.username : "Unknown"}
                {" "}
                {streak.winWallet ? `(${Convert.convertWalletAddress(streak.winWallet, 5, 4)})` : ""}
              </Typography>
            </>
          ) : (
            <Typography variant="h3">{error.errorMessage}</Typography>
          )}
        </Box>
      </DashboardCard>
      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 3"
          },
          backgroundImage: `url(${bgLossStreakImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        })}
        justifyContent={"center"}
        position={"relative"}
        height="13.5rem"
      >
        <TitleTextAbsolute text="highest loss streak" />
        {error.haveFlipped ? (
          <Typography variant="h1" fontSize={"3rem"} lineHeight={"3.795rem"}>
            {streak.lossStreak < 10 && streak.lossStreak >= 1
              ? `0${streak.lossStreak}`
              : streak.lossStreak}
          </Typography>
        ) : (
          <Typography variant="h3">{error.errorMessage}</Typography>
        )}
      </DashboardCard>
    </>
  );
}
