import { BigNumber, Contract, ethers } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";
import { deoddContract } from "../libs/contract";

export const useDeoddNFTContract = () => {
    const { walletAddress, contractDeodd, isLoading, setIsLoading, bnbAssets } = useWalletContext();

    const handleClaimAll = async () => {
        const res = await contractDeodd?.claimBNB()
        return res.wait()
    }
    // const handleClaim = async () => {
    //     if (!isLoading && bnbAssets.gt(BigNumber.from(0))) {
    //         setIsLoading(true)
    //         try {
    //             // const res = await handleClaimAll(ethersSigner)
    //             let res = await contractDeodd?.claimBNB()
    //             res = res.wait()
    //             if (res.status) {
    //                 setIsLoading(false)
    //                 // setPopup({ status: true, body: bodyPopupSuccess })
    //                 // setRefresh(!refresh)
    //             }
    //         } catch (error: any) {
    //             setStatusLoading(false)
    //             setPopup({ status: true, body: bodyPopupError(error.reason || 'Something went wrong. Please try again!') })
    //         }
    //     }
    // }
    const handleFlipToken = async (index: number, coinSide: number, bnbSend: BigNumber) => {
        const res = await contractDeodd?.flipTheCoin(
            coinSide,
            BigNumber.from(index.toString()),
            { value: bnbSend }
        )
        return res.wait()
    }
    return { handleClaimAll, handleFlipToken }
}
