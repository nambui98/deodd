import { Box, Stack } from '@mui/material'
import React from 'react'
import ContentData from './ContentData'
import ContentNoData from './ContentNoData'
import useReferral from 'hooks/useReferral'
import { useWalletContext } from 'contexts/WalletContext'
import Loader from 'components/common/Loader'
import CoinAnimation from 'components/common/CoinAnimation'

type Props = {}

function Content({ }: Props) {
    const { ckReferral, link, dataAvailable, dataExpired, reload, dataReferralSuccess } = useReferral({ isNotGet: false });

    return (
        <Box>
            {
                ckReferral !== undefined ?
                    (ckReferral ?
                        <ContentData
                            dataAvailable={dataAvailable}
                            dataExpired={dataExpired}
                            reload={reload}
                            link={link ?? ''}
                        /> : <ContentNoData success={dataReferralSuccess ? true : false} dataReferralSuccess={dataReferralSuccess} link={link ?? ''} ckReferral={ckReferral ?? false} />)
                    : <Stack justifyContent={'center'} alignItems={'center'} height={1}>
                        <CoinAnimation width={100} height={100} />
                    </Stack>
            }
        </Box>
    )
}

export default Content