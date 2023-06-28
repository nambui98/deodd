import ShopBanner from "@/templates/shop/ShopBanner";
import ShopConnectWallet from "@/templates/shop/ShopConnectWallet";
import { Container } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import { Suspense, lazy, useState } from "react";
// import ShopCollection from "@/templates/shop/ShopCollection";
import CoinAnimation from "components/common/CoinAnimation";
import { Meta } from "components/common/Meta";
import ShopOpening from "components/common/ShopOpening";
import { isBefore } from "date-fns";
import { DateOpenShop } from "constants/index";
const ShopCollection = lazy(() => import("@/templates/shop/ShopCollection"));

type Props = {
};

export default function Shop({ }: Props) {
  const { walletIsConnected } = useWalletContext();
  const [amount, setAmount] = useState<number>(0)
  const isNotShopOpen = process.env.NEXT_PUBLIC_OPEN_MAINNET === "FALSE" ? isBefore(new Date(), new Date(DateOpenShop)) : false;

  if (isNotShopOpen) {
    return <ShopOpening />
  }
  if (walletIsConnected === undefined) {
    return <CoinAnimation width={100} height={100}></CoinAnimation>
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Meta title="DeODD NFT 1st collection" description="Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD." />
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
