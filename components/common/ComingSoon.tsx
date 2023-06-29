import { AppConfig } from '@/utils/AppConfig';
import { Box, Stack, Typography, useTheme } from '@mui/material'
import Countdown from 'components/common/CountDown';
import { Meta } from 'components/common/Meta';
import MyImage from 'components/ui/image';
import Link from 'next/link';

import React from 'react'
import { BannerMainnetImage, BannerMainnetMobileImage, LogoImage } from 'utils/Images'

type Props = {
    title: string,
    subTitle: string,
    hasCountDown: boolean,
}

function ComingSoon({ title, subTitle, hasCountDown }: Props) {

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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box position={'absolute'} top={22} left={16} component={Link} href="/">
                <MyImage src={LogoImage} height={52} width={86} alt="logo" />
            </Box>
            <Stack px={{ xs: 8, md: 0 }} alignItems={'center'}>
                <Stack sx={{ borderLeft: 8, borderColor: 'secondary.main', pl: 2 }}>
                    <Typography fontSize={{ xs: 32, md: 40 }} fontWeight={900} letterSpacing={{ xs: 2, md: 4 }} color="secondary.main" dangerouslySetInnerHTML={{ __html: title }} />
                    <Typography fontSize={{ xs: 18, md: 24 }} fontWeight={500} letterSpacing={2}>{subTitle}</Typography>
                </Stack>

            </Stack>
            {
                hasCountDown &&
                <>
                    <Typography textAlign={'center'} mt={3} fontSize={16} fontWeight={500}>Start in</Typography>
                    <Stack mt={1} alignItems={'center'}>
                        <Countdown endDate={'2023-06-29T09:00:00Z'} />
                    </Stack>

                </>
            }

        </Box>
    )
}

export default ComingSoon