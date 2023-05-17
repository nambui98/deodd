import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Meta } from './Meta'
import { AppConfig } from '@/utils/AppConfig'

type Props = {
    ip: string,
    country: string
}

function Forbidden({ ip, country }: Props) {
    return (<Stack height={'100vh'} width={1} alignItems={'center'} justifyContent={'center'} >
        <Meta title={AppConfig.title} description={AppConfig.description} />
        <Box position={'absolute'} zIndex={0} sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: .2 }}>
            <Typography fontWeight={700} fontSize={{ xs: 60, sm: 90, md: 120 }} color="secondary.main">FORBIDDEN</Typography>
        </Box>
        <Box maxWidth={544} mx={3} zIndex={1} textAlign={'center'}>
            <Typography variant="h3" fontWeight={600} lineHeight={'22px'}>Access to this page has been disabled because our service are not supporting your country at the moment!</Typography>
            <Typography variant="h3" fontWeight={600} mt={3} lineHeight={'22px'}>Your IP: {ip}</Typography>
            <Typography variant="h3" fontWeight={600} lineHeight={'22px'}>Your country: {country}</Typography>
        </Box>
    </Stack>)
}

export default Forbidden