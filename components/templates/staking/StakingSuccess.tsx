import { useEffect, useState } from "react";
import { Box, Typography, Stack, Divider, styled } from "@mui/material";
import { ButtonMain } from "components/ui/button";
import { BnbIcon, CupIcon } from "utils/Icons";
import { Colors, DateOpenMainnet } from "constants/index";
import StakingHistoryTable from "./components/StakingHistoryTable";
import UnstakeModal from "./components/UnstakeModal";
import { nftHolderContract } from "libs/contract";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import Link from "next/link";
import { useSiteContext } from "contexts/SiteContext";
import { isBefore } from "date-fns";
import { parseEther } from "ethers/lib/utils.js";

function StakingSuccess({
  handleHiddenPools
}: {

  handleHiddenPools: VoidFunction
}) {
  const [isUnstakeOpened, setIsUnstakeOpened] = useState(false);
  const [countNftUnstacked, setCountNftUnstaked] = useState<number>(0);
  const { setIsError, setTitleError } = useSiteContext();
  const [currentStageModal, setCurrentStageModal] = useState<number>(1);


  useEffect(() => {

    const isAllowUnstake = isBefore(new Date(), new Date("2023-06-29T13:00:00Z"));
    if (isAllowUnstake) {
      setCurrentStageModal(3)
    } else {
      setCurrentStageModal(1)
    }
  }, [])

  const { writeAsync: unStake, isLoading: isLoadingUnStake, write } = useContractWrite({
    address: nftHolderContract.address,
    mode: 'recklesslyUnprepared',
    abi: nftHolderContract.abi,
    functionName: 'unstakeNFT',
    // onError(error: Error, variables, context) {
    //   setIsError(true)
    //   setTitleError(error.message || 'Something wend wrong.');
    // },
    // onSuccess(result) {
    //   //       setCountNftUnstaked((prev) => {
    //   //         if (prev + 1 === list.length) {

    //   // setCurrentStageModal(3);
    //   // setIsUnstakeOpened(true);
    //   //         }
    //   //         return prev + 1
    //   //       });

    // }
  })
  const { config } = usePrepareContractWrite({
    address: nftHolderContract.address,
    // mode: 'recklesslyUnprepared',
    abi: nftHolderContract.abi,
    functionName: 'unstakeNFT',

  })
  // const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const handleUnStakeMultiNft = () => {
    let list: number[] = [414, 408];
    // write?.({
    //   recklesslySetUnpreparedArgs: [408],
    // })

    for (let index = 0; index < list.length; index++) {
      const nft = list[index];
      write?.({
        recklesslySetUnpreparedArgs: [nft],
      })
      // unStake.arguments([nft])
      // write({ args: [6] })
      // unStake({

      //   // recklesslySetUnpreparedArgs: [nft]
      // })
    }

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
            onClick={() => {
              if (currentStageModal === 3) {
                handleUnStakeMultiNft();
              } else {
                setIsUnstakeOpened(true)
              }
            }}
          />
          <UnstakeModal currentStage={currentStageModal} open={isUnstakeOpened} setOpen={setIsUnstakeOpened} />
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
            onClick={handleHiddenPools}
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
          {/* <ButtonMain
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
          /> */}
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
