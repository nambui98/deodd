import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow as MuiTableRow } from '@mui/material'
import Ticket from '../Ticket'
import React from 'react'
import { USDTIcon } from 'utils/Icons'
import TableRow from './TableRow'

type Props = {}

export const TableMyTickets = (props: Props) => {
    return (
        <TableContainer sx={{ backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <MuiTableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                        <TableCell >Lottery ID</TableCell>
                        <TableCell >Numbers</TableCell>
                        <TableCell >Ticket</TableCell>
                        <TableCell >Matches</TableCell>
                        <TableCell >Prize</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </MuiTableRow>
                </TableHead>
                <TableBody>
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                </TableBody>
            </Table>
            <Box textAlign={'center'}>
                <Button variant='text' sx={{ color: 'secondary.main' }} >View more</Button>
            </Box>
        </TableContainer>


    )
}
