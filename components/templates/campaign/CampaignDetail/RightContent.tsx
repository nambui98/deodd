import { Box, IconButton, Stack, Typography } from '@mui/material';
import ClipboardJS from 'clipboard';
import { TelegramIcon, TwiterIcon } from 'components/common/icons';
import { ButtonLoading, ButtonTertiary } from 'components/ui/button';
import { Colors, SHARE } from 'constants/index';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';
import useReferral from 'hooks/useReferral';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'next-share';
import { useRouter } from 'next/router';
import { Campaign } from 'pages/campaign';
import { useEffect, useRef, useState } from 'react';
import { CopyIcon, FacebookIcon } from 'utils/Icons';


function RightContent({ image, campaign }: { image: string, campaign: Campaign }) {
    const { walletAddress, walletIsConnected, isConnectingWallet, handleConnectWallet } = useWalletContext();
    const { link, getLinkUser } = useReferral({ isNotGet: !(campaign.href === "referral-campaign") });
    const [linkEnded, setLinkEnded] = useState<string>(link ?? '');
    const router = useRouter();
    useEffect(() => {
        if (walletAddress && campaign.href === "referral-campaign") {
            getLinkUser();
        }
    }, [walletAddress, getLinkUser, campaign.href])
    const { setTitleSuccess, setIsSuccess } = useSiteContext();
    useEffect(() => {

        let linkEnded = "";
        linkEnded = link !== undefined ? link : campaign.href !== "referral-campaign" ? (window as any)?.location.href : '';
        setLinkEnded(linkEnded);
    }, [campaign.href, link, setLinkEnded])


    const buttonRef = useRef(null);
    const handleCopy = () => {
        try {
            navigator?.clipboard.writeText(link ?? '');
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

    // let linkEnded = link !== undefined ? link : campaign.href !== "referral-campaign" ? (window as any)?.location.href : '';

    // let linkEnded = "";
    // if(window){
    // linkEnded = link !== undefined ? link : campaign.href !== "referral-campaign" ? (window as any)?.location.href : '';
    // }
    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <img src={image} width={"100%"} alt="" />
            {
                !walletIsConnected ?
                    <Box textAlign={'center'} mt={2}>
                        {
                            campaign.href === 'referral-campaign' &&
                            <Typography variant='h3' fontWeight={600}>Connect wallet to get your referral link</Typography>
                        }
                        <ButtonLoading
                            onClick={handleConnectWallet}
                            sx={{
                                px: 5, py: 2, mt: 3,
                                borderRadius: 2,
                                width: 'auto',
                                textTransform: 'none',
                            }}
                            loading={isConnectingWallet}>
                            <Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
                        </ButtonLoading>
                    </Box>
                    :
                    <Box mt={5}>
                        {

                            campaign.href === 'referral-campaign' &&
                            <>
                                <button style={{ display: 'none' }} ref={buttonRef} data-clipboard-text={link}>
                                    Copy
                                </button>
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


                            </>
                        }
                        <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={3}>
                            Share to
                        </Typography>
                        <Stack direction={'row'} mt={2} justifyContent={'center'}>
                            <TelegramShareButton
                                url={linkEnded}
                                title={SHARE.title}>
                                <IconButton color="primary" ><TelegramIcon fill="#96A5C0" /></IconButton>
                            </TelegramShareButton>
                            <TwitterShareButton
                                url={linkEnded}
                                title={SHARE.title}
                                hashtags={['#Deodd']}
                            >
                                <IconButton color="primary" ><TwiterIcon fill="#96A5C0" /></IconButton>
                            </TwitterShareButton>
                            <FacebookShareButton
                                url={linkEnded}
                                title={SHARE.title}
                                quote={SHARE.title}
                                hashtag={'#Deodd'}
                            >
                                <IconButton color="primary" ><FacebookIcon fill="#96A5C0" /></IconButton>
                            </FacebookShareButton>
                        </Stack>

                    </Box>
            }

        </Box>
    )
}

export default RightContent