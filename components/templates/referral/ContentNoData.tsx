import { Box, IconButton, Stack, Typography } from '@mui/material'
import CoinAnimation from 'components/common/CoinAnimation'
import { TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonLoading, ButtonMain, ButtonTertiary } from 'components/ui/button'
import { Colors, SHARE } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import {
    FacebookShareButton, TelegramShareButton, TwitterShareButton,
} from 'next-share'
import { CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'
import HowItWorkModal from './HowItWorkModal'
import ShareLink from './ShareLink'
import { useEffect, useRef } from 'react'

import ClipboardJS from 'clipboard';
type Props = {
    ckReferral: boolean;
    link: string;
    success?: boolean;
    dataReferralSuccess?: { userName: string, wallet: string } | undefined;
}

function ContentNoData({ ckReferral, link, success, dataReferralSuccess }: Props) {
    const { walletIsConnected, isConnectingWallet, handleConnectWallet } = useWalletContext();
    const { setIsSuccess, setTitleSuccess } = useSiteContext();
    const buttonRef = useRef(null);
    const handleCopy = () => {
        navigator?.clipboard.writeText(link);
        setTitleSuccess("Copy to clipboard");
        setIsSuccess(true);
    }
    useEffect(() => {
        if (buttonRef && buttonRef.current && link) {
            console.log();
            debugger
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
        <>
            <Stack direction={'row'} mt={5} justifyContent={"center"} alignItems={'center'}>
                <CoinAnimation width={40} height={40} />
                <Typography mx={2} variant='h2' fontWeight={700} lineHeight={1.5} textAlign={'center'}>Invite Friends To Get More Profit From Each Flip!</Typography>
                <CoinAnimation width={40} height={40} />
            </Stack>
            <Box mt={5} textAlign={'center'}>
                {
                    !walletIsConnected &&
                    <>
                        <Typography variant='h3' fontWeight={600}>Connect wallet to get your referral link</Typography>

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

                    </>
                }
                {
                    success &&
                    <Typography my={5} variant='h4' >You have been referred successfully by <Typography variant='h4' color="secondary.main" component={'span'}>{dataReferralSuccess?.userName} ({Convert.convertWalletAddress(dataReferralSuccess?.wallet ?? '', 4, 4)})</Typography></Typography>
                }
                {
                    !ckReferral && walletIsConnected && <>
                        <ShareLink link={link} />

                    </>
                }
                <HowItWorkModal />
            </Box>
        </>
    )
}

export default ContentNoData