import { Box, Collapse, Divider, Skeleton, Stack, Typography, styled } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ButtonLoading, ButtonMain } from "components/ui/button";
import { Colors } from "constants/index";
import { useSiteContext } from "contexts/SiteContext";
import { format, isBefore } from "date-fns";
import { ethers } from "ethers";
import { DeoddService } from "libs/apis";
import { nftHolderContract } from "libs/contract";
import Link from "next/link";
import { useState } from "react";
import { BnbIcon, CupIcon } from "utils/Icons";
import { useContractWrite } from "wagmi";
import StakingHistoryTable from "./components/StakingHistoryTable";
import UnstakeModal from "./components/UnstakeModal";
import { de } from 'date-fns/locale';
import { Format } from "utils/format";
import CoinAnimation from "components/common/CoinAnimation";
function StakingSuccess({
  handleHiddenPools,
  nftStaked,
  pools
}: {

  handleHiddenPools: VoidFunction,
  nftStaked: any,
  pools: any
}) {
  const [isUnstakeOpened, setIsUnstakeOpened] = useState(false);
  const [isUnstakeLoading, setIsUnstakeLoading] = useState(false);
  const { setIsError, setTitleError } = useSiteContext();
  const [currentStageModal, setCurrentStageModal] = useState<number>(1);
  const [idNftSelected, setIdNftSelected] = useState<number | null>(null);
  const [poolExpanded, setPoolExpanded] = useState<any>(null);

  const [modeUnstake, setModeUnstake] = useState<boolean>(false);

  const queryClient = useQueryClient()

  const { writeAsync: unStake } = useContractWrite({
    address: nftHolderContract.address,
    mode: 'recklesslyUnprepared',
    abi: nftHolderContract.abi,
    functionName: 'unstakeNFT',
    onError(error: Error, variables, context) {
      setIsError(true)
      setTitleError(error.message || 'Something wend wrong.');
    },
  })

  const handleBeforeUnStake = () => {
    if (currentStageModal === 3) {
      setIsUnstakeLoading(true);
      handleUnstake();
    } else {
      setIsUnstakeOpened(true)
    }

  }
  const handleUnstake = () => {
    setIsUnstakeLoading(true);
    unStake?.({
      recklesslySetUnpreparedArgs: [idNftSelected],
    })
      .then(resWrite => {
        return resWrite.wait();
      })
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ['getNFTStaked2'] });
        setIsUnstakeLoading(false);
        setCurrentStageModal(3);
        setIsUnstakeOpened(true);

      })
      .catch(error => {
        setIsError(true);
        setIsUnstakeLoading(false);
        setTitleError(error.reason || 'Something went wrong');
      })


  }
  return (
    <Stack gap={2}>
      <Stack sx={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>NFT Staking</Typography>
        <Stack sx={{
          flexDirection: "row",
          gap: 2,
        }}>
          <ButtonLoading
            loading={isUnstakeLoading}
            // disabled={!idNftSelected}
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",
              borderColor: "text.primary",
              color: "text.primary",
              textTransform: "none",
              width: "auto"
            }}
            onClick={() => {
              setModeUnstake((prev) => !prev);
            }}
          >
            Unstake
          </ButtonLoading>
          <UnstakeModal
            currentStage={currentStageModal}
            isLoadingUnStake={isUnstakeLoading}
            handleUnStake={handleUnstake}
            open={isUnstakeOpened}
            setOpen={setIsUnstakeOpened}
          />
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
      {pools?.map((pool: any) =>
        <PoolItem
          pool={pool}
          key={pool.id}
          idNftSelected={idNftSelected}
          poolExpanded={poolExpanded}
          setPoolExpanded={setPoolExpanded}
          setIdNftSelected={setIdNftSelected}
          modeUnstake={modeUnstake}
          handleUnstake={handleUnstake}
          handleBeforeUnstake={handleBeforeUnStake}
        />
      )}

    </Stack>
  );
}

const DisabledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.text.disabled,
  fontWeight: 400,
}))


type PoolProps = {
  pool: any,
  idNftSelected: number | null,
  setIdNftSelected: Function,
  setPoolExpanded: Function,
  handleUnstake: VoidFunction,
  handleBeforeUnstake: VoidFunction,
  poolExpanded: any,
  modeUnstake: boolean
}

const PoolItem = ({ pool, handleUnstake, handleBeforeUnstake, modeUnstake, idNftSelected, setIdNftSelected, poolExpanded, setPoolExpanded }: PoolProps) => {
  const { data: nftStaked, isFetching: isFetchGetNFTStaked } = useQuery({
    queryKey: ["getNFTStaked2", poolExpanded?.id],
    enabled: !!poolExpanded,
    queryFn: () => DeoddService.getNFTStaked(poolExpanded?.id),
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
  });

  return (
    <Stack key={pool.id} sx={{
      backgroundColor: "background.paper",
      width: 1,
      borderRadius: 2,
      p: 3,
      position: "relative",
    }}
    >
      <Stack sx={{ cursor: 'pointer' }} onClick={() => {
        if (poolExpanded === pool) {
          setPoolExpanded(null);
        } else {
          setPoolExpanded(pool);
        }
      }}
        aria-expanded={poolExpanded?.id === pool.id || false}>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack sx={{ flexDirection: "row", gap: 1, alignSelf: "flex-start" }}>
            <CupIcon width={24} color={Colors.primaryDark} />
            <Typography variant="body2">
              Period <Box component={"span"} color={"text.secondary"}>#{pool.season}</Box>
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: "row", gap: 5 }}>
            <Stack sx={{ gap: 1, alignItems: "flex-end" }}>
              <DisabledTypography>Total Reward Pool</DisabledTypography>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2">{
                  new Intl.NumberFormat("en", { maximumFractionDigits: 8 }).format(parseFloat(ethers.utils.formatEther(pool.current_prize ?? 0)))
                }</Typography>
                <BnbIcon width={20} color={Colors.primaryDark} />
              </Stack>
            </Stack>
            <Stack sx={{ gap: 1, alignItems: "flex-end" }}>
              <DisabledTypography>Your Profit</DisabledTypography>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography variant="body2">
                  {
                    new Intl.NumberFormat("en", { maximumFractionDigits: 8 }).format(pool.reward ?? 0)
                  }
                </Typography>
                <BnbIcon width={20} color={Colors.primaryDark} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Stack gap={1}>
            <DisabledTypography>Start: {Format.formatDateTimeAlt(pool.start_time, "UTC", 'HH:mm zzz dd/MM/yyyy')}</DisabledTypography>
            <DisabledTypography>End: {Format.formatDateTimeAlt(pool.end_time, "UTC", 'HH:mm zzz dd/MM/yyyy')}</DisabledTypography>
          </Stack>
          {/* <DisabledTypography sx={{ color: "#26BC7F", alignSelf: "flex-end" }}>Claimed</DisabledTypography> */}
        </Stack>


      </Stack>

      <Collapse in={poolExpanded?.id === pool.id || false} timeout="auto" unmountOnExit>
        <Divider
          sx={{
            my: 2,
            backgroundColor: "secondary.900",
          }}
        />
        {
          modeUnstake &&

          <Typography variant="body2" mb={2} color={'secondary.main'}>Choose NFT you want to unstake</Typography>
        }
        {/* <Box sx={{
          display: isFetchGetNFTStaked ? 'block' : 'none'
        }}>
          <CoinAnimation mx="auto" width={50} height={50} />
        </Box> */}
        {
          !isFetchGetNFTStaked ?
            <StakingHistoryTable
              modeUnstake={modeUnstake}
              nfts={nftStaked}
              idNftSelected={idNftSelected}
              setIdNftSelected={setIdNftSelected}
            />
            :
            <Skeleton variant="rounded" width={'100%'} height={580} />
        }
        {
          modeUnstake &&
          <Box textAlign={"center"} mt={2}>
            <ButtonLoading
              onClick={handleBeforeUnstake}
              disabled={!idNftSelected}
              sx={{ width: 'auto', textTransform: 'none', py: 1, bgcolor: 'background.default' }}>
              Unstake
            </ButtonLoading>
          </Box>
        }

      </Collapse>
    </Stack>


  )
}

export default StakingSuccess