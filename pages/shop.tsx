import { Typography, Container } from "@mui/material";
import React from "react";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import ShopCollection from "@/templates/shop/ShopCollection";
import { useWalletContext } from "contexts/WalletContext";

type Props = {};

export default function Shop({}: Props) {
  const { walletIsConnected } = useWalletContext();

  // return (
  //     <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
  //         Coming soon
  //     </Typography>
  // )

  return (
    <Container sx={{ mt: 5 }}>
      {walletIsConnected ? <ShopCollection /> : <ShopConnectWallet />}
    </Container>
  );
}
