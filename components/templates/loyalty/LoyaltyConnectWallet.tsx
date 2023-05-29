import { ButtonMain } from "components/ui/button";
import { Box, Stack, Button } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";

const LoyaltyConnectWallet = () => {
  const { handleConnectWallet, walletIsConnected } = useWalletContext();

  return (
    !walletIsConnected
      ? (<Stack direction={"row"} mt={3.25} alignItems={"center"} justifyContent={"center"} width={1} gap={1}>
        <Box width={1} height={"1px"} bgcolor={"primary.100"}></Box>
        <ButtonMain active={true} title="Connect wallet" onClick={handleConnectWallet} sx={{
          py: 0.5,
          minWidth: "17rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          lineHeight: "1.375rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          borderWidth: 2,
          ":hover": {
            borderWidth: 2,
          }
        }} />
        <Box width={1} height={"1px"} bgcolor={"primary.100"}></Box>
      </Stack>)
      : null
  );
}

export default LoyaltyConnectWallet;