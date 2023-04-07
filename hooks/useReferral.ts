// import { BASE_URL_REFERRAL } from 'constants/index';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import React, { useEffect, useState } from 'react'

function useReferral({ isNotGet }: { isNotGet?: boolean | undefined }) {
    const { walletAddress } = useWalletContext();
    const { setIsLoading } = useSiteContext();
    const [ckReferral, setCkReferral] = useState<boolean | undefined>();

    const [link, setLink] = useState<string | undefined>();
    const [dataAvailable, setDataAvailable] = useState<any[] | undefined>();
    const [dataExpired, setDataExpired] = useState<any[] | undefined>();
    useEffect(() => {
        if (!isNotGet) {
            getLinkUser();
        }
    }, [isNotGet])
    // useEffect(() => {
    //     if (ckReferral === undefined) {
    //         setIsLoading(true);
    //     } else {
    //         setIsLoading(false);
    //     }
    // }, [ckReferral])

    const getLinkUser = async () => {
        const ck = await DeoddService.checkUserReferral(walletAddress)
        const ckLinkExist = await DeoddService.findGenerateReferralLinkByWallet(walletAddress);
        let linkGenerate;
        if (ckLinkExist.status === 200) {
            if (ckLinkExist.data && ckLinkExist.data.data) {
                linkGenerate = ckLinkExist;
            } else {
                linkGenerate = await DeoddService.generateReferralLink(walletAddress);
            }
        }
        if (ck.data && ck.data.data) {
            setCkReferral(true);
        }
        if (linkGenerate && linkGenerate.status === 200) {
            if (linkGenerate.data && linkGenerate.data.data) {
                let baseURL = window.origin + '/ref/';
                setLink(baseURL + linkGenerate.data.data);
            }
        }
    }
    useEffect(() => {
        if (ckReferral) {
            getDataReferral();
        }
    }, [ckReferral])

    const getDataReferral = async () => {
        const [available, rewardExpired] = await Promise.all([
            DeoddService.getReferralRewardAvailable(walletAddress),
            DeoddService.getReferralRewardExpired(walletAddress)
        ]);
        if (available.status === 200 && available.data && available.data.data) {
            setDataAvailable(available.data.data);
        }
        if (rewardExpired.status === 200 && rewardExpired.data && rewardExpired.data.data) {
            setDataExpired(rewardExpired.data.data);
        }
    }

    return { ckReferral, link, dataAvailable, dataExpired, getLinkUser }
}

export default useReferral