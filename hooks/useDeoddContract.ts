import { BigNumber, Contract, ethers } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useCallback, useEffect, useState } from "react";
import { deoddContract } from "../libs/contract";
import { useSiteContext } from "contexts/SiteContext";

export const useDeoddContract = () => {
    const { contractDeodd } = useWalletContext();
    const { setIsLoading, setIsError, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const claimBNB = async () => {
        const res = await contractDeodd?.claimBNB();
        return res.wait();
    }
    const handleClaimBnb =useCallback( async () => {
        try {
            setIsLoading(true);
            let res = await claimBNB();
            setIsLoading(false);
            if (res.status) {
                setTitleSuccess('Claimed successfully')
                setIsSuccess(true);
            }
        } catch (error: any) {
            setIsLoading(false);
            setTitleError(error.reason || 'Something went wrong. Please try again!')
            setIsError(true);
        }
    },[])

    const handleFlipToken = useCallback( async (index: number, coinSide: number, bnbSend: BigNumber) => {
        const res = await contractDeodd?.flipTheCoin(
            coinSide,
            BigNumber.from(index.toString()),
            { value: bnbSend }
        )
        return res.wait()
    },[])
    return { handleClaimBnb, handleFlipToken }
}

