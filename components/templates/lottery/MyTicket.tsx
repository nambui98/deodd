import { Box, Button, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './Ticket'
import { useWalletContext } from 'contexts/WalletContext'
import { ButtonLoading } from 'components/ui/button'

type Props = {}

const MyTicket = (props: Props) => {
    const { walletAddress, walletIsConnected } = useWalletContext();
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'} mt={3}>
                <Typography variant='body2'>You have no ticket</Typography>
                <Box mt={3}>
                    {
                        walletAddress !== undefined ? (
                            !walletIsConnected ?
                                <ButtonLoading fullWidth={false} sx={{
                                    width: 'auto',
                                    px: 5,
                                    py: 2,
                                    textTransform: 'none',
                                    backgroundColor: 'background.default'
                                }}>Connect Wallet to Buy Ticket</ButtonLoading>
                                :
                                <ButtonLoading fullWidth={false} sx={{
                                    width: 'auto',
                                    px: 5,
                                    py: 2,
                                    textTransform: 'none',
                                    backgroundColor: 'background.default'
                                }}>Buy Ticket</ButtonLoading>

                        ) :
                            <Skeleton variant="rounded" width={160} height={60} />
                    }
                </Box>
            </Stack>
            <Box mt={3}>

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
                            <TableRow
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                                </TableCell>
                                <TableCell
                                    align="right"
                                // width={'100%'}
                                >

                                    <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                </TableCell>
                                <TableCell>
                                    4
                                </TableCell>

                                <TableCell >
                                    --
                                </TableCell>

                                <TableCell align="right" >
                                    <Stack direction={'row'} gap={1} >
                                        <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" >
                                    <Typography variant='body2'>Claimed</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                                </TableCell>
                                <TableCell
                                    align="right"
                                >
                                    <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                </TableCell>
                                <TableCell>
                                    4
                                </TableCell>
                                <TableCell >
                                    --
                                </TableCell>
                                <TableCell align="right" >
                                    <Stack direction={'row'} >
                                        <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" >
                                    <Typography variant='body2'>Claimed</Typography>
                                </TableCell>
                            </TableRow><TableRow
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                                </TableCell>
                                <TableCell
                                    align="right"
                                >
                                    <Ticket numbers={[99, 44, 55, 66, 77, 11]} />
                                </TableCell>
                                <TableCell>
                                    4
                                </TableCell>

                                <TableCell >
                                    --
                                </TableCell>

                                <TableCell align="right" >
                                    <Stack direction={'row'} >
                                        <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" >
                                    <Typography variant='body2'>Claimed</Typography>
                                </TableCell>
                            </TableRow><TableRow
                                sx={{
                                    'td, th': { border: 0, py: 1 }, 'th': {
                                        display: 'block'
                                    }
                                }}
                            >
                                <TableCell width={160} >
                                    Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
                                </TableCell>
                                <TableCell
                                    align="right"
                                // width={'100%'}
                                >
                                    <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                                </TableCell>
                                <TableCell>
                                    4
                                </TableCell>

                                <TableCell >
                                    --
                                </TableCell>

                                <TableCell align="right" >
                                    <Stack direction={'row'} >
                                        <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                                    </Stack>
                                </TableCell>
                                <TableCell align="right" >
                                    <Typography variant='body2'>Claimed</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box textAlign={'center'}>
                        <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                    </Box>
                </TableContainer>

            </Box>
        </>

    )
}

export default MyTicket
