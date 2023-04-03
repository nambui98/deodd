import { Utils } from '@/utils/index'
import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import MyModal from 'components/common/Modal'
import { useWalletContext } from 'contexts/WalletContext'
import { ethers } from 'ethers'
import { TypeDataNFT } from 'hooks/useDeoddNFTContract'
import { EnumNFT } from 'libs/types'
import React, { useMemo, useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from 'utils/Icons'
import { Format } from 'utils/format'
import { ItemHistory, StatusTransfer } from './ItemHistory'

type Props = { walletTokens: TypeDataNFT, priceToken: number | undefined }

function RightContent({ walletTokens, priceToken }: Props) {
    const { bnbBalance } = useWalletContext();
    const [openModalWallet, setOpenModalWallet] = useState(false)
    const [openNftType, setOpenNftType] = useState<EnumNFT | undefined>()

    const handleClick = (nftType: EnumNFT) => {
        if (nftType === openNftType) {
            setOpenNftType(undefined);
        } else {
            setOpenNftType(nftType);
        }
    };
    let price = useMemo(() => parseFloat(ethers.utils.formatEther(bnbBalance)) * (priceToken ?? 0), [priceToken, bnbBalance]);


    return (
        <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
            <Stack direction={'row'} alignItems={"flex-end"} justifyContent={'space-between'}>
                <Typography component={'span'} variant='h2' textTransform={'uppercase'}>
                    Wallet
                    <Typography component={"span"} variant='caption'>(3535***3534)</Typography>
                </Typography>
                <ButtonBase onClick={() => setOpenModalWallet(true)}>
                    <Typography variant='body2' color={"secondary.100"}>
                        History
                    </Typography>

                </ButtonBase>
            </Stack>

            <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    TOKEN
                </Typography>
                <Box textAlign={"end"}>
                    <Typography variant='h2' color={"secondary"}>
                        {
                            Format.formatMoneyFromBigNumberEther(bnbBalance)
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
                </Box>
            </Stack>
            <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='body2'>
                        NFT DEODD CARD
                    </Typography>
                    <Typography variant='h2' color={"secondary.100"}>
                        {
                            walletTokens?.total
                        }
                    </Typography>
                </Stack>
                <ListCus sx={{ border: "none" }}>
                    {
                        walletTokens?.data.map((nft) => nft.list.length > 0
                            ?
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
                                            nft.list.map((detailNFT) => {

                                                return <ListItemButton sx={{ pl: 3, pr: 0, pt: 1 }} >
                                                    <Stack ml={1} direction={"row"} alignItems={"center"}><img width={30} src={Utils.getImageNFT(detailNFT.type)} alt="" />
                                                        <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>{detailNFT.id}</Typography> </Stack>
                                                    <Typography ml="auto" variant='h2' color={"secondary"}>
                                                        {detailNFT.amount}
                                                    </Typography>
                                                </ListItemButton>

                                            }
                                            )
                                        }
                                    </List>
                                </Collapse>
                            </>
                            : <div></div>
                        )
                    }
                </ListCus>
            </Stack>
            <MyModal open={openModalWallet} title='Wallet History' setOpen={setOpenModalWallet} >
                <ItemHistory isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
                <ItemHistory isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
            </MyModal>
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
export default React.memo(RightContent)