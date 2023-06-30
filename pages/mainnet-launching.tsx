import { AppConfig } from '@/utils/AppConfig';
import { Box, Stack, Typography, useTheme } from '@mui/material'
import Countdown from 'components/common/CountDown';
import { Meta } from 'components/common/Meta';
import MyImage from 'components/ui/image';
import Link from 'next/link';

import React from 'react'
import { BannerMainnetImage, BannerMainnetMobileImage, LogoImage } from 'utils/Images'

type Props = {}

function MainnetLaunching({ }: Props) {

    const theme = useTheme();
    return (
        <Box width={1} borderRadius={5} height={{ xs: 'calc(100vh - 457px)', md: 'calc(100vh - 260px)' }} sx={{
            backgroundImage: `url(${BannerMainnetImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            [theme.breakpoints.down('md').replace("@media", "@container")]: {

                backgroundImage: `url(${BannerMainnetMobileImage})`,
            },
        }}>
            <Meta title="DeODD" description={AppConfig.description} />
            <Box position={'relative'} top={22} left={16} component={Link} href="/">
                <MyImage src={LogoImage} height={52} width={86} alt="logo" />
            </Box>
            <Stack mt={{ xs: 10, md: 20 }} px={{ xs: 8, md: 0 }} alignItems={'center'}>
                <Stack sx={{ borderLeft: 8, borderColor: 'secondary.main', pl: 2 }}>
                    <Typography fontSize={{ xs: 32, md: 40 }} fontWeight={900} letterSpacing={4} color="secondary.main">Mainnet Launching</Typography>
                    <Typography fontSize={{ xs: 18, md: 24 }} fontWeight={500} letterSpacing={2}>June 29 at 09:00 UTC</Typography>
                </Stack>

            </Stack>
            <Typography textAlign={'center'} mt={3} fontSize={16} fontWeight={500}>Start in</Typography>
            <Stack mt={1} alignItems={'center'}>
                <Countdown endDate={'2023-06-29T09:00:00Z'} />
            </Stack>
        </Box>
    )
}

export default MainnetLaunching