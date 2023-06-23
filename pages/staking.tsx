import { Container, Typography } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import StakingNoWallet from "@/templates/staking/StakingNoWallet";
import StakingWithWallet from "@/templates/staking/StakingWithWallet";

function StakingPage() {
  const { walletIsConnected } = useWalletContext();

  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto", width: walletIsConnected ? 928 : 736 }}>
      <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem", mb: 2 }}>NFT Staking</Typography>
      {walletIsConnected ? <StakingWithWallet /> : <StakingNoWallet />}
    </Container>
  );
}

export default StakingPage;


