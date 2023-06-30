import { getPathAvatarNFT } from "utils/checkAvatar";
import Image from "next/image";
import { Format } from "utils/format";
import { BnbIcon, TickCircleIcon, TickCircleOutlineIcon } from "utils/Icons";
import { Colors } from "constants/index";
import { styled, Typography, Stack, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, FormControlLabel, Checkbox } from "@mui/material";
import { EnumNFT, EnumNFTTitle, TypeNFT } from "libs/types";
import { format } from "date-fns";

function formatDate(dateString: string) {
  return format(new Date(dateString), "dd/MM/yyyy '-' HH:mm:ss")
}


function StakingHistoryTable({ nfts, idNftSelected, setIdNftSelected }: { nfts: any[], idNftSelected: number | null, setIdNftSelected: Function }) {
  return (
    <TableContainer>
      <Table aria-label="stake history table">
        <TableHead sx={{
          "& th": {
            border: "none",
            py: 0,
            pb: 2,
            px: 0,
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
            px: 0,
          }
        }}>

          {
            nfts?.map((nft) =>

              <TableRow key={nft.token_id}

                onClick={() => setIdNftSelected(nft.token_id)}
              >
                <TableCell>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Checkbox checked={idNftSelected !== null && idNftSelected === nft.token_id}
                      icon={<TickCircleOutlineIcon />}
                      checkedIcon={<TickCircleIcon />} />
                    <MainTypography>
                      {formatDate(nft.stake_atz)}
                    </MainTypography>

                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack sx={{ flexDirection: "row", gap: 1 }} alignItems={'center'}>
                    <img src={nft.image_link} width={24} alt="Diamond NFT" />
                    <Typography variant="body2">{EnumNFTTitle[nft.type as EnumNFT]} #{nft.token_id}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack sx={{ flexDirection: "row", gap: 1, justifyContent: "flex-end" }}>
                    <Typography variant="body2">{new Intl.NumberFormat("en", { maximumFractionDigits: 8 }).format(nft.profit)}</Typography>
                    <BnbIcon width={20} color={Colors.primaryDark} />
                  </Stack>
                </TableCell>
              </TableRow>
            )
          }

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
