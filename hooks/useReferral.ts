// import { BASE_URL_REFERRAL } from 'constants/index';
import { useWalletContext } from 'contexts/WalletContext';
import { DeoddService } from 'libs/apis';
import { useCallback, useEffect, useState } from 'react';

function useReferral({ isNotGet }: { isNotGet?: boolean | undefined }) {
    const { walletAddress } = useWalletContext();
    const [ckReferral, setCkReferral] = useState<boolean | undefined>();
    const [isReload, setIsReload] = useState<boolean>();

    const [link, setLink] = useState<string | undefined>();
    const [dataAvailable, setDataAvailable] = useState<any[] | undefined>();
    const [dataExpired, setDataExpired] = useState<any[] | undefined>();
    useEffect(() => {
        if (!isNotGet) {
            if (walletAddress) {
                getLinkUser();
            } else {
                setCkReferral(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNotGet, walletAddress])

    const getLinkUser = async () => {
        const ck = await DeoddService.checkUserReferral(walletAddress)
        console.log(ck);
        const ckLinkExist = await DeoddService.findGenerateReferralLinkByWallet(walletAddress);

        debugger
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
        } else {
            setCkReferral(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ckReferral, walletAddress, isReload])

    const getDataReferral = async () => {
        const [available, rewardExpired] = await Promise.all([
            DeoddService.getReferralRewardAvailable(walletAddress),
            DeoddService.getReferralRewardExpired(walletAddress)
        ]);
        debugger
        if (available.status === 200 && available.data && available.data.data) {
            setDataAvailable(available.data.data);
        }
        if (rewardExpired.status === 200 && rewardExpired.data && rewardExpired.data.data) {
            setDataExpired(rewardExpired.data.data);
        }
    }

    const reload = useCallback(() => {
        setIsReload(!isReload);
    }, [])

    return { ckReferral, link, dataAvailable, dataExpired, getLinkUser, reload }
}

export default useReferral