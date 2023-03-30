import { Box, ButtonBase, Collapse, List, ListItemButton, Stack, Typography, styled } from '@mui/material'
import { ButtonMain } from 'components/ui/button'
import { useWalletContext } from 'contexts/WalletContext'
import { BigNumber } from 'ethers'
import { useDeoddNFTContract } from 'hooks/useDeoddNFTContract'
import { useJackpotContract } from 'hooks/useJackpotContract'
import { useNftHolderContract } from 'hooks/useNftHolderContract'
import { jackpotContract } from 'libs/contract'
import React, { useState } from 'react'
import { ArrowDownIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from 'utils/Icons'
import { BronzeImage } from 'utils/Images'
import { Format } from 'utils/format'
import { useContractRead } from 'wagmi'

type Props = {}

function LeftContent({ }: Props) {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { walletAddress, bnbAssets } = useWalletContext();
    const { tossPoint } = useJackpotContract();
    const { } = useDeoddNFTContract();
    const handleClick = () => {
        setOpen(!open);
    };

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
                            ~2,745
                        </Typography>
                        <Box mt={1} ml={0.5}>
                            <BnbUsdIcon />
                        </Box>
                    </Stack>
                    <Box sx={{ display: "block" }}>
                        <ButtonMain active={true} title="CLAIM" onClick={() => { }} customStyle={{
                            width: 75, padding: "4px 16px", mt: 1
                        }} />
                    </Box>
                    <Typography mt={1} variant='caption' color={"error.100"}>You don't have BNB token in Balance, Flip now to get double</Typography>
                </Box>

            </Stack>
            <Stack mt={2} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                <Stack direction={'row'} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='body2'>
                        NFT DEODD CARD
                    </Typography>
                    <Typography variant='h2' color={"secondary.100"}>
                        9,500
                    </Typography>
                </Stack>
                <ListCus sx={{ border: "none" }}>
                    <ListItemButton sx={{ padding: "8px 0px" }} onClick={handleClick}>
                        {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <Stack ml={1} direction={"row"} alignItems={"center"}>
                            <img width={30} src={BronzeImage} alt="" />
                            <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>bronze nft card</Typography>
                        </Stack>
                        <Typography ml="auto" variant='h2' color={"secondary"}>
                            37
                        </Typography>
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 3, pr: 0, pt: 1 }}>
                                <Stack ml={1} direction={"row"} alignItems={"center"}><img width={30} src={BronzeImage} alt="" /> <Typography color={"text.primary"} ml={1} variant='body2' textTransform={"uppercase"}>346346sdfsdf324456</Typography> </Stack>
                                <Typography ml="auto" variant='h2' color={"secondary"}>
                                    37
                                </Typography>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </ListCus>
                <Box textAlign={"end"} >
                    <Box display={"block"}>
                        <ButtonMain active={true} title="CLAIM" onClick={() => { }} customStyle={{
                            width: 75, padding: "4px 16px", mt: 1
                        }} />
                    </Box>
                    <Typography mt={1} variant='caption' color={"error.100"}>Please choose your asset to claim</Typography>
                </Box>

            </Stack>
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
export default LeftContent