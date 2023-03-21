import { Contract, ethers } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";
import { deoddContract } from "../libs/contract";

export const useDeoddNFTContract = () => {
    const { ethersSigner, walletAccount, setRefresh, refresh } = useWalletContext();

    const [contract, setContract] = useState<Contract>()
    useEffect(() => {
        if (ethersSigner) {
            let contractInit = new ethers.Contract(deoddContract.address, deoddContract.abi, ethersSigner)
            setContract(contractInit)
        }
    }, [ethersSigner])

    const claimToWallet = async () => {
        const res = await contract?.claimToWallet(walletAccount)
        return res.wait();
    }

    return { claimToWallet }
}
