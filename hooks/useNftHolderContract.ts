import { BigNumber } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";

import { fetchBalance } from '@wagmi/core';
export const useNftHolderContract = () => {
    const { contractNftHolder, walletAddress } = useWalletContext();
    const [sId, setSID] = useState<BigNumber | undefined>()
    const [tossPoint, setTossPoint] = useState<BigNumber | undefined>()


    const getBalance: any = async () => {
        let token;
        try {
            debugger
            token = await fetchBalance({
                token: '0xAB5cb60Ef2Dc8487Cc8716e4067FB99aa0f54BD7',
                address: walletAddress,
            });
            debugger
        } catch (err) {

            debugger
            console.log(err);
        }
        debugger
        return token;
    };

    useEffect(() => {
        getBalance();
    }, [])

    return { getBalance }
}
