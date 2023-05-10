import { Box, IconButton, Stack, Typography } from '@mui/material'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonTertiary } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'next-share'
import React from 'react'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'
import HowItWorkModal from './HowItWorkModal'

type Props = {
    link: string
}

function ShareLink({ link }: Props) {
    const { setTitleSuccess, setIsSuccess } = useSiteContext();
    const handleCopy = () => {
        navigator?.clipboard.writeText(link);
        setTitleSuccess("Copy to clipboard");
        setIsSuccess(true);
    }
    return (
        <Box>
            <Box sx={{ height: '1px', my: 3, bgcolor: 'secondary.300' }}>
            </Box>
            <Typography variant='h4' textAlign={'center'}>
                Your referral link
            </Typography>
            <ButtonTertiary fullWidth sx={{
                mt: 3, py: '12px',
                color: 'secondary.main',
                'svg': {
                    stroke: 'transparent',
                    fill: Colors.primaryDark,
                },
                '&:hover': {
                    svg: {
                        stroke: 'transparent',
                        fill: Colors.bg80
                    }
                }
            }} onClick={handleCopy} >
                <Typography variant='h4' fontSize={16} fontWeight={600} mr={3} textTransform={'none'} >
                    {
                        link
                    }
                </Typography>
                <CopyIcon />
            </ButtonTertiary>

            <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={3}>
                Share to
            </Typography>
            <Stack direction={'row'} mt={2} justifyContent={'center'}>
                <TelegramShareButton url={link}
                    title={'share title'}>
                    <IconButton color="primary" ><TelegramIcon fill="#96A5C0" /></IconButton>
                </TelegramShareButton>
                <TwitterShareButton
                    url={link}
                    title={'share title'}
                >
                    <IconButton color="primary" ><TwiterIcon fill="#96A5C0" /></IconButton>
                </TwitterShareButton>
                <FacebookShareButton
                    url={link}
                    quote={'share title'}
                    hashtag={'#deodd'}
                >
                    <IconButton color="primary" ><FacebookIcon fill="#96A5C0" /></IconButton>
                </FacebookShareButton>
            </Stack>
            <HowItWorkModal />
        </Box>
    )
}

export default ShareLink