import { Box, Typography } from '@mui/material'
import React from 'react'

const TicketNumber = ({ number, size = 40 }: { number: string | number, size?: number }) => {
    return (
        <Box sx={{ width: size, height: size, position: 'relative', borderRadius: 99, overflow: 'hidden' }}>
            <Box sx={{ inset: 0, position: 'absolute', background: '#F5F5FA', borderRadius: "100%" }} />
            <Box sx={{ inset: '13%', position: 'absolute', opacity: 0.50, background: '#677286', borderRadius: '100%' }} />
            <Box sx={{ width: 1, height: 1, bottom: '-50%', right: '-40%', position: 'absolute', opacity: 0.30, background: '#677286', borderRadius: '100%' }} />
            <Typography
                fontSize={16 * size / 40}
                color="primary.300"
                fontWeight={600}
                lineHeight={1}
                sx={{
                    left: '50%',
                    top: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                }}>
                {number}
            </Typography>
        </Box>
    )
}

export default TicketNumber
