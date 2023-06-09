import { Box, Stack, Typography, Divider } from "@mui/material";
import { BnbIcon, Growth1Icon } from "utils/Icons";
import { LoyaltyImage, Loyalty2Image, LeaderboardImage } from "utils/Images";
import { Colors } from "constants/index";
import HolderPoolBoard from "./HolderPoolBoard";
import { useWalletContext } from "contexts/WalletContext";
import { ButtonMain } from "components/ui/button";
import useLoyaltyHolder from "hooks/loyalty/useLoyaltyHolder";
import useHolderTimer from "hooks/loyalty/useHolderTimer";
import { Format } from "utils/format";

type Props = {};

function HolderPool({ }: Props) {
  const { walletIsConnected } = useWalletContext();
  const { leaderboard, setPeriod, periodInfo, loading } = useLoyaltyHolder();
  const timeLeft = useHolderTimer();

  return (
    <Box width={1}>
      <Stack direction={"row"} gap={1} sx={{ mx: { xs: 2, md: 0 } }}>
        <Growth1Icon width={32} />
        <Typography variant="h2" fontWeight={700} lineHeight={"2rem"}>
          NFT Holder pool
        </Typography>
      </Stack>

      <Stack
        height={"413px"}
        bgcolor={"secondary.300"}
        borderRadius={1.5}
        overflow={"hidden"}
        mt={3}
        sx={{
          backgroundImage: `url(${Loyalty2Image})`,
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mx: { xs: 2, md: 0 },
        }}
      >
        {periodInfo.userReward ? (
          <>
            <Typography
              variant="body2"
              lineHeight={"1.375rem"}
              textTransform={"uppercase"}
              color={"text.disabled"}
            >
              Your total reward is
              <Box component={"span"} color={"text.secondary"}>
                {" "}
                1,5 BNB
              </Box>
              <br />
              claim NOW
            </Typography>
            <ButtonMain
              active={true}
              title="claim reward"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                minHeight: 0,
                px: 2,
                py: 0.5,
                mb: 3,
                lineHeight: "1.375rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderWidth: 2,
                ":hover": {
                  borderWidth: 2,
                },
              }}
            />
          </>
        ) : (
          ""
        )}

        <Typography variant="body2">
          Period{" "}
          <Box component={"span"} color={"text.secondary"}>
            #{periodInfo.currentPeriod}
          </Box>{" "}
          Started at{" "}
          {periodInfo.startTime
            ? Format.formatDateTime(periodInfo.startTime)
            : ""}
        </Typography>
        <Typography variant="body2" color={"text.disabled"}>
          Total NFT Holder Reward
        </Typography>
        <Stack
          direction={"row"}
          columnGap={1}
          alignItems={"center"}
          justifyContent={"center"}
          mb={1.25}
        >
          <Typography variant="h3" fontSize={"48px"}>
            {periodInfo.currentPrize}
          </Typography>
          <BnbIcon width={40} color={Colors.primaryDark} />
        </Stack>
        {/* <Typography variant='body2' color={"text.disabled"}>Only NFT holders <br /> are able to get the reward </Typography> */}
        <Typography variant="body2" color={"text.disabled"}>
          Your current reward in this period is
          <Box component={"span"} color={"text.primary"}>
            {" "}
            {periodInfo.userReward ?? 0}{" "}
            <Box component={"span"} lineHeight={0} fontSize={0}>
              <BnbIcon width={16} color={Colors.primaryDark} />
            </Box>
          </Box>
        </Typography>

        <Typography variant="body2">Claimable in: {timeLeft}</Typography>
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
          <HolderPoolBoard leaderboard={leaderboard} setPeriod={setPeriod} loading={loading} />
        </>
      ) : null}
    </Box>
  );
}

export default HolderPool;
