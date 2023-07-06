import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useWalletContext } from "../contexts/WalletContext";

import { useSiteContext } from "contexts/SiteContext";
import { getPriceToken } from "libs/apis/coinmarketcap";
import { EnumNFT, TypeDataNFT } from "libs/types";
import { DeoddService } from "libs/apis";
import { deoddNFTContract } from "libs/contract";
import { useContractRead } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { DefaultSeason, SharePerNFT, DefaultRewardPool, DefaultStaked } from "constants/index";
export type TypeNFT = {
    id: number | string,
    type: EnumNFT,
    image: string,
    amount: number,
}

export const useDeoddNFTContract = () => {
    const { walletAddress, contractDeoddNFT } = useWalletContext();
    const [walletTokens, setWalletTokens] = useState<TypeDataNFT>();
    const [nftSelected, setNftSelected] = useState<TypeNFT | undefined | null>();
    const [reload, setReload] = useState<boolean>(false);
    const { setIsLoading, setIsError, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const [priceToken, setPriceToken] = useState<number | undefined>();


    const { data: assets, refetch: refetchGetAssetsBalance } = useQuery({
        queryKey: ["getAssetsBalance2"],
        enabled: !!walletAddress,
        queryFn: () => DeoddService.getAssetsBalance(walletAddress),
        select: (data) => {
            if (data.data) {
                const nftItemHoldingDTOForUser = data.data.data.nftItemHoldingDTOForUser;
                return {
                    total: nftItemHoldingDTOForUser.totalBronzeNFT + nftItemHoldingDTOForUser.totalDiamondNFT + nftItemHoldingDTOForUser.totalGoldNFT,
                    data: [
                        {
                            type: EnumNFT.BRONZE,
                            percentSharePerNFT: SharePerNFT[EnumNFT.BRONZE],
                            estProfit: DefaultRewardPool * SharePerNFT[EnumNFT.BRONZE] * nftItemHoldingDTOForUser.totalBronzeNFT * DefaultStaked / DefaultSeason,
                            list: nftItemHoldingDTOForUser.nftBronze.map((d: any) => {
                                return {
                                    id: d.token_id ?? '',
                                    type: EnumNFT.BRONZE,
                                    image: d.image_link,
                                    amount: 0
                                }
                            })
                        },
                        {
                            type: EnumNFT.GOLD,

                            percentSharePerNFT: SharePerNFT[EnumNFT.GOLD],
                            estProfit: DefaultRewardPool * SharePerNFT[EnumNFT.GOLD] * nftItemHoldingDTOForUser.totalGoldNFT * DefaultStaked / DefaultSeason,
                            list: nftItemHoldingDTOForUser.nftGold.map((d: any) => {
                                return {
                                    id: d.token_id ?? '',
                                    type: EnumNFT.GOLD,
                                    image: d.image_link,
                                    amount: 0
                                }
                            })
                        },

                        {
                            type: EnumNFT.DIAMOND,

                            percentSharePerNFT: SharePerNFT[EnumNFT.DIAMOND],
                            estProfit: DefaultRewardPool * SharePerNFT[EnumNFT.DIAMOND] * nftItemHoldingDTOForUser.totalDiamondNFT * DefaultStaked / DefaultSeason,
                            list: nftItemHoldingDTOForUser.nftDiamond.map((d: any) => {
                                return {
                                    id: d.token_id ?? '',
                                    type: EnumNFT.DIAMOND,
                                    image: d.image_link,
                                    amount: 0
                                }
                            })
                        },


                    ]
                }
            }

            return null
        }
    });
    const { refetch: getBalanceNft, } = useContractRead({
        address: deoddNFTContract.address,
        abi: deoddNFTContract.abi,
        functionName: 'getWalletTokens',
        args: [walletAddress],
        enabled: false,
        async onSuccess(res: BigNumber[]) {
            const data = await getInfoTokens(res);
            setWalletTokens(data as unknown as (TypeDataNFT & {
                estProfit: number,
                percentSharePerNFT: number
            }));
        },
        onError: () => {
        }
    })
    const getInfoTokens = async (tokens: BigNumber[]) => {
        let res = await Promise.all(
            (tokens ?? []).map(async (token: BigNumber) => {
                const { data } = await DeoddService.getNFTDetailById(Number(token));
                const detailNFT = data.data;
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
        debugger
        let dataBronze: {
            type: EnumNFT,
            estProfit: number,
            percentSharePerNFT: number,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.BRONZE,
            percentSharePerNFT: SharePerNFT[EnumNFT.BRONZE],
            estProfit: (DefaultRewardPool * SharePerNFT[EnumNFT.BRONZE] * 1 * DefaultStaked / DefaultSeason) / 100,

            list: []
        };
        let dataGold: {
            type: EnumNFT,
            estProfit: number,
            percentSharePerNFT: number,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.GOLD,
            percentSharePerNFT: SharePerNFT[EnumNFT.GOLD],
            estProfit: (DefaultRewardPool * SharePerNFT[EnumNFT.GOLD] * 1 * DefaultStaked / DefaultSeason) / 100,

            list: []
        };
        let dataDiamond: {
            type: EnumNFT,
            estProfit: number,
            percentSharePerNFT: number,
            list: TypeNFT[]
        } | undefined = {
            type: EnumNFT.DIAMOND,
            percentSharePerNFT: SharePerNFT[EnumNFT.DIAMOND],
            estProfit: (DefaultRewardPool * SharePerNFT[EnumNFT.DIAMOND] * 1 * DefaultStaked / DefaultSeason) / 100,
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
                { ...dataBronze, estProfit: dataBronze.estProfit * dataBronze.list.length },
                { ...dataGold, estProfit: dataGold.estProfit * dataGold.list.length },
                { ...dataDiamond, estProfit: dataDiamond.estProfit * dataDiamond.list.length }
            ]
        }
    }

    useEffect(() => {
        if (walletAddress) {
            getBalanceNft();
            refetchGetAssetsBalance();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress])
    const handleClickNFT = (nft: TypeNFT | null) => {
        setNftSelected(nft)
    }


    return {
        walletTokens,
        handleClickNFT,
        nftSelected,
        priceToken,
        assets,
        getBalanceNft,
        refetchGetAssetsBalance,
    }
}
