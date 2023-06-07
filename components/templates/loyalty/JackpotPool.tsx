import { Box, Stack, Typography, Divider } from "@mui/material";
import { BnbIcon, GoldCup1Icon } from "utils/Icons";
import { LoyaltyImage } from "utils/Images";
import { Colors } from "constants/index";
import JackpotPoolBoard from "./JackpotPoolBoard";
import { useWalletContext } from "contexts/WalletContext";
import useLoyaltyJackpot from "hooks/loyalty/useLoyaltyJackpot";

type Props = {};

function JackpotPool({}: Props) {
  const { walletIsConnected } = useWalletContext();
  const { leaderboard, setSeason, history, seasonInfo } = useLoyaltyJackpot();

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
        }}
      >
        <Typography mt={3.5} variant="body2">
          Season{" "}
          <Box component={"span"} color={"text.secondary"}>
            #{seasonInfo.currentSeason}
          </Box>{" "}
          Started at {new Date(seasonInfo.startTime).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color={"text.disabled"}>
          Jackpot Reward
        </Typography>
        <Stack
          direction={"row"}
          columnGap={1}
          alignItems={"center"}
          justifyContent={"center"}
          mb={1.25}
        >
          <Typography variant="h3" fontSize={"3rem"} lineHeight={"3.75rem"}>
            {seasonInfo.currentReward}
          </Typography>
          <BnbIcon width={40} color={Colors.primaryDark} />
        </Stack>
        <Typography variant="body2" color={"text.disabled"}>
          Tosspoint to win
        </Typography>
        <Typography
          fontSize={"1.75rem"}
          lineHeight={"2,2rem"}
          fontWeight={500}
          color={"text.primary"}
        >
          {seasonInfo.connectWalletTossPoint ?? 0}/
          <Box
            component={"span"}
            color={"text.secondary"}
            fontSize={"2.375rem"}
          >
            {seasonInfo.tossPointRequire}
          </Box>
        </Typography>
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
            leaderboard={leaderboard}
            setSeason={setSeason}
            history={history}
          />
        </>
      ) : null}
    </Box>
  );
}

export default JackpotPool;
