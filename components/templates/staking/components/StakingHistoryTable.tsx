import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { Colors } from "constants/index";
import { EnumNFT, EnumNFTTitle } from "libs/types";
import { BnbIcon, TickCircleIcon, TickCircleOutlineIcon } from "utils/Icons";
import { Format } from "utils/format";




function StakingHistoryTable({ modeUnstake, nfts, idNftSelected, setIdNftSelected }: { modeUnstake: boolean, nfts: any[], idNftSelected: number | null, setIdNftSelected: Function }) {
  return (
    <Box width={1} overflow={'hidden'}>

      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader aria-label="stake history table">
          <TableHead sx={{
            "& th": {

              bgcolor: 'primary.100',
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

                <TableRow
                  key={nft.token_id}
                  onClick={() => {
                    if (modeUnstake) {

                      setIdNftSelected(nft.token_id)
                    }
                  }
                  }
                >
                  <TableCell>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Box sx={!modeUnstake ? {
                        width: 0,
                        opacity: 0,
                      } : {}}>
                        <Checkbox checked={idNftSelected !== null && idNftSelected === nft.token_id}
                          icon={<TickCircleOutlineIcon />}
                          checkedIcon={<TickCircleIcon />} />


                      </Box>
                      <MainTypography>
                        {Format.formatDateTimeAlt(nft.stake_time, 'UTC', "dd/MM/yyyy '-' HH:mm:ss")}
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

    </Box>
  );
}

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  fontWeight: 400,
}))

export default StakingHistoryTable;
