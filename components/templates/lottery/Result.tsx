import { Box, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
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
    const { dataLotteryBuyDrawId, drawIdValue } = useLotteryContext();
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

    useEffect(() => {
        if (drawIdValue) {
            setPage(1);
            setWinnerList([])
        }
    }, [drawIdValue])

    return (
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
                                    <ResultTicketInfo key={i} data={winner} />
                                )
                            }
                        </Stack>
                        <Box display={{ xs: 'none', md: 'block' }}>
                            <TableResultRoll data={winnerList} />
                        </Box>
                        <Box textAlign={'center'}>
                            <Button
                                onClick={() => setPage(prev => prev + 1)}
                                variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                        </Box>
                    </Box>

            }
        </Box>
    )
}

export default Result
