import { Container, Typography } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import StakingNoWallet from "@/templates/staking/StakingNoWallet";

function StakingPage() {
  const { walletIsConnected } = useWalletContext();

  return (
    <Container sx={{ mt: 10, mb: { md: 10, xs: 8.125 }, mx: "auto", width: 736 }}>
      {/* Change Me */}
      <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem", mb: 2 }}>NFT Staking</Typography>
      {walletIsConnected ? null : <StakingNoWallet />}
    </Container>
  );
}

export default StakingPage;


