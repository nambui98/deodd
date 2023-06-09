
import { Utils } from '@/utils/index'
import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import MyModal from 'components/common/Modal'
import { useWalletContext } from 'contexts/WalletContext'
import { ethers } from 'ethers'
import { EnumNFT, EnumNFTTitle, TypeDataNFT } from 'libs/types'
import React, { useMemo, useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from 'utils/Icons'
import { Format } from 'utils/format'

import EastIcon from '@mui/icons-material/East';
import { ItemHistory, StatusTransfer } from './ItemHistory'
import { Colors, mapTypeTitle } from 'constants/index'
import { Convert } from 'utils/convert'
import { MapIconNFTString } from 'utils/Images'

type Props = { walletAddress: string, walletTokens: TypeDataNFT, priceToken: number | undefined }

function RightContent({ walletTokens, priceToken, walletAddress }: Props) {
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

                <Typography component={'span'} variant='h2' visibility={{ xs: 'hidden', md: 'visible' }}>
                    Wallet
                    <Typography component={"span"} variant='caption'>{" "} ({Convert.convertWalletAddress(walletAddress, 4, 4)})</Typography>
                </Typography>
                <ButtonBase onClick={() => setOpenModalWallet(true)}>
                    <Typography variant='body2' fontWeight={400} color={"secondary.main"}>
                        View History
                    </Typography>
                    <EastIcon sx={{ fontSize: 15, ml: .5, color: 'secondary.main' }} />


                </ButtonBase>
            </Stack>

            <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Typography variant='body2'>
                    Token
                </Typography>
                <Box textAlign={"end"}>
                    <Typography variant='h2' fontWeight={700} color={"secondary"}>
                        {
                            Format.formatMoneyFromBigNumberEther(bnbBalance)
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
                </Box>
            </Stack>
            <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='body2'>
                        NFT Deodd Card
                    </Typography>
                    <Typography fontWeight={700} variant='h2' color={"secondary.100"}>
                        {
                            walletTokens?.total
                        }
                    </Typography>
                </Stack>
                <ListCus sx={{ border: "none" }}>
                    {
                        walletTokens?.data.map((nft, index) => nft.list.length > 0
                            ?
                            <div key={nft.type + index}>
                                <ListItemButton sx={{ padding: "8px 0px" }} onClick={() => handleClick(nft.type)}>
                                    {openNftType === nft.type ? <ArrowUpIcon width={24} height={24} fill="#96A5C0" /> : <ArrowDownIcon width={24} height={24} fill="#96A5C0" />}
                                    <Stack ml={1} direction={"row"} alignItems={"center"}>
                                        <img width={30} src={MapIconNFTString[nft.type]} alt="" />
                                        <Typography color={"text.primary"} ml={1} variant='body2' >{EnumNFTTitle[nft.type]}</Typography>
                                    </Stack>
                                    <Typography ml="auto" variant='h2' color={"secondary"}>
                                        {
                                            nft.list.length
                                        }
                                    </Typography>
                                </ListItemButton>
                                <Collapse in={openNftType === nft.type} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding sx={{ maxHeight: 200, overflowY: 'auto' }}>
                                        {
                                            nft.list.map((detailNFT, index) => {
                                                return <ListItemButton key={detailNFT.id?.toString() + index} sx={{ pl: 3, pr: 0, pt: 1 }} >
                                                    <Stack ml={1} direction={"row"} alignItems={"center"}><img width={30} src={detailNFT.image} alt="" />
                                                        <Typography color={"text.primary"} ml={1} variant='body2' >DeODD #{detailNFT.id}</Typography> </Stack>

                                                </ListItemButton>

                                            }
                                            )
                                        }
                                    </List>
                                </Collapse>
                            </div>
                            : <div key={index}></div>
                        )
                    }
                </ListCus>
            </Stack>
            <MyModal open={openModalWallet} setOpen={setOpenModalWallet} >
                <Typography color='dark.60' mb={2} typography={'body1'} fontWeight={600}>Wallet History</Typography>
                <Typography textAlign={'center'} variant='body1' color='dark.60'>Empty</Typography>
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