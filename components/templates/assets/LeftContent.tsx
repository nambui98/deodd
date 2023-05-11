import { Utils } from '@/utils/index'
import EastIcon from '@mui/icons-material/East'
import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import MadalClaimSuccess from 'components/common/MadalError'
import MyModal from 'components/common/Modal'
import { ButtonMain } from 'components/ui/button'
import { Colors, MINXIMUM_BALANCE_DEPOSIT } from 'constants/index'
import { useWalletContext } from 'contexts/WalletContext'
import { BigNumber, ethers } from 'ethers'
import { useDeoddContract } from 'hooks/useDeoddContract'
import { TypeDataNFT, TypeNFT } from 'hooks/useDeoddNFTContract'
import { useJackpotContract } from 'hooks/useJackpotContract'
import { EnumNFT } from 'libs/types'
import React, { useMemo, useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from 'utils/Icons'
import { Format } from 'utils/format'
import { ItemHistory, StatusTransfer } from './ItemHistory'
import { DeoddService } from 'libs/apis'
import { useQuery } from '@tanstack/react-query'
import MyImage from 'components/ui/image'

type Props = {
    // spendingTokens: TypeDataNFT,
    handleClickNFT: Function,
    nftSelected: TypeNFT | undefined,
    handleClaimNFT: Function,
    priceToken: number | undefined

}

function LeftContent({ handleClaimNFT, handleClickNFT, nftSelected, priceToken }: Props) {
    const [openNftType, setOpenNftType] = useState<EnumNFT | undefined>()
    const [openModal, setOpenModal] = useState(false)
    const { tossPoint } = useJackpotContract();
    const { handleClaimBnb } = useDeoddContract();
    const { walletAddress } = useWalletContext();
    const { data: assets } = useQuery({
        queryKey: ["getAssetsBalance"],
        enabled: !!walletAddress,
        queryFn: () => DeoddService.getAssetsBalance(walletAddress),
        // select: (data) => data.data ? data.data.data : null
        select: (data) => data.data ? data.data.data
            : {
                tossPoint: 0,
                bnbToken: 0,
                nftItemHoldingDTOForUser: {
                    nftItems: [],
                    totalDiamondNFT: 0,
                    totalGoldNFT: 0,
                    totalBronzeNFT: 0
                }
            }
    });
    const { data: histories, refetch } = useQuery({
        queryKey: ["getBalanceHistories"],
        enabled: false,
        queryFn: () => DeoddService.getBalanceHistories(walletAddress),
        // select: (data) => data.data ? data.data.data : null
    });

    console.log(histories);

    const handleClick = (nftType: EnumNFT) => {
        if (nftType === openNftType) {
            setOpenNftType(undefined);
        } else {
            setOpenNftType(nftType);
        }
    };
    const showNFT = (nftType: EnumNFT, amount: number) => {
        return <>
            <ListItemButton sx={{ padding: "8px 0px" }} onClick={() => handleClick(nftType)}>
                {openNftType === nftType ? <ArrowUpIcon fill="#96A5C0" width={24} height={24} /> : <ArrowDownIcon fill="#96A5C0" width={24} height={24} />}
                <Stack ml={1} direction={"row"} alignItems={"center"}>
                    <MyImage width={30} height={30} src={Utils.getImageNFTString(nftType)} alt="" />
                    <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>bronze nft card</Typography>
                </Stack>
                <Typography ml="auto" variant='h2' color={"secondary"}>
                    {
                        amount
                    }
                </Typography>
            </ListItemButton>
            <Collapse in={openNftType === nftType} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        assets?.nftItemHoldingDTOForUser.nftItems.filter(((nft: any) => nft.type === nftType)).map((nft: any, index: number) =>
                            <ListItemButton key={nft.id + index} sx={{
                                pl: 4, pr: 0
                            }} selected={nft.id === nftSelected?.id} onClick={() => handleClickNFT(nft)}>
                                <Stack direction={"row"} alignItems={"center"}><MyImage width={30} height={30} src={Utils.getImageNFTString(nftType)} alt="" />
                                    <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>{nft.id}</Typography> </Stack>
                            </ListItemButton>
                        )
                    }
                </List>
            </Collapse>
        </>
    }
    const showBalanceHistories = () => {
        setOpenModal(true); refetch()

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
                        <ButtonMain active={true} title="Claim" disabled={bnbAssets <= 0} onClick={() => { handleClaimBnb() }} sx={{
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
                        showNFT(EnumNFT.DIAMOND, assets?.nftItemHoldingDTOForUser?.totalDiamondNFT)
                    }
                    {
                        assets && assets.nftItemHoldingDTOForUser && assets?.nftItemHoldingDTOForUser?.totalGoldNFT > 0 &&
                        showNFT(EnumNFT.GOLD, assets?.nftItemHoldingDTOForUser?.totalGoldNFT)
                    }
                    {
                        assets && assets.nftItemHoldingDTOForUser && assets?.nftItemHoldingDTOForUser?.totalBronzeNFT > 0 &&
                        showNFT(EnumNFT.BRONZE, assets?.nftItemHoldingDTOForUser?.totalBronzeNFT)
                    }
                </ListCus>
                <Box textAlign={"end"} >
                    <Box display={"block"} mt={2}>
                        <ButtonMain active={true} title="Claim" disabled={!nftSelected} onClick={() => { handleClaimNFT() }} sx={{
                            width: 75, padding: "4px 16px", fontSize: 12
                        }} />
                    </Box>
                    {
                        !nftSelected &&
                        <Typography mt={1} variant='caption' color={"error.100"}>Please choose your asset to claim</Typography>
                    }
                </Box>
            </Stack>
            <MyModal open={openModal} width={380} setOpen={setOpenModal} >
                <Typography color='dark.60' mb={2} typography={'body1'} fontWeight={600}>Balance History</Typography>
                <ItemHistory isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
                <ItemHistory isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
            </MyModal>
            <MadalClaimSuccess />
        </Box>
    )
}

const ListCus = styled(List)(({
    border: "none",
    padding: 0,
}))
export default React.memo(LeftContent)