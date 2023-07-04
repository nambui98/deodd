import { Stack, Typography } from "@mui/material";
import { ButtonLoading } from "components/ui/button";
import { useWalletContext } from "contexts/WalletContext";

function StakingNoWallet() {
  const { handleConnectWallet, isConnectingWallet } = useWalletContext();
  return (
    <Stack maxWidth={736} mx="auto">
      <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem", mb: 2 }}>NFT Staking</Typography>
      <Stack alignItems={'center'} mt={5}>
        <Typography variant='h3' fontWeight={600}>Connect wallet for staking</Typography>
        <ButtonLoading
          onClick={handleConnectWallet}
          sx={{
            px: 5, py: 2, mt: 3,
            borderRadius: 2,
            width: 'auto',
            textTransform: 'none',
          }}
          loading={isConnectingWallet}>
          <Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
        </ButtonLoading>


      </Stack>

    </Stack>
  );
}

export default StakingNoWallet;
