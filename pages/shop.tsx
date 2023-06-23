import ShopBanner from "@/templates/shop/ShopBanner";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import { Container } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import { Suspense, useState, lazy } from "react";
// import ShopCollection from "@/templates/shop/ShopCollection";
import CoinAnimation from "components/common/CoinAnimation";
import { Meta } from "components/common/Meta";
import dynamic from "next/dynamic";
const ShopCollection = lazy(() => import("@/templates/shop/ShopCollection"));

// const ListUserFlip = lazy(() => import("./ListUserFlip"));
type Props = {

};

export default function Shop({ }: Props) {
  const { walletIsConnected } = useWalletContext();
  const [amount, setAmount] = useState<number>(0)
  // return (
  //   <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
  //     Coming soon
  //   </Typography>
  // )
  if (walletIsConnected === undefined) {
    return <CoinAnimation width={100} height={100}></CoinAnimation>
  }
  return (
    <Container sx={{ mt: 5 }}>
      <Meta title="Deodd NFT 1st collection" description="Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD." />
      {!walletIsConnected ?
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
