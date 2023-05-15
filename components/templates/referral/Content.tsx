import { Box } from '@mui/material'
import React from 'react'
import ContentData from './ContentData'
import ContentNoData from './ContentNoData'
import useReferral from 'hooks/useReferral'
import { useWalletContext } from 'contexts/WalletContext'
import Loader from 'components/common/Loader'

type Props = {}

function Content({ }: Props) {
    const { ckReferral, link, dataAvailable, dataExpired, reload } = useReferral({ isNotGet: false });
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
                        /> : <ContentNoData link={link ?? ''} ckReferral={ckReferral ?? false} />)
                    : <Loader isLoadingProps />
            }
        </Box>
    )
}

export default Content