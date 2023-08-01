import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Ticket from '../Ticket'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'
import { ButtonLoading } from 'components/ui/button'

type Props = {}

export const TableMyTickets = (props: Props) => {
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
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
                        </TableCell>
                        <TableCell align="right" >
                            <Typography variant='body2'>Claimed</Typography>
                        </TableCell>
                    </TableRow>


                </TableBody>
            </Table>

        </TableContainer>


    )
}
export const TableResultRoll = () => {
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
                    <TableRow
                        sx={{
                            'td, th': { border: 0, py: 1 }, 'th': {
                                display: 'block'
                            }
                        }}
                    >
                        <TableCell width={160} >
                            <Stack direction={'row'} gap={2} alignItems={'center'}>
                                <MyImage width={40} height={40} src={getPathAvatar(1)} alt="" />
                                <Box>

                                    <Typography variant='caption' component={'p'}>{'NamNam'}</Typography>
                                    <Typography variant='caption' color="secondary.100">(3535***3534)</Typography>
                                </Box>
                            </Stack>
                        </TableCell>
                        <TableCell
                            align="right"
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="right" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
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
                            <Stack direction={'row'} gap={2} alignItems={'center'}>
                                <MyImage width={40} height={40} src={getPathAvatar(1)} alt="" />
                                <Box>

                                    <Typography variant='caption' component={'p'}>{'NamNam'}</Typography>
                                    <Typography variant='caption'>(3535***3534)</Typography>
                                </Box>
                            </Stack>
                        </TableCell>
                        <TableCell
                            align="right"
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="right" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </TableContainer>

    )
}
export const TableJackpotWinners = () => {
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

                        <TableCell width={160} >
                            <Stack direction={'row'} gap={2} alignItems={'center'}>
                                <MyImage width={40} height={40} src={getPathAvatar(1)} alt="" />
                                <Box>

                                    <Typography variant='caption' component={'p'}>{'NamNam'}</Typography>
                                    <Typography variant='caption'>(3535***3534)</Typography>
                                </Box>
                            </Stack>
                        </TableCell>
                        <TableCell
                            align="right"
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="right" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
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

                        <TableCell width={160} >
                            <Stack direction={'row'} gap={2} alignItems={'center'}>
                                <MyImage width={40} height={40} src={getPathAvatar(1)} alt="" />
                                <Box>

                                    <Typography variant='caption' component={'p'}>{'NamNam'}</Typography>
                                    <Typography variant='caption'>(3535***3534)</Typography>
                                </Box>
                            </Stack>
                        </TableCell>
                        <TableCell
                            align="right"
                        >
                            <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
                        </TableCell>
                        <TableCell>
                            4
                        </TableCell>
                        <TableCell align="right" >
                            <Stack direction={'row'} gap={1} >
                                <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
                            </Stack>
                        </TableCell>
                    </TableRow>
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