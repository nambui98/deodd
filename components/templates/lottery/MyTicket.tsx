import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ButtonLoading } from 'components/ui/button'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import { useEffect, useState } from 'react'
import { TableMyTickets } from './components/Table/Table'
import { MyTicketInfo } from './components/TicketInfo'
import { isAfter } from 'date-fns'
import { da } from 'date-fns/locale'
import Loader from 'components/common/Loader'
import { MyTabs2 } from 'components/common/Tabs'
import { useInView } from 'react-intersection-observer'
import { Colors } from 'constants/index'

type Props = {
    setValueTab: Function
}
export type TicketType = {
    wallet: string,
    draw_id: number,
    matches: number,
    purchased_atz: string,
    quantity: number,
    series: number[],
    ticket_price: string,
    lottery_id: number | null,
    claimed: boolean,
    prize: number,
    draw_finished_time?: string,
    s_id?: string | number

}
const MyTicket = ({ setValueTab }: Props) => {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setOpenModalBuyTicket, listJackpot, setPageListJackpot, currentLottery, isRollComing } = useLotteryContext();
    const STEP_LIMIT = 5;
    const [limit, setLimit] = useState(STEP_LIMIT);
    const [myTickets, setMyTickets] = useState<TicketType[]>([])
    const [total, setTotal] = useState<number>(0)
    const [drawIdValue, setDrawIdValue] = useState<string | null>(null);
    useEffect(() => {
        if (drawIdValue || !walletAddress) {
            setLimit(STEP_LIMIT);
            setMyTickets([])
            setTotal(0);
        }
    }, [drawIdValue, walletAddress])

    const { isFetching } = useQuery({
        queryKey: ["getMyTicket", walletAddress, limit, drawIdValue],
        enabled: !!walletAddress,
        refetchOnWindowFocus: false,
        // suspense: myTickets.length > 0 ? false : true,
        queryFn: () => DeoddService.getMyTicket({ limit: limit, offset: 0, drawId: drawIdValue }),
        select: (data: any) => {
            let result: { tickets: TicketType[], total: number } | undefined;
            if (data.status === 200) {
                result = data.data.data;
                // if (data.data.data.total === data.data.data.tickets.length) {
                //     setIsEnd(true);
                // }
            } else {
                result = undefined;
            }
            return result;
        },
        onSuccess(data) {
            setMyTickets(data?.tickets ?? [])
            setTotal(data?.total ?? 0)
        },
    });
    const getStatus = (ticket: TicketType) => {
        let drawFinishedTime = new Date(ticket.draw_finished_time ?? '');
        drawFinishedTime.setMinutes(drawFinishedTime.getMinutes() + 30)

        if (ticket.draw_id === currentLottery?.draw_id) return 'Wait for draw'

        if (drawFinishedTime && isAfter(drawFinishedTime, new Date())) return "Claim within 30 minutes"

        if (ticket.claimed) return "Claimed"

        if (ticket.prize === 0 || (parseFloat(ticket.prize.toString())) === 0 || !ticket.prize) return 'Slipped'
        if (!ticket.claimed) return "Not Claimed"

    }

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
            setDrawIdValue(currentLottery.draw_id.toString())
        }
    }, [currentLottery])
    const { data: dataLotteryBuyDrawId } = useQuery({
        queryKey: ["lotteryBuyDrawIdMyTicket", drawIdValue],
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
        setDrawIdValue(currentLottery?.draw_id.toString() ?? null)
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


            {
                (myTickets === undefined || myTickets.length <= 0) &&
                <Stack alignItems={'center'} justifyContent={'center'} mt={3}>
                    <Typography variant='body2'>You have no ticket</Typography>
                    <Box mt={3}>
                        {
                            !isRollComing ?
                                walletAddress !== undefined ? (
                                    !walletIsConnected ?
                                        <ButtonLoading
                                            fullWidth={false}
                                            onClick={handleConnectWallet}
                                            sx={{
                                                width: 'auto',
                                                px: 5,
                                                py: 2,
                                                textTransform: 'none',
                                                backgroundColor: 'background.default'
                                            }}>
                                            Connect Wallet to Buy Ticket
                                        </ButtonLoading>
                                        :
                                        <ButtonLoading
                                            onClick={() => setOpenModalBuyTicket(true)}
                                            fullWidth={false}
                                            sx={{
                                                width: 'auto',
                                                px: 5,
                                                py: 2,
                                                textTransform: 'none',
                                                backgroundColor: 'background.default'
                                            }}>
                                            Buy Ticket
                                        </ButtonLoading>

                                ) :
                                    <Skeleton variant="rounded" width={160} height={60} />
                                : null
                        }
                    </Box>
                </Stack>

            }

            {
                myTickets && myTickets?.length > 0 &&
                <Box mt={3} maxHeight={500} overflow={'auto'}>
                    <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                        {
                            myTickets?.map(ticket => <MyTicketInfo getStatus={getStatus} data={ticket} resultLottery={dataLotteryBuyDrawId} key={ticket.draw_id} />)
                        }
                    </Stack>
                    <Box display={{ xs: 'none', md: 'block' }}>
                        <TableMyTickets data={myTickets} getStatus={getStatus} resultLottery={dataLotteryBuyDrawId} />
                    </Box>
                    <Loader isInComponent isLoadingProps={isFetching} />
                </Box>
            }
            {
                myTickets.length < total &&
                <Box textAlign={'center'}>
                    <Button
                        onClick={() => {
                            setLimit((prev) => prev + STEP_LIMIT)
                        }}
                        variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                </Box>
            }
        </>

    )

}

export default MyTicket
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