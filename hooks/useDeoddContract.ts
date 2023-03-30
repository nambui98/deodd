import { BigNumber, Contract, ethers } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";
import { deoddContract } from "../libs/contract";

export const useDeoddContract = () => {
    const { contractDeodd } = useWalletContext();

    const handleClaimBnb = async () => {
        const res = await contractDeodd?.claimBNB()
        return res.wait()
    }

    const handleFlipToken = async (index: number, coinSide: number, bnbSend: BigNumber) => {
        const res = await contractDeodd?.flipTheCoin(
            coinSide,
            BigNumber.from(index.toString()),
            { value: bnbSend }
        )
        return res.wait()
    }
    return { handleClaimBnb, handleFlipToken }
}
