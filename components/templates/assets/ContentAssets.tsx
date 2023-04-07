import { Container, Stack } from '@mui/material'
import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { useDeoddNFTContract } from 'hooks/useDeoddNFTContract'

type Props = {}

function ContentAssets({ }: Props) {
    const { spendingTokens, walletTokens, handleClickNFT, nftSelected, handleClaimNFT, priceToken } = useDeoddNFTContract();
    return (
        <Container>
            <Stack direction="row" mt={3} columnGap={4}>
                <LeftContent spendingTokens={spendingTokens} handleClickNFT={handleClickNFT} priceToken={priceToken} nftSelected={nftSelected} handleClaimNFT={handleClaimNFT} />
                <RightContent priceToken={priceToken} walletTokens={walletTokens} />
            </Stack >
        </Container >
    )
}

export default ContentAssets