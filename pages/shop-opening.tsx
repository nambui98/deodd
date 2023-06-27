import { Box, Stack, Typography, useTheme } from '@mui/material'
import Countdown from 'components/common/CountDown';
import MyImage from 'components/ui/image';
import Link from 'next/link';

import React from 'react'
import { BannerMainnetImage, BannerMainnetMobileImage, BannerShopOpenImage, BannerShopOpenMobileImage, LogoImage } from 'utils/Images'

type Props = {}

function MainnetLaunching({ }: Props) {

    const theme = useTheme();
    return (
        <Box width={1} borderRadius={5} height={{ xs: 'calc(100vh - 457px)', md: 'calc(100vh - 260px)' }} sx={{
            backgroundImage: `url(${BannerShopOpenImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            [theme.breakpoints.down('md').replace("@media", "@container")]: {

                backgroundImage: `url(${BannerShopOpenMobileImage})`,
            },
        }}>
            <Box position={'relative'} top={22} left={16} component={Link} href="/">
                <MyImage src={LogoImage} height={52} width={86} alt="logo" />
            </Box>
            <Stack mt={20} alignItems={'center'}>
                <Stack sx={{ borderLeft: 8, borderColor: 'secondary.main', pl: 2 }}>
                    <Typography fontSize={40} fontWeight={900} letterSpacing={4} color="secondary.main">Shop Opening</Typography>
                    <Typography fontSize={24} fontWeight={500} letterSpacing={2}>June 27 at 13:00 UTC</Typography>
                </Stack>

            </Stack>
            <Typography textAlign={'center'} mt={3} fontSize={16} fontWeight={500}>Start in</Typography>
            <Stack mt={1} alignItems={'center'}>
                <Countdown endDate={'2023-06-27T13:00:00Z'} />

            </Stack>
        </Box>
    )
}

export default MainnetLaunching