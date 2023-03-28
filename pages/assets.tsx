import { Box, Button, ButtonBase, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { ButtonMain } from '../components/ui/button'
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from '../utils/Icons'
import { BronzeImage } from '../utils/Images'
import MyModal from '../components/common/Modal'

type Props = {}

function assets({ }: Props) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Assets
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Stack direction="row" mt={3} columnGap={4}>
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
                                9,500
                            </Typography>
                        </Stack>
                        <Stack mt={2} direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} p={2} borderRadius={"12px"} bgcolor={"background.paper"}>
                            <Typography variant='body2'>
                                TOKEN
                            </Typography>
                            <Box textAlign={"end"}>
                                <Typography variant='h2' color={"secondary"}>
                                    9,500
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
                                    9,500
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
                        </Stack>
                    </Box>
                </Stack >
            </Container >
            <MyModal open={openModal} title='Balance History' setOpen={setOpenModal} >
                <Item isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
                <Item isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
            </MyModal>
            <MyModal open={openModalWallet} title='Wallet History' setOpen={setOpenModalWallet} >
                <Item isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
                <Item isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.Complete} value='+10 BNB' />
            </MyModal>
        </Box >
    )
}
enum StatusTransfer {
    Inprogress,
    Complete,
    Failed
}
type TypeItem = {
    isDeposit: boolean,
    title: string,
    status: StatusTransfer,
    value: string,
    date: string,
}
const Item: React.FC<TypeItem> = ({ title, isDeposit, status, value, date }) => {
    return <Stack direction={'row'} mt={1}>
        {
            isDeposit ? <ArrowLeftIcon style={{ stroke: "#FC753F" }} /> : <ArrowRightIcon />
        }
        <Stack ml={1}>
            <Typography>{title}</Typography>
            <Typography color={"secondary"} mt={0.5}>{value}</Typography>
        </Stack>
        <Stack ml="auto" textAlign={"end"}>
            <Typography color={"secondary.200"} variant='caption'>{StatusTransfer[status]}</Typography>
            <Typography color={"secondary.200"} variant='caption' mt={0.5}>{date}</Typography>
        </Stack>
    </Stack>
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

export default assets