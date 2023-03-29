import { Box, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import MyTabs, { TypeTab } from 'components/common/Tabs'
import { DiscordIcon, TelegramIcon, TwiterIcon } from 'components/common/icons';
import { ButtonTertiary } from 'components/ui/button';
import React, { useState } from 'react'
import { BnbIcon, CopyIcon, NotiIcon } from 'utils/Icons';
import { AvatarImage, BnbImage, CoinEmptyImage } from 'utils/Images';

type Props = {}
function createData(
    name: string,
    userName: string,
    quantityFriends: string | undefined,
) {
    return { name, userName, quantityFriends };
}
function ContentData({ }: Props) {
    const [valueTab, setValueTab] = useState<number>(1);
    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'Avaiable',
            value: "(12)"
        },
        {
            id: 2,
            title: 'Expired',
            value: "(6)",
        },

    ]
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
    return (
        <Container>
            {/* {
                MapTap[valueTab]
            } */}
            <Stack direction="row" mt={2} columnGap={4}>
                <Box flexGrow={1} flexShrink={1} flexBasis={"60%"}>
                    <Stack direction={'row'} justifyContent={"space-between"} alignItems={'center'}>

                        <MyTabs listTabs={listTabs} value={valueTab} setValue={setValueTab} />
                        <Stack direction={'row'} py={"14px"} flex={1} borderBottom={1} borderColor={"secondary.100"} justifyContent={"flex-end"}>
                            <Typography variant='body2'>CLAIMED</Typography>
                            <Stack direction={'row'} ml={1} columnGap={1} alignItems={'center'}>
                                <Typography variant='body2' color="secondary.main">2,523</Typography>
                                <BnbIcon />
                            </Stack>

                        </Stack>
                    </Stack>
                    <TableContainer sx={{ mt: 1, backgroundColor: "transparent", position: 'relative', maxHeight: '500px', backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                    <TableCell sx={{ textTransform: "uppercase" }}>User</TableCell>
                                    <TableCell sx={{ textTransform: "uppercase" }} align="right">Expire</TableCell>
                                    <TableCell sx={{ textTransform: "uppercase" }} align="right">profit</TableCell>
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
                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                <img src={AvatarImage} width={24} alt="" />
                                                <Typography variant='caption'>{row.userName}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                <Typography variant='caption'>{row.userName}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right" >

                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                <Typography variant='caption' color="secondary.main"> {row.quantityFriends}</Typography>
                                                <BnbIcon />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}

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
                <Box flexGrow={1} flexShrink={1} flexBasis={"40%"} >
                    <Typography variant='body2' textTransform={"uppercase"} textAlign={"center"} mt={2}>AvailAble to claim</Typography>
                    <Stack mt={1} direction={'row'} columnGap={1} alignItems={'center'} justifyContent={"center"}>
                        <Typography variant='h3' fontSize={"48px"}>0,534</Typography>
                        <img src={BnbImage} width={40} alt="" />
                    </Stack>
                    <Stack direction={'row'} mt={2} alignItems={'center'} justifyContent={"space-between"}>
                        <Typography variant='body2' textTransform={"uppercase"}>Claimed</Typography>
                        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                            <Typography variant='body2'> 0,234</Typography>
                            <BnbIcon />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} mt={2} alignItems={'center'} justifyContent={"space-between"}>
                        <Typography variant='body2' textTransform={"uppercase"}>claim fee</Typography>
                        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                            <Typography variant='body2'> 0,3</Typography>
                            <BnbIcon />
                        </Stack>
                    </Stack>
                    <Typography mt={1} variant='caption' color="secondary.100">The fee collected on behalf of blockchain<br />No more gas fee required</Typography>

                    <ButtonTertiary sx={{ width: "100%", mt: 3 }}>Claim reward </ButtonTertiary>
                    <Box sx={{ height: '1px', margin: "40px 0", bgcolor: 'secondary.100' }}>

                    </Box>
                    <Typography variant='h4' textAlign={'center'} mt={5}>
                        Your referral link
                    </Typography>
                    <ButtonTertiary sx={{ mt: 1, py: '12px', width: '100%', bgcolor: "secondary.300" }}>
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

        </Container>
    )
}

export default ContentData