import { Box, Stack, Typography, Divider, Skeleton } from "@mui/material";
import { BnbIcon, GoldCup1Icon } from "utils/Icons";
import { LoyaltyImage } from "utils/Images";
import { Colors } from "constants/index";
import JackpotPoolBoard from "./JackpotPoolBoard";
import { useWalletContext } from "contexts/WalletContext";
import useLoyaltyJackpot from "hooks/loyalty/useLoyaltyJackpot";
import { Format } from "utils/format";

type Props = {};

function JackpotPool({}: Props) {
  const { walletIsConnected } = useWalletContext();
  const { setSeason, leaderboard, history, seasonInfo } = useLoyaltyJackpot();

  return (
    <Box width={1}>
      <Stack direction={"row"} gap={1} sx={{ mx: { xs: 2, md: 0 } }}>
        <GoldCup1Icon width={32} />
        <Typography variant="h2" fontWeight={700} lineHeight={"2rem"}>
          Jackpot pool
        </Typography>
      </Stack>

      <Stack
        height={"413px"}
        bgcolor={"secondary.300"}
        borderRadius={1.5}
        mt={3}
        sx={{
          backgroundImage: `url(${LoyaltyImage})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mx: { xs: 2, md: 0 },
          p: 4,
        }}
      >
        {seasonInfo.isLoading ? (
          <Skeleton variant="text" width={200} />
        ) : (
          <Typography mt={3.5} variant="body2">
            Season{" "}
            <Box component={"span"} color={"text.secondary"}>
              {seasonInfo.isError ? "--" : `#${seasonInfo.data.currentSeason}`}
            </Box>{" "}
            Started at{" "}
            {seasonInfo.isError
              ? "--/--/----"
              : Format.formatDateTimeAlt(seasonInfo.data.startTime, "UTC")}
          </Typography>
        )}

        <Typography variant="body2" color={"text.disabled"}>
          Jackpot Reward
        </Typography>

        {seasonInfo.isLoading ? (
          <Skeleton variant="text" width={250} sx={{ fontSize: 48 }} />
        ) : (
          <Typography
            variant="h1"
            lineHeight={"3.75rem"}
            sx={{ overflowWrap: "anywhere", mb: 1.25 }}
          >
            {seasonInfo.isError
              ? "---"
              : Format.formatMoney(seasonInfo.data.currentReward, 4)}
            <Box component={"span"} sx={{ ml: 1 }}>
              <BnbIcon width={40} color={Colors.primaryDark} />
            </Box>
          </Typography>
        )}

        {walletIsConnected && (
          <>
            <Typography variant="body2" color={"text.disabled"}>
              Tosspoint to win
            </Typography>

            {seasonInfo.isLoading ? (
              <Skeleton variant="text" width={200} sx={{ fontSize: 38 }} />
            ) : (
              <Typography
                fontSize={"1.75rem"}
                lineHeight={"2,2rem"}
                fontWeight={500}
                color={"text.primary"}
              >
                {seasonInfo.isError
                  ? "--"
                  : seasonInfo.data.connectWalletTossPoint ?? 0}
                /
                <Box
                  component={"span"}
                  color={"text.secondary"}
                  fontSize={"2.375rem"}
                >
                  {seasonInfo.isError ? "--" : seasonInfo.data.tossPointRequire}
                </Box>
              </Typography>
            )}
          </>
        )}
      </Stack>

      {walletIsConnected ? (
        <>
          <Divider
            sx={{
              mt: { xs: 3, md: 5 },
              mb: 3,
              backgroundColor: "primary.100",
            }}
          />

          <JackpotPoolBoard
            setSeason={setSeason}
            leaderboard={leaderboard}
            history={history}
            seasonInfo={seasonInfo}
          />
        </>
      ) : null}
    </Box>
  );
}

export default JackpotPool;
