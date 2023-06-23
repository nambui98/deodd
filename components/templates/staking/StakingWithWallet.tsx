import { useState } from "react";
import { Typography, Stack, Box, styled } from "@mui/material";
import { ButtonFourth, ButtonMain } from "components/ui/button";
import { CalculatorIcon, BnbIcon } from "utils/Icons";
import StakingRowItem from "./components/StakingRowItem";
import StakingCalculator from "./components/StakingCalculator";

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

function StakingWithWallet() {
  const [stakeOption, setStakeOption] = useState(1);
  const [isCalculatorOpened, setIsCalculatorOpened] = useState(false);

  return (
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
          <ButtonFourth active={stakeOption === 1} onClick={() => setStakeOption(1)} label={"Balance"} />
          <ButtonFourth active={stakeOption === 2} onClick={() => setStakeOption(2)} label={"Wallet"} />
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
              1.534
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
        overflow: "scroll",
      }}>
        {dummyData.map((element, index) => <StakingRowItem key={index} NFTCards={element.NFTCards} estimatedProfit={element.estimatedProfit} sharePercent={element.sharePercent} />)}
      </Box>

      {/* Calculator Modal */}
      <StakingCalculator open={isCalculatorOpened} setOpen={setIsCalculatorOpened} />

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
        <ButtonMain
          active={true}
          title="Approve"
          sx={{
            py: 2,
            px: 5,
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: "1.375rem",
            backgroundColor: "primary.300"
          }}
        />
      </Stack>
    </Stack>
  );
}

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
}))

export default StakingWithWallet;
