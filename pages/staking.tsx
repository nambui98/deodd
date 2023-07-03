import { Box, Container } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import StakingNoWallet from "@/templates/staking/StakingNoWallet";
import StakingWithWallet from "@/templates/staking/StakingWithWallet";
import StakingSuccess from "@/templates/staking/StakingSuccess";
import CoinAnimation from "components/common/CoinAnimation";
import StakingNoNFT from "@/templates/staking/StakingNoNFT";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import { useState } from "react";

function StakingPage() {
  const { walletIsConnected } = useWalletContext();
  const [isShowPools, setIsShowPools] = useState<boolean>(false)

  const { data: currentPool } = useQuery({
    queryKey: ["getCurrentPool"],
    enabled: !!walletIsConnected,
    queryFn: () => DeoddService.getCurrentPool(),
    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
  });
  const { refetch, data: pools, isLoading: isLoadingGetPools, isFetching: isFetchGetPools } = useQuery({
    queryKey: ["getPools"],
    enabled: !!walletIsConnected,
    queryFn: () => DeoddService.getPoolsAndRewardsByUser(),
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
    onError(err) {
    },

  });
  const { data: nftStaked, isLoading: isLoadingGetNFTStaked, isFetching: isFetchGetNFTStaked } = useQuery({
    queryKey: ["getNFTStaked"],
    enabled: !!walletIsConnected && (currentPool !== null && currentPool?.id !== undefined),
    queryFn: () => DeoddService.getNFTStaked(currentPool.id),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data.length > 0) {
        setIsShowPools(true)
      }
    },
    select: (data: any) => {
      if (data.status === 200) {

        return data.data.data;
      } else {
        return undefined
      }
    },
    onError(err) {
    },

  });


  if (walletIsConnected === undefined || (isFetchGetPools) || isFetchGetNFTStaked) {
    return <Box textAlign="center" mt={10}><CoinAnimation mx='auto' width={100} height={100}></CoinAnimation></Box>
  }
  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto" }}>
      {walletIsConnected ? (isShowPools ? <StakingSuccess pools={pools} nftStaked={nftStaked} handleHiddenPools={() => setIsShowPools(false)} /> : <StakingWithWallet currentPool={currentPool} />) : <StakingNoWallet />}
    </Container>
  );
}

export default StakingPage;


