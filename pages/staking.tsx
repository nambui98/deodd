import { Container } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import StakingNoWallet from "@/templates/staking/StakingNoWallet";
import StakingWithWallet from "@/templates/staking/StakingWithWallet";
import StakingSuccess from "@/templates/staking/StakingSuccess";
import CoinAnimation from "components/common/CoinAnimation";
import StakingNoNFT from "@/templates/staking/StakingNoNFT";

function StakingPage() {
  const { walletIsConnected } = useWalletContext();
  if (walletIsConnected === undefined) {
    return <CoinAnimation width={100} height={100}></CoinAnimation>
  }
  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto", width: walletIsConnected ? 928 : 736 }}>
      {walletIsConnected ? <StakingWithWallet /> : <StakingNoWallet />}
      <StakingSuccess />
    </Container>
  );
}

export default StakingPage;


