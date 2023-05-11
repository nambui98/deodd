import React, { useState } from "react";
// import { Button } from "../../../ui/button"
// import { approvePurchase, createProfile, getAllowance, getCalculateFee, getLastFlipId, getPlayerAssets, getUserInfo, getWinningStreakAmount, getWinningStreakLength, handleFlipToken } from "../../../../libs/flipCoinContract"
import { Box, Grid, styled, Typography } from "@mui/material";
import { TEXT_STYLE } from "../../../../styles/common";
import { Popup } from "../../../common/popup";
import { ButtonLoading, ButtonMain } from "../../../ui/button";
import { Result } from "../result";
// import { feeManagerContract } from "libs/contract"
import MyModal from "components/common/Modal";
import { StatusGame, useContractContext } from "contexts/ContractContext";
import { deoddContract } from "libs/contract";
import { useContractWrite, useDisconnect } from "wagmi";
import { Flipping } from "../components/Flipping";
import NotYetFlip from "../components/NotYetFlip";
import { useSiteContext } from "contexts/SiteContext";

// const amounts = [0.1, 0.5, 1, 2, 5, 10]
// const amounts = [0.013, 0.023, 0.043, 0.073, 0.103, 0.133, 0.163, 0.19]
const avatar = [
  'assets/images/avatar-yellow.png',
  'assets/images/avatar-orange.png',
  'assets/images/avatar-pink.png',
  'assets/images/avatar-violet.png',
  'assets/images/avatar-green.png'
]

interface IProps {
  statusGame: StatusGame
  setStatusGame: (status: StatusGame) => any
}
type DataSelected = {
  coinSide?: 0 | 1,
  amount?: number,
  index?: number,
} | undefined

// eslint-disable-next-line react/display-name
export const PlayPart = React.memo(() => {
  const { statusGame, openModalPendingTransaction, setOpenModalPendingTransaction } = useContractContext();
  const { disconnect } = useDisconnect()
  const { setIsError, setTitleError, setIsSuccess, setTitleSuccess } = useSiteContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { writeAsync } = useContractWrite({
    address: deoddContract.address,
    mode: 'recklesslyUnprepared',
    abi: deoddContract.abi,
    functionName: 'rollbackUnfulfilled',
  })

  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
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
        debugger
      })
      .catch(error => {
        debugger
        setIsLoading(false);
        setIsError(true);
        setTitleError(error.reason || 'Something went wrong. Please try again!');

      })

  }

  const handleShowDisconnect = () => {
    setPopup({
      status: true,
      body: <Box>
        <TitlePopup >Disconnect</TitlePopup>
        <SubtitlePopup >Do you want to disconnect your wallet?</SubtitlePopup>
        <Grid container >
          <Grid item xs={12}>

            <ButtonMain active={true} title={'NO'} onClick={() => setPopup({ ...popup, status: false })} sx={{ width: "100%", padding: "17px 0", marginBottom: '16px' }} />
          </Grid>
          <Grid item xs={12}>

            <ButtonMain active={false} title={'YES'} onClick={() => disconnect()} sx={{ width: "100%", padding: "17px 0" }} />
          </Grid>

        </Grid>
      </Box>
    })
  }

  return <Box mt={{ xl: 10, md: 3, xs: 2 }} position={'relative'}>

    <RenderUi statusGame={statusGame} />
    {/* <Stack position={'absolute'} top={{ md: 0, xs: 16 }} right={0} direction={'row'} gap={1} alignItems={'center'}>
      <Stack alignItems={'flex-end'}>

        <Typography variant="caption" fontWeight={400} color="secondary.100">Testail Coin</Typography>
        <Typography variant="h3" fontWeight={600}>124</Typography>
      </Stack>
      <MyImage alt="" width={40} height={40} src={TestailCoinImage} />

    </Stack> */}
    <Popup status={popup.status} handleClose={() => { setPopup({ ...popup, status: false }) }} body={<Box>
      {popup.body}
    </Box>} />
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

// eslint-disable-next-line react/display-name
const RenderUi = React.memo(({ statusGame }: { statusGame: StatusGame }) => {
  switch (statusGame) {
    case StatusGame.FLIP:
      return <NotYetFlip />
    case StatusGame.FLIPPING:
      return <Flipping />
    case StatusGame.FLIP_RESULT:
      return <Result />
    default: return <Box></Box>
  }
})

const TitlePopup = styled(Typography)(() => ({
  ...TEXT_STYLE(24, 500, '#181536'),
  marginBottom: 24,
  textAlign: 'center'
}))
const SubtitlePopup = styled(Typography)(() => ({
  ...TEXT_STYLE(14, 400, '#181536'),
  marginBottom: 24
}))
