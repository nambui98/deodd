import { Box, Stack, Typography, Divider, Skeleton } from "@mui/material";
import { BnbIcon, Growth1Icon } from "utils/Icons";
import { Loyalty2Image } from "utils/Images";
import { Colors } from "constants/index";
import HolderPoolBoard from "./HolderPoolBoard";
import { useWalletContext } from "contexts/WalletContext";
import { ButtonMain } from "components/ui/button";
import useLoyaltyHolder from "hooks/loyalty/useLoyaltyHolder";
import { Format } from "utils/format";
import NFTHolderTimer from "./components/NFTHolderTimer";
import Link from "next/link";

type Props = {};

function HolderPool({ }: Props) {
  const { walletIsConnected } = useWalletContext();

  const {
    periodsInfo,
    leaderboard,
    history,
    setReset,
    setPeriod,
    useIsNFTHolder,
  } = useLoyaltyHolder();

  const isNFTHolder = useIsNFTHolder();

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
          p: 4,
        }}
      >
        {walletIsConnected &&
          !periodsInfo.isLoading &&
          !periodsInfo.isError &&
          (periodsInfo.data[0].season > 1 &&
            periodsInfo.data.some((period) => period.is_claimed != null) ? (
            <>
              <Typography
                variant="body2"
                lineHeight={20 / 14}
                color={"text.disabled"}
                mb={1}
              >
                It’s time to claim your reward
              </Typography>
              <Link href={"/campaign"}>
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
                />
              </Link>
            </>
          ) : (
            ""
          ))}

        {periodsInfo.isLoading ? (
          <Skeleton variant="text" width={200} />
        ) : (
          <Typography variant="body2">
            Period{" "}
            <Box component={"span"} color={"text.secondary"}>
              {periodsInfo.isError ? "--" : `#${periodsInfo.data[0].season}`}
            </Box>{" "}
            Started at{" "}
            {periodsInfo.isError
              ? "--/--/----"
              : Format.formatDateTimeAlt(periodsInfo.data[0].start_time, "UTC")}
          </Typography>
        )}

        <Typography variant="body2" color={"text.disabled"}>
          Total NFT Holder Reward
        </Typography>

        {periodsInfo.isLoading ? (
          <Skeleton variant="text" width={250} sx={{ fontSize: 48 }} />
        ) : (
          <Typography
            variant="h1"
            lineHeight={"3.75rem"}
            sx={{ overflowWrap: "anywhere", mb: 1.25 }}
          >
            {periodsInfo.isError
              ? "----"
              : Format.formatMoney(
                periodsInfo.data[0].current_prize / Math.pow(10, 18),
                4
              )}
            <Box component={"span"} sx={{ ml: 1 }}>
              <BnbIcon width={40} color={Colors.primaryDark} />
            </Box>
          </Typography>
        )}

        {walletIsConnected &&
          (periodsInfo.isLoading || isNFTHolder === undefined) && (
            <>
              <Skeleton width={200} />
              <Skeleton width={100} height={50} />
            </>
          )}

        {walletIsConnected &&
          !periodsInfo.isLoading &&
          !periodsInfo.isError &&
          periodsInfo.data[0].reward !== null && (
            <>
              <Typography variant="body2" color={"text.disabled"}>
                Your current reward in this period is{" "}
                <Box component={"span"} color={"text.primary"}>
                  {Format.formatMoney(periodsInfo.data[0].reward, 7)}
                  <Box component={"span"} sx={{ ml: 0.25 }}>
                    <BnbIcon width={16} color={Colors.primaryDark} />
                  </Box>
                </Box>
              </Typography>

              <NFTHolderTimer setReset={setReset} periodsInfo={periodsInfo} />
            </>
          )}

        {walletIsConnected &&
          !periodsInfo.isLoading &&
          !periodsInfo.isError &&
          isNFTHolder === true &&
          periodsInfo.data[0].reward == null && (
            <>
              <Typography variant="body2" color={"text.disabled"} mb={1}>
                Only nft holders STAKING their nft
                <br /> are able to get the reward{" "}
              </Typography>

              <Link href={"/staking"}>
                <ButtonMain
                  active={true}
                  title={"Stake"}
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
          )}

        {walletIsConnected &&
          !periodsInfo.isLoading &&
          !periodsInfo.isError &&
          isNFTHolder === false &&
          periodsInfo.data[0].reward == null && (
            <>
              <Typography variant="body2" color={"text.disabled"} mb={1}>
                Only NFT Holders are able to get the reward
              </Typography>

              <Link href={"/shop"}>
                <ButtonMain
                  active={true}
                  title={"Shop now"}
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
          <HolderPoolBoard
            periodsInfo={periodsInfo}
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
