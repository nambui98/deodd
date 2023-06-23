import { Container } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import StakingNoWallet from "@/templates/staking/StakingNoWallet";
import StakingWithWallet from "@/templates/staking/StakingWithWallet";
import StakingSuccess from "@/templates/staking/StakingSuccess";

function StakingPage() {
  const { walletIsConnected } = useWalletContext();

  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto", width: walletIsConnected ? 928 : 736 }}>
      {walletIsConnected ? <StakingWithWallet /> : <StakingNoWallet />}
      <StakingSuccess />
    </Container>
  );
}

export default StakingPage;


