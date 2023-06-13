import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  AvatarImage,
  BronzeImage,
  CoinEmptyImage,
  DiamondImage,
  GoldImage,
} from "utils/Images";
import MyImage from "components/ui/image";
import Image from "next/image";
import {
  LoyaltyHolderLeaderboardType,
  LoyaltyLoadingType,
} from "libs/types/loyaltyTypes";
import { getPathAvatar } from "utils/checkAvatar";
import { Convert } from "utils/convert";
import { useWalletContext } from "contexts/WalletContext";

type PropsType = {
  leaderboard: LoyaltyHolderLeaderboardType;
  loading: LoyaltyLoadingType;
};

function HolderLeaderboard({ leaderboard, loading }: PropsType) {
  const { userInfo, walletAddress } = useWalletContext();

  return (
    <>
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
          <TableRow sx={{ "td, th": { border: 0, py: 1 } }}>
            <TableCell sx={{ px: 0, pl: { xs: 2, md: 0 } }}>Rank</TableCell>
            <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>
              User
            </TableCell>
            <TableCell
              align="center"
              sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}
            >
              <Image
                width={24}
                height={24}
                src={DiamondImage}
                alt="Diamond Image"
              />
            </TableCell>
            <TableCell
              align="center"
              sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}
            >
              <Image width={24} height={24} src={GoldImage} alt="Gold Image" />
            </TableCell>
            <TableCell
              align="center"
              sx={{ px: 0, lineHeight: 0, pr: { xs: 2.5, md: 1.5 } }}
            >
              <Image
                width={24}
                height={24}
                src={BronzeImage}
                alt="Bronze Image"
              />
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
            borderRadius: { xs: 0, md: 2 },
            backgroundColor: "background.paper",
          }}
        >
          {loading.leaderboard && (
            <Stack height={1} justifyContent={"center"} alignItems={"center"}>
              <CircularProgress size={40} color="secondary" />
            </Stack>
          )}
          {!loading.leaderboard && leaderboard.leaderboardList.length <= 0 && (
            <Stack
              sx={{ inset: 0 }}
              position={"absolute"}
              gap={5}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <MyImage
                sx={{
                  width: { xs: 80, md: 144 },
                  height: { xs: 80, md: 144 },
                }}
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
          <Table aria-label="simple table">
            <colgroup>
              <col width={"12%"} />
              <col />
              <col width={"10%"} />
              <col width={"10%"} />
              <col width={"10%"} />
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
              {!loading.leaderboard &&
                leaderboard.leaderboardList.length > 0 &&
                leaderboard.leaderboardList.map((row) => (
                  <TableRow key={row.rank}>
                    <TableCell component="th" scope="row" sx={{ px: 0 }}>
                      <Typography
                        variant="caption"
                        color={
                          row.owner === leaderboard.connectWallet.owner
                            ? "text.secondary"
                            : "text.disabled"
                        }
                      >
                        {row.rank}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ px: 0, pl: 0.5 }}>
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
                          color={
                            row.owner === leaderboard.connectWallet.owner
                              ? "text.secondary"
                              : "text.primary"
                          }
                        >
                          {`${row.userName} (${Convert.convertWalletAddress(
                            row.owner,
                            5,
                            4
                          )})`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}
                    >
                      <Typography
                        variant="caption"
                        color={
                          row.owner === leaderboard.connectWallet.owner
                            ? "text.secondary"
                            : "text.disabled"
                        }
                      >
                        {" "}
                        {row.totalDiamondNFT}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}
                    >
                      <Typography
                        variant="caption"
                        color={
                          row.owner === leaderboard.connectWallet.owner
                            ? "text.secondary"
                            : "text.disabled"
                        }
                      >
                        {" "}
                        {row.totalGoldNFT}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}
                    >
                      <Typography
                        variant="caption"
                        color={
                          row.owner === leaderboard.connectWallet.owner
                            ? "text.secondary"
                            : "text.disabled"
                        }
                      >
                        {" "}
                        {row.totalBronzeNFT}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* Table Footer */}
      <Table
        sx={{
          width: "calc(100% - 1rem)",
          margin: "auto",
          borderRadius: "0 0 0.5rem 0.5rem",
          bgcolor: "secondary.main",
        }}
      >
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
              "td, th": { border: 0, py: 1, color: "primary.200" },
            }}
          >
            <TableCell component="th" scope="row" sx={{ px: 0, pl: 1.5 }}>
              <Typography variant="caption">
                {leaderboard.connectWallet.rank ?? "--"}
              </Typography>
            </TableCell>
            <TableCell align="left" sx={{ px: 0, pl: 0.5 }}>
              <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                <Image
                  width={24}
                  height={24}
                  src={getPathAvatar(userInfo.avatar)}
                  alt="Avatar Image"
                />
                <Typography variant="caption" fontWeight={400}>
                  {userInfo.username} ({Convert.convertWalletAddress(walletAddress, 5, 4)})
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Typography variant="caption">
                {leaderboard.leaderboardList.length > 0
                  ? leaderboard.connectWallet.totalDiamondNFT ?? 0
                  : "--"}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Typography variant="caption">
                {leaderboard.leaderboardList.length > 0
                  ? leaderboard.connectWallet.totalGoldNFT ?? 0
                  : "--"}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ px: 0, pr: { xs: 2.5, md: 1.5 } }}>
              <Typography variant="caption">
                {leaderboard.leaderboardList.length > 0
                  ? leaderboard.connectWallet.totalBronzeNFT ?? 0
                  : "--"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default HolderLeaderboard;
