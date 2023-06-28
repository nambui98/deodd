import { Flip } from "@/templates/home/Flip";
import FlipHistoriesRecent from "@/templates/home/components/FlipHistoriesRecent";
import { Box, Container, Stack, useTheme } from "@mui/material";
import CoinAnimation from "components/common/CoinAnimation";
import TBNBPopup from "components/ui/TBNBPopup";
import React from "react";
import { ConnectWallet } from "../components/common/ConnectWallet";
import { useWalletContext } from "../contexts/WalletContext";
import { Suspense, lazy } from "react";
// const FlipHistoriesRecent = lazy(() => import("@/templates/home/components/FlipHistoriesRecent"));
// eslint-disable-next-line react/display-name
const HomePage: React.FC = React.memo(() => {
  const { walletIsConnected } = useWalletContext();
  const theme = useTheme();

  if (walletIsConnected === undefined) {
    return <CoinAnimation width={100} height={100}></CoinAnimation>
  }
  return <Container>
    <Stack mt={2} >
      <Box mb={2} sx={{
        display: 'none',
        [theme.breakpoints.down('sm').replace("@media", "@container")]: {
          display: 'block'
        },
      }}>
        <TBNBPopup />
      </Box>
      {/* <Suspense fallback={<CoinAnimation width={50} height={50} />}> */}
      <FlipHistoriesRecent />
      {/* </Suspense> */}

      <Stack
        justifyContent='space-between'
      >
        {!walletIsConnected ? <Flip /> : <ConnectWallet />}
      </Stack>

    </Stack>
  </Container >
})

export default HomePage;