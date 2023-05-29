import { Avatar, Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SelectBox from 'components/common/SelectBox';
import MyTabs, { TypeTab, MyTabs2 } from 'components/common/Tabs';
import { ButtonTertiary } from 'components/ui/button';
import React, { useState } from 'react'
import { Clock2Icon, CopyIcon, CupIcon, NotiIcon } from 'utils/Icons';
import { AvatarImage, BronzeImage, CoinEmptyImage, DiamondImage, GoldImage, ReferralImage } from 'utils/Images'
import MyImage from 'components/ui/image';

type Props = {}
function createData(
  name: string,
  userName: string,
  quantityFriends: string | undefined,
) {
  return { name, userName, quantityFriends };
}
function createData2(
  userName: string,
  bronze: string,
  gold: string,
  diamond: string,
) {
  return { userName, bronze, gold, diamond };
}

function JackpotPoolLeaderboard({ }: Props) {
  const [valueTab, setValueTab] = useState(1)
  let rows = [
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),

    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),

    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
    createData('Win/Lose Streak Campaign',
      'Arlene McCoy (3535***3534)',
      '1000'),
  ];

  const listTabs: TypeTab[] = [
    {
      id: 1,
      title: 'Leaderboard',
      icon: <Box mr={1} lineHeight={0}><CupIcon width={20} /></Box>
    },
    {
      id: 2,
      title: 'History',
      icon: <Box mr={1} lineHeight={0}><Clock2Icon width={20} /></Box>
    },

  ]
  return (
    <Box width={1}>
      <Stack direction={"row"} mb={2} gap={2} justifyContent={"space-between"} sx={theme => ({
        [theme.breakpoints.up("xs").replace("@media", "@container")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.up("md").replace("@media", "@container")]: {
          flexDirection: "row",
        },
        flexDirection: { xs: "column", md: "row" } // fallback
      })}>
        <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
        <SelectBox />
      </Stack>
      <TableContainer sx={{ backgroundColor: "transparent", position: 'relative', maxHeight: '500px', backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
              <TableCell sx={{ textTransform: "uppercase" }}>Rank</TableCell>
              <TableCell sx={{ textTransform: "uppercase" }} align="left">Users</TableCell>
              <TableCell sx={{ textTransform: "uppercase" }} align="right">Tosspoints</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {rows.length > 0 && rows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  'td, th': { border: 0, py: 1 }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant='caption'>{index}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                    {/* <img src={AvatarImage} width={24} alt="" /> */}
                    <MyImage width={24} src={AvatarImage} alt="Avatar Image" />
                    <Typography variant='caption'>{row.userName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right"><Typography variant='caption' color="secondary.200"> {row.quantityFriends}</Typography></TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                position: 'sticky',
                bottom: 0,
                right: 0,
                left: 0,
                'td, th': { border: 0, py: 1 },
                bgcolor: 'secondary.main',
                color: 'background.paper'
              }}
            >
              <TableCell component="th" scope="row">
                <Typography variant='caption' color="background.paper">3</Typography>
              </TableCell>
              <TableCell align="left">
                <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                  {/* <img src={AvatarImage} width={24} alt="" /> */}
                  <MyImage width={24} height={24} src={AvatarImage} alt="Avatar Image" />
                  <Typography variant='caption' color="background.paper">{"nambui"}</Typography>
                </Stack>
              </TableCell>
              <TableCell align="right"><Typography variant='caption' color="background.paper"> 100</Typography></TableCell>
            </TableRow>

          </TableBody>

        </Table>
        {rows.length <= 0 &&
          <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
            {/* <img width={144} src={CoinEmptyImage} alt="" /> */}
            <MyImage width={144} height={144} src={CoinEmptyImage} alt="Empty Coin Image" />

            <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
          </Box>}

      </TableContainer>
    </Box>
  )
}

export default JackpotPoolLeaderboard;