import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
import useHolderTimer from "hooks/loyalty/useHolderTimer";
import { LoyaltyPeriodInfoType } from "libs/types/loyaltyTypes";

type PropsType = {
  setReset: Dispatch<SetStateAction<boolean>>
  periodInfo: LoyaltyPeriodInfoType;
}

function NFTHolderTimer({ setReset, periodInfo }: PropsType) {
  const timeLeft = useHolderTimer({ setReset, periodInfo });

  return <Typography variant="body2">Claimable in: {timeLeft}</Typography>;
}

export default NFTHolderTimer;
