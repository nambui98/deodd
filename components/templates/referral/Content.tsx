import { Box } from '@mui/material'
import React from 'react'
import ContentData from './ContentData'
import ContentNoData from './ContentNoData'
import useReferral from 'hooks/useReferral'

type Props = {}

function Content({ }: Props) {
    const { ckReferral, link, dataAvailable, dataExpired, reload } = useReferral({ isNotGet: false });

    return (
        <Box>
            {
                ckReferral !== undefined &&
                (ckReferral ?
                    <ContentData
                        dataAvailable={dataAvailable}
                        dataExpired={dataExpired}
                        reload={reload}
                        link={link ?? ''}
                    /> : <ContentNoData link={link ?? ''} ckReferral={ckReferral ?? false} />)}
        </Box>
    )
}

export default Content