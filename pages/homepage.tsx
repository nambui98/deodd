import { Flip } from "@/templates/home/Flip";
import { Container, Stack } from "@mui/material";
import Loader from "components/common/Loader";
import React from "react";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { useWalletContext } from "../contexts/WalletContext";
import FlipHistoriesRecent from "@/templates/home/components/FlipHistoriesRecent";
import FlipLogDetail from "@/templates/home/components/FlipLogDetail";

// eslint-disable-next-line react/display-name
const HomePage: React.FC = React.memo(() => {
  const { walletIsConnected } = useWalletContext();

  if (walletIsConnected === undefined) {
    return <Loader isLoadingProps></Loader>
  }
  return <Container>
    <Stack mt={2} >
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