import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Ticket from '../Ticket'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'
import { ButtonLoading } from 'components/ui/button'
import { TicketType } from '../../MyTicket'
import { WinnerType } from '../../Result'
import { Convert } from 'utils/convert'
import { BigNumber, ethers } from 'ethers'
import { Format } from 'utils/format'

type Props = {
    data: TicketType[] | undefined
}

export const TableMyTickets = ({ data }: Props) => {
    return (
        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                        <TableCell >Lottery ID</TableCell>
                        <TableCell >Numbers</TableCell>
                        <TableCell >Ticket</TableCell>
                        <TableCell >Matches</TableCell>
                        <TableCell >Prize</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.map(ticket => {
                            return (
                                <TableRow
                                    key={ticket.draw_id}
                                    sx={{
                                        'td, th': { border: 0, py: 1 }, 'th': {
                                            display: 'block'
                                        }
                                    }}
                                >
                                    <TableCell width={160} >
                                        Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#{ticket.lottery_id}</Typography>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >
                                        <Ticket numbers={ticket.series} />
                                    </TableCell>
                                    <TableCell>
                                        {ticket.quantity}
                                    </TableCell>

                                    <TableCell >
                                        {ticket.matches}
                                    </TableCell>

                                    <TableCell align="right" >
                                        <Stack direction={'row'} gap={1} >
                                            <Box>{ticket.prize}</Box> <USDTIcon fill="#50ae94" width={24} height={24} />

                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right" >
                                        <Typography variant='body2'>{ticket?.claimed ? 'Claimed' : 'Claim'}</Typography>
                                    </TableCell>
                                </TableRow>


                            )
                        })
                    }
                </TableBody>
            </Table>

        </TableContainer>


    )
}
export const TableResultRoll = ({ data }: { data: WinnerType[] }) => {
    return (
        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                        <TableCell >Name</TableCell>
                        <TableCell >Numbers</TableCell>
                        <TableCell >Matches</TableCell>
                        <TableCell >Prize</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row, index) =>
                            <TableRow
                                key={index + "winnerList"}
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                                        <MyImage width={40} height={40} src={getPathAvatar(row.avatar_id ?? 0)} alt="" />
                                        <Box>
                                            <Typography variant='caption' component={'p'}>{row.user_name}</Typography>
                                            <Typography variant='caption' color="secondary.100">({Convert.convertWalletAddress(row.wallet, 4, 4)})</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="right"
                                >
                                    <Ticket numbers={row.series} />
                                </TableCell>
                                <TableCell>
                                    {row.matches}
                                </TableCell>
                                <TableCell align="right" >
                                    <Stack direction={'row'} gap={1} >
                                        <Box>{Format.formatMoney(ethers.utils.formatEther(BigNumber.from(row.prize.toString())))}</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                            </TableRow>

                        )
                    }
                </TableBody>
            </Table>

        </TableContainer>

    )
}
export const TableJackpotWinners = ({ data }: { data: WinnerType[] }) => {
    return (
        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                        <TableCell >Lottery ID</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell >Numbers</TableCell>
                        <TableCell >Matches</TableCell>
                        <TableCell >Prize</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row, index) =>
                            <TableRow
                                key={index}
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#{row.lottery_id}</Typography>
                                </TableCell>

                                <TableCell width={160} >
                                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                                        <MyImage width={40} height={40} src={getPathAvatar(row.avatar_id ?? 0)} alt="" />
                                        <Box>

                                            <Typography variant='caption' component={'p'}>{row.user_name}</Typography>
                                            <Typography variant='caption'>({Convert.convertWalletAddress(row.wallet, 4, 4)})</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="right"
                                >
                                    <Ticket numbers={row.series} />
                                </TableCell>
                                <TableCell>
                                    {row.matches}
                                </TableCell>
                                <TableCell align="right" >
                                    <Stack direction={'row'} gap={1} >
                                        <Box>{Format.formatMoney(ethers.utils.formatEther(BigNumber.from(row.prize.toString())))}</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                            </TableRow>

                        )
                    }

                </TableBody>
            </Table>
        </TableContainer>


    )
}

export const TableClaim = () => {
    return (
        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                        <TableCell >Lottery ID</TableCell>
                        <TableCell >Numbers</TableCell>
                        <TableCell >Matches</TableCell>
                        <TableCell >Prize</TableCell>
                        <TableCell align='right'>
                            <Box>
                                <ButtonLoading fullWidth={false} sx={{ px: 2, py: 1, textTransform: 'none', width: 'auto' }}>Claim all reward</ButtonLoading>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{
                            'td, th': { border: 0, py: 1 }, 'th': {
                                display: 'block'
                            }
                        }}
                    >
                        <TableCell  >
                            Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                        </TableCell>

                        <TableCell
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="left" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
                        </TableCell>

                        <TableCell align='right'>
                            <Box>

                                <ButtonLoading fullWidth={false} sx={{ width: 'auto', px: 2, py: 1, borderRadius: 2, textTransform: 'none' }}>Claim</ButtonLoading>
                            </Box>
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{
                            'td, th': { border: 0, py: 1 }, 'th': {
                                display: 'block'
                            }
                        }}
                    >
                        <TableCell  >
                            Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                        </TableCell>

                        <TableCell
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="left" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
                        </TableCell>

                        <TableCell align='right'>
                            <Box>

                                <ButtonLoading disabled fullWidth={false} sx={{ width: 'auto', px: 2, py: 1, borderRadius: 2, textTransform: 'none' }}>
                                    Claimed
                                </ButtonLoading>
                            </Box>
                        </TableCell>
                    </TableRow>


                </TableBody>
            </Table>
        </TableContainer>


    )
}