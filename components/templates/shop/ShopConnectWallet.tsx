import { useWalletContext } from "contexts/WalletContext";
import { ButtonLoading } from "components/ui/button";
import { Typography, Box, Stack } from "@mui/material";
import { Marketplace1Icon } from "utils/Icons";

function ShopConnectWallet() {
  const { handleConnectWallet, isConnectingWallet } = useWalletContext();

  return (
    <Stack alignItems={"center"} gap={5} mt={{ md: 15, xs: 8 }}>
      <Typography fontSize={"1.5rem"} lineHeight={"2rem"} fontWeight={700}>Connect wallet to view Shop</Typography>
      <Marketplace1Icon width={160} />
      <ButtonLoading
        onClick={handleConnectWallet}
        sx={{
          px: 5, py: 2,
          borderRadius: 2,
          width: 'auto',
          textTransform: 'none',
        }}
        loading={isConnectingWallet}>
        <Typography variant='body2' fontSize={16} fontWeight={600}>Connect wallet</Typography>
      </ButtonLoading>
    </Stack>
  );
}

export default ShopConnectWallet;