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
import { ButtonFourth } from 'components/ui/button'


// export async function getStaticProps({ params }: { params: { path: string } }) {
//     const campaign = CAMPAIGNS.find(c => c.href === 'winlose-streak-campaign');
//     return { props: { campaign } };
// }
function WinloseStreakCampaign({ campaign }: { campaign: Campaign | undefined }) {
    return (
        <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
            Coming soon
        </Typography>
    )
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);
    const { walletAddress, walletIsConnected } = useWalletContext();

    const [activeTab, setActiveTab] = useState<number>(1);
    const { data: winloseStreak } = useQuery({
        queryKey: ["getWinloseStreak"],
        refetchInterval: 2000,
        queryFn: () => DeoddService.getWinLoseStreak(walletAddress),
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
    let rowsWin = winloseStreak?.dashboardWinStreak;
    let rowsLose = winloseStreak?.dashboardLoseStreak;
    let mymine = winloseStreak?.connectWallet;

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
                        <Stack direction={'row'} mb={2} mt={3} gap={1}>
                            <ButtonFourth onClick={() => setActiveTab(1)} active={activeTab === 1} label="Win streak" />
                            <ButtonFourth onClick={() => setActiveTab(2)} active={activeTab === 2} label="Lose streak" />
                        </Stack>
                        <TableContainer sx={{ backgroundColor: "transparent", position: 'relative', maxHeight: '500px', backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                        <TableCell >Rank</TableCell>
                                        <TableCell align="left">Users</TableCell>
                                        <TableCell align="right">Streak</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ bgcolor: 'background.paper' }}>
                                    {
                                        activeTab === 1 ? rowsWin?.length > 0 && rowsWin?.map((row: any, index: number) => (
                                            <TableRow
                                                key={row.username + index}
                                                sx={{
                                                    'td, th': { border: 0, py: 1 }
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {
                                                        row.rankWinStreak < 4 ?
                                                            <MyImage width={18} height={24} src={MapRank[row.rankWinStreak]} alt="" />
                                                            : <Typography variant='caption'>{row.rankWinStreak}</Typography>
                                                    }
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                        <MyImage width={24} height={24} src={getPathAvatar(row.avatarId)} alt="" />
                                                        <Typography variant='caption'>{(row.username ?? '') + '(' + Convert.convertWalletAddress(row.wallet, 4, 4) + ")"}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {row.maxWinStreakLength}</Typography></TableCell>
                                            </TableRow>
                                        ))
                                            :
                                            rowsLose?.length > 0 && rowsLose?.map((row: any, index: number) => (
                                                <TableRow
                                                    key={row.username + index}
                                                    sx={{
                                                        'td, th': { border: 0, py: 1 }
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {
                                                            row.rankLoseStreak < 4 ?
                                                                <MyImage width={18} height={24} src={MapRank[row.rankLoseStreak]} alt="" />
                                                                : <Typography variant='caption'>{row.rankLoseStreak}</Typography>
                                                        }
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                            <MyImage width={24} height={24} src={getPathAvatar(row.avatarId)} alt="" />
                                                            <Typography variant='caption'>{(row.username ?? '') + '(' + Convert.convertWalletAddress(row.wallet, 4, 4) + ")"}</Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {row.maxLoseStreakLength}</Typography></TableCell>
                                                </TableRow>
                                            ))
                                    }
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
                                            {
                                                activeTab === 1 ?
                                                    <>
                                                        <TableCell component="th" scope="row">
                                                            {
                                                                mymine?.rankWinStreak && mymine?.rankWinStreak < 4 ?
                                                                    <MyImage width={18} height={24} src={MapRank[mymine?.rankWinStreak]} alt="" />
                                                                    : <Typography variant='caption' color="background.paper">{mymine?.rankWinStreak || '--'}</Typography>
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                                <MyImage src={getPathAvatar(mymine?.avatarId)} width={24} height={24} alt="" />
                                                                <Typography variant='caption' color="background.paper">{(mymine?.username ?? '') + '(' + Convert.convertWalletAddress(mymine?.wallet ?? '', 4, 4) + ")"}</Typography>
                                                            </Stack>
                                                        </TableCell>

                                                        <TableCell align="right" ><Typography variant='caption' color="background.paper"> {mymine?.maxWinStreakLength ?? '--'}</Typography></TableCell>

                                                    </>
                                                    :
                                                    <>
                                                        <TableCell component="th" scope="row">
                                                            {
                                                                mymine?.rankLoseStreak && mymine?.rankLoseStreak < 4 ?
                                                                    <MyImage width={18} height={24} src={MapRank[mymine?.rankLoseStreak]} alt="" />
                                                                    : <Typography variant='caption' color="background.paper">{mymine?.rankLoseStreak || '--'}</Typography>
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                                <MyImage src={getPathAvatar(mymine?.avatarId)} width={24} height={24} alt="" />
                                                                <Typography variant='caption' color="background.paper">{(mymine?.username || '') + '(' + Convert.convertWalletAddress(mymine?.wallet ?? '', 4, 4) + ")"}</Typography>
                                                            </Stack>
                                                        </TableCell>

                                                        <TableCell align="right" ><Typography variant='caption' color="background.paper"> {mymine?.maxLoseStreakLength ?? '--'}</Typography></TableCell>


                                                    </>

                                            }
                                        </TableRow>


                                    }
                                </TableBody>
                            </Table>
                            {
                                activeTab === 1 ? (
                                    !rowsWin || rowsWin?.length <= 0 &&
                                    <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                                        <MyImage width={144} src={CoinEmptyImage} alt="" />
                                        <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                                    </Box>

                                ) : !rowsLose || rowsLose?.length <= 0 &&
                                <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                                    <MyImage width={144} src={CoinEmptyImage} alt="" />
                                    <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                                </Box>

                            }
                        </TableContainer>
                    </Box>
                    <Box>
                        <RightContent image={campaign.imageDetail} campaign={campaign} />
                        {
                            campaign.href === 'referral-campaign' &&
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


export default WinloseStreakCampaign;