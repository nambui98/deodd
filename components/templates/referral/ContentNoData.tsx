import { Box, IconButton, Stack, Typography } from '@mui/material'
import CoinAnimation from 'components/common/CoinAnimation'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonTertiary } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import {
    FacebookShareButton, TelegramShareButton, TwitterShareButton,
} from 'next-share'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'

type Props = {
    ckReferral: boolean;
    link: string;
    success?: boolean;
    dataReferralSuccess?: { username: string, wallet: string } | undefined;
}

function ContentNoData({ ckReferral, link, success, dataReferralSuccess }: Props) {
    const { walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setIsSuccess, setTitleSuccess } = useSiteContext();
    const handleCopy = () => {
        navigator?.clipboard.writeText(link);
        setTitleSuccess("Copy to clipboard");
        setIsSuccess(true);
    }
    // console.log(window.origin);

    return (
        <>
            <Stack direction={'row'} mt={5} justifyContent={"center"} alignItems={'center'}>

                <CoinAnimation width={40} />
                <Typography mx={2} variant='h2' textTransform={'uppercase'}>invite friends to get more profit from each flip!</Typography>
                <CoinAnimation width={40} />
            </Stack>
            <Box mt={10} textAlign={'center'}>
                {

                    !walletIsConnected &&
                    <>
                        <Typography mx={2} variant='h3' textTransform={'uppercase'}>Connect wallet to get your referral link</Typography>
                        <ButtonTertiary onClick={handleConnectWallet} sx={{ py: "17px", px: 3, mt: 3 }}>
                            <Typography>Connect wallet</Typography>
                        </ButtonTertiary>
                    </>
                }
                {
                    success &&
                    <Typography variant='h4' textTransform={'uppercase'}>You have been referred successfully by <Typography variant='h4' color="secondary.main" component={'span'}>{dataReferralSuccess?.username} ({Convert.convertWalletAddress(dataReferralSuccess?.wallet ?? '', 4, 4)})</Typography></Typography>
                }
                {
                    !ckReferral && walletIsConnected && <>
                        <Typography variant='h4' textAlign={'center'} mt={5}>
                            Your referral link
                        </Typography>
                        <ButtonTertiary sx={{
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
                            {/* <IconButton color="primary" ><DiscordIcon fill="#7071B3" /></IconButton> */}
                            <TelegramShareButton url={link}
                                title={'next-share is a social share buttons for your next React apps.'}>

                                <IconButton color="primary" ><TelegramIcon fill="#7071B3" /></IconButton>
                            </TelegramShareButton>
                            <TwitterShareButton
                                url={link}
                                title={'next-share is a social share buttons for your next React apps.'}
                            >

                                <IconButton color="primary" ><TwiterIcon fill="#7071B3" /></IconButton>
                            </TwitterShareButton>
                            <FacebookShareButton
                                url={link}
                                quote={''}
                                hashtag={'#deodd'}
                            >
                                <IconButton color="primary" ><FacebookIcon fill="#7071B3" /></IconButton>
                            </FacebookShareButton>
                        </Stack>
                    </>
                }
                <Stack mt={10} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                    <NotiIcon />
                    <Typography ml={1} variant='body2' textAlign={'center'} textTransform={'uppercase'} >
                        HOW it work
                    </Typography>
                </Stack>
            </Box>
        </>
    )
}

export default ContentNoData