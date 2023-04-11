import { Box, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import MyTabs, { TypeTab } from 'components/common/Tabs'
import { DiscordIcon, TelegramIcon, TwiterIcon } from 'components/common/icons';
import { ButtonTertiary } from 'components/ui/button';
import { Colors } from 'constants/index';
import { useSiteContext } from 'contexts/SiteContext';
import { BigNumber } from 'ethers';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'next-share';
import { useEffect, useMemo, useState } from 'react';
import { BnbIcon, CopyIcon, FacebookIcon, NotiIcon } from 'utils/Icons';
import { AvatarImage, BnbImage, CoinEmptyImage } from 'utils/Images';
import { Convert } from 'utils/convert';
import { Format } from 'utils/format';

type Props = {
    dataAvailable: any | undefined,
    dataExpired: any | undefined,
    link: string
}
function createData(
    name: string,
    expire: string,
    profit: BigNumber,
) {
    return { name: Convert.convertWalletAddress(name, 5, 5), expire, profit: Format.formatMoneyFromBigNumberEther(profit) };
}
function ContentData({ dataAvailable, dataExpired, link }: Props) {
    const [valueTab, setValueTab] = useState<number>(1);
    const { setIsSuccess, setTitleSuccess } = useSiteContext();
    let rowsAvailable = useMemo(() => dataAvailable && dataAvailable?.referralEarningRoleFatherList ? dataAvailable?.referralEarningRoleFatherList.map((item: any) => createData(item.userNameReferred + "(" + item.userWalletReferred + ")",
        item.expiredDateForFather,
        item.rewardFatherClaimed),) : [], [dataAvailable])
    let rowsExpired = useMemo(() => dataExpired && dataExpired?.referralEarningRoleFatherList ? dataExpired?.referralEarningRoleFatherList.map((item: any) => createData(item.userNameReferred + "(" + item.userWalletReferred + ")",
        item.expiredDateForFather,
        item.rewardFatherClaimed),) : [], [dataExpired])
    let rows = valueTab === 1 ? rowsAvailable : rowsExpired;


    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: 'Avaiable',
            value: `(${rowsAvailable.length})`
        },
        {
            id: 2,
            title: 'Expired',
            value: `(${rowsExpired.length})`,
        },

    ]

    const handleCopy = () => {
        navigator?.clipboard.writeText(link);
        setTitleSuccess("Copy to clipboard");
        setIsSuccess(true);
    }
    console.log(dataAvailable?.unclaimedReward);

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
                                <Typography variant='body2' color="secondary.main">{Format.formatMoneyFromBigNumberEther(dataAvailable?.claimedReward)}</Typography>
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
                                {rows.length > 0 && rows.map((row: any, index: number) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            'td, th': { border: 0, py: 1 }
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                                <img src={AvatarImage} width={24} alt="" />
                                                <Typography variant='caption'>{row.name}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant='caption'>{row.expire}</Typography>
                                        </TableCell>
                                        <TableCell align="right" >

                                            <Stack direction={'row'} justifyContent={'flex-end'} columnGap={1} alignItems={'center'}>
                                                <Typography variant='caption' color="secondary.main"> {row.profit}</Typography>
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
                        <Typography variant='h3' fontSize={"48px"}>{Format.formatMoneyFromBigNumberEther(dataAvailable?.unclaimedReward)}</Typography>
                        <img src={BnbImage} width={40} alt="" />
                    </Stack>
                    <Stack direction={'row'} mt={2} alignItems={'center'} justifyContent={"space-between"}>
                        <Typography variant='body2' textTransform={"uppercase"}>Claimed</Typography>
                        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                            <Typography variant='body2'> {Format.formatMoneyFromBigNumberEther(dataAvailable?.claimedReward)}</Typography>
                            <BnbIcon />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} mt={2} alignItems={'center'} justifyContent={"space-between"}>
                        <Typography variant='body2' textTransform={"uppercase"}>claim fee</Typography>
                        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                            <Typography variant='body2'>{Format.formatMoney(dataAvailable?.claimFee ?? 0)} </Typography>
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
                    <ButtonTertiary sx={{
                        mt: 1, py: '12px',
                        color: 'secondary.main',

                        'svg': {
                            fill: Colors.primaryDark,
                        },
                        '&:hover': {
                            svg: {
                                fill: Colors.secondary
                            }
                        }
                    }} onClick={handleCopy} >
                        <Typography variant='h4' mr={3} textTransform={'none'} >
                            {
                                link
                            }
                        </Typography>
                        <CopyIcon />
                    </ButtonTertiary>

                    <Typography variant='h4' textAlign={'center'} color="secondary.100" mt={2}>
                        Share to
                    </Typography>
                    <Stack direction={'row'} mt={2} justifyContent={'center'}>
                        {/* <IconButton color="primary" ><DiscordIcon fill="#7071B3" /></IconButton> */}
                        <TelegramShareButton url={link}
                            title={'share title'}>

                            <IconButton color="primary" ><TelegramIcon fill="#7071B3" /></IconButton>
                        </TelegramShareButton>
                        <TwitterShareButton
                            url={link}
                            title={'share title'}
                        >
                            <IconButton color="primary" ><TwiterIcon fill="#7071B3" /></IconButton>
                        </TwitterShareButton>
                        <FacebookShareButton
                            url={link}
                            quote={'share title'}
                            hashtag={'#deodd'}
                        >
                            <IconButton color="primary" ><FacebookIcon fill="#7071B3" /></IconButton>
                        </FacebookShareButton>

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