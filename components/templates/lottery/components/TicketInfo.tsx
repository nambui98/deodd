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

type Props = {
    data: TicketType | undefined
}

export const MyTicketInfo = ({ data }: Props) => {
    const { setOpenModalProvablyFair } = useLotteryContext();
    const { currentLottery } = useSiteContext();
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
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenModalProvablyFair({ open: true, ticketSelected: data?.series! })}>
                <Ticket mt={1} gap={1} numbers={data?.series!} />
            </Box>

            <Stack direction={'row'} mt={2} gap={2} alignItems={'center'}>
                <Stack gap={.5} direction={'row'} alignItems={'center'}>
                    <Typography variant='body2' color="secondary.100">
                        Prize{" "}
                        <Typography sx={{ verticalAlign: '' }} component={'span'} variant='body2' color="white">
                            {data?.prize}
                        </Typography>
                    </Typography>

                    <USDTIcon fill="#50ae94" width={16} height={16} />

                </Stack>
                <Typography ml="auto" color="secondary.100" variant='body2'>
                    Status{" "}
                    <Typography ml={.5} component={'span'} variant='body2' color="white">{data?.draw_id === currentLottery?.draw_id ? 'Wait for draw' : data?.claimed ? 'Claimed' : 'Slipped'}</Typography>
                </Typography>
            </Stack>

        </Stack>
    )
}
type ResultTicketProps = {
    data: WinnerType
}
export const ResultTicketInfo = ({ data }: ResultTicketProps) => {

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

            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenModalProvablyFair({ open: true, ticketSelected: data.series })}>
                <Ticket mt={1} gap={1} numbers={data.series} />
            </Box>
        </Stack>
    )
}

export const TicketClaimInfo = () => {
    return (
        <Stack gap={2}>
            <MyTicketInfo data={undefined} />
            <Box sx={{ alignSelf: 'flex-end' }}>
                <ButtonLoading disabled fullWidth={false} sx={{ width: 'auto', px: 2, py: 1, borderRadius: 2, textTransform: 'none' }}>
                    Claimed
                </ButtonLoading>


            </Box>
        </Stack>
    )
}