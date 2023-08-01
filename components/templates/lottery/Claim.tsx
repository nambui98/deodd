import { Box, Button, Divider, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import MyImage from 'components/ui/image'
import { USDTIcon } from 'utils/Icons'
import { getPathAvatar } from 'utils/checkAvatar'
import Ticket from './components/Ticket'
import { ButtonLoading } from 'components/ui/button'
import { CoinEmptyImage } from 'utils/Images'
import { useWalletContext } from 'contexts/WalletContext'
import { useLotteryContext } from 'contexts/LotteryContext'
import { TableClaim } from './components/Table/Table'
import { MyTicketInfo, TicketClaimInfo } from './components/TicketInfo'

type Props = {}

const Claim = (props: Props) => {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setOpenModalBuyTicket } = useLotteryContext();

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
                                <ButtonLoading
                                    onClick={handleConnectWallet}
                                    fullWidth={false}
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
                    <TicketClaimInfo />
                    <TicketClaimInfo />
                    <TicketClaimInfo />
                    <TicketClaimInfo />
                </Stack>
                <Box display={{ xs: 'none', md: 'block' }}>

                    <TableClaim />
                </Box>
                <Box textAlign={'center'}>
                    <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Claim
