import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import MyImage from "components/ui/image";
import Image from "next/image";
import { Convert } from "utils/convert";
import { CoinEmptyImage } from "utils/Images";
import { LoyaltyJackpotLeaderboardType } from "libs/types";
import { getPathAvatar } from "utils/checkAvatar";

type PropsType = {
  leaderboard: LoyaltyJackpotLeaderboardType;
};

function JackpotLeaderboard({ leaderboard }: PropsType) {
  return (
    <>
      {/* Using separate tables to achieve the look similar to the design */}
      {/* Table Head */}
      <Table>
        <colgroup>
          <col width={"11%"} />
          <col />
          <col />
        </colgroup>
        <TableHead>
          <TableRow sx={{ "td, th": { border: 0, py: 1 } }}>
            <TableCell sx={{ px: 0, pl: { xs: 2, md: 0 } }}>Rank</TableCell>
            <TableCell sx={{ px: 0, pl: 0.5 }} align="left">
              User
            </TableCell>
            <TableCell sx={{ px: 0, pr: { xs: 2, md: 0 } }} align="right">
              TossPoints
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      {/* Table Body - wrapped inside another div to keep the border-radius when scrollbar appears */}
      <Box sx={{ borderRadius: { xs: 0, md: 2 }, overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: { xs: 218, md: 384 },
            height: 384,
            boxShadow: "none",
            backgroundColor: "background.paper",
            borderRadius: { xs: 0, md: 2 },
            position: "relative",
          }}
        >
          {leaderboard.leaderboardList.length <= 0 && (
            <Stack
              sx={{ inset: 0 }}
              position={"absolute"}
              gap={5}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <MyImage
                width={144}
                height={144}
                src={CoinEmptyImage}
                alt="Empty Coin Image"
              />
              <Typography
                fontSize={"1rem"}
                lineHeight={"1.375rem"}
                fontWeight={600}
                color={"secondary.100"}
              >
                There is no one here
              </Typography>
            </Stack>
          )}
          <Table stickyHeader aria-label="simple table">
            <colgroup>
              <col width={"11%"} />
              <col />
              <col />
            </colgroup>
            <TableBody
              sx={{
                "td, th": { border: 0, py: 0.75 },
                th: { pl: { xs: 2.5, md: 1.5 } },
                "tr:first-child": {
                  "td, th": {
                    pt: 1,
                  },
                },
                "tr:last-child": {
                  "td, th": {
                    pb: 1,
                  },
                },
              }}
            >
              {leaderboard.leaderboardList.length > 0 &&
                leaderboard.leaderboardList.map((row) => (
                  <TableRow key={row.rank}>
                    <TableCell component="th" scope="row" sx={{ px: 0 }}>
                      <Typography
                        variant="caption"
                        color={
                          row.wallet === leaderboard.connectWallet?.wallet
                            ? "text.secondary"
                            : "text.disabled"
                        }
                        lineHeight={"1.25rem"}
                      >
                        {row.rank}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>
                      <Stack
                        direction={"row"}
                        columnGap={1}
                        alignItems={"center"}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={getPathAvatar(row.avatarId)}
                          alt="Avatar Image"
                        />
                        <Typography
                          variant="caption"
                          fontWeight={400}
                          lineHeight={"1.25rem"}
                          color={
                            row.wallet === leaderboard.connectWallet?.wallet
                              ? "text.secondary"
                              : "text.primary"
                          }
                        >
                          {row.wallet === leaderboard.connectWallet?.wallet
                            ? "You"
                            : `${row.userName} (${Convert.convertWalletAddress(
                                row.wallet,
                                5,
                                4
                              )})`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}
                    >
                      <Typography
                        variant="caption"
                        color={
                          row.wallet === leaderboard.connectWallet?.wallet
                            ? "text.secondary"
                            : "text.disabled"
                        }
                        lineHeight={"1.25rem"}
                      >
                        {row.tossPoint}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Table Footer - this is separated from the above table */}
      <Table
        sx={{
          width: "calc(100% - 1rem)",
          margin: "auto",
          borderRadius: "0 0 0.5rem 0.5rem",
          bgcolor: "secondary.main",
        }}
      >
        <colgroup>
          <col width={"11%"} />
          <col />
          <col />
        </colgroup>
        <TableFooter>
          <TableRow
            sx={{
              "td, th": { border: 0, py: 1, color: "primary.200" },
            }}
          >
            <TableCell component="th" scope="row" sx={{ px: 0, pl: 1.5 }}>
              <Typography variant="caption">
                {leaderboard.connectWallet?.rank ?? "--"}
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>
              <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                <Image
                  width={24}
                  height={24}
                  src={getPathAvatar(leaderboard.connectWallet?.avatarId)}
                  alt="User Avatar"
                />
                <Typography variant="caption" fontWeight={400}>
                  You
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="right" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Typography variant="caption">
                {leaderboard.leaderboardList.length > 0
                  ? leaderboard.connectWallet?.tossPoint ?? 0
                  : "--"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default JackpotLeaderboard;
