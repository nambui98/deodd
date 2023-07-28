import BuyTickets from '@/templates/lottery/BuyTickets'
import Roll from '@/templates/lottery/Roll'
import HowToPlay from '@/templates/lottery/HowToPlay'
import { Container, Stack } from '@mui/material'
import { LotteryProvider } from 'contexts/LotteryContext'
import React from 'react'

type Props = {}

function Lottery({ }: Props) {
    return (
        <Container sx={{ mt: 5 }}>
            <Stack gap={5}>
                <LotteryProvider>
                    <Roll />
                    <BuyTickets />
                    <HowToPlay />
                </LotteryProvider>
            </Stack>
        </Container>
    )
}

export default Lottery