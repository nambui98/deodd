import { Box, Stack, Typography } from '@mui/material'
import MyImage from 'components/ui/image'
import React from 'react'
import { getPathAvatar } from 'utils/checkAvatar'
import Ticket from './Ticket'
import { USDTIcon } from 'utils/Icons'
import { ButtonLoading } from 'components/ui/button'
import { TicketType } from '../MyTicket'
import { WinnerType } from '../Result'
import { Convert } from 'utils/convert'
import { BigNumber, ethers } from 'ethers'
import { Format } from 'utils/format'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useSiteContext } from 'contexts/SiteContext'
import { AxiosResponse } from 'axios'
import { UseMutationResult } from '@tanstack/react-query'
import { JackpotType } from 'libs/types'

type Props = {
    data: TicketType | undefined,
    getStatus: (ticket: TicketType) => string | undefined,
    resultLottery?: JackpotType
}

export const MyTicketInfo = ({ data, getStatus, resultLottery }: Props) => {
    const { setOpenModalProvablyFair } = useLotteryContext();
    return (
        <Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <Typography variant='body2'>
                    Lottery{" "}
                    <Typography component={'span'} variant='body2' color="secondary.main">#{data?.lottery_id}</Typography>
                </Typography>
                <Typography ml="auto" color="secondary.100" variant='body2'>
                    Ticket{" "}
                    <Typography component={'span'} variant='body2' color="white">{data?.quantity}</Typography>
                </Typography>
                <Typography ml={3} color="secondary.100" variant='body2'>
                    Matches{" "}
                    <Typography component={'span'} variant='body2' color="white">{data?.matches}</Typography>
                </Typography>
            </Stack>
            <Box sx={{ cursor: 'pointer' }} onClick={() => resultLottery ? setOpenModalProvablyFair({ open: true, ticketSelected: data?.series!, resultLottery }) : {}}>
                <Ticket mt={1} gap={1} numbers={data?.series ?? [null, null, null, null, null, null]} />
            </Box>

            <Stack direction={'row'} mt={2} gap={2} alignItems={'center'}>
                <Stack gap={.5} direction={'row'} alignItems={'center'}>
                    <Typography variant='body2' color="secondary.100">
                        Prize{" "}
                        <Typography sx={{ verticalAlign: '' }} component={'span'} variant='body2' color="white">

                            {Format.formatMoney(data?.prize ? ethers.utils.formatEther(BigNumber.from(data?.prize.toString())) : 0)}
                        </Typography>
                    </Typography>

                    <USDTIcon fill="#50ae94" width={16} height={16} />

                </Stack>
                <Typography ml="auto" color="secondary.100" variant='body2'>
                    Status{" "}
                    <Typography ml={.5} component={'span'} variant='body2' color="white">{getStatus(data!)}</Typography>
                </Typography>
            </Stack>

        </Stack>
    )
}
type ResultTicketProps = {
    data: WinnerType, resultLottery?: JackpotType
}
export const ResultTicketInfo = ({ data, resultLottery }: ResultTicketProps) => {

    const { setOpenModalProvablyFair } = useLotteryContext();
    return (
        <Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <MyImage width={40} height={40} src={getPathAvatar(data.avatar_id ?? 0)} alt="" />
                <Box>
                    <Typography variant='caption' component={'p'}>{data.user_name}</Typography>
                    <Typography variant='caption' color="secondary.100">({Convert.convertWalletAddress(data.wallet, 4, 4)})</Typography>
                </Box>
                <Stack ml="auto">
                    <Typography ml={3} color="secondary.100" variant='body2'>
                        Matches{" "}
                        <Typography component={'span'} variant='body2' color="white">{data.matches}</Typography>
                    </Typography>
                    <Stack gap={.5} direction={'row'} alignItems={'center'}>
                        <Typography variant='body2' color="secondary.100">
                            Prize{" "}
                            <Typography sx={{ verticalAlign: '' }} component={'span'} variant='body2' color="white">

                                {Format.formatMoney(ethers.utils.formatEther(BigNumber.from(data.prize.toString())))}
                            </Typography>
                        </Typography>
                        <USDTIcon fill="#50ae94" width={16} height={16} />
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={{ cursor: 'pointer' }} onClick={() => resultLottery ? setOpenModalProvablyFair({ open: true, ticketSelected: data.series, resultLottery }) : {}}>
                <Ticket mt={1} gap={1} numbers={data.series} />
            </Box>
        </Stack>
    )
}

export const TicketClaimInfo = ({ ticket, getStatus, handleClaim, resultLottery }: {
    ticket: TicketType, getStatus: (ticket: TicketType) => string | undefined,
    handleClaim: UseMutationResult<AxiosResponse<any, any>, any, (string | number)[], unknown>,
    resultLottery?: JackpotType
}) => {

    let status = getStatus(ticket)
    return (
        <Stack gap={2}>
            <MyTicketInfo data={ticket} resultLottery={resultLottery} getStatus={getStatus} />
            <Box sx={{ alignSelf: 'flex-end' }}>

                {
                    status !== 'Claimed' && status !== "Claim" ?
                        <Typography variant='body2'>{getStatus(ticket)}</Typography>
                        :
                        <Box>
                            <ButtonLoading disabled={status === "Claimed"} onClick={() => handleClaim.mutate([ticket.s_id!])} fullWidth={false} sx={{ width: 'auto', px: 2, py: 1, borderRadius: 2, textTransform: 'none' }}>{status}</ButtonLoading>
                        </Box>
                }

            </Box>
        </Stack>
    )
}