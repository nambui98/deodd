import { Typography, Container } from "@mui/material";
import React, { Suspense, useState } from "react";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import ShopBanner from "@/templates/shop/ShopBanner";
import { useWalletContext } from "contexts/WalletContext";
import ShopCollection from "@/templates/shop/ShopCollection";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import CoinAnimation from "components/common/CoinAnimation";

type Props = {

};

export default function Shop({ }: Props) {
  const { walletIsConnected } = useWalletContext();
  const [amount, setAmount] = useState<number>(0)

  return (
    <Container sx={{ mt: 5 }}>
      {walletIsConnected ?
        <>

          <ShopBanner amount={amount} />
          <Suspense fallback={<CoinAnimation mx="auto" width={100} height={100} />}>

            <ShopCollection setAmount={setAmount} />
          </Suspense>
        </>
        : <ShopConnectWallet />}
    </Container>
  );
}
