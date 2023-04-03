import { Utils } from '@/utils/index'
import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import MadalClaimSuccess from 'components/common/MadalError'
import MyModal from 'components/common/Modal'
import { ButtonMain } from 'components/ui/button'
import { MINXIMUM_BALANCE_DEPOSIT } from 'constants/index'
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

type Props = {
    spendingTokens: TypeDataNFT,
    handleClickNFT: Function,
    nftSelected: TypeNFT | undefined,
    handleClaimNFT: Function,
    priceToken: number | undefined

}

function LeftContent({ spendingTokens, handleClaimNFT, handleClickNFT, nftSelected, priceToken }: Props) {
    const [openNftType, setOpenNftType] = useState<EnumNFT | undefined>()
    const [openModal, setOpenModal] = useState(false)
    const { bnbAssets } = useWalletContext();
    const { tossPoint } = useJackpotContract();
    const { handleClaimBnb } = useDeoddContract();
    const handleClick = (nftType: EnumNFT) => {
        if (nftType === openNftType) {
            setOpenNftType(undefined);
        } else {
            setOpenNftType(nftType);
        }
    };

    let price = useMemo(() => parseFloat(ethers.utils.formatEther(bnbAssets)) * (priceToken ?? 0), [priceToken, bnbAssets]);
    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <Stack direction={'row'} alignItems={"flex-end"} justifyContent={'space-between'}>
                <Typography variant='h2' textTransform={'uppercase'}>
                    Assets
                </Typography>
                <ButtonBase onClick={() => setOpenModal(true)}>
                    <Typography variant='body2' color={"secondary.100"}>
                        History
                    </Typography>

                </ButtonBase>
            </Stack>
            <Stack mt={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    TOSSPOINT
                </Typography>
                <Typography variant='h2' color={"secondary.100"}>
                    {
                        tossPoint ?
                            Format.formatMoneyFromBigNumber(tossPoint)
                            : 0
                    }
                </Typography>
            </Stack>
            <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    TOKEN
                </Typography>
                <Box textAlign={"end"}>
                    <Typography variant='h2' color={"secondary"}>
                        {
                            Format.formatMoneyFromBigNumberEther(bnbAssets)
                        }
                        <Box display={"inline"} ml={0.5}>
                            <BnbIcon />
                        </Box>
                    </Typography>
                    <Stack direction={'row'} justifyContent={"flex-end"} alignItems={"center"}>
                        <Typography mt={1} variant='body2' color={"secondary.100"}>
                            {
                                Format.formatMoney(price.toString())
                            }
                        </Typography>
                        <Box mt={1} ml={0.5}>
                            <BnbUsdIcon />
                        </Box>
                    </Stack>
                    <Box sx={{ display: "block" }}>
                        <ButtonMain active={true} title="CLAIM" disable={bnbAssets.lte(BigNumber.from(0))} onClick={() => { handleClaimBnb() }} customStyle={{
                            width: 75, padding: "4px 16px", mt: 1
                        }} />
                    </Box>
                    {
                        BigNumber.from(MINXIMUM_BALANCE_DEPOSIT).gt(bnbAssets) &&
                        <Typography mt={1} variant='caption' color={"error.100"}>You don't have BNB token in Balance, Flip now to get double</Typography>
                    }
                </Box>

            </Stack>
            <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='body2'>
                        NFT DEODD CARD
                    </Typography>
                    <Typography variant='h2' color={"secondary.100"}>
                        {
                            spendingTokens?.total
                        }
                    </Typography>
                </Stack>
                <ListCus sx={{ border: "none" }}>
                    {
                        spendingTokens?.data.map((nft) =>
                            nft.list.length > 0 ?
                                <>
                                    <ListItemButton sx={{ padding: "8px 0px" }} onClick={() => handleClick(nft.type)}>
                                        {openNftType === nft.type ? <ArrowUpIcon /> : <ArrowDownIcon />}
                                        <Stack ml={1} direction={"row"} alignItems={"center"}>
                                            <img width={30} src={Utils.getImageNFT(nft.type)} alt="" />
                                            <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>bronze nft card</Typography>
                                        </Stack>
                                        <Typography ml="auto" variant='h2' color={"secondary"}>
                                            {
                                                nft.list.length
                                            }
                                        </Typography>
                                    </ListItemButton>
                                    <Collapse in={openNftType === nft.type} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                nft.list.map((detailNFT) =>
                                                    <ListItemButton sx={{ pl: 3, pr: 0, pt: 1 }} selected={detailNFT.id === nftSelected?.id} onClick={() => handleClickNFT(detailNFT)}>
                                                        <Stack ml={1} direction={"row"} alignItems={"center"}><img width={30} src={Utils.getImageNFT(detailNFT.type)} alt="" />
                                                            <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>{detailNFT.id}</Typography> </Stack>
                                                        <Typography ml="auto" variant='h2' color={"secondary"}>
                                                            {detailNFT.amount}
                                                        </Typography>
                                                    </ListItemButton>
                                                )
                                            }
                                        </List>
                                    </Collapse>
                                </>
                                : <div />
                        )
                    }
                </ListCus>
                <Box textAlign={"end"} >
                    <Box display={"block"}>
                        <ButtonMain active={true} title="CLAIM" disable={!nftSelected} onClick={() => { handleClaimNFT() }} customStyle={{
                            width: 75, padding: "4px 16px", mt: 1
                        }} />
                    </Box>
                    {
                        !nftSelected &&
                        <Typography mt={1} variant='caption' color={"error.100"}>Please choose your asset to claim</Typography>
                    }
                </Box>
            </Stack>
            <MyModal open={openModal} title='Balance History' setOpen={setOpenModal} >
                <ItemHistory isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
                <ItemHistory isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
            </MyModal>
            <MadalClaimSuccess />
        </Box>
    )
}

const ListCus = styled(List)({
    root: {
        border: "none",
        padding: 0,
        '.MuiButtonBase-root': {
            padding: 0
        }
    }
})
export default React.memo(LeftContent)