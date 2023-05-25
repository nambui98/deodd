// import { BASE_URL_REFERRAL } from 'constants/index';
import { useWalletContext } from 'contexts/WalletContext';
import { DeoddService } from 'libs/apis';
import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

function useReferral({ isNotGet }: { isNotGet?: boolean | undefined }) {
    const { walletAddress } = useWalletContext();
    const { isConnected } = useAccount();
    const [ckReferral, setCkReferral] = useState<boolean | undefined>();
    const [isReload, setIsReload] = useState<boolean>();
    const [dataReferralSuccess, setDataReferralSuccess] = useState<any>();

    const [link, setLink] = useState<string | undefined>();
    const [dataAvailable, setDataAvailable] = useState<any[] | undefined>();
    const [dataExpired, setDataExpired] = useState<any[] | undefined>();
    const [loading, setLoading] = useState<boolean | undefined>();
    useEffect(() => {
        if (!isNotGet) {
            setLoading(true);
            if (isConnected) {
                if (walletAddress) {
                    setCkReferral(undefined);
                    setDataReferralSuccess(undefined);
                    setLink(undefined);
                    getLinkUser();
                    checkUserIsValidForReferral();
                }
            } else {
                setCkReferral(false);
                setDataReferralSuccess(undefined);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNotGet, walletAddress, isConnected])

    const checkUserIsValidForReferral = async () => {
        const res = await DeoddService.checkUserIsValidForReferral(walletAddress?.toString());

        if (res.status === 200) {
            if (res.data.data) {
                if (res.data.data.isReferredByOthers) {
                    setDataReferralSuccess(res.data.data.father);
                } else {

                    setDataReferralSuccess(undefined);
                }
            }
        } else {
            setDataReferralSuccess(undefined);
        }
    }

    const getLinkUser = async () => {
        const ck = await DeoddService.checkUserReferral(walletAddress)
        const ckLinkExist = await DeoddService.findGenerateReferralLinkByWallet(walletAddress);
        // debugger
        let linkGenerate;
        if (ckLinkExist.status === 200) {
            if (ckLinkExist.data && ckLinkExist.data.data) {
                linkGenerate = ckLinkExist;
            } else {
                linkGenerate = await DeoddService.generateReferralLink(walletAddress);
            }
        }
        if (ck.data && ck.data.data > 0) {
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
        // debugger
        if (available && available.status === 200 && available.data && available.data.data) {
            setDataAvailable(available.data.data);
        }
        if (rewardExpired && rewardExpired.status === 200 && rewardExpired.data && rewardExpired.data.data) {
            setDataExpired(rewardExpired.data.data);
        }
    }

    const reload = () => {
        setIsReload(!isReload);
    }

    return { ckReferral, link, dataAvailable, dataExpired, getLinkUser, reload, dataReferralSuccess }
}

export default useReferral