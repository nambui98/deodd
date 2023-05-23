
import { StatusTransfer } from '@/templates/assets/ItemHistory'
import RightContent from '@/templates/campaign/CampaignDetail/RightContent'
import { Box, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import MyImage from 'components/ui/image'
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import React, { useState } from 'react'
import { getPathAvatar } from 'utils/checkAvatar'
import { Convert } from 'utils/convert'
import MyModal from '../../components/common/Modal'
import { ButtonLoading } from '../../components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '../../utils/Icons'
import { CoinEmptyImage, LeaderboardImage, Rank1Image, Rank2Image, Rank3Image } from '../../utils/Images'

type Props = {}

function DetailCampaign({ }: Props) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);
    const { walletAddress, handleConnectWallet, walletIsConnected } = useWalletContext();
    const { data, refetch: getLeaderboardReferral } = useQuery({
        queryKey: ["getLeaderboardReferral"],
        enabled: walletAddress !== undefined && walletAddress !== null,
        queryFn: () => DeoddService.getLeaderboardReferral(walletAddress),
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data;
            } else {
                return undefined
            }
        },
    });
    console.log(data);

    const MapRank: { [key: string]: string } = {
        1: Rank1Image,
        2: Rank2Image,
        3: Rank3Image,
    }
    const rows = data?.referralPointUsers?.length > 50 ? data?.referralPointUsers.slice(0, 50) : data?.referralPointUsers || []
    return (
        <Box mt={5}>
            {/* <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>

                    <Typography variant='caption' color={"secondary.100"}>
                        Campaign
                    </Typography>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Referral
                    </Typography>
                </Container>
            </Box> */}




            <Container>
                {
                    !walletIsConnected ?
                        <Stack justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h3' fontWeight={600}>Connect wallet to get your referral link</Typography>

                            <ButtonLoading
                                onClick={handleConnectWallet}
                                sx={{
                                    px: 5, py: 2, mt: 3,
                                    borderRadius: 2,
                                    width: 'auto',
                                    textTransform: 'none',
                                }}
                                loading={false}>
                                <Typography variant='body2' fontSize={16} fontWeight={600} >Connect wallet</Typography>
                            </ButtonLoading>


                        </Stack>

                        :
                        <Stack direction="row" mt={3} columnGap={4}>

                            <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                                <Stack direction={'row'} alignItems={'center'} gap={1} >
                                    <MyImage src={LeaderboardImage} width={32} height={32} alt="" />

                                    <Typography variant='h2' fontWeight={700} >

                                        Leaderboard
                                    </Typography>
                                </Stack>
                                <TableContainer sx={{ mt: 1, backgroundColor: "transparent", position: 'relative', maxHeight: '500px', backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                                    <Table stickyHeader aria-label="simple table">
                                        <TableHead>
                                            <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                                <TableCell >Rank</TableCell>
                                                <TableCell align="left">Users</TableCell>
                                                <TableCell align="right">Friends invited</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ bgcolor: 'background.paper' }}>
                                            {
                                                rows.length > 0 && rows.map((row: any, index: number) => (
                                                    <TableRow
                                                        key={row.name + index}
                                                        sx={{
                                                            'td, th': { border: 0, py: 1 }
                                                        }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {
                                                                row.rank < 4 ?
                                                                    <img src={MapRank[row.rank]} alt="" />
                                                                    : <Typography variant='caption'>{row.rank}</Typography>
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                                <img src={getPathAvatar(row.avatar_id)} width={24} alt="" />
                                                                <Typography variant='caption'>{(row.user_name_father ?? '') + '(' + Convert.convertWalletAddress(row.user_wallet_father, 4, 4) + ")"}</Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {row.number_child}</Typography></TableCell>
                                                    </TableRow>
                                                ))}
                                            <TableRow
                                                sx={{
                                                    position: 'sticky',
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    'td, th': { border: 0, py: 1 },
                                                    bgcolor: 'secondary.main',
                                                    color: 'background.paper'
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {
                                                        data?.connectWallet.rank && data?.connectWallet.rank < 4 ?
                                                            <img src={MapRank[data.connectWallet.rank]} alt="" />
                                                            : <Typography variant='caption' color="background.paper">{data?.connectWallet?.rank || '--'}</Typography>
                                                    }
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                        <img src={getPathAvatar(data?.connectWallet?.avatar_id)} width={24} alt="" />

                                                        <Typography variant='caption' color="background.paper">{(data?.connectWallet?.user_name_father ?? '') + '(' + Convert.convertWalletAddress(data?.connectWallet?.user_wallet_father, 4, 4) + ")"}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right" ><Typography variant='caption' color="background.paper"> {data?.connectWallet?.number_child ?? '--'}</Typography></TableCell>
                                            </TableRow>

                                        </TableBody>

                                    </Table>
                                    {
                                        !data || data?.referralPointUsers.length <= 0 &&
                                        <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                                            <img width={144} src={CoinEmptyImage} alt="" />
                                            <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                                        </Box>
                                    }

                                </TableContainer>
                            </Box>
                            <RightContent />
                        </Stack >

                }
            </Container >
            <MyModal open={openModal} title='Balance History' setOpen={setOpenModal} >
                <Item isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.COMPLETED} value='+10 BNB' />
                <Item isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.COMPLETED} value='+10 BNB' />
            </MyModal>
            <MyModal open={openModalWallet} title='Wallet History' setOpen={setOpenModalWallet} >
                <Item isDeposit={true} title="Win flip" date='12 seconds ago' status={StatusTransfer.COMPLETED} value='+10 BNB' />
                <Item isDeposit={false} title="Win flip" date='12 seconds ago' status={StatusTransfer.COMPLETED} value='+10 BNB' />
            </MyModal>
        </Box >
    )
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
            isDeposit ? <ArrowLeftIcon style={{ stroke: "#FC753F" }} /> : <ArrowRightIcon fill="#4FD190" />
        }
        <Stack ml={1}>
            <Typography>{title}</Typography>
            <Typography color={"secondary"} mt={0.5}>{value}</Typography>
        </Stack>
        <Stack ml="auto" textAlign={"end"}>
            {/* <Typography color={"secondary.200"} variant='caption'>{StatusTransfer[status]}</Typography> */}
            <Typography color={"secondary.200"} variant='caption' mt={0.5}>{date}</Typography>
        </Stack>
    </Stack>
}


export default DetailCampaign;