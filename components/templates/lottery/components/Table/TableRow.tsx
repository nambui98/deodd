import React from 'react'
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow as MuiTableRow, Typography } from '@mui/material'
import Ticket from '../Ticket'
import { USDTIcon } from 'utils/Icons'

type Props = {}

const TableRow = (props: Props) => {
  return (
    <MuiTableRow
      sx={{
        'td, th': { border: 0, py: 1 }, 'th': {
          display: 'block'
        }
      }}
    >
      <TableCell width={160} >
        Lottery <Typography variant='body2' fontWeight={'inherit'} color={'secondary.main'} component={'span'}>#151223</Typography>
      </TableCell>
      <TableCell
        align="right"
      >

        <Ticket numbers={[22, 33, 11, 45, 66, 77]} />
      </TableCell>
      <TableCell>
        4
      </TableCell>

      <TableCell >
        --
      </TableCell>

      <TableCell align="right" >
        <Stack direction={'row'} gap={1} >
          <Box>--</Box> <USDTIcon fill="#50ae94" width={24} height={24} />
        </Stack>
      </TableCell>
      <TableCell align="right" >
        <Typography variant='body2'>Claimed</Typography>
      </TableCell>
    </MuiTableRow>

  )
}

export default TableRow