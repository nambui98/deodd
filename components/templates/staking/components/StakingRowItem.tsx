import { useState } from "react";
import { ArrowDown3Icon, BnbIcon, TickCircleIcon, TickCircleOutlineIcon } from "utils/Icons";
import { Box, styled, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { getPathAvatarNFT } from "utils/checkAvatar";
import Image from "next/image";

// CHANGE ME LATER
type StakingRowItemType = {
  NFTCards: {
    type: string;
    list: string[]
  }
  sharePercent: number;
  estimatedProfit: number;
}

function StakingRowItem({ NFTCards, sharePercent, estimatedProfit }: StakingRowItemType) {
  return (
    <>
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          border: "none",
          '&:before': {
            display: 'none',
          },
          "& .Mui-expanded": {
            backgroundColor: "primary.300",
            transition: "background-color 0ms",
          }
        }}>
        <AccordionSummary
          expandIcon={<ArrowDown3Icon width={20} />}
          aria-label="Expand"
          aria-controls="-content"
          id="-header"
          sx={{
            flexDirection: "row-reverse",
            "& .MuiAccordionSummary-content": {
              marginLeft: 1,
            },
            borderRadius: 1,
            width: "fit-content"
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
            <Image src={getPathAvatarNFT(NFTCards.type)} width={24} height={24} alt={NFTCards.type} />
            <MainTypography>{NFTCards.type} NFT Card {NFTCards.list.length > 0 ? `(${NFTCards.list.length})` : ""}</MainTypography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{
          border: "none",
          marginLeft: 3.5,
        }}>
          <Stack sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }
          }} >
            {NFTCards.list.map((card, index) => (
              <FormControlLabel key={index} name={card} control={<Checkbox icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label={card} />
            ))}
          </Stack>

        </AccordionDetails>
      </Accordion>

      <MainTypography >{sharePercent}</MainTypography>
      <Stack direction={"row"} gap={1} >
        <MainTypography >{estimatedProfit}</MainTypography>
        <Box component={"span"} color={"secondary.main"}>
          <BnbIcon width={20} />
        </Box>
      </Stack>
    </>
  );
}

export default StakingRowItem;

const MainTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
}))

