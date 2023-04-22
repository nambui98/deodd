import { Box, Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { useDeoddNFTContract } from 'hooks/useDeoddNFTContract'
import MyTabs, { TypeTab } from 'components/common/Tabs'
import { useWalletContext } from 'contexts/WalletContext'
import { Format } from 'utils/format'
import { Convert } from 'utils/convert'

type Props = {}

function ContentAssets({ }: Props) {
    const { walletAddress } = useWalletContext();
    const { spendingTokens, walletTokens, handleClickNFT, nftSelected, handleClaimNFT, priceToken } = useDeoddNFTContract();

    const [valueTab, setValueTab] = useState<number>(1);
    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'BALANCE',
            value: ''
        },
        {
            id: 2,
            title: 'WALLET',
            value: `(${Convert.convertWalletAddress(walletAddress, 4, 4)})`
        },

    ]
    return (
        <Container>
            <Box display={{ xs: 'block', md: 'none' }}>
                <MyTabs listTabs={listTabs} value={valueTab} setValue={setValueTab} />
                <Box mt={3}>
                    {
                        valueTab === 1 ?
                            <LeftContent spendingTokens={spendingTokens} handleClickNFT={handleClickNFT} priceToken={priceToken} nftSelected={nftSelected} handleClaimNFT={handleClaimNFT} />
                            :
                            <RightContent priceToken={priceToken} walletTokens={walletTokens} />
                    }
                </Box>
            </Box>
            <Stack display={{ xs: 'none', md: 'flex' }} direction="row" mt={3} columnGap={4}>
                <LeftContent spendingTokens={spendingTokens} handleClickNFT={handleClickNFT} priceToken={priceToken} nftSelected={nftSelected} handleClaimNFT={handleClaimNFT} />
                <RightContent priceToken={priceToken} walletTokens={walletTokens} />
            </Stack >
        </Container >
    )
}

export default ContentAssets