import { Flip } from "@/templates/home/Flip";
import FlipHistoriesRecent from "@/templates/home/components/FlipHistoriesRecent";
import { Box, Container, Stack } from "@mui/material";
import Loader from "components/common/Loader";
import React from "react";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { useWalletContext } from "../contexts/WalletContext";
import TBNBPopup from "components/ui/TBNBPopup";

// eslint-disable-next-line react/display-name
const HomePage: React.FC = React.memo(() => {
  const { walletIsConnected } = useWalletContext();

  if (walletIsConnected === undefined) {
    return <Loader isLoadingProps></Loader>
  }
  return <Container>
    <Stack mt={2} >
      <Box mb={2} display={{ xs: 'block', md: 'none' }}>
        <TBNBPopup />
      </Box>
      <FlipHistoriesRecent />
      <Stack
        justifyContent='space-between'
      >
        {walletIsConnected ? <Flip /> : <ConnectWallet />}
      </Stack>

    </Stack>
  </Container >
})

export default HomePage;