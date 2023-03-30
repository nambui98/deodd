import { Box, Button, ButtonBase, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { ButtonMain } from '../components/ui/button'
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BnbIcon, BnbUsdIcon } from '../utils/Icons'
import { BronzeImage } from '../utils/Images'
import MyModal from '../components/common/Modal'
import { useContractRead } from 'wagmi'
import { useWalletContext } from 'contexts/WalletContext'
import { jackpotContract } from 'libs/contract'
import LeftContent from '@/templates/assets/LeftContent'
import RightContent from '@/templates/assets/RightContent'

type Props = {}

function assets({ }: Props) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);
    const { walletAddress } = useWalletContext();
    const { data: res }: { data: any[] | undefined } = useContractRead({
        address: jackpotContract.address,
        abi: jackpotContract.abi,
        functionName: 'tossPointOf',
        args: [walletAddress],
    })
    console.log(res);

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
                    <LeftContent />
                    <RightContent />
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


export default assets