import { Box, Button, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import MyImage from 'components/ui/image'
import { USDTIcon } from 'utils/Icons'
import { getPathAvatar } from 'utils/checkAvatar'
import Ticket from './Ticket'
import { ButtonLoading } from 'components/ui/button'
import { CoinEmptyImage } from 'utils/Images'
import { useWalletContext } from 'contexts/WalletContext'

type Props = {}

const Claim = (props: Props) => {
    const { walletAddress, walletIsConnected } = useWalletContext();

    return (
        <Box mt={3}>
            <Stack
                sx={{ inset: 0 }}
                gap={5}
                height={1}
                width={1}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
            >
                <MyImage
                    sx={{
                        width: { xs: 80, md: 144 },
                        height: { xs: 80, md: 144 },
                    }}
                    src={CoinEmptyImage}
                    alt="Empty Coin Image"
                />
                <Typography
                    variant='body1'
                    fontWeight={600}
                    color={"secondary.100"}
                >
                    You have no prizes to claim at the moment. Keep trying your luck in <br /> the upcoming prize draws.
                </Typography>
                <Box>
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
                                <ButtonLoading

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

            <TableContainer sx={{ mt: 2, backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
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
                <Box textAlign={'center'}>
                    <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                </Box>
            </TableContainer>

        </Box>
    )
}

export default Claim
