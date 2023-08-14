import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './components/Ticket'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'
import { TableResultRoll } from './components/Table/Table'
import { ResultTicketInfo } from './components/TicketInfo'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { DeoddService } from 'libs/apis'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useInView } from 'react-intersection-observer'
import { Colors } from 'constants/index'

type Props = {
}
export type WinnerType = {
    wallet: string,
    series: number[],
    matches: number,
    prize: number,
    lottery_id: number,
    user_name: string | null,
    avatar_id: number | null
}

const Result = (props: Props) => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [page, setPage] = useState<number>(1)
    const [winnerList, setWinnerList] = useState<WinnerType[]>([]);
    const { currentLottery, listJackpot, pageListJackpot, setPageListJackpot, } = useLotteryContext();

    const [drawIdValue, setDrawIdValue] = useState<string | null>(null);
    const { data: res } = useQuery({
        queryKey: ["getWinnerList", page, drawIdValue],
        // suspense: winnerList.length > 0 ? false : true,
        refetchOnWindowFocus: false,
        queryFn: () => DeoddService.getWinnerList({ page: page, size: 10, drawId: drawIdValue }),
        onSuccess(data) {
            if (data && data.length > 0) {
                setWinnerList(prev => [...prev, ...data])
            }
        },
        select: (data: any) => {
            if (data.status === 200) {
                return data.data.data;
            } else {
                return null
            }
        },
    });
    const { data: dataLotteryBuyDrawId } = useQuery({
        queryKey: ["lotteryBuyDrawIdResult", drawIdValue],
        enabled: !!drawIdValue,
        refetchOnWindowFocus: false,
        queryFn: () => DeoddService.getLotteryResultByDrawId({ drawId: drawIdValue }),
        select: (data: any) => {
            if (data.status === 200) {
                // debugger
                return data.data.data;
            } else {
                return undefined
            }
        },
    });
    useEffect(() => {
        if (drawIdValue) {
            setPage(1);
            setWinnerList([])
        }
    }, [drawIdValue])

    const [bottomRef, inView] = useInView();

    useEffect(() => {
        if (inView) {
            if (listJackpot.length > 0) {
                setPageListJackpot((prev) => prev + 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])
    useEffect(() => {
        if (currentLottery) {
            const indexPrevCurrentLottery = listJackpot.findIndex(lottery => lottery.draw_id === currentLottery.draw_id) + 1;
            setDrawIdValue(listJackpot[indexPrevCurrentLottery]?.draw_id.toString() ?? null)
        }
    }, [currentLottery])

    return (
        <>
            <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} gap={2} mt={3}>
                <Typography fontSize={14} fontWeight={500}>Lottery ID</Typography>
                <Box>
                    <Select
                        value={drawIdValue ?? ''}
                        placeholder='Select-'
                        onChange={(event: SelectChangeEvent) => { setDrawIdValue(event.target.value) }}
                        displayEmpty
                        sx={styleInput}
                        inputProps={{ 'aria-label': 'Select campaign' }}
                        MenuProps={{ slotProps: { paper: { sx: { maxHeight: 250 } } } }}
                    >
                        <MenuItem value={"all"}>
                            <Typography color={"secondary.100"}>All</Typography>
                        </MenuItem>
                        {
                            listJackpot.map((jackpot, index) =>
                                <MenuItem value={jackpot.draw_id.toString()} key={index}>
                                    <Typography color={'white'} fontWeight={500} component={'span'} fontSize={14}>Lottery{" "}
                                        <Typography color={"secondary.main"} fontWeight={500} component={'span'} fontSize={'inherit'}>
                                            #{jackpot.lottery_id}
                                        </Typography>
                                    </Typography>
                                </MenuItem>

                            )
                        }
                        <Box ref={bottomRef} />
                    </Select>
                </Box>

                {/* <Typography flex={{ xs: 1, md: 1 }} color='secondary.100' textAlign={{ xs: 'center', sm: 'left' }} fontSize={14} fontWeight={500}>12/12/2022, 16:20:00</Typography> */}
            </Stack>

            <Box mt={3}>
                <Box maxWidth={763} mx='auto'>
                    <Typography variant='h5' textAlign={'center'} mb={1} fontWeight={700} textTransform={'uppercase'} display={{ xs: 'block', md: 'none' }}>Lucky  number</Typography>
                    <Ticket numbers={dataLotteryBuyDrawId?.res ?? [null, null, null, null, null, null]} size={isMediumScreen ? 40 : 60} maxHeight={96} py={{ xs: 1, md: 2 }} px={{ xs: 2, md: 5 }} gap={{ xs: 1, md: 3 }} text={<Typography display={{ xs: 'none', md: 'block' }} variant='h5' fontWeight={700} textTransform={'uppercase'}>Lucky <br /> number</Typography>} />
                </Box>
                <Typography variant='h5' fontWeight={700} mt={3}>Winner List</Typography>
                {
                    winnerList.length <= 0 ?
                        <Typography variant='body2' fontWeight={700} mt={3} color="secondary.100" textAlign={'center'}>Have no winner yet!</Typography>
                        :
                        <Box mt={3}>
                            <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                                {
                                    winnerList.map((winner, i) =>
                                        <ResultTicketInfo key={i} data={winner} resultLottery={dataLotteryBuyDrawId} />
                                    )
                                }
                            </Stack>
                            <Box display={{ xs: 'none', md: 'block' }}>
                                <TableResultRoll data={winnerList} resultLottery={dataLotteryBuyDrawId} />
                            </Box>
                            <Box textAlign={'center'}>
                                <Button
                                    onClick={() => setPage(prev => prev + 1)}
                                    variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                            </Box>
                        </Box>
                }
            </Box>

        </>
    )
}

export default Result
const styleInput = {
    border: '0px solid',
    borderColor: 'background.paper',
    borderRadius: 2,
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    width: "100%",
    fontSize: 14,
    backgroundColor: "background.paper",

    '& .MuiInputBase-root': {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: "1.25rem",
        cursor: "pointer",
    },
    // bgcolor: 'background.default',
    'div': {
        py: 1,
        pl: 2,
        fontSize: 16,
    },
    '& .MuiSvgIcon-root ': {
        fill: Colors.secondary,
    },
    '& .MuiPaper-root ': {

        backgroundColor: "background.paper",
    }

}