import { Typography } from '@mui/material'
import MyModal from 'components/common/Modal'
import { ButtonFourth, ButtonLoading, ButtonSecondRemex } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import React from 'react'

type Props = {}

const ModalBuyConfirm = (props: Props) => {
  // const { openModalConfirmBuy, setOpenModalConfirmBuy } = useLotteryContext();
  return (
    <MyModal open={false} sx={{
      maxWidth: 352,
      width: 1,
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
    }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { }}>
      <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Buy Lottery Ticket</Typography>
      <Typography>You have success buy x3 Ticket</Typography>
      <ButtonLoading>
        Confirm
      </ButtonLoading>
    </MyModal>


  )
}

export default ModalBuyConfirm