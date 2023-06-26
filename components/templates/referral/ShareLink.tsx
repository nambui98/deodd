import { Box, IconButton, Stack, Typography } from '@mui/material'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonTertiary } from 'components/ui/button'
import { Colors, SHARE } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'next-share'
import React, { useEffect, useRef } from 'react'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'
import HowItWorkModal from './HowItWorkModal'
import ClipboardJS from 'clipboard';
type Props = {
    link: string
}

function ShareLink({ link }: Props) {
    const { setTitleSuccess, setIsSuccess } = useSiteContext();

    const buttonRef = useRef(null);
    const handleCopy = () => {
        try {
            navigator?.clipboard.writeText(link);
            setTitleSuccess("Copy to clipboard");
            setIsSuccess(true);
        } catch (error) {
            (buttonRef?.current as any).click();
        }
    }

    useEffect(() => {
        if (buttonRef && buttonRef.current && link) {
            const clipboard = new ClipboardJS(buttonRef!.current!, {
                text: () => link
            })
            clipboard.on('success', () => {
                setTitleSuccess("Copy to clipboard");
                setIsSuccess(true);
            })
            return () => {
                clipboard.destroy();
            }
        }
    }, [link, setIsSuccess, setTitleSuccess])


    return (
        <Box width={1}>
            <Typography variant='h4' textAlign={'center'}>
                Your referral link
            </Typography>
            <button style={{ display: 'none' }} ref={buttonRef} data-clipboard-text={link}>
                Copy
            </button>

            <ButtonTertiary sx={{
                mt: 3, py: '12px',
                // width: 'auto',
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
            }} onClick={handleCopy}   >

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
                <TelegramShareButton
                    url={link}
                    title={SHARE.title}>
                    <IconButton color="primary" ><TelegramIcon fill="#96A5C0" /></IconButton>
                </TelegramShareButton>
                <TwitterShareButton
                    url={link}
                    title={SHARE.title}
                    hashtags={['#Deodd']}
                >
                    <IconButton color="primary" ><TwiterIcon fill="#96A5C0" /></IconButton>
                </TwitterShareButton>
                <FacebookShareButton
                    url={link}
                    title={SHARE.title}
                    quote={SHARE.title}
                    hashtag={'#Deodd'}
                >
                    <IconButton color="primary" ><FacebookIcon fill="#96A5C0" /></IconButton>
                </FacebookShareButton>
            </Stack>
        </Box>
    )
}

export default ShareLink