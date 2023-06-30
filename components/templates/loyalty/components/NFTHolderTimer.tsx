import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
import useHolderTimer from "hooks/loyalty/useHolderTimer";
import { LoyaltyHolderPeriodsInfoType } from "libs/types/loyaltyTypes";
import { UseQueryResult } from "@tanstack/react-query";

type PropsType = {
  setReset: Dispatch<SetStateAction<boolean>>;
  periodsInfo: UseQueryResult<LoyaltyHolderPeriodsInfoType, unknown>;
};

function NFTHolderTimer({ setReset, periodsInfo }: PropsType) {
  const timeLeft = useHolderTimer({ setReset, periodsInfo });

  return <Typography variant="body2">Claimable in: {timeLeft}</Typography>;
}

export default NFTHolderTimer;
