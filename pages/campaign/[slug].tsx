
import { Box, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { DiscordIcon, TelegramIcon, TwiterIcon } from 'components/common/icons'
import React, { useState } from 'react'
import MyModal from '../../components/common/Modal'
import { ButtonTertiary } from '../../components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, NotiIcon } from '../../utils/Icons'
import { AvatarImage, CoinEmptyImage, Rank1Image, Rank2Image, Rank3Image, ReferralImage } from '../../utils/Images'
import { StatusTransfer } from '@/templates/assets/ItemHistory'

type Props = {}
function createData(
    name: string,
    userName: string,
    quantityFriends: string | undefined,
) {
    return { name, userName, quantityFriends };
}
function DetailCampaign({ }: Props) {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWallet, setOpenModalWallet] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    let rows = [
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),

        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),

        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
        createData('Win/Lose Streak Campaign',
            'Arlene McCoy (3535***3534)',
            '1000'),
    ];
    const MapRank: { [key: string]: string } = {
        0: Rank1Image,
        1: Rank2Image,
        2: Rank3Image,
    }
    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>

                    <Typography variant='caption' color={"secondary.100"}>
                        Campaign
                    </Typography>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Referral
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Stack direction="row" mt={3} columnGap={4}>
                    <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                        <Typography variant='h2' textTransform={'uppercase'}>
                            Leaderboard
                        </Typography>
                        <TableContainer sx={{ mt: 1, backgroundColor: "transparent", position: 'relative', maxHeight: '500px', backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                        <TableCell sx={{ textTransform: "uppercase" }}>Rank</TableCell>
                                        <TableCell sx={{ textTransform: "uppercase" }} align="left">Users</TableCell>
                                        <TableCell sx={{ textTransform: "uppercase" }} align="right">Friends invited</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ bgcolor: 'background.paper' }}>
                                    {rows.length > 0 && rows.map((row, index) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                'td, th': { border: 0, py: 1 }
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {
                                                    index < 3 ?
                                                        <img src={MapRank[index]} alt="" />
                                                        : <Typography variant='caption'>{index}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                    <img src={AvatarImage} width={24} alt="" />
                                                    <Typography variant='caption'>{row.userName}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right" ><Typography variant='caption' color="secondary.200"> {row.quantityFriends}</Typography></TableCell>
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
                                            <Typography variant='caption' color="background.paper" >3</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                <img src={AvatarImage} width={24} alt="" />
                                                <Typography variant='caption' color="background.paper" >{"nambui"}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right" ><Typography variant='caption' color="background.paper"> 100</Typography></TableCell>
                                    </TableRow>

                                </TableBody>

                            </Table>
                            {
                                rows.length <= 0 &&
                                <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                                    <img width={144} src={CoinEmptyImage} alt="" />
                                    <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                                </Box>
                            }

                        </TableContainer>


                    </Box>
                    <Box flexGrow={1} flexShrink={1} flexBasis={"50%"}>
                        <img src={ReferralImage} width={"100%"} alt="" />
                        <Typography variant='h4' textAlign={'center'} mt={5}>
                            Your referral link
                        </Typography>
                        <ButtonTertiary sx={{ mt: 1, py: '12px', width: '100%' }}>
                            <Typography variant='h4' mr={3} textTransform={'none'} >
                                https://www.deodd.io/ref/53sdkgj3434
                            </Typography>
                            <CopyIcon />
                        </ButtonTertiary>
                        <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={2}>
                            Share to
                        </Typography>
                        <Stack direction={'row'} mt={2} justifyContent={'center'}>
                            <IconButton color="primary" ><DiscordIcon fill="#7071B3" /></IconButton>
                            <IconButton color="primary" ><TelegramIcon fill="#7071B3" /></IconButton>
                            <IconButton color="primary" ><TwiterIcon fill="#7071B3" /></IconButton>
                        </Stack>
                        <Stack mt={5} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                            <NotiIcon />
                            <Typography ml={1} variant='body2' textAlign={'center'} textTransform={'uppercase'} >
                                HOW it work
                            </Typography>

                        </Stack>
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


export default DetailCampaign;