import { Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ButtonLoading } from 'components/ui/button'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useWalletContext } from 'contexts/WalletContext'
import { DeoddService } from 'libs/apis'
import { useEffect, useState } from 'react'
import { TableMyTickets } from './components/Table/Table'
import { MyTicketInfo } from './components/TicketInfo'
import { isAfter } from 'date-fns'

type Props = {
    drawId: string | null
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
    draw_finished_time?: string

}
const MyTicket = ({ drawId }: Props) => {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setOpenModalBuyTicket, currentLottery, isRollComing } = useLotteryContext();
    const STEP_LIMIT = 5;
    const [limit, setLimit] = useState(STEP_LIMIT);
    const [myTickets, setMyTickets] = useState<TicketType[]>([])
    const [isEnd, setIsEnd] = useState<boolean>(false)
    useEffect(() => {
        if (drawId || !walletAddress) {
            setLimit(STEP_LIMIT);
            setMyTickets([])
            setIsEnd(false);
        }
    }, [drawId, walletAddress])

    useQuery({
        queryKey: ["getMyTicket", walletAddress, limit, drawId],
        enabled: !!walletAddress,
        refetchOnWindowFocus: false,
        // suspense: myTickets.length > 0 ? false : true,
        queryFn: () => DeoddService.getMyTicket({ limit: limit, offset: 0, drawId }),
        select: (data: any) => {
            let result: TicketType[] = [];
            if (data.status === 200) {
                result = data.data.data;
                if (data.data.data.length === 0) {
                    setIsEnd(true);
                }
            } else {
                result = [];
            }
            return result;
        },
        onSuccess(data) {
            setMyTickets(data)
        },
    });
    const getStatus = (ticket: TicketType) => {
        let drawFinishedTime = new Date(ticket.draw_finished_time ?? '');
        drawFinishedTime.setMinutes(drawFinishedTime.getMinutes() + 30)

        if (ticket.draw_id === currentLottery?.draw_id) return 'Wait for draw'

        if (drawFinishedTime && isAfter(drawFinishedTime, new Date())) return "Be able to claim in 30 mins"

        if (ticket.claimed) return "Claimed"

        if (!ticket.claimed) return "Not Claimed"

        if (ticket.prize === 0 || (parseFloat(ticket.prize.toString())) === 0 || !ticket.prize) return 'Slipped'
    }


    return (
        <>
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
                <Box mt={3}>
                    <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                        {
                            myTickets?.map(ticket => <MyTicketInfo getStatus={getStatus} data={ticket} key={ticket.draw_id} />)
                        }
                    </Stack>
                    <Box display={{ xs: 'none', md: 'block' }}>

                        <TableMyTickets data={myTickets} getStatus={getStatus} />
                    </Box>
                    {
                        !isEnd &&

                        <Box textAlign={'center'}>
                            <Button
                                onClick={() => {
                                    setLimit((prev) => prev + STEP_LIMIT)
                                }}
                                variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                        </Box>
                    }
                </Box>

            }
        </>

    )

}

export default MyTicket
