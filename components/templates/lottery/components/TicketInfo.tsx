import { Box, Stack, Typography } from '@mui/material'
import MyImage from 'components/ui/image'
import React from 'react'
import { getPathAvatar } from 'utils/checkAvatar'
import Ticket from './Ticket'
import { USDTIcon } from 'utils/Icons'

type Props = {}

export const MyTicketInfo = (props: Props) => {
    return (
        <Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <Typography variant='body2'>
                    Lottery{" "}
                    <Typography component={'span'} variant='body2' color="secondary.main">#151223</Typography>
                </Typography>
                <Typography ml="auto" color="secondary.100" variant='body2'>
                    Ticket{" "}
                    <Typography component={'span'} variant='body2' color="white">4</Typography>
                </Typography>
                <Typography ml={3} color="secondary.100" variant='body2'>
                    Matches{" "}
                    <Typography component={'span'} variant='body2' color="white">--</Typography>
                </Typography>
            </Stack>
            <Ticket mt={1} gap={1} numbers={[12, 33, 11, 23, 4, 6]} />
            <Stack direction={'row'} mt={2} gap={2} alignItems={'center'}>
                <Stack gap={.5} direction={'row'} alignItems={'center'}>

                    <Typography variant='body2' color="secondary.100">
                        Prize{" "}

                        <Typography sx={{ verticalAlign: '' }} component={'span'} variant='body2' color="white">0.51345

                        </Typography>
                    </Typography>

                    <USDTIcon fill="#50ae94" width={16} height={16} />

                </Stack>
                <Typography ml="auto" color="secondary.100" variant='body2'>
                    Status{" "}
                    <Typography ml={.5} component={'span'} variant='body2' color="white">Claimed</Typography>
                </Typography>
            </Stack>

        </Stack>
    )
}

export const ResultTicketInfo = (props: Props) => {
    return (
        <Stack>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
                <MyImage width={40} height={40} src={getPathAvatar(1)} alt="" />
                <Box>
                    <Typography variant='caption' component={'p'}>{'NamNam'}</Typography>
                    <Typography variant='caption' color="secondary.100">(3535***3534)</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}

