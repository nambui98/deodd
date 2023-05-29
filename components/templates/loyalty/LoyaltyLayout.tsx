import { Stack } from "@mui/material";
import HolderPool from "./HolderPool";
import JackpotPool from "./JackpotPool";

const LoyaltyLayout = () => {
  return (
    <Stack mt={3} columnGap={4} sx={theme => ({
      [theme.breakpoints.up("xs").replace("@media", "@container")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("md").replace("@media", "@container")]: {
        flexDirection: "row",
      },
      flexDirection: { xs: "column", md: "row" } // fallback
    })}>
      <JackpotPool />
      <HolderPool />
    </Stack>
  );
}

export default LoyaltyLayout;