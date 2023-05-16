import { useWalletContext } from 'contexts/WalletContext';
import useReferral from 'hooks/useReferral';
import { DeoddService } from 'libs/apis';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ContentNoData from '../referral/ContentNoData';

type Props = {}

export const ContentRef = (props: Props) => {
    const { walletAddress, userInfo } = useWalletContext();

    const { link, getLinkUser } = useReferral({ isNotGet: true });
    const router = useRouter();
    const { code } = router.query;
    const [success, setSuccess] = useState(false);
    const [dataReferralSuccess, setDataReferralSuccess] = useState<{ userName: string, wallet: string } | undefined>();

    const checkUserIsValidForReferral = async () => {
        const res = await DeoddService.checkUserIsValidForReferral(walletAddress);
        if (res.status === 200) {
            if (res.data.data) {

                getLinkUser();
                if (res.data.data.isValidForReferred) {
                    const body = {
                        wallet: walletAddress,
                        username: userInfo?.username,
                        referralLink: code,
                    }
                    const res = await DeoddService.confirmReferralForUser(body);
                    if (res.status === 200 && res.data.data) {
                        setSuccess(true);
                        setDataReferralSuccess(res.data.data);
                    }
                } else if (res.data.data.isReferredByOthers) {
                    setSuccess(true);
                    setDataReferralSuccess(res.data.data.father);
                } else if (res.data.data.isReferredByOthers === false && res.data.data.isValidForReferred === false) {
                    router.push('/referral');
                }
            }
        }
        return res;
    }
    useEffect(() => {
        if (walletAddress && code) {
            checkUserIsValidForReferral();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress, code])


    return (
        <ContentNoData link={link ?? ''} success={success} dataReferralSuccess={dataReferralSuccess} ckReferral={false} />
    )
}