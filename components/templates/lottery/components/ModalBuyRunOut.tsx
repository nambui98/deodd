import { Typography } from '@mui/material'
import MyModal from 'components/common/Modal'
import { ButtonLoading } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import React from 'react'

type Props = {}

const ModalBuyRunOut = (props: Props) => {
    const { openModalBuyRunOut, setOpenModalBuyRunOut } = useLotteryContext();
    return (
        <MyModal open={openModalBuyRunOut} sx={{ width: "min(100vw - 1rem, 352px)" }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpenModalBuyRunOut}>
            <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Buy Lottery Ticket</Typography>
            <Typography textAlign={'center'} mb={3} fontWeight={400} variant='body2'>Time to buy ticket has run out! <br />It&apos;s almost time for the prize draw</Typography>
            <ButtonLoading>
                Confirm
            </ButtonLoading>
        </MyModal>


    )
}

export default ModalBuyRunOut