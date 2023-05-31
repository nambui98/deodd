import { Box, Stack } from '@mui/material'
import CoinAnimation from 'components/common/CoinAnimation'
import useReferral from 'hooks/useReferral'
import ContentData from './ContentData'
import ContentNoData from './ContentNoData'

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