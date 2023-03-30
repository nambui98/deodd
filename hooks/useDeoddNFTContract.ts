import { BigNumber } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";

import { fetchBalance } from '@wagmi/core';
type TypeNFT = {
    id: number,
    type: number,
    amount: number,
}

export const useDeoddNFTContract = () => {
    const { contractDeoddNft, walletAddress } = useWalletContext();
    const [spendingTokens, setSpendingTokens] = useState<TypeNFT[]>()
    const [walletTokens, setWalletTokens] = useState<TypeNFT[]>()


    const getSpendingTokens = async () => {
        const res = await contractDeoddNft?.getSpendingTokens(walletAddress)
        return getInfoTokens(res);
    };
    const getTokenTypeId = async (id: BigNumber) => {
        const res = await contractDeoddNft?.getTokenTypeId(id)

        return res;
    };
    const getWalletTokens = async () => {
        const res = await contractDeoddNft?.getWalletTokens(walletAddress)
        return res;
    };
    const getInfoTokens = async (tokens: BigNumber[]) => {
        let res = await Promise.all(
            (tokens ?? []).map(async (token) => {
                const type: BigNumber = await getTokenTypeId(token);
                token = BigNumber.from(token);

                const nft: TypeNFT = {
                    id: token.toNumber(),
                    type: type.toNumber(),
                    amount: 1
                }

                debugger
                return nft;
            })
        )
            .then((res) => {
                debugger
                return res;
            })
            .catch((err) => {
                console.log(err);
                return;
            });
        debugger
        return res;
    }


    useEffect(() => {
        getSpendingTokens().then((res) => {

            // setSpendingTokens(res)
        });
        getWalletTokens().then(res => setWalletTokens(res));
    }, [])

    return {}
}
