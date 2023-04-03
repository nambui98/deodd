import LeftContent from '@/templates/assets/LeftContent'
import RightContent from '@/templates/assets/RightContent'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useDeoddNFTContract } from 'hooks/useDeoddNFTContract';

function assets() {

    const { spendingTokens, walletTokens, handleClickNFT, nftSelected, handleClaimNFT, priceToken } = useDeoddNFTContract();
    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Assets
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Stack direction="row" mt={3} columnGap={4}>
                    <LeftContent spendingTokens={spendingTokens} handleClickNFT={handleClickNFT} priceToken={priceToken} nftSelected={nftSelected} handleClaimNFT={handleClaimNFT} />
                    <RightContent priceToken={priceToken} walletTokens={walletTokens} />
                </Stack >
            </Container >
        </Box >
    )
}

export default assets