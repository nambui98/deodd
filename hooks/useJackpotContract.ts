import { BigNumber } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";

export const useJackpotContract = () => {
    const { contractJackpot, walletAddress } = useWalletContext();
    const [sId, setSID] = useState<BigNumber | undefined>()
    const [tossPoint, setTossPoint] = useState<BigNumber | undefined>()


    const getCurrentSeason = async () => {
        const res = await contractJackpot?.getCurrentSeason()
        return res;
    }

    const getMyTossPointOf = async () => {
        const res = await contractJackpot?.tossPointOf(walletAddress, sId)
        return res;
    }

    useEffect(() => {
        getCurrentSeason().then(res => {
            setSID(res);
        });
    }, [])

    useEffect(() => {
        if (sId) {
            getMyTossPointOf().then(res => {
                setTossPoint(res);
            });
        }
    }, [sId])
    return { getCurrentSeason, getMyTossPointOf, tossPoint }
}
