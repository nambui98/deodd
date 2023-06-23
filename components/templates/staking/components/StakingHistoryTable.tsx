import { getPathAvatarNFT } from "utils/checkAvatar";
import Image from "next/image";
import { Format } from "utils/format";
import { BnbIcon } from "utils/Icons";
import { Colors } from "constants/index";
import { styled, Typography, Stack, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material";

function formatDate(dateString: string) {
  const date = Format.formatDateTime(dateString);
  const hour = Format.formatDateTime(dateString, "kk:mm:ss");
  return `${date} - ${hour}`;
}

function StakingHistoryTable() {
  return (
    <TableContainer>
      <Table aria-label="stake history table">
        <TableHead sx={{
          "& th": {
            border: "none",
            py: 0,
            pb: 2,
          }
        }}>
          <TableRow>
            <TableCell>
              <MainTypography>Date</MainTypography>
            </TableCell>
            <TableCell>
              <MainTypography>NFT</MainTypography>
            </TableCell>
            <TableCell align="right">
              <MainTypography>Profit</MainTypography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{
          "& td": {
            border: "none",
            py: 0.5,
          }
        }}>
          <TableRow>
            <TableCell>
              <MainTypography>
                {formatDate(new Date().toString())}
              </MainTypography>
            </TableCell>
            <TableCell>
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Image src={getPathAvatarNFT("bronze")} width={24} height={24} alt="Diamond NFT" />
                <Typography variant="body2">Bronze NFT Card #125122</Typography>
              </Stack>
            </TableCell>
            <TableCell align="right">
              <Stack sx={{ flexDirection: "row", gap: 1, justifyContent: "flex-end" }}>
                <Typography variant="body2">0,2</Typography>
                <BnbIcon width={20} color={Colors.primaryDark} />
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  fontWeight: 400,
}))

export default StakingHistoryTable;
