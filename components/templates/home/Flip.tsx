import React, { useState } from "react";
// import { Button } from "../../../ui/button"
// import { approvePurchase, createProfile, getAllowance, getCalculateFee, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../../../libs/flipCoinContract"
import { Box, Typography } from "@mui/material";
// import { Popup } from "../../../common/popup";
// import { ButtonLoading, ButtonMain } from "../../../ui/button";
// import { feeManagerContract } from "libs/contract"
import MyModal from "components/common/Modal";
import { ButtonLoading } from "components/ui/button";
import { StatusGame, useGameContext } from "contexts/GameContext";
import { useSiteContext } from "contexts/SiteContext";
import { deoddContract } from "libs/contract";
import { useContractWrite } from "wagmi";
import NotYetFlip from "./components/NotYetFlip";
import Flipping from "./components/Flipping";
import FlipResult from "./components/FlipResult";
import FlipLogDetail from "./components/FlipLogDetail";
import { DeoddService } from "libs/apis";
import { useQuery } from "@tanstack/react-query";
import TestailPoint from "./components/TestailPoint";

const avatar = [
  'assets/images/avatar-yellow.png',
  'assets/images/avatar-orange.png',
  'assets/images/avatar-pink.png',
  'assets/images/avatar-violet.png',
  'assets/images/avatar-green.png'
]

// eslint-disable-next-line react/display-name
export const Flip = React.memo(() => {
  const { statusGame, openModalPendingTransaction, setOpenModalPendingTransaction } = useGameContext();
  const { setIsError, setTitleError, setIsSuccess, setTitleSuccess } = useSiteContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { writeAsync } = useContractWrite({
    address: deoddContract.address,
    mode: 'recklesslyUnprepared',
    abi: deoddContract.abi,
    functionName: 'rollbackUnfulfilled',
  })

  const handleRefun = () => {
    setIsLoading(true);
    writeAsync?.()
      .then(resWrite => {
        return resWrite.wait();
      })
      .then((res) => {
        setIsLoading(false);
        setOpenModalPendingTransaction(false);
        setIsSuccess(true);
        setTitleSuccess('Successfully')
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        setTitleError(error.reason || 'Something went wrong. Please try again!');
      })
  }

  return <Box>

    <Box mt={{ xl: 10, md: 3, xs: 2 }} position={'relative'}>

      <FlipLogDetail isShowing={statusGame === StatusGame.FLIP_LOG_DETAIL} />
      <TestailPoint />
      <NotYetFlip isShowing={statusGame === StatusGame.FLIP} />
      <Flipping isShowing={statusGame === StatusGame.FLIPPING} />
      <FlipResult isShowing={statusGame === StatusGame.FLIP_RESULT} />
    </Box>
    <MyModal open={openModalPendingTransaction} setOpen={setOpenModalPendingTransaction} sx={{
      minWidth: 554, width: 554,
      textAlign: "center",
    }}>
      <Typography variant="h5" fontWeight={700} color="secondary.main" textAlign={'center'}>ATTENTION</Typography>
      <Typography textAlign={'center'} variant="body2" mt={3} fontWeight={400} lineHeight={'20px'}>Your latest transaction is not completed because a network error has occurred.
        Now you can claim your token back!</Typography>
      <ButtonLoading
        onClick={handleRefun}
        sx={{
          py: 2, mt: 2,
          borderRadius: 2,
          width: 233,
          textTransform: 'none',
          '&:disabled': {
            bgcolor: 'secondary.900',
            color: 'primary.300'
          }
        }}
        loading={isLoading}>
        <Typography variant='body2' textTransform={'uppercase'} fontSize={16} fontWeight={600} >
          Claim
        </Typography>
      </ButtonLoading>
    </MyModal>
  </Box>
})


