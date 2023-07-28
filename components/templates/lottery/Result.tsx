import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './components/Ticket'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'

type Props = {}

const Result = (props: Props) => {
    return (
        <Box mt={3}>
            <Box maxWidth={763} mx='auto'>

                <Ticket numbers={[44, 55, 66, 77, 88, 99]} size={60} maxHeight={96} py={2} px={5} gap={3} text={<Typography variant='h5' fontWeight={700} textTransform={'uppercase'}>Lucky <br /> number</Typography>} />
            </Box>
            <Typography variant='h5' fontWeight={700} mt={5}>Winner</Typography>
            <TableContainer sx={{ mt: 2, backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
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
                <Box textAlign={'center'}>
                    <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                </Box>
            </TableContainer>

        </Box>
    )
}

export default Result
