import { useState } from "react";
import { Box, Typography, Stack, Divider, styled } from "@mui/material";
import { ButtonMain } from "components/ui/button";
import { BnbIcon, CupIcon } from "utils/Icons";
import { Colors } from "constants/index";
import StakingHistoryTable from "./components/StakingHistoryTable";
import UnstakeModal from "./components/UnstakeModal";
import { nftHolderContract } from "libs/contract";
import { useContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import Link from "next/link";

function StakingSuccess() {
  const [isUnstakeOpened, setIsUnstakeOpened] = useState(false);
  const { writeAsync: unStake, isLoading: isLoadingUnStake, } = useContractWrite({
    address: nftHolderContract.address,
    mode: 'recklesslyUnprepared',
    abi: nftHolderContract.abi,
    functionName: 'unstakeNFT',
  })
  const handleUnStakeMultiNft = () => {
    // unStake([BigNumber.from(nftSelected?.id ?? 0)])
  }
  return (
    <>
      <Stack sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        mb: 2,
      }}>
        <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>NFT Staking</Typography>
        <Stack sx={{
          flexDirection: "row",
          gap: 2,
        }}>
          <ButtonMain
            active={true}
            title="Unstake"
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",
              borderColor: "text.primary",
              color: "text.primary",
            }}
            onClick={() => setIsUnstakeOpened(true)}
          />
          <UnstakeModal open={isUnstakeOpened} setOpen={setIsUnstakeOpened} />
          <ButtonMain
            LinkComponent={Link}
            href="/loyalty"
            active={true}
            title="NFT Leaderboard"
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",
              borderColor: "text.primary",
              color: "text.primary",
            }}
          />
          <ButtonMain
            active={true}
            title="Stake more"
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",

            }}
          />
          <ButtonMain
            active={true}
            title={<Stack sx={{ flexDirection: "row", gap: 1 }}>
              Claim
              <BnbIcon width={16} color={Colors.primaryDark} />
            </Stack>}
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",
              "svg": {
                transition: "color 300ms"
              },
              ":hover": {
                "svg": {
                  color: Colors.bg80,
                }
              }
            }}
          />
        </Stack>
      </Stack>

      <Stack sx={{
        backgroundColor: "background.paper",
        width: 1,
        borderRadius: 2,
        p: 3,
        position: "relative",
      }}>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack sx={{ flexDirection: "row", gap: 1, alignSelf: "flex-start" }}>
            <CupIcon width={24} color={Colors.primaryDark} />
            <Typography variant="body2">
              Period <Box component={"span"} color={"text.secondary"}>#2</Box>
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: "row", gap: 5 }}>
            <Stack sx={{ gap: 1, alignItems: "flex-end" }}>
              <DisabledTypography>Total Reward Pool</DisabledTypography>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2">12.534</Typography>
                <BnbIcon width={20} color={Colors.primaryDark} />
              </Stack>
            </Stack>
            <Stack sx={{ gap: 1, alignItems: "flex-end" }}>
              <DisabledTypography>Your Profit</DisabledTypography>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2">2.25</Typography>
                <BnbIcon width={20} color={Colors.primaryDark} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack gap={1}>
            <DisabledTypography>Start: Start: 8:00 UTC 23/5/2023</DisabledTypography>
            <DisabledTypography>End: 8:00 UTC 23/6/2023</DisabledTypography>
          </Stack>
          <DisabledTypography sx={{ color: "#26BC7F", alignSelf: "flex-end" }}>Claimed</DisabledTypography>
        </Stack>

        <Divider
          sx={{
            my: 2,
            backgroundColor: "secondary.900",
          }}
        />

        <StakingHistoryTable />
      </Stack>
    </>
  );
}

const DisabledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.text.disabled,
  fontWeight: 400,
}))

export default StakingSuccess;
