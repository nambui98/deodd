import Banner from '@/templates/lottery/Banner'
import BuyTickets from '@/templates/lottery/BuyTickets'
import { Container, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function Lottery({ }: Props) {
    return (
        <Container sx={{ mb: 10, p: { xs: 0, md: 3 } }}>
            <Stack gap={5}>
                <Banner />
                <BuyTickets />
            </Stack>
        </Container>
    )
}

export default Lottery