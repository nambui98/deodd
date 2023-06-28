import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
import useHolderTimer from "hooks/loyalty/useHolderTimer";
import { LoyaltyHolderPeriodInfoType } from "libs/types/loyaltyTypes";
import { UseQueryResult } from "@tanstack/react-query";

type PropsType = {
  setReset: Dispatch<SetStateAction<boolean>>;
  periodInfo: UseQueryResult<LoyaltyHolderPeriodInfoType, unknown>;
};

function NFTHolderTimer({ setReset, periodInfo }: PropsType) {
  const timeLeft = useHolderTimer({ setReset, periodInfo });

  return <Typography variant="body2">Claimable in: {timeLeft}</Typography>;
}

export default NFTHolderTimer;
