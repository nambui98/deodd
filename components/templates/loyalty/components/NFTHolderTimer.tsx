import { Typography } from "@mui/material";
import useHolderTimer from "hooks/loyalty/useHolderTimer";

function NFTHolderTimer() {
  const timeLeft = useHolderTimer();

  return <Typography variant="body2">Claimable in: {timeLeft}</Typography>;
}

export default NFTHolderTimer;
