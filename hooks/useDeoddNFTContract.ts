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
        select: (data) => data.data ?
            {
                total: 0,
                data: [
                    {
                        type: EnumNFT.BRONZE,
                        list: data.data.data.nftItemHoldingDTOForUser.nftBronze.map((d: any) => {
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
                        list: data.data.data.nftItemHoldingDTOForUser.nftGold.map((d: any) => {
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
                        list: data.data.data.nftItemHoldingDTOForUser.nftDiamond.map((d: any) => {
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
            : null
    });
    const { refetch: getBalanceNft } = useContractRead({
        address: deoddNFTContract.address,
        abi: deoddNFTContract.abi,
        functionName: 'getWalletTokens',
        args: [walletAddress],
        enabled: false,
        async onSuccess(res: BigNumber[]) {
            const data = await getInfoTokens(res);
            setWalletTokens(data as TypeDataNFT);
        },
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

        refetchGetAssetsBalance
    }
}
