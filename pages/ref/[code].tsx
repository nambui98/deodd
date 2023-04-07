import ContentNoData from '@/templates/referral/ContentNoData';
import { Box, Container, Typography } from '@mui/material';
import { useWalletContext } from 'contexts/WalletContext'
import useReferral from 'hooks/useReferral';
import { DeoddService } from 'libs/apis';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function ref({ }: Props) {
    const { walletAddress, userInfo } = useWalletContext();

    const { link, getLinkUser } = useReferral({ isNotGet: true });
    const router = useRouter();
    const { code } = router.query;
    const [success, setSuccess] = useState(false);
    const [dataReferralSuccess, setDataReferralSuccess] = useState<{ username: string, wallet: string } | undefined>();
    console.log(code);

    const checkUserIsValidForReferral = async () => {
        const res = await DeoddService.checkUserIsValidForReferral(walletAddress);


        debugger
        if (res.status === 200) {
            if (res.data.data) {
                const body = {
                    wallet: walletAddress,
                    username: userInfo.userName,
                    referralLink: code,
                }
                const res = await DeoddService.confirmReferralForUser(body);

                debugger
                if (res.status === 200 && res.data.data) {
                    getLinkUser();
                    setSuccess(true);
                    setDataReferralSuccess(res.data.data);
                }
            } else {
                router.push('/referral');
            }
        }
        return res;
    }
    useEffect(() => {
        if (walletAddress && code) {

            checkUserIsValidForReferral();
        }
    }, [walletAddress, code])

    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant="h2" textTransform={"uppercase"}>
                        Ref 2 earn
                    </Typography>
                </Container>
            </Box>
            <Box><ContentNoData link={link ?? ''} success={success} dataReferralSuccess={dataReferralSuccess} ckReferral={false} /></Box>
        </Box>
    )
}

export default ref