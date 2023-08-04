import { Box, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import { SubtractImage } from 'utils/Images'
import Ticket from './components/Ticket'
import MyImage from 'components/ui/image'
import { getPathAvatar } from 'utils/checkAvatar'
import { TableResultRoll } from './components/Table/Table'
import { ResultTicketInfo } from './components/TicketInfo'

type Props = {}

const Result = (props: Props) => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box mt={3}>
            <Box maxWidth={763} mx='auto'>
                <Typography variant='h5' textAlign={'center'} mb={1} fontWeight={700} textTransform={'uppercase'} display={{ xs: 'block', md: 'none' }}>Lucky  number</Typography>
                <Ticket numbers={[44, 55, 66, 77, 88, 99]} size={isMediumScreen ? 40 : 60} maxHeight={96} py={{ xs: 1, md: 2 }} px={{ xs: 2, md: 5 }} gap={{ xs: 1, md: 3 }} text={<Typography display={{ xs: 'none', md: 'block' }} variant='h5' fontWeight={700} textTransform={'uppercase'}>Lucky <br /> number</Typography>} />
            </Box>
            <Typography variant='h5' fontWeight={700} mt={3}>Winner List</Typography>
            <Box mt={3}>
                <Stack display={{ xs: 'flex', md: 'none' }} divider={<Divider sx={{ my: 2 }} />}>
                    <ResultTicketInfo data={undefined} />
                    <ResultTicketInfo data={undefined} />
                    <ResultTicketInfo data={undefined} />
                    <ResultTicketInfo data={undefined} />
                </Stack>
                <Box display={{ xs: 'none', md: 'block' }}>

                    <TableResultRoll />
                </Box>
                <Box textAlign={'center'}>
                    <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Result
