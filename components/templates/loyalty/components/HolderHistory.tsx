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
} from "@mui/material";
import { BnbIcon } from "utils/Icons";
import Image from "next/image";
import { DiamondImage } from "utils/Images";

function HolderHistory() {
  return (
    <Box sx={{ borderRadius: 3, overflow: "hidden", mx: { xs: 2, md: 0 } }}>
      <TableContainer
        sx={{
          height: 384,
          maxHeight: 384,
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
              <TableCell align="right">Period Claimable</TableCell>
              <TableCell align="right">Total claimable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              td: {
                border: "none",
              },
            }}
          >
            <TableRow
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
                    src={DiamondImage}
                    width={32}
                    height={32}
                    alt="NFT Item"
                  />
                  <Stack gap={0.5}>
                    <Typography variant="body2" lineHeight="1.25rem">
                      #23469734985347
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Typography
                        fontSize={"0.75rem"}
                        fontWeight={400}
                        lineHeight={"1rem"}
                        color={"text.secondary"}
                      >
                        Owner
                      </Typography>
                      <Box
                        bgcolor={"text.primary"}
                        width={4}
                        height={4}
                        borderRadius={"50%"}
                      ></Box>
                      <Typography
                        fontSize={"0.75rem"}
                        fontWeight={400}
                        lineHeight={"1rem"}
                        color={"text.secondary"}
                      >
                        Claimed
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Stack
                  color={"text.secondary"}
                  direction={"row"}
                  gap={0.5}
                  height={1}
                  justifyContent={"flex-end"}
                >
                  <Typography
                    color={"text.primary"}
                    fontSize={"0.75rem"}
                    lineHeight={"1rem"}
                    fontWeight={400}
                  >
                    1000
                  </Typography>
                  <BnbIcon width={16} />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Stack
                  color={"text.secondary"}
                  direction={"row"}
                  gap={0.5}
                  height={1}
                  justifyContent={"flex-end"}
                >
                  <Typography
                    color={"text.primary"}
                    fontSize={"0.75rem"}
                    lineHeight={"1rem"}
                    fontWeight={400}
                  >
                    1000
                  </Typography>
                  <BnbIcon width={16} />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default HolderHistory;
