import { useState } from "react";
import { Typography, Stack, Box, styled } from "@mui/material";
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
  const [stakeOption, setStakeOption] = useState(1);
  const [isCalculatorOpened, setIsCalculatorOpened] = useState(false);
  const [isApproveModalOpened, setIsApproveModalOpened] = useState(false);
  const { walletAddress } = useWalletContext();
  const { walletTokens, handleClickNFT, nftSelected, assets, refetchGetAssetsBalance, getBalanceNft, priceToken } = useDeoddNFTContract();

  return (
    <>
      <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem", mb: 2 }}>NFT Staking</Typography>
      <Stack sx={{
        backgroundColor: "background.paper",
        width: 1,
        minHeight: 525,
        borderRadius: 2,
        p: 3,
        position: "relative",
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
          <MainTypography >%Share per NFT</MainTypography>
          <Stack sx={{ gap: 2 }}>
            <Stack direction={"row"} gap={1}>
              <MainTypography>Estimated profit</MainTypography>
              <Box component={"span"} sx={{
                cursor: "pointer",
              }}
                onClick={() => setIsCalculatorOpened(true)}
              >
                <CalculatorIcon width={16} />
              </Box>
            </Stack>
            <Stack direction={"row"} gap={1}>
              <MainTypography>
                {/* 1.534 */}
                0
              </MainTypography>
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
          maxHeight: 280,
          overflow: 'auto'
        }}>
          {
            stakeOption === 1 ?
              assets?.data.map((element, index: number) => <StakingRowItem nftSelected={nftSelected} handleClickNFT={handleClickNFT} key={index} NFTCards={element} estimatedProfit={0} sharePercent={0} />)
              : walletTokens?.data?.map((element, index) => <StakingRowItem nftSelected={nftSelected} handleClickNFT={handleClickNFT} key={index} NFTCards={element} estimatedProfit={0} sharePercent={0} />)
          }
        </Box>

        {/* Calculator Modal */}
        <StakingCalculator nftSelected={nftSelected} currentPool={currentPool} open={isCalculatorOpened} setOpen={setIsCalculatorOpened} />

        {/* Footer and Approve Button */}
        <Stack sx={{
          alignSelf: "flex-end",
          flexDirection: "row",
          gap: 2,
          position: "absolute",
          bottom: 24,
          right: 24,
        }}>
          <Typography variant="caption" sx={{
            fontWeight: 400,
            lineHeight: "1rem",
            color: "text.disabled",
            textAlign: "right",
            alignSelf: "end",
          }}>
            All figures are estimate provided for your convenience only <br />
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
    </>
  );
}

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
}))

export default StakingWithWallet;
