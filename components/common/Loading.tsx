import React from 'react'
import CoinAnimation from './CoinAnimation'
import { Box, Stack } from '@mui/material'

type Props = {}

function Loading({ }: Props) {
    return (
        <Stack position={'fixed'} zIndex={100} sx={{ inset: 0, justifyContent: 'center', alignItems: 'center', bgcolor: "transparent" }} >
            <CoinAnimation mx="auto" width={{ md: 160, xs: 120 }} height={{ md: 160, xs: 120 }} />
        </Stack>
    )
}

export default Loading