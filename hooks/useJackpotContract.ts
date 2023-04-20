import { BigNumber } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";

export const useJackpotContract = () => {
    const { contractJackpot, walletAddress, walletIsConnected } = useWalletContext();
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
        if (walletIsConnected) {
            getCurrentSeason().then(res => {
                setSID(res);
            });

        }
    }, [walletIsConnected])

    useEffect(() => {
        if (sId && walletAddress) {
            getMyTossPointOf().then(res => {
                setTossPoint(res);
            });
        } else {
            setTossPoint(BigNumber.from(0))
        }

    }, [sId, walletAddress])
    return { getCurrentSeason, getMyTossPointOf, tossPoint }
}
