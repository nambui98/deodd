import {
  Box,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { BnbIcon } from "utils/Icons";
import Image from "next/image";
import MyImage from "components/ui/image";
import { CoinEmptyImage } from "utils/Images";
import { LoyaltyHolderHistoryType } from "libs/types/loyaltyTypes";
import { getPathAvatarNFT } from "utils/checkAvatar";
import { UseQueryResult } from "@tanstack/react-query";

type PropsType = {
  history: UseQueryResult<LoyaltyHolderHistoryType, unknown>;
};

function HolderHistory({ history }: PropsType) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        mx: { xs: 2, md: 0 },
        height: { xs: 218, md: 384 },
        backgroundColor: "background.paper",
      }}
    >
      {history.isLoading && (
        <Stack
          height={1}
          width={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress size={40} color="secondary" />
        </Stack>
      )}
      {!history.isLoading && !history.isError && history.data.length > 0 && (
        <TableContainer
          sx={{
            height: 384,
            maxHeight: { xs: 218, md: 384 },
            backgroundColor: "background.paper",
            borderRadius: 3,
          }}
        >
          <Table
            stickyHeader
            sx={{
              "th, td": {
                p: 0,
                pb: 2,
              },
            }}
          >
            <TableHead
              sx={{
                th: {
                  backgroundColor: "background.paper",
                  border: "none",
                },
              }}
            >
              <TableRow
                sx={{
                  th: {
                    pt: 2,
                    pr: 2,
                  },
                  "th:first-child": {
                    pl: 2,
                  },
                }}
              >
                <TableCell>NFT ID</TableCell>
                <TableCell align="right">Period Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                td: {
                  border: "none",
                },
              }}
            >
              {history.data.map((row) => (
                <TableRow
                  key={row.tokenId}
                  sx={{
                    "td:first-child": {
                      pl: 2,
                    },
                    td: {
                      pr: 2,
                    },
                  }}
                >
                  <TableCell>
                    <Stack direction={"row"} gap={1} alignItems={"flex-start"}>
                      <Image
                        src={getPathAvatarNFT(row.typeId)}
                        width={32}
                        height={32}
                        alt="NFT Item"
                      />
                      <Typography variant="body2" lineHeight="1.25rem">
                        #{row.tokenId}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell align="right" sx={{ display: "block" }}>
                    <Stack
                      color={"text.secondary"}
                      direction={"row"}
                      gap={0.5}
                      justifyContent={"flex-end"}
                    >
                      <Typography
                        color={"text.primary"}
                        fontSize={"0.75rem"}
                        lineHeight={"1rem"}
                        fontWeight={400}
                      >
                        {new Intl.NumberFormat("en", {
                          maximumFractionDigits: 12,
                        }).format(row.profit)}
                      </Typography>
                      <BnbIcon width={16} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!history.isLoading && (history.isError || history.data.length === 0) && (
        <Stack
          sx={{ inset: 0 }}
          gap={5}
          height={1}
          width={1}
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
            This season&apos;s information hasn&apos;t been updated yet
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default HolderHistory;
