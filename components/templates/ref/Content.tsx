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
    const [dataReferralSuccess, setDataReferralSuccess] = useState<{ username: string, wallet: string } | undefined>();

    const checkUserIsValidForReferral = async () => {
        const res = await DeoddService.checkUserIsValidForReferral(walletAddress);
        if (res.status === 200) {
            if (res.data.data) {
                const body = {
                    wallet: walletAddress,
                    username: userInfo?.userName,
                    referralLink: code,
                }
                const res = await DeoddService.confirmReferralForUser(body);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress, code])


    return (
        <ContentNoData link={link ?? ''} success={success} dataReferralSuccess={dataReferralSuccess} ckReferral={false} />
    )
}