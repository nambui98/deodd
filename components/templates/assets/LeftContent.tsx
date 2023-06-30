import { Utils } from '@/utils/index'
import EastIcon from '@mui/icons-material/East'
import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import MyModal from 'components/common/Modal'
import ModalClaimSuccess from 'components/common/ModalError'
import { ButtonMain } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors, MINXIMUM_BALANCE_DEPOSIT } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import { EnumNFT, EnumNFTTitle, HISTORY_TYPE, HISTORY_TYPE_VALUE, TypeNFT } from 'libs/types'
import React, { useMemo, useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from 'utils/Icons'
import { Convert } from 'utils/convert'
import { Format } from 'utils/format'
import { ItemHistory } from './ItemHistory'

type Props = {
    // spendingTokens: TypeDataNFT,
    handleClickNFT: Function,
    nftSelected: TypeNFT | undefined,
    priceToken: number | undefined
}

function LeftContent({ handleClickNFT, nftSelected, priceToken }: Props) {
    const [openNftType, setOpenNftType] = useState<EnumNFT | undefined>()
    const [openModal, setOpenModal] = useState(false)

    // const { handleClaimBnb } = useDeoddContract();
    const { walletAddress } = useWalletContext();
    const { setIsSuccess, setTitleSuccess, setIsError, setTitleError } = useSiteContext();
    const { data: assets, refetch: refetchGetAssetsBalance } = useQuery({
        queryKey: ["getAssetsBalance"],
        enabled: !!walletAddress,
        queryFn: () => DeoddService.getAssetsBalance(walletAddress),
        // select: (data) => data.data ? data.data.data : null
        select: (data) => data.data ? data.data.data
            : {
                tossPoint: 0,
                bnbToken: 0,
                nftItemHoldingDTOForUser: {
                    nftBronze: [],
                    nftGold: [],
                    nftDiamond: [],
                    totalDiamondNFT: 0,
                    totalGoldNFT: 0,
                    totalBronzeNFT: 0
                }
            }
    });
    const handleClaim = useMutation({
        mutationFn: DeoddService.claimTokenSpending,
        onSuccess: (data) => {
            if (data.data.data) {
                setTitleSuccess('Claim successfully')
                setIsSuccess(true);
                refetchGetAssetsBalance();
            } else {
                setIsError(true);
                setTitleError(data.data.meta.error_message)
            }
        },
        onError(err: any, variables, context) {
            setIsError(true);
            setTitleError(err.response?.data?.meta.error_message)
        },

    });
    //get balance histories
    // const {data:balanceHistories} = useQuery({
    //     queryKey: ["getBalanceHistories"],
    //     enabled: walletAddress,
    //     queryFn: () => DeoddService.getBalanceHistories(walletAddress),
    //     select: (data: any) => {
    //         if (data.status === 200) {
    //             return data.data;
    //         } else {
    //             return undefined
    //         }
    //     },
    // })
    const { data: histories, refetch: refetchBalanceHistories } = useQuery({
        queryKey: ["getBalanceHistories"],
        enabled: false,
        queryFn: () => DeoddService.getBalanceHistories(walletAddress),
        select: (data: any) => {
            if (data.status === 200) {
                return data.data;
            } else {
                return undefined
            }
        },
    });


    const handleClick = (nftType: EnumNFT) => {
        if (nftType === openNftType) {
            setOpenNftType(undefined);
        } else {
            setOpenNftType(nftType);
        }
    };
    const showNFT = (nftType: EnumNFT, amount: number, list: any) => {
        return <>
            <ListItemButton sx={{ padding: "8px 0px" }} onClick={() => handleClick(nftType)}>
                {openNftType === nftType ? <ArrowUpIcon fill="#96A5C0" width={24} height={24} /> : <ArrowDownIcon fill="#96A5C0" width={24} height={24} />}
                <Stack ml={1} direction={"row"} alignItems={"center"}>
                    <MyImage width={30} height={30} src={Utils.getImageNFTString(nftType)} alt="" />
                    <Typography color={"text.primary"} ml={1} variant='body2' >{EnumNFTTitle[nftType]}</Typography>
                </Stack>
                <Typography ml="auto" variant='h2' color={"secondary"}>
                    {
                        amount
                    }
                </Typography>
            </ListItemButton>
            <Collapse in={openNftType === nftType} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ maxHeight: 200, overflowY: 'auto' }}>
                    {
                        list.map((nft: any, index: number) =>
                            <ListItemButton key={nft.id + index} sx={{
                                pl: 4, pr: 0
                            }} selected={nft.id === nftSelected?.id} onClick={() => handleClickNFT(nft)}>
                                <Stack direction={"row"} alignItems={"center"}><img width={30} height={30} src={nft.image_link} alt="" />
                                    <Typography color={"text.primary"} ml={1} variant='body2' >DeODD #{nft.token_id}</Typography> </Stack>
                            </ListItemButton>
                        )
                    }
                </List>
            </Collapse>
        </>
    }
    const showBalanceHistories = () => {
        setOpenModal(true);
        refetchBalanceHistories();
    }
    const getTimeHistory = (time?: string) => {
        if (!time) {
            return '';
        } else {

            return Convert.convertTimeStamp((new Date(time)).getTime() / 1000);
        }
    }
    let bnbAssets = assets?.bnbToken ?? 0;

    let price = useMemo(() => bnbAssets * (priceToken ?? 0), [priceToken, bnbAssets]);
    let totalNFT = (assets?.nftItemHoldingDTOForUser.totalBronzeNFT ?? 0) + (assets?.nftItemHoldingDTOForUser.totalDiamondNFT ?? 0) + (assets?.nftItemHoldingDTOForUser.totalGoldNFT ?? 0);
    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <Stack direction={'row'} alignItems={"flex-end"} justifyContent={'space-between'}>
                <Typography variant='h2' visibility={{ xs: 'hidden', md: 'visible' }}>
                    Balance
                </Typography>
                <ButtonBase onClick={() => {
                    showBalanceHistories()
                }}>
                    <Typography variant='body2' fontWeight={400} color={"secondary.main"}>
                        View History
                    </Typography>
                    <EastIcon sx={{ fontSize: 15, ml: .5, color: 'secondary.main' }} />

                </ButtonBase>
            </Stack>
            <Stack mt={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    Tosspoint
                </Typography>
                <Typography variant='h2' fontWeight={700} color={"secondary.100"}>
                    {
                        assets ?
                            Format.formatMoney(assets.tossPoint)
                            : 0
                    }
                </Typography>
            </Stack>
            <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    Token
                </Typography>
                <Box textAlign={"end"}>
                    <Typography variant='h2' fontWeight={700} color={"secondary"}>
                        {
                            Format.formatMoney(bnbAssets)
                        }
                        <Box display={"inline"} ml={0.5}>
                            <BnbIcon width={20} height={20} fill={Colors.secondaryDark} />
                        </Box>
                    </Typography>
                    <Stack direction={'row'} justifyContent={"flex-end"} alignItems={"center"}>
                        <Typography mt={1} variant='body2' color={"secondary.100"}>
                            {
                                Format.formatMoney(price.toString())
                            }
                        </Typography>
                        <Box mt={1.2} ml={0.5}>
                            <BnbUsdIcon fill={Colors.secondary} />
                        </Box>
                    </Stack>
                    <Box sx={{ display: "block" }} mt={2}>
                        <ButtonMain active={true} title="Claim" disabled={bnbAssets <= 0} onClick={() => { handleClaim.mutate() }} sx={{
                            width: 75, padding: "4px 16px", fontSize: 12
                        }} />
                    </Box>
                    {
                        MINXIMUM_BALANCE_DEPOSIT > bnbAssets &&
                        <Typography mt={1} variant='caption' color={"error.100"}>You don&apos;t have BNB token in Balance, Flip now to get double</Typography>
                    }
                </Box>

            </Stack>
            <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='body2'>
                        NFT Deodd Card
                    </Typography>
                    <Typography variant='h2' fontWeight={700} color={"secondary.100"}>
                        {
                            totalNFT
                        }
                    </Typography>
                </Stack>
                <ListCus sx={{ border: "none" }}>
                    {
                        assets && assets.nftItemHoldingDTOForUser && assets?.nftItemHoldingDTOForUser?.totalDiamondNFT > 0 &&
                        showNFT(EnumNFT.DIAMOND, assets?.nftItemHoldingDTOForUser?.totalDiamondNFT, assets?.nftItemHoldingDTOForUser?.nftDiamond)
                    }
                    {
                        assets && assets.nftItemHoldingDTOForUser && assets?.nftItemHoldingDTOForUser?.totalGoldNFT > 0 &&
                        showNFT(EnumNFT.GOLD, assets?.nftItemHoldingDTOForUser?.totalGoldNFT, assets?.nftItemHoldingDTOForUser?.nftGold)
                    }
                    {
                        assets && assets.nftItemHoldingDTOForUser && assets?.nftItemHoldingDTOForUser?.totalBronzeNFT > 0 &&
                        showNFT(EnumNFT.BRONZE, assets?.nftItemHoldingDTOForUser?.totalBronzeNFT, assets?.nftItemHoldingDTOForUser?.nftBronze)
                    }
                </ListCus>
                {/* <Box textAlign={"end"} >
                    <Box display={"block"} mt={2}>
                        <ButtonMain active={true} title="Claim" disabled={!nftSelected} onClick={() => { handleClaimNFT() }} sx={{
                            width: 75, padding: "4px 16px", fontSize: 12
                        }} />
                    </Box>
                     {
                        !nftSelected &&
                        <Typography mt={1} variant='caption' color={"error.100"}>Please choose your asset to claim</Typography>
                    } 
                </Box> */}
            </Stack>
            <MyModal open={openModal} width={380} setOpen={setOpenModal} >
                <Typography color='dark.60' mb={2} typography={'body1'} fontWeight={600}>Balance History</Typography>
                {
                    histories && histories.data.length > 0
                        ? histories.data.map((history: any) => <ItemHistory
                            key={history.id}
                            isDeposit={history.changedBalance < 0}
                            title={HISTORY_TYPE[history.historyType as keyof typeof HISTORY_TYPE]}
                            date={getTimeHistory(history.createdAt)}
                            status={history.historyStatus}
                            value={(history.changedBalance > 0 ? '+' : '') + Format.formatMoney(history.changedBalance, 5) + ' ' + HISTORY_TYPE_VALUE[history.historyType as keyof typeof HISTORY_TYPE_VALUE]} />)
                        : <Typography textAlign={'center'} variant='body1' color='dark.60'>Empty</Typography>
                }
            </MyModal>
            <ModalClaimSuccess />
        </Box>
    )
}

const ListCus = styled(List)(({
    border: "none",
    padding: 0,
}))
export default React.memo(LeftContent)