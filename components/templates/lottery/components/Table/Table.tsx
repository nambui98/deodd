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
import { useLotteryContext } from 'contexts/LotteryContext'
import { useSiteContext } from 'contexts/SiteContext'

type Props = {
    data: TicketType[] | undefined
}

export const TableMyTickets = ({ data }: Props) => {

    const { setOpenModalProvablyFair } = useLotteryContext();
    const { currentLottery } = useSiteContext();
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
                                        <Stack direction={'row'} alignItems={'center'} gap={2}>
                                            <Ticket numbers={ticket.series} />
                                            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenModalProvablyFair({ open: true, ticketSelected: ticket.series })}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0008 2.25C12.1997 2.25 12.3905 2.32902 12.5312 2.46967C12.6718 2.61032 12.7508 2.80109 12.7508 3V3.756C15.8261 3.80199 18.8902 4.1368 21.9028 4.756C22.0853 4.79304 22.2474 4.89661 22.3577 5.04658C22.4681 5.19654 22.5187 5.38217 22.4997 5.56737C22.4807 5.75258 22.3936 5.92411 22.2552 6.04861C22.1168 6.17311 21.937 6.24169 21.7508 6.241H19.8328L22.3068 16.365C22.3465 16.5268 22.3311 16.6971 22.2632 16.8492C22.1953 17.0013 22.0787 17.1265 21.9318 17.205C20.9534 17.7285 19.8605 18.0016 18.7508 18C17.6411 18.0016 16.5483 17.7285 15.5698 17.205C15.4229 17.1265 15.3063 17.0013 15.2384 16.8492C15.1705 16.6971 15.1552 16.5268 15.1948 16.365L17.6688 6.241H12.7508V19.521C14.0438 19.597 15.2848 19.864 16.4478 20.297C16.6127 20.3583 16.7509 20.4756 16.838 20.6285C16.9252 20.7813 16.9558 20.9599 16.9246 21.1331C16.8934 21.3062 16.8023 21.4629 16.6672 21.5757C16.5322 21.6885 16.3618 21.7502 16.1858 21.75H7.81583C7.63988 21.7502 7.46948 21.6885 7.33443 21.5757C7.19938 21.4629 7.10828 21.3062 7.07705 21.1331C7.04583 20.9599 7.07648 20.7813 7.16363 20.6285C7.25079 20.4756 7.38891 20.3583 7.55383 20.297C8.71583 19.864 9.95783 19.597 11.2508 19.522V6.24H6.33283L8.80683 16.364C8.84647 16.5258 8.83113 16.6961 8.76323 16.8482C8.69533 17.0003 8.57873 17.1255 8.43183 17.204C7.45344 17.7278 6.36061 18.0013 5.25083 18C4.14113 18.0016 3.0483 17.7285 2.06983 17.205C1.92292 17.1265 1.80632 17.0013 1.73842 16.8492C1.67052 16.6971 1.65518 16.5268 1.69483 16.365L4.16883 6.241H2.25083C2.06466 6.24169 1.88489 6.17311 1.74648 6.04861C1.60806 5.92411 1.5209 5.75258 1.50195 5.56737C1.48299 5.38217 1.53359 5.19654 1.64391 5.04658C1.75423 4.89661 1.91638 4.79304 2.09883 4.756C5.11144 4.13679 8.17557 3.80199 11.2508 3.756V3C11.2508 2.80109 11.3298 2.61032 11.4705 2.46967C11.6111 2.32902 11.8019 2.25 12.0008 2.25ZM16.8788 15.793L18.7508 8.131L20.6228 15.793H16.8788ZM7.12283 15.793L5.25083 8.131L3.37883 15.793H7.12283Z" fill="white" />
                                                </svg>
                                            </Box>


                                        </Stack>
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
                                        <Typography variant='body2'>{ticket.draw_id === currentLottery?.draw_id ? 'Wait for draw' : ticket?.claimed ? 'Claimed' : 'Slipped'}</Typography>
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
    const { openModalProvablyFair, setOpenModalProvablyFair } = useLotteryContext();
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
                                    <Stack direction={'row'} gap={2} alignItems={'center'}>

                                        <Ticket numbers={row.series} />

                                        <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenModalProvablyFair({ open: true, ticketSelected: row.series })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0008 2.25C12.1997 2.25 12.3905 2.32902 12.5312 2.46967C12.6718 2.61032 12.7508 2.80109 12.7508 3V3.756C15.8261 3.80199 18.8902 4.1368 21.9028 4.756C22.0853 4.79304 22.2474 4.89661 22.3577 5.04658C22.4681 5.19654 22.5187 5.38217 22.4997 5.56737C22.4807 5.75258 22.3936 5.92411 22.2552 6.04861C22.1168 6.17311 21.937 6.24169 21.7508 6.241H19.8328L22.3068 16.365C22.3465 16.5268 22.3311 16.6971 22.2632 16.8492C22.1953 17.0013 22.0787 17.1265 21.9318 17.205C20.9534 17.7285 19.8605 18.0016 18.7508 18C17.6411 18.0016 16.5483 17.7285 15.5698 17.205C15.4229 17.1265 15.3063 17.0013 15.2384 16.8492C15.1705 16.6971 15.1552 16.5268 15.1948 16.365L17.6688 6.241H12.7508V19.521C14.0438 19.597 15.2848 19.864 16.4478 20.297C16.6127 20.3583 16.7509 20.4756 16.838 20.6285C16.9252 20.7813 16.9558 20.9599 16.9246 21.1331C16.8934 21.3062 16.8023 21.4629 16.6672 21.5757C16.5322 21.6885 16.3618 21.7502 16.1858 21.75H7.81583C7.63988 21.7502 7.46948 21.6885 7.33443 21.5757C7.19938 21.4629 7.10828 21.3062 7.07705 21.1331C7.04583 20.9599 7.07648 20.7813 7.16363 20.6285C7.25079 20.4756 7.38891 20.3583 7.55383 20.297C8.71583 19.864 9.95783 19.597 11.2508 19.522V6.24H6.33283L8.80683 16.364C8.84647 16.5258 8.83113 16.6961 8.76323 16.8482C8.69533 17.0003 8.57873 17.1255 8.43183 17.204C7.45344 17.7278 6.36061 18.0013 5.25083 18C4.14113 18.0016 3.0483 17.7285 2.06983 17.205C1.92292 17.1265 1.80632 17.0013 1.73842 16.8492C1.67052 16.6971 1.65518 16.5268 1.69483 16.365L4.16883 6.241H2.25083C2.06466 6.24169 1.88489 6.17311 1.74648 6.04861C1.60806 5.92411 1.5209 5.75258 1.50195 5.56737C1.48299 5.38217 1.53359 5.19654 1.64391 5.04658C1.75423 4.89661 1.91638 4.79304 2.09883 4.756C5.11144 4.13679 8.17557 3.80199 11.2508 3.756V3C11.2508 2.80109 11.3298 2.61032 11.4705 2.46967C11.6111 2.32902 11.8019 2.25 12.0008 2.25ZM16.8788 15.793L18.7508 8.131L20.6228 15.793H16.8788ZM7.12283 15.793L5.25083 8.131L3.37883 15.793H7.12283Z" fill="white" />
                                            </svg>
                                        </Box>

                                    </Stack>
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