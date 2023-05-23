import ShareLink from '@/templates/referral/ShareLink';
import { Box } from '@mui/material'
import { useWalletContext } from 'contexts/WalletContext';
import useReferral from 'hooks/useReferral';
import React, { useEffect, Suspense } from 'react'
import { ReferralImage } from 'utils/Images'


function RightContent() {
    const { walletAddress } = useWalletContext();
    const { link, getLinkUser } = useReferral({ isNotGet: true });
    useEffect(() => {
        if (walletAddress) {
            getLinkUser();
        }
    }, [walletAddress])
    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <img src={ReferralImage} width={"100%"} alt="" />
            <ShareLink link={link ? link : ''} />

        </Box>
    )
}

export default RightContent