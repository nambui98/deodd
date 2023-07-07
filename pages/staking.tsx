import StakingNoWallet from "@/templates/staking/StakingNoWallet";
import StakingSuccess from "@/templates/staking/StakingSuccess";
import StakingWithWallet from "@/templates/staking/StakingWithWallet";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CoinAnimation from "components/common/CoinAnimation";
import { useWalletContext } from "contexts/WalletContext";
import { DeoddService } from "libs/apis";
import { useState } from "react";

function StakingPage() {
  const { walletAddress } = useWalletContext();
  const [isShowPools, setIsShowPools] = useState<boolean>(false)

  const { data: currentPool } = useQuery({
    queryKey: ["getCurrentPool", walletAddress],
    enabled: !!walletAddress,
    queryFn: () => DeoddService.getCurrentPool(),
    select: (data: any) => {
      if (data.status === 200) {
        return data.data.data;
      } else {
        return undefined
      }
    },
  })

  if (walletAddress === undefined) {
    return <Box textAlign="center" mt={10}><CoinAnimation mx='auto' width={100} height={100}></CoinAnimation></Box>
  }
  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto" }}>
      {walletAddress ?
        <StakingWithWallet currentPool={currentPool} />
        : <StakingNoWallet />}
    </Container>
  );
}

export default StakingPage;


