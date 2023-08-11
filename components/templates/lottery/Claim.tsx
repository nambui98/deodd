import { Box, Button, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loader from 'components/common/Loader'
import { ButtonLoading } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import { isAfter } from 'date-fns'
import { BigNumber } from 'ethers'
import { DeoddService } from 'libs/apis'
import { useEffect, useState } from 'react'
import { CoinEmptyImage } from 'utils/Images'
import { TicketType } from './MyTicket'
import { TableClaim } from './components/Table/Table'
import { TicketClaimInfo } from './components/TicketInfo'

type Props = {}

const Claim = (props: Props) => {
    const { walletAddress, walletIsConnected, handleConnectWallet } = useWalletContext();
    const { setIsError, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const { setOpenModalBuyTicket, currentLottery, isRollComing, drawIdValue } = useLotteryContext();
    const STEP_LIMIT = 5;
    const [limit, setLimit] = useState(STEP_LIMIT);
    const [myTickets, setMyTickets] = useState<TicketType[]>([])
    const [total, setTotal] = useState<number>(0)
    useEffect(() => {
        if (drawIdValue || !walletAddress) {
            setLimit(STEP_LIMIT);
            setMyTickets([])
            setTotal(0);
        }
    }, [drawIdValue, walletAddress])

    const { isFetching, refetch } = useQuery({
        queryKey: ["getListClaimJackpot", walletAddress, limit, drawIdValue],
        enabled: !!walletAddress,
        refetchOnWindowFocus: false,
        // suspense: myTickets.length > 0 ? false : true,
        queryFn: () => DeoddService.getMyTicket({ limit: limit, offset: 0, drawId: drawIdValue }),
        select: (data: any) => {
            let result: { tickets: TicketType[], total: number } | undefined;
            if (data.status === 200) {
                result = data.data.data;


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

        if (drawFinishedTime && isAfter(drawFinishedTime, new Date())) return "Be able to claim in 30 mins"

        if (ticket.claimed) return "Claimed"

        if (!ticket.claimed) return "Claim"

        if (ticket.prize === 0 || (parseFloat(ticket.prize.toString())) === 0 || !ticket.prize) return 'Slipped'
    }


    let checkHasPrize = myTickets?.some(ticket => BigNumber.from(ticket.prize.toString()).gt(BigNumber.from(0)));
    // hanlde claim 
    const handleClaim = useMutation({
        mutationFn: (sIds: (string | number)[]) => {
            return DeoddService.claimLotteryPrize(sIds)
        },
        onError(error: any, variables, context) {
            setIsError(true)
            setTitleError(error.response.data.meta.error_message)
        },
        onSuccess: (data) => {
            if (data.data.data) {
                setTitleSuccess('Claim successfully')
                setIsSuccess(true);
                refetch();
            } else {
                setIsError(true);
                setTitleError(data.data.meta.error_message)
            }
        },
    });

    return (
        <Box mt={3}>
            {
                !isFetching && myTickets.length === 0 &&
                <Stack
                    sx={{ inset: 0 }}
                    gap={5}
                    height={1}
                    width={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
                >
                    <MyImage
                        sx={{
                            width: { xs: 80, md: 144 },
                            height: { xs: 80, md: 144 },
                        }}
                        src={CoinEmptyImage}
                        alt="Empty Coin Image"
                    />
                    <Typography
                        variant='body1'
                        fontWeight={600}
                        color={"secondary.100"}
                    >
                        You have no prizes to claim at the moment. Keep trying your luck in <br /> the upcoming prize draws.
                    </Typography>
                    <Box>
                        {
                            walletAddress !== undefined ? (
                                !walletIsConnected ?
                                    <ButtonLoading
                                        onClick={handleConnectWallet}
                                        fullWidth={false}
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
                        }
                    </Box>
                </Stack>

            }

            {
                myTickets && myTickets.length > 0 &&
                <Box mt={3}>
                    <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                        {
                            myTickets.map(ticket => <TicketClaimInfo key={ticket.draw_id} handleClaim={handleClaim} getStatus={getStatus} ticket={ticket} />)
                        }
                    </Stack>
                    <Box display={{ xs: 'none', md: 'block' }}>
                        <TableClaim handleClaim={handleClaim} data={myTickets} checkHasPrize={checkHasPrize} getStatus={getStatus} />
                    </Box>

                    <Loader isInComponent isLoadingProps={isFetching} />
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
                </Box>


            }

        </Box>
    )
}

export default Claim
