import { Box, IconButton, Stack, Typography } from '@mui/material'
import CoinAnimation from 'components/common/CoinAnimation'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonLoading, ButtonMain, ButtonTertiary } from 'components/ui/button'
import { Colors } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import {
    FacebookShareButton, TelegramShareButton, TwitterShareButton,
} from 'next-share'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'
import HowItWorkModal from './HowItWorkModal'

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

                        <ButtonLoading
                            onClick={handleConnectWallet}
                            sx={{
                                px: 5, py: 2, mt: 3,
                                borderRadius: 2,
                                width: 'auto',
                                textTransform: 'none',
                            }}
                            loading={false}>
                            <Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
                        </ButtonLoading>

                    </>
                }
                {
                    success &&
                    <Typography my={5} variant='h4' >You have been referred successfully by <Typography variant='h4' color="secondary.main" component={'span'}>{dataReferralSuccess?.username} ({Convert.convertWalletAddress(dataReferralSuccess?.wallet ?? '', 4, 4)})</Typography></Typography>
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
                                <IconButton color="primary" ><TelegramIcon fill="#96A5C0" /></IconButton>
                            </TelegramShareButton>
                            <TwitterShareButton
                                url={link}
                                title={'next-share is a social share buttons for your next React apps.'}
                            >
                                <IconButton color="primary" ><TwiterIcon fill="#96A5C0" /></IconButton>
                            </TwitterShareButton>
                            <FacebookShareButton
                                url={link}
                                quote={''}
                                hashtag={'#deodd'}
                            >
                                <IconButton color="primary" ><FacebookIcon fill="#96A5C0" /></IconButton>
                            </FacebookShareButton>
                        </Stack>
                    </>
                }
                <HowItWorkModal />
            </Box>
        </>
    )
}

export default ContentNoData