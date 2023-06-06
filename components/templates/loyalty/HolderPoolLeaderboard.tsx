import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, Typography } from '@mui/material'
import SelectBox from 'components/common/SelectBox';
import { TypeTab, MyTabs2 } from 'components/common/Tabs';
import React, { useState } from 'react'
import { Clock2Icon, CupIcon } from 'utils/Icons';
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
  diamond: string,
  gold: string,
  bronze: string,
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
        "@container (min-width: 1000px)": {
          flexDirection: "row",
        }, // larger then "md" screen a little because the layout is short of width
        flexDirection: { xs: "column", md: "row" }, // fallback
        mx: { xs: 2, md: 0 },
      })}>
        <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
        <SelectBox selectOptions={selectOptions} />
      </Stack>
      {/* Using separate tables to achieve the look similar to the design */}
      {/* Table Head */}
      <Table>
        <colgroup>
          <col width={"12%"} />
          <col />
          <col width={"10%"} />
          <col width={"10%"} />
          <col width={"10%"} />
        </colgroup>
        <TableHead>
          <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
            <TableCell sx={{ px: 0, pl: { xs: 2, md: 0 } }}>Rank</TableCell>
            <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>User</TableCell>
            <TableCell align="center" sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Image width={24} height={24} src={DiamondImage} alt="Diamond Image" />
            </TableCell>
            <TableCell align="center" sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Image width={24} height={24} src={GoldImage} alt="Gold Image" />
            </TableCell>
            <TableCell align="center" sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Image width={24} height={24} src={BronzeImage} alt="Bronze Image" />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      {/* Table Body - wrapped inside another div to keep the border-radius when scrollbar appears */}
      <Box sx={{ borderRadius: { xs: 0, md: 2 }, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: { xs: 218, md: 384 }, height: 384, boxShadow: "none", borderRadius: { xs: 0, md: 2 }, backgroundColor: "background.paper" }}>
          {rows2.length <= 0 &&
            <Stack sx={{ inset: 0 }} position={"absolute"} gap={5} justifyContent={"center"} alignItems={"center"} textAlign={'center'}>
              <MyImage width={144} height={144} src={CoinEmptyImage} alt="Empty Coin Image" />
              <Typography fontSize={"1rem"} lineHeight={"1.375rem"} fontWeight={600} color={"secondary.100"}>There is no one here</Typography>
            </Stack>}
          <Table aria-label="simple table">
            <colgroup>
              <col width={"12%"} />
              <col />
              <col width={"10%"} />
              <col width={"10%"} />
              <col width={"10%"} />
            </colgroup>
            <TableBody sx={{
              'td, th': { border: 0, py: 0.75 },
              "th": { pl: { xs: 2.5, md: 1.5 } },
              "tr:first-child": {
                "td, th": {
                  pt: 1,
                }
              },
              "tr:last-child": {
                "td, th": {
                  pb: 1,
                }
              },
            }} >
              {rows2.length > 0 && rows2.map((row, index) => (
                <TableRow key={row.userName}>
                  <TableCell component="th" scope="row" sx={{ px: 0 }}>
                    <Typography variant='caption' color={"text.disabled"}>{index}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0, pl: 0.5 }}>
                    <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                      <Image width={24} height={24} src={AvatarImage} alt="Avatar Image" />
                      <Typography variant='caption' fontWeight={400}>{row.userName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption' color="text.disabled"> {row.diamond}</Typography></TableCell>
                  <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption' color="text.disabled"> {row.gold}</Typography></TableCell>
                  <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption' color="text.disabled"> {row.bronze}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Table Footer */}
      <Table sx={{
        width: "calc(100% - 1rem)",
        margin: "auto",
        borderRadius: "0 0 0.5rem 0.5rem",
        bgcolor: 'secondary.main',
      }}>
        <colgroup>
          <col width={"12%"} />
          <col />
          <col width={"10%"} />
          <col width={"10%"} />
          <col width={"10%"} />
        </colgroup>
        <TableFooter>
          <TableRow
            sx={{
              'td, th': { border: 0, py: 1, color: "primary.200" },
            }}
          >
            <TableCell component="th" scope="row" sx={{ px: 0, pl: 1.5 }}>
              <Typography variant='caption'>3</Typography>
            </TableCell>
            <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>
              <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                <Image width={24} height={24} src={AvatarImage} alt="Avatar Image" />
                <Typography variant='caption' fontWeight={400}>You</Typography>
              </Stack>
            </TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption'>10</Typography></TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption'>3</Typography></TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}><Typography variant='caption'>1000</Typography></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  )
}

export default HolderPoolLeaderboard;