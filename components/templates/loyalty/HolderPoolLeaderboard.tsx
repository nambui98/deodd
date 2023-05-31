import { Avatar, Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SelectBox from 'components/common/SelectBox';
import MyTabs, { TypeTab, MyTabs2 } from 'components/common/Tabs';
import { ButtonTertiary } from 'components/ui/button';
import React, { useState } from 'react'
import { Clock2Icon, CopyIcon, CupIcon, NotiIcon } from 'utils/Icons';
import { AvatarImage, BronzeImage, CoinEmptyImage, DiamondImage, GoldImage, ReferralImage } from 'utils/Images'
import MyImage from 'components/ui/image';
import Image from 'next/image';

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

function HolderPoolLeaderboard({ }: Props) {
  const [valueTab, setValueTab] = useState(1)
  let rows2 = [
    createData2(
      'Arlene McCoy (3535***3534)',
      '10',
      '3',
      '1000'),

    createData2(
      'Arlene McCoy (3535***3534)',
      '10',
      '3',
      '1000'),

    createData2(
      'Arlene McCoy (3535***3534)',

      '10',
      '3',
      '1000'),
    createData2(
      'Arlene McCoy (3535***3534)',
      '3',
      '10',
      '1000'),
    createData2(
      'Arlene McCoy (3535***3534)',
      '3',
      '10',
      '1000'),
    createData2(
      'Arlene McCoy (3535***3534)',
      '3',
      '10',
      '1000'),
    createData2(
      'Arlene McCoy (3535***3534)',
      '10',
      '3',
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
  const selectOptions = [
    {
      value: "current-period",
      text: "Current Period",
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
        <SelectBox selectOptions={selectOptions} />
      </Stack>

      <TableContainer sx={{ maxHeight: '500px', boxShadow: "none", borderRadius: "0.5rem", backgroundColor: "transparent" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
              <TableCell sx={{ p: 0 }}>Rank</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="center">
                <Image width={24} height={24} src={BronzeImage} alt="Bronze Image" />
                {/* <img width={24} src={BronzeImage} alt="" /> */}
              </TableCell>
              <TableCell align="center">
                <Image width={24} height={24} src={GoldImage} alt="Gold Image" />
                {/* <img width={24} src={GoldImage} alt="" /> */}
              </TableCell>
              <TableCell align="center">
                <Image width={24} height={24} src={DiamondImage} alt="Diamond Image" />
                {/* <img width={24} src={DiamondImage} alt="" /> */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{
            "tr:first-child th": {
              borderTopLeftRadius: "0.5rem",
            },
            "tr:last-child th": {
              borderBottomLeftRadius: "0.5rem",
            },
            "tr:first-child td:last-child": {
              borderTopRightRadius: "0.5rem"
            },
            "tr:last-child td:last-child": {
              borderBottomRightRadius: "0.5rem",
            },
            'td, th': { border: 0, py: 1, backgroundColor: "background.paper" },
          }} >
            {rows2.length > 0 && rows2.map((row, index) => (
              <TableRow
                key={row.userName}
              >
                <TableCell component="th" scope="row">
                  <Typography variant='caption' color={"text.disabled"}>{index}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                    {/* <img src={AvatarImage} width={24} alt="" /> */}
                    <MyImage width={24} height={24} src={AvatarImage} alt="Avatar Image" />
                    <Typography variant='caption'>{row.userName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center"><Typography variant='caption' color="text.disabled"> {row.bronze}</Typography></TableCell>
                <TableCell align="center"><Typography variant='caption' color="text.disabled"> {row.gold}</Typography></TableCell>
                <TableCell align="center"><Typography variant='caption' color="text.disabled"> {row.diamond}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow
            sx={{
              position: 'sticky',
              bottom: 0,
              'td, th': { border: 0, py: 1 },
              bgcolor: 'secondary.main',
              color: 'background.paper',
            }}
          >
            <TableCell></TableCell>
            <TableCell component="th" scope="row" width={"8.2%"}>
              <Typography variant='caption' color="background.paper">3</Typography>
            </TableCell>
            <TableCell align="left">
              <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                {/* <img src={AvatarImage} width={24} alt="" /> */}
                <MyImage width={24} height={24} src={AvatarImage} alt="Avatar Image" />

                <Typography variant='caption' color="background.paper">{"nambui"}</Typography>
              </Stack>
            </TableCell>
            <TableCell align="center"><Typography variant='caption' color="secondary.100"> 1</Typography></TableCell>
            <TableCell align="center"><Typography variant='caption' color="secondary.100"> 2</Typography></TableCell>
            <TableCell align="center"><Typography variant='caption' color="secondary.100"> 3</Typography></TableCell>
          </TableRow>
        </Table>
        {rows2.length <= 0 &&
          <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
            {/* <img width={144} src={CoinEmptyImage} alt="" /> */}
            <MyImage width={144} height={144} src={CoinEmptyImage} alt="Empty Coin Image" />
            <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
          </Box>}
      </TableContainer>
    </Box>
  )
}

export default HolderPoolLeaderboard;