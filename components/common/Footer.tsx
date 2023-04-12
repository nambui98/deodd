import React from 'react'
import { Contact } from './Contact'
import { Box } from '@mui/material'

type Props = {}

function Footer({ }: Props) {
    return (
        <Box mt={5} display={{ xs: 'block', md: 'none' }}>
            <Contact />
        </Box>
    )
}

export default Footer