import { StatusTransfer } from '@/templates/assets/ItemHistory'
import RightContent from '@/templates/campaign/CampaignDetail/RightContent'
import HowItWorkModal from '@/templates/referral/HowItWorkModal'
import { Box, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import MyImage from 'components/ui/image'
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import { CAMPAIGNS, Campaign } from 'pages/campaign'
import React, { useState } from 'react'
import { getPathAvatar } from 'utils/checkAvatar'
import { Convert } from 'utils/convert'
import MyModal from '../../components/common/Modal'
import { ArrowLeftIcon, ArrowRightIcon } from '../../utils/Icons'
import { CoinEmptyImage, LeaderboardImage, Rank1Image, Rank2Image, Rank3Image } from '../../utils/Images'
import { Format } from 'utils/format'
import { GetServerSideProps } from 'next/types'


export async function getStaticProps({ params }: { params: { path: string } }) {
    const campaign = CAMPAIGNS.find(c => c.href === 'volume-campaign');

    return { props: { campaign: { ...campaign, fetch: null } } };
}
function VolumeCampaign({ campaign }: { campaign: Campaign }) {

    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);
    const { walletAddress, walletIsConnected } = useWalletContext();

    const fetch = CAMPAIGNS.find(c => c.id === campaign.id)?.fetch;
    const { data: volumes } = useQuery({
        queryKey: ["getVolumes"],
        refetchInterval: 2000,
        enabled: !!fetch,
        queryFn: () => fetch?.(walletAddress),
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data;
            } else {
                return undefined
            }
        },
    });
    const MapRank: { [key: string]: string } = {
        1: Rank1Image,
        2: Rank2Image,
        3: Rank3Image,
    }
    let rows = volumes?.volumeBetUsers;
    let mymine = volumes?.connectWallet;

    return (
        <Box mt={5}>
            <Container>
                <Stack sx={{
                    [theme.breakpoints.up('xs').replace("@media", "@container")]: {
                        flexDirection: "column"
                    },
                    [theme.breakpoints.up('md').replace("@media", "@container")]: {
                        flexDirection: 'row'
                    },
                }} mt={3} gap={4}>
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
                                        <TableCell align="right">Amount (BNB)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ bgcolor: 'background.paper' }}>
                                    {
                                        rows?.length > 0 && rows?.map((row: any, index: number) => (
                                            <TableRow
                                                key={row.user_name + index}
                                                sx={{
                                                    'td, th': { border: 0, py: 1 }
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.rank < 4 ?
                                                            <MyImage width={18} height={24} src={MapRank[row.rank]} alt="" />
                                                            : <Typography variant='caption'>{row.rank}</Typography>
                                                    }
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                        <MyImage width={24} height={24} src={getPathAvatar(row.avatar_id)} alt="" />
                                                        <Typography variant='caption'>{(row.user_name ?? '') + '(' + Convert.convertWalletAddress(row.wallet, 4, 4) + ")"}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {Format.formatMoney(row.total_volume_bet ?? 0)}</Typography></TableCell>
                                            </TableRow>
                                        ))}
                                    {
                                        walletIsConnected && <TableRow
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
                                                    mymine?.rank && mymine?.rank < 4 ?
                                                        <MyImage width={18} height={24} src={MapRank[mymine?.rank]} alt="" />
                                                        : <Typography variant='caption' color="background.paper">{mymine?.rank || '--'}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                    <MyImage src={getPathAvatar(mymine?.avatar_id)} width={24} height={24} alt="" />
                                                    <Typography variant='caption' color="background.paper">{(mymine?.user_name ?? '') + '(' + Convert.convertWalletAddress(mymine?.wallet, 4, 4) + ")"}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right" ><Typography variant='caption' color="background.paper"> {Format.formatMoney(mymine?.total_volume_bet ?? 0) ?? '--'}</Typography></TableCell>
                                        </TableRow>


                                    }
                                </TableBody>
                            </Table>
                            {
                                !rows || rows?.length <= 0 &&
                                <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                                    <MyImage width={144} src={CoinEmptyImage} alt="" />
                                    <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                                </Box>
                            }
                        </TableContainer>
                    </Box>
                    <Box>
                        {
                            campaign &&

                            <RightContent image={campaign.imageDetail} campaign={campaign} />
                        }
                        {
                            campaign?.href === 'referral-campaign' &&
                            <HowItWorkModal />
                        }
                    </Box>
                </Stack >
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


export default VolumeCampaign;