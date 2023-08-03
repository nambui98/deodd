import BuyTickets from '@/templates/lottery/BuyTickets'
import Roll from '@/templates/lottery/Roll'
import HowToPlay from '@/templates/lottery/HowToPlay'
import { Container, Stack } from '@mui/material'
import { LotteryProvider } from 'contexts/LotteryContext'
import React from 'react'
import ModalApprove from '@/templates/lottery/components/ModalApprove'
import ModalBuyRunOut from '@/templates/lottery/components/ModalBuyRunOut'
import ModalBuyTicket from '@/templates/lottery/ModalBuyTicket'
import ModalBuyConfirm from '@/templates/lottery/components/ModalBuyConfirm'
import ModalProvablyFair from '@/templates/lottery/components/ModalProvablyFair'

type Props = {}

function Lottery({ }: Props) {
    return (
        <Container sx={{ mt: 5 }}>
            <Stack gap={5}>
                <LotteryProvider>
                    <Roll />
                    <BuyTickets />
                    <HowToPlay />
                    <ModalBuyRunOut />
                    <ModalBuyTicket />
                    <ModalProvablyFair />
                </LotteryProvider>
            </Stack>
        </Container>
    )
}

export default Lottery