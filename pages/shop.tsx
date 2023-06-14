import { Typography, Container } from "@mui/material";
import React, { Suspense, useState } from "react";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import ShopBanner from "@/templates/shop/ShopBanner";
import { useWalletContext } from "contexts/WalletContext";
import ShopCollection from "@/templates/shop/ShopCollection";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import CoinAnimation from "components/common/CoinAnimation";
import { Meta } from "components/common/Meta";

type Props = {

};

export default function Shop({ }: Props) {
  const { walletIsConnected } = useWalletContext();
  const [amount, setAmount] = useState<number>(0)
  return (
    <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
      Coming soon
    </Typography>
  )
  return (
    <Container sx={{ mt: 5 }}>
      <Meta title="Deodd NFT 1st collection" description="Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD." />
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
