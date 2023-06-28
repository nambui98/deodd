import { Box, Stack, Typography, Divider } from "@mui/material";
import { BnbIcon, Growth1Icon } from "utils/Icons";
import { LoyaltyImage, Loyalty2Image, LeaderboardImage } from "utils/Images";
import { Colors } from "constants/index";
import HolderPoolBoard from "./HolderPoolBoard";
import { useWalletContext } from "contexts/WalletContext";
import { ButtonMain } from "components/ui/button";
import useLoyaltyHolder from "hooks/loyalty/useLoyaltyHolder";
import { Format } from "utils/format";
import { useSiteContext } from "contexts/SiteContext";
import { claimNFTReward } from "libs/apis/loyaltyAPI";
import NFTHolderTimer from "./components/NFTHolderTimer";
import Link from "next/link";

type Props = {};

function HolderPool({}: Props) {
  const { walletAddress, walletIsConnected } = useWalletContext();
  const { periodInfo, leaderboard, history, setReset, setPeriod } =
    useLoyaltyHolder();
  const {
    setIsSuccess,
    setTitleSuccess,
    setIsLoading,
    setIsError,
    setTitleError,
  } = useSiteContext();

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      const res = await claimNFTReward(walletAddress);
      setIsLoading(false);
      if (res.data.data && res.status === 200) {
        setTitleSuccess("Claimed successfully");
        setIsSuccess(true);
        setReset((prev) => !prev);
      } else {
        setIsError(true);
        setTitleError(res.data.meta.error_message);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setTitleError("Something went wrong! Please try again later");
    }
  };

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
        {walletIsConnected &&
          !periodInfo.isLoading &&
          !periodInfo.isError &&
          (periodInfo.data.currentPeriod > 1 &&
          periodInfo.data.totalReward > 0 ? (
            <>
              <Typography
                variant="body2"
                lineHeight={20 / 14}
                color={"text.disabled"}
                mb={1}
              >
                It’s time to claim your reward
              </Typography>
              <ButtonMain
                active={true}
                title="Claim reward"
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: 16 / 12,
                  fontWeight: 400,
                  minHeight: 0,
                  px: 2,
                  py: 1,
                  mb: 3,
                }}
                onClick={handleClaim}
              />
            </>
          ) : (
            ""
          ))}

        <Typography variant="body2">
          Period{" "}
          <Box component={"span"} color={"text.secondary"}>
            {periodInfo.isLoading
              ? "..."
              : periodInfo.isError
              ? "--"
              : `#${periodInfo.data.currentPeriod}`}
          </Box>{" "}
          Started at{" "}
          {periodInfo.isLoading
            ? "--/--/----"
            : periodInfo.isError
            ? "--/--/----"
            : Format.formatDateTime(periodInfo.data.startTime)}
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
          <Typography variant="h3" fontSize={"3rem"}>
            {periodInfo.isLoading
              ? "---"
              : periodInfo.isError
              ? "---"
              : Format.formatMoney(periodInfo.data.currentPrize, 4)}
          </Typography>
          <BnbIcon width={40} color={Colors.primaryDark} />
        </Stack>
        {walletIsConnected &&
          !periodInfo.isLoading &&
          !periodInfo.isError &&
          (periodInfo.data.currentReward !== null &&
          periodInfo.data.currentReward >= 0 ? (
            <>
              <Typography variant="body2" color={"text.disabled"}>
                Your current reward in this period is
                <Box component={"span"} color={"text.primary"}>
                  {" "}
                  {periodInfo.data.currentReward
                    ? Format.formatMoney(periodInfo.data.currentReward, 7)
                    : 0}{" "}
                  <Box component={"span"}>
                    <BnbIcon width={16} color={Colors.primaryDark} />
                  </Box>
                </Box>
              </Typography>
              <NFTHolderTimer setReset={setReset} periodInfo={periodInfo} />
            </>
          ) : (
            <>
              <Typography variant="body2" color={"text.disabled"} mb={1}>
                Only nft holders STAKING their nft
                <br /> are able to get the reward{" "}
              </Typography>

              <Link href="/shop">
                <ButtonMain
                  active={true}
                  title="Shop now"
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: 16 / 12,
                    fontWeight: 400,
                    minHeight: 0,
                    px: 2,
                    py: 1,
                    backgroundColor: "background.default",
                  }}
                />
              </Link>
            </>
          ))}
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
          <HolderPoolBoard
            periodInfo={periodInfo}
            leaderboard={leaderboard}
            history={history}
            setPeriod={setPeriod}
          />
        </>
      ) : null}
    </Box>
  );
}

export default HolderPool;
