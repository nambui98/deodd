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
import { CAMPAIGNS, Campaign } from 'pages/campaign'
import { GetStaticProps, NextPageContext } from 'next'
import { createDiffieHellmanGroup } from 'crypto'

export async function getStaticPaths() {
    const paths = CAMPAIGNS.map((campaign) => ({
        params: { path: campaign.href },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { path: string } }) {
    const campaign = CAMPAIGNS.find(c => c.href === params.path);
    return { props: { campaign } };
}
function DetailCampaign({ campaign }: { campaign: Campaign }) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);
    const { walletAddress, handleConnectWallet, walletIsConnected } = useWalletContext();
    const { data: referral, refetch: getLeaderboardReferral } = useQuery({
        queryKey: ["getLeaderboardReferral"],
        enabled: campaign.href === 'referral-campaign',
        queryFn: () => DeoddService.getLeaderboardReferral(walletAddress),
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data;
            } else {
                return undefined
            }
        },
    });
    const { data: testails, refetch: getLeaderboardTestail } = useQuery({
        queryKey: ["getLeaderboardTestail"],
        enabled: campaign.href === 'testnet-campaign',
        queryFn: () => DeoddService.getLeaderboardTestail(walletAddress),
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
    let rows;
    let mymine;
    if (campaign.href === 'testnet-campaign') {

        rows = testails?.testAilPointUserDtos;
        mymine = testails?.connectWallet;
    } else {
        rows = referral?.referralPointUsers?.length > 50 ? referral?.referralPointUsers.slice(0, 50) : referral?.referralPointUsers || []
        mymine = referral?.connectWallet;
    }
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
                                        <TableCell align="right"> {campaign.href === "testnet-campaign" ? 'Testail Point' : 'Friends invited'}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ bgcolor: 'background.paper' }}>
                                    {
                                        rows?.length > 0 && rows?.map((row: any, index: number) => (
                                            <TableRow
                                                key={row.name + index}
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
                                                        <Typography variant='caption'>{((row.user_name || row.user_name_father) ?? '') + '(' + Convert.convertWalletAddress((row.user_name || row.user_name_father), 4, 4) + ")"}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {row.number_child || row.testail_point}</Typography></TableCell>
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
                                                    <Typography variant='caption' color="background.paper">{((mymine?.user_name || mymine?.user_name_father) ?? '') + '(' + Convert.convertWalletAddress((mymine?.user_wallet_father || mymine?.wallet), 4, 4) + ")"}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right" ><Typography variant='caption' color="background.paper"> {(mymine?.number_child || mymine?.testail_point) ?? '--'}</Typography></TableCell>
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
                    <RightContent image={campaign.imageDetail} />
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


export default DetailCampaign;