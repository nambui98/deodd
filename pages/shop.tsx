import { Typography, Container } from "@mui/material";
import React from "react";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import ShopBanner from "@/templates/shop/ShopBanner";
import { useWalletContext } from "contexts/WalletContext";
import ShopCollection from "@/templates/shop/ShopCollection";

type Props = {};

export default function Shop({ }: Props) {
  const { walletIsConnected } = useWalletContext();

  return (
    <Container sx={{ mt: 5 }}>
      {walletIsConnected ?
        <>

          <ShopBanner />
          <ShopCollection />
        </>
        : <ShopConnectWallet />}
    </Container>
  );
}
