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

    return (
        <>
            <Stack direction={'row'} mt={5} justifyContent={"center"} alignItems={'center'}>
                <CoinAnimation width={40} height={40} />
                <Typography mx={2} variant='h2'>Invite Friends To Get More Profit From Each Flip!</Typography>
                <CoinAnimation width={40} height={40} />
            </Stack>
            <Box mt={5} textAlign={'center'}>
                {
                    !walletIsConnected &&
                    <>
                        <Typography variant='h3'>Connect wallet to get your referral link</Typography>
                        <ButtonTertiary onClick={handleConnectWallet} sx={{ py: "17px", px: 3, mt: 3 }}>
                            <Typography>Connect wallet</Typography>
                        </ButtonTertiary>
                    </>
                }
                {
                    success &&
                    <Typography mt={5} variant='h4' textTransform={'uppercase'}>You have been referred successfully by <Typography variant='h4' color="secondary.main" component={'span'}>{dataReferralSuccess?.username} ({Convert.convertWalletAddress(dataReferralSuccess?.wallet ?? '', 4, 4)})</Typography></Typography>
                }
                {
                    !ckReferral && walletIsConnected && <>
                        <Typography variant='h4' textAlign={'center'} >
                            Your referral link
                        </Typography>
                        <ButtonTertiary sx={{
                            mt: 3, py: '12px',
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
                        <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={3}>
                            Share to
                        </Typography>
                        <Stack direction={'row'} mt={2} justifyContent={'center'}>
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
                <Stack mt={5} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                    <NotiIcon />
                    <Typography ml={1} variant='body2' textAlign={'center'}  >
                        How it work
                    </Typography>
                </Stack>
            </Box>
        </>
    )
}

export default ContentNoData