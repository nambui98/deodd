import { Box, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './components/Ticket'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'
import { TableJackpotWinners } from './components/Table/Table'
import { ResultTicketInfo } from './components/TicketInfo'
import { WinnerType } from './Result'
import { useQuery } from '@tanstack/react-query'
import { DeoddService } from 'libs/apis'
import { useLotteryContext } from 'contexts/LotteryContext'

type Props = { drawId: string | null }

const JackpotWinner = ({ drawId }: Props) => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { dataLotteryBuyDrawId } = useLotteryContext();
    const [page, setPage] = useState<number>(1)
    const [winnerList, setWinnerList] = useState<WinnerType[]>([]);
    const { data: res } = useQuery({
        queryKey: ["getJackpotWinnerList", page, drawId],
        // suspense: winnerList.length > 0 ? false : true,
        refetchOnWindowFocus: false,
        queryFn: () => DeoddService.getJackpotWinner({ page: page, size: 10, drawId }),
        onSuccess(data: WinnerType[] | null) {
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
        if (drawId) {
            setPage(1);
            setWinnerList([])
        }
    }, [drawId])

    return (
        <Box mt={3}>
            <Box maxWidth={763} mx='auto'>
                <Typography variant='h5' textAlign={'center'} mb={1} fontWeight={700} textTransform={'uppercase'} display={{ xs: 'block', md: 'none' }}>Lucky  number</Typography>
                <Ticket numbers={dataLotteryBuyDrawId?.res ?? [null, null, null, null, null, null]} size={isMediumScreen ? 40 : 60} maxHeight={96} py={{ xs: 1, md: 2 }} px={{ xs: 2, md: 5 }} gap={{ xs: 1, md: 3 }} text={<Typography display={{ xs: 'none', md: 'block' }} variant='h5' fontWeight={700} textTransform={'uppercase'}>Lucky <br /> number</Typography>} />
            </Box>
            <Typography variant='h5' fontWeight={700} mt={5}>Jackpot Winner</Typography>
            <Box mt={3}>
                <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                    {
                        winnerList?.map((winner, index) =>
                            <ResultTicketInfo key={index} data={winner} />
                        )
                    }
                </Stack>
                <Box display={{ xs: 'none', md: 'block' }}>

                    <TableJackpotWinners data={winnerList} />

                </Box>
                <Box textAlign={'center'}>
                    <Button variant='text' sx={{ color: 'secondary.main' }} onClick={() => setPage(prevPage => prevPage += 1)} >View more</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default JackpotWinner
