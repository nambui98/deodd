import { Stack } from "@mui/material";
import HolderPool from "./HolderPool";
import JackpotPool from "./JackpotPool";
import LoyaltyConnectWallet from "./LoyaltyConnectWallet";

const LoyaltyLayout = () => {
  return (
    <>
      <Stack mt={3} columnGap={4} sx={theme => ({
        [theme.breakpoints.up("xs").replace("@media", "@container")]: {
          flexDirection: "column",
          rowGap: 5,
        },
        [theme.breakpoints.up("md").replace("@media", "@container")]: {
          flexDirection: "row",
          rowGap: 0,
        },
        flexDirection: { xs: "column", md: "row" }, // fallback
        rowGap: { xs: 5, md: 0 }, // fallback
      })}>
        <JackpotPool />
        <HolderPool />
      </Stack>
      <LoyaltyConnectWallet />
    </>
  );
}

export default LoyaltyLayout;