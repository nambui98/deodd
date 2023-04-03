import { BigNumber } from "ethers";
import { useWalletContext } from "../contexts/WalletContext";
import { useEffect, useState } from "react";

import { fetchBalance } from '@wagmi/core';
import { EnumNFT } from "libs/types";
import { getPriceToken } from "libs/apis/coinmarketcap";
import { useSiteContext } from "contexts/SiteContext";
export type TypeNFT = {
    id: number,
    type: number,
    amount: number,
}

export type TypeDataNFT = {
    total: number | undefined;
    data: {
        type: EnumNFT,
        list: TypeNFT[]
    }[];

} | undefined;

export const useDeoddNFTContract = () => {
    const { contractDeoddNft, walletAddress } = useWalletContext();
    const [spendingTokens, setSpendingTokens] = useState<TypeDataNFT>();
    const [walletTokens, setWalletTokens] = useState<TypeDataNFT>();
    const [nftSelected, setNftSelected] = useState<TypeNFT | undefined>();
    const [reload, setReload] = useState<boolean>(false);
    const { setIsLoading, setIsError, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const [priceToken, setPriceToken] = useState<number | undefined>();

    const getSpendingTokens = async () => {
        const res = await contractDeoddNft?.getSpendingTokens(walletAddress)
        const data = getInfoTokens(res);
        return data;
    };
    const getTokenTypeId = async (id: BigNumber) => {
        const res = await contractDeoddNft?.getTokenTypeId(id)
        return res;
    };
    const getWalletTokens = async () => {
        const res = await contractDeoddNft?.getWalletTokens(walletAddress)
        const data = getInfoTokens(res);
        return data;
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
                return nft;
            })
        )
            .then((res) => {
                const data = aggregateQuantity(res);
                return data;
            })
            .catch((err) => {
                console.log(err);
                return;
            });
        return res;
    }

    const aggregateQuantity = (arr: TypeNFT[]) => {
        let total: number = arr.length;
        let dataBronze: {
            type: EnumNFT,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.BRONZE,
            list: []
        };
        let dataGold: {
            type: EnumNFT,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.GOLD,
            list: []
        };
        let dataDiamond: {
            type: EnumNFT,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.DIAMOND,
            list: []
        };
        for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            if (item.type === EnumNFT.BRONZE) {
                dataBronze?.list.push(item);
            } else if (item.type === EnumNFT.GOLD) {
                dataGold?.list.push(item);
            } else {
                dataDiamond?.list.push(item);
            }

        }
        return {
            total: total,
            data: [
                { ...dataBronze },
                { ...dataGold },
                { ...dataDiamond }
            ]
        }
    }

    useEffect(() => {
        getSpendingTokens().then((res) => {
            if (res && res.data.length > 0) {
                setSpendingTokens(res);
            }
        });
        getWalletTokens().then(res => {
            if (res && res.data.length > 0) {
                setWalletTokens(res);
            }
        });
        getPriceToken().then(res => {
            if (res.status === 200) {
                setPriceToken(res.data.data[0].quote['BUSD'].price)
            }
        })
    }, [reload])

    const handleClickNFT = (nft: TypeNFT) => {
        setNftSelected(nft)
    }
    const claimToWallet = async () => {
        const res = await contractDeoddNft?.claimToWallet(BigNumber.from(nftSelected?.id));
        return res.wait();
    }
    const handleClaimNFT = async () => {
        try {
            setIsLoading(true);
            let res = await claimToWallet();

            setIsLoading(false);
            if (res.status) {
                setTitleSuccess('Claimed successfully')
                setIsSuccess(true);
                setReload(!reload);
            }
        } catch (error: any) {
            setIsLoading(false);
            setTitleError(error.reason || 'Something went wrong. Please try again!')
            setIsError(true);
        }
    }
    return { walletTokens, spendingTokens, handleClickNFT, nftSelected, handleClaimNFT, priceToken }
}
