import { useState } from "react";
import { Typography, Stack, Box, styled, useTheme, useMediaQuery, Grid } from "@mui/material";
import { ButtonFourth, ButtonLoading, ButtonMain } from "components/ui/button";
import { CalculatorIcon, BnbIcon } from "utils/Icons";
import StakingRowItem from "./components/StakingRowItem";
import StakingCalculator from "./components/StakingCalculator";
import ApproveModal from "./components/ApproveModal";
import { useDeoddNFTContract } from "hooks/useDeoddNFTContract";
import { useWalletContext } from "contexts/WalletContext";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import { EnumNFT, TypeDataNFT } from "libs/types";
import FlowStake from "./components/FlowStake";
import { Format } from "utils/format";
import ProfitDetailModal from "./components/ProfitDetailModal";
import { getPathAvatarNFT } from "utils/checkAvatar";
import { Colors, DefaultRewardPool, DefaultSeason, DefaultStaked } from "constants/index";
import MyImage from "components/ui/image";
import StakingNoNFT from "./StakingNoNFT";
import StakingSuccess from "./StakingSuccess";
import CoinAnimation from "components/common/CoinAnimation";
import { Utils } from "@/utils/index";

// CHANGE ME LATER
const dummyData = [
  {
    NFTCards: {
      type: "Diamond",
      list: ["Diamond NFT Card #123222", "Diamond NFT Card #125522"]
    },
    sharePercent: 0.1,
    estimatedProfit: 0.2,
  },
  {
    NFTCards: {
      type: "Gold",
      list: ["Gold NFT Card #125132", "Gold NFT Card #125123"]
    },
    sharePercent: 0.1,
    estimatedProfit: 0.2,
  },
  {
    NFTCards: {
      type: "Bronze",
      list: ["Bronze NFT Card #125121", "Bronze NFT Card #125122"]
    },
    sharePercent: 0.1,
    estimatedProfit: 0.2,
  },
]

function StakingWithWallet({ currentPool }: { currentPool: any }) {
  const theme = useTheme();
  const [stakeOption, setStakeOption] = useState(1);
  const [isCalculatorOpened, setIsCalculatorOpened] = useState(false);
  const [isOpenProfitModal, setIsOpenProfitModal] = useState(false);
  const { walletAddress } = useWalletContext();

  const [expandedTypeNft, setExpandedTypeNft] = useState<EnumNFT | null>(null)

  const [isShowPools, setIsShowPools] = useState<boolean>(false)
  const [isLoadingGetNFTStaked2, setIsLoadingGetNFTStaked2] = useState<boolean>(true)


  const [rewardPool, setRewardPool] = useState<string | undefined>(DefaultRewardPool.toString())
  const [duration, setDuration] = useState<number | undefined>(DefaultStaked)

  const { walletTokens, handleClickNFT, nftSelected, assets, refetchGetAssetsBalance, getBalanceNft } = useDeoddNFTContract();

  const { data: nftStaked, isFetching: isFetchGetNFTStaked, isLoading: isLoadingGetNFTStaked } = useQuery({
    queryKey: ["getNFTStaked"],
    enabled: !!walletAddress && (currentPool !== null && currentPool?.id !== undefined),
    queryFn: () => DeoddService.getNFTStaked(currentPool.id),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setIsLoadingGetNFTStaked2(false);
      if (data.length > 0) {
        setIsShowPools(true)
      }
    },
    onError: () => {
      setIsLoadingGetNFTStaked2(false);
    },

    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
  });
  const { data: pools, isFetching: isFetchGetPools, isLoading: isLoadingGetPools } = useQuery({
    queryKey: ["getPools"],
    enabled: !!walletAddress,
    queryFn: () => DeoddService.getPoolsAndRewardsByUser(),
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
  });
  let totalEstProfit = ((stakeOption === 1 ? assets : walletTokens)?.data as any)?.reduce((sum: any, asset: any) => sum + (asset as any).estProfit, 0) ?? 0
  if (walletAddress === undefined || isLoadingGetNFTStaked2 || (isFetchGetPools) || isFetchGetNFTStaked || isLoadingGetPools || isLoadingGetNFTStaked) {
    return <Box textAlign="center" mt={10}><CoinAnimation mx='auto' width={100} height={100}></CoinAnimation></Box>
  }
  if (walletTokens?.total === 0 && assets?.total === 0) {
    return <StakingNoNFT />
  }
  if (isShowPools && nftStaked && nftStaked.length > 0) {
    return <StakingSuccess pools={pools} nftStaked={nftStaked} handleHiddenPools={() => setIsShowPools(false)} />
  }

  return (
    <Stack gap={1}>
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 1, lineHeight: "2rem" }}>NFT Staking</Typography>
      <Stack sx={{
        backgroundColor: "background.paper",
        width: 1,
        minHeight: 525,
        borderRadius: 2,
        p: 3,
        position: "relative",
        [theme.breakpoints.down('md').replace("@media", "@container")]: {
          minHeight: 'auto'
        },

      }}>
        <Typography variant="caption" sx={{
          fontWeight: 400,
          lineHeight: "1rem",
          mb: 3
        }}>
          Select NFT your want to stake
        </Typography>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr",
          justifyContent: "space-between",
          gap: 5,
          mb: 2.25,
          // This is to align the header with the body because scrollbar causes layout shift
          overflow: "scroll",
          //

        }}>
          <Stack sx={{ flexDirection: "row", gap: 1, maxHeight: 36 }}>
            <ButtonFourth active={stakeOption === 1} onClick={() => {
              setStakeOption(1)
              handleClickNFT(null);
            }} label={"Balance"} />
            <ButtonFourth active={stakeOption === 2} onClick={() => {

              handleClickNFT(null);
              setStakeOption(2)
            }} label={"Wallet"} />
          </Stack>
          <MainTypography sx={{
            [theme.breakpoints.down('md').replace("@media", "@container")]: {
              display: 'none'
            },
          }} >%Share per NFT</MainTypography>
          <Stack sx={{
            gap: 2,
            [theme.breakpoints.down('md').replace("@media", "@container")]: {
              display: 'none'
            },
          }}>
            <Stack direction={"row"} gap={1}>
              <MainTypography>Calculated profit</MainTypography>
              <Box component={"span"} sx={{
                cursor: "pointer",
              }}
                onClick={() => setIsCalculatorOpened(true)}
              >
                <CalculatorIcon width={16} />
              </Box>
            </Stack>
            <Stack direction={"row"} gap={1}>
              <MainTypography >{nftSelected ? Format.formatMoney(Utils.calculatorProfit(rewardPool, nftSelected, 1, duration)) : 0}</MainTypography>
              <Box component={"span"} sx={{
                color: "secondary.main",
              }}>
                <BnbIcon width={20} />
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr",
          justifyContent: "space-between",
          columnGap: 5,
          [theme.breakpoints.down('md').replace("@media", "@container")]: {
            display: 'block',
            gridTemplateColumns: "none",
          },
        }}>
          {
            (stakeOption === 1 ?
              assets : walletTokens)?.data.map((element, index: number) => (
                <StakingRowItem
                  expanded={expandedTypeNft === element.type}
                  nftSelected={nftSelected}
                  handleClickNFT={handleClickNFT}
                  handleExpand={() => {
                    if (expandedTypeNft === element.type) {
                      setExpandedTypeNft(null);
                    } else {
                      setExpandedTypeNft(element.type)
                    }
                  }}
                  key={index}
                  NFTCards={element as any}
                  estimatedProfit={0}
                  rewardPool={rewardPool}
                  duration={duration}
                  sharePercent={0} />))
          }
        </Box>

        {/* Calculator Modal */}
        <StakingCalculator
          rewardPool={rewardPool}
          setRewardPool={setRewardPool}
          nftSelected={nftSelected}
          currentPool={currentPool}
          open={isCalculatorOpened}
          setOpen={setIsCalculatorOpened}
          duration={duration}
          setDuration={setDuration}
        />

        {/* Footer and Approve Button */}
        <Stack sx={{
          alignSelf: "flex-end",
          flexDirection: "row",
          mt: 'auto',
          gap: 2,
          [theme.breakpoints.down('md').replace("@media", "@container")]: {
            display: 'none'
          },
        }}>
          <Typography variant="caption" sx={{
            fontWeight: 400,
            lineHeight: "1rem",
            color: "text.disabled",
            textAlign: "right",
            alignSelf: "end",
          }}>

            All figures are estimate provided for your convenience only, with the assumption that the total pool is 1000 BNB.<br />
            By no means represent guaranteed returns.
          </Typography>
          <FlowStake
            stakeOption={stakeOption}
            nftSelected={nftSelected}
            handleSetNftSelected={handleClickNFT}
            refetchGetAssetsBalance={refetchGetAssetsBalance}
            getBalanceNft={getBalanceNft}
          />

        </Stack>
      </Stack>
      <Stack sx={{
        backgroundColor: "background.paper",
        width: 1,
        borderRadius: 2,
        p: 3,
        position: "relative",
        display: 'none',
        [theme.breakpoints.down('md').replace("@media", "@container")]: {
          display: 'flex'
        },

      }}>
        <Grid container>
          <Grid item xs={6}>

            <MainTypography >%Share per NFT</MainTypography>
            <Stack direction={'row'} mt={1.5} gap={2}>
              {
                stakeOption === 1 ?
                  assets?.data.map((element, index: number) => <Stack key={index} alignItems={'center'}>
                    <MyImage src={getPathAvatarNFT(element.type)} width={24} height={24} alt={''} />
                    <Stack sx={{ flexDirection: "row", gap: 1, mt: .5 }}>
                      <Typography variant="body2">{
                        Format.formatMoney(element.percentSharePerNFT)
                      }%</Typography>
                    </Stack>
                  </Stack>
                  )
                  : walletTokens?.data?.map((element: any, index) => <Stack key={index} alignItems={'center'}>
                    <MyImage src={getPathAvatarNFT(element.type)} width={24} height={24} alt={''} />
                    <Stack sx={{ flexDirection: "row", gap: 1, mt: .5 }}>
                      <Typography variant="body2">{
                        Format.formatMoney(element.percentSharePerNFT)
                      }%</Typography>
                    </Stack>
                  </Stack>)

              }

            </Stack>

          </Grid>
          <Grid item xs={6}>
            <Stack direction={'row'} gap={1}>
              <MainTypography>Calculated profit</MainTypography>
              <Box component={"span"} sx={{
                cursor: "pointer",
              }}
                onClick={() => setIsCalculatorOpened(true)}
              >
                <CalculatorIcon width={16} />
              </Box>
            </Stack>
            <Stack direction={"row"} mt={2} gap={1}>
              <MainTypography >{nftSelected ? Format.formatMoney(Utils.calculatorProfit(rewardPool, nftSelected, 1, duration)) : 0}</MainTypography>
              <Box component={"span"} sx={{
                color: "secondary.main",
              }}>
                <BnbIcon width={20} />
              </Box>
              <Typography sx={{ cursor: 'pointer', }} onClick={() => setIsOpenProfitModal(true)} variant="caption" color='secondary.main'>Detail</Typography>
            </Stack>
          </Grid>
        </Grid>

      </Stack>
      <Stack gap={2} mt={2} sx={{
        display: 'none',
        [theme.breakpoints.down('md').replace("@media", "@container")]: {
          display: 'flex'
        },
      }}>
        <Typography variant="caption" sx={{
          fontWeight: 400,
          lineHeight: "1rem",
          color: "text.disabled",
        }}>
          All figures are estimate provided for your convenience only, with the assumption that the total pool is 1000 BNB.<br />
          By no means represent guaranteed returns.
        </Typography>
        <FlowStake
          stakeOption={stakeOption}
          nftSelected={nftSelected}
          handleSetNftSelected={handleClickNFT}
          refetchGetAssetsBalance={refetchGetAssetsBalance}
          getBalanceNft={getBalanceNft}
        />

      </Stack>
      <ProfitDetailModal nftCards={stakeOption === 1 ?
        assets : walletTokens} open={isOpenProfitModal} setOpen={setIsOpenProfitModal} />
    </Stack >
  );
}

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
}))

export default StakingWithWallet;
