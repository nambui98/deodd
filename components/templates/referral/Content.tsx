import { Box } from '@mui/material'
import React from 'react'
import ContentData from './ContentData'
import ContentNoData from './ContentNoData'
import useReferral from 'hooks/useReferral'
import { useWalletContext } from 'contexts/WalletContext'
import Loader from 'components/common/Loader'

type Props = {}

function Content({ }: Props) {
    const { ckReferral, link, dataAvailable, dataExpired, reload, dataReferralSuccess } = useReferral({ isNotGet: false });
    // const { walletAddress } = useWalletContext();

    return (
        <Box>:
            {
                ckReferral !== undefined ?
                    (ckReferral ?
                        <ContentData
                            dataAvailable={dataAvailable}
                            dataExpired={dataExpired}
                            reload={reload}
                            link={link ?? ''}
                        /> : <ContentNoData success={dataReferralSuccess ? true : false} dataReferralSuccess={dataReferralSuccess} link={link ?? ''} ckReferral={ckReferral ?? false} />)
                    : <Loader isLoadingProps />
            }
        </Box>
    )
}

export default Content