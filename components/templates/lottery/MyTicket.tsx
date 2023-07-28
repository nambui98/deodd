import { Box, Button, Divider, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './components/Ticket'
import { useWalletContext } from 'contexts/WalletContext'
import { ButtonLoading } from 'components/ui/button'
import { useLotteryContext } from 'contexts/LotteryContext'
import { TableMyTickets } from './components/Table/TableMyTickets'
import { MyTicketInfo } from './components/TicketInfo'

type Props = {}

const MyTicket = (props: Props) => {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setOpenModalBuyTicket } = useLotteryContext();
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} mt={3}>
                <Typography variant='body2'>You have no ticket</Typography>
                <Box mt={3}>
                    {
                        walletAddress !== undefined ? (
                            !walletIsConnected ?
                                <ButtonLoading
                                    fullWidth={false}
                                    onClick={handleConnectWallet}
                                    sx={{
                                        width: 'auto',
                                        px: 5,
                                        py: 2,
                                        textTransform: 'none',
                                        backgroundColor: 'background.default'
                                    }}>
                                    Connect Wallet to Buy Ticket
                                </ButtonLoading>
                                :
                                <ButtonLoading
                                    onClick={() => setOpenModalBuyTicket(true)}
                                    fullWidth={false}
                                    sx={{
                                        width: 'auto',
                                        px: 5,
                                        py: 2,
                                        textTransform: 'none',
                                        backgroundColor: 'background.default'
                                    }}>
                                    Buy Ticket
                                </ButtonLoading>

                        ) :
                            <Skeleton variant="rounded" width={160} height={60} />
                    }
                </Box>
            </Stack>
            <Box mt={3}>
                <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                    <MyTicketInfo />
                    <MyTicketInfo />
                    <MyTicketInfo />
                    <MyTicketInfo />
                </Stack>
                <Box display={{ xs: 'none', md: 'block' }}>

                    <TableMyTickets />
                </Box>
            </Box>
        </>

    )
}

export default MyTicket
