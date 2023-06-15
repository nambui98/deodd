import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useWalletContext } from "../contexts/WalletContext";

import { useSiteContext } from "contexts/SiteContext";
import { getPriceToken } from "libs/apis/coinmarketcap";
import { EnumNFT, TypeDataNFT } from "libs/types";
import { DeoddService } from "libs/apis";
export type TypeNFT = {
    id: number | string,
    type: EnumNFT,
    image: string,
    amount: number,
}

export const useDeoddNFTContract = () => {
    const { walletAddress, contractDeoddNFT } = useWalletContext();
    const [walletTokens, setWalletTokens] = useState<TypeDataNFT>();
    const [nftSelected, setNftSelected] = useState<TypeNFT | undefined>();
    const [reload, setReload] = useState<boolean>(false);
    const { setIsLoading, setIsError, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const [priceToken, setPriceToken] = useState<number | undefined>();

    const getSpendingTokens = async () => {
        // const res = await contractDeoddNft?.getSpendingTokens(walletAddress)
        // const data = getInfoTokens(res);
        // return data;
    };
    const getTokenTypeId = async (id: BigNumber) => {
        const res = await contractDeoddNFT?.getTokenTypeId(id)
        debugger
        return res;
    };
    const getWalletTokens = async () => {
        const res = await contractDeoddNFT?.getWalletTokens(walletAddress)
        debugger
        const data = getInfoTokens(res);
        return data;
    };
    const getInfoTokens = async (tokens: BigNumber[]) => {
        let res = await Promise.all(
            (tokens ?? []).map(async (token: BigNumber) => {
                console.log(Number(token));

                debugger
                const { data } = await DeoddService.getNFTDetailById(Number(token));
                const detailNFT = data.data;
                debugger
                // token = BigNumber.from(token);
                const nft: TypeNFT = {
                    id: Number(token),
                    type: detailNFT.type,
                    image: detailNFT.image_link,
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
        if (walletAddress) {
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

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, walletAddress])

    const handleClickNFT = (nft: TypeNFT) => {
        setNftSelected(nft)
    }
    const claimToWallet = async () => {
        // const res = await contractDeoddNft?.claimToWallet(BigNumber.from(nftSelected?.id));
        // return res.wait();
    }
    const handleClaimNFT = async () => {
        // try {
        //     setIsLoading(true);
        //     let res = await claimToWallet();
        //     setIsLoading(false);
        //     if (res.status) {
        //         setTitleSuccess('Claimed successfully')
        //         setIsSuccess(true);
        //         setReload(!reload);
        //     }
        // } catch (error: any) {
        //     setIsLoading(false);
        //     setTitleError(error.reason || 'Something went wrong. Please try again!')
        //     setIsError(true);
        // }
    }
    return { walletTokens, handleClickNFT, nftSelected, handleClaimNFT, priceToken }
}
