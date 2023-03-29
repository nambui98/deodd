import { Box, IconButton, Stack, Typography } from '@mui/material'
import { DiscordIcon, TelegramIcon, TwiterIcon } from 'components/common/icons'
import { ButtonTertiary } from 'components/ui/button'
import { useWalletContext } from 'contexts/WalletContext'
import React from 'react'
import { CopyIcon, NotiIcon } from 'utils/Icons'
import { LogoHeadImage } from 'utils/Images'

type Props = {}

function ContentNoData({ }: Props) {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    return (
        <>
            <Stack direction={'row'} mt={5} justifyContent={"center"} alignItems={'center'}>
                <img width={40} src={LogoHeadImage} alt="" />
                <Typography mx={2} variant='h2' textTransform={'uppercase'}>invite friends to get more profit from each flip!</Typography>
                <img width={40} src={LogoHeadImage} alt="" />
            </Stack>
            <Box mt={10} textAlign={'center'}>
                <Typography mx={2} variant='h3' textTransform={'uppercase'}>Connect wallet to get your referral link</Typography>
                {
                    !walletIsConnected &&
                    <ButtonTertiary onClick={handleConnectWallet} sx={{ py: "17px", px: 3, mt: 3 }}>
                        <Typography>Connect wallet</Typography>
                    </ButtonTertiary>
                }
                {
                    walletIsConnected && <>
                        <Typography variant='h4' textAlign={'center'} mt={5}>
                            Your referral link
                        </Typography>
                        <ButtonTertiary sx={{ mt: 1, py: '12px' }}>
                            <Typography variant='h4' mr={3} textTransform={'none'} >
                                https://www.deodd.io/ref/53sdkgj3434
                            </Typography>
                            <CopyIcon />
                        </ButtonTertiary>
                        <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={2}>
                            Share to
                        </Typography>
                        <Stack direction={'row'} mt={2} justifyContent={'center'}>
                            <IconButton color="primary" ><DiscordIcon fill="#7071B3" /></IconButton>
                            <IconButton color="primary" ><TelegramIcon fill="#7071B3" /></IconButton>
                            <IconButton color="primary" ><TwiterIcon fill="#7071B3" /></IconButton>
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