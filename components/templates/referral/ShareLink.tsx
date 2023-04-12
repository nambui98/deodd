import { Box, IconButton, Stack, Typography } from '@mui/material'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonTertiary } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'next-share'
import React from 'react'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'

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
            <Box sx={{ height: '1px', margin: "40px 0", bgcolor: 'secondary.100' }}>
            </Box>
            <Typography variant='h4' textAlign={'center'} mt={5}>
                Your referral link
            </Typography>
            <ButtonTertiary fullWidth sx={{
                mt: 1, py: '12px',
                color: 'secondary.main',
                'svg': {
                    fill: Colors.primaryDark,
                },
                '&:hover': {
                    svg: {
                        fill: Colors.secondary
                    }
                }
            }} onClick={handleCopy} >
                <Typography variant='h4' mr={3} textTransform={'none'} >
                    {
                        link
                    }
                </Typography>
                <CopyIcon />
            </ButtonTertiary>

            <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={2}>
                Share to
            </Typography>
            <Stack direction={'row'} mt={2} justifyContent={'center'}>
                <TelegramShareButton url={link}
                    title={'share title'}>
                    <IconButton color="primary" ><TelegramIcon fill="#7071B3" /></IconButton>
                </TelegramShareButton>
                <TwitterShareButton
                    url={link}
                    title={'share title'}
                >
                    <IconButton color="primary" ><TwiterIcon fill="#7071B3" /></IconButton>
                </TwitterShareButton>
                <FacebookShareButton
                    url={link}
                    quote={'share title'}
                    hashtag={'#deodd'}
                >
                    <IconButton color="primary" ><FacebookIcon fill="#7071B3" /></IconButton>
                </FacebookShareButton>
            </Stack>
            <Stack mt={5} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <NotiIcon />
                <Typography ml={1} variant='body2' textAlign={'center'} textTransform={'uppercase'} >
                    HOW it work
                </Typography>
            </Stack>
        </Box>
    )
}

export default ShareLink