import ShareLink from '@/templates/referral/ShareLink';
import { Box, Divider, Typography } from '@mui/material'
import { ButtonLoading } from 'components/ui/button';
import { useWalletContext } from 'contexts/WalletContext';
import useReferral from 'hooks/useReferral';
import React, { useEffect, Suspense } from 'react'
import { ReferralImage } from 'utils/Images'


function RightContent({ image }: { image: string }) {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { link, getLinkUser } = useReferral({ isNotGet: true });
    useEffect(() => {
        if (walletAddress) {
            getLinkUser();
        }
    }, [walletAddress, getLinkUser])
    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <img src={image} width={"100%"} alt="" />
            {
                !walletIsConnected ?
                    <Box textAlign={'center'} mt={2}>
                        <Typography variant='h3' fontWeight={600}>Connect wallet to get your referral link</Typography>

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
                    </Box>
                    :
                    <Box mt={5}>
                        <ShareLink link={link ? link : ''} />
                    </Box>
            }

        </Box>
    )
}

export default RightContent