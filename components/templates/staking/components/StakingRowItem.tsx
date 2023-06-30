import { useState } from "react";
import { ArrowDown3Icon, BnbIcon, TickCircleIcon, TickCircleOutlineIcon } from "utils/Icons";
import { Box, styled, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { getPathAvatarNFT } from "utils/checkAvatar";
import Image from "next/image";
import { EnumNFT, TypeNFT } from "libs/types";

// CHANGE ME LATER
type StakingRowItemType = {
  handleClickNFT: Function,
  NFTCards: {
    type: EnumNFT;
    estProfit: number,
    percentSharePerNFT: number,
    list: TypeNFT[]

  }
  sharePercent: number;
  estimatedProfit: number;
  nftSelected: TypeNFT | undefined | null;
}

function StakingRowItem({ handleClickNFT, nftSelected, NFTCards, sharePercent, estimatedProfit }: StakingRowItemType) {
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

          // maxHeight: 200,
          // overflowY: 'auto',
        }}>
          <Stack sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }
          }} >
            {NFTCards.list.map((detailNFT, index) => (
              <FormControlLabel onClick={() => handleClickNFT(detailNFT)} key={index} name={`DeODD #${detailNFT.id}`} control={<Checkbox checked={nftSelected?.id === detailNFT.id} icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label={`DeODD #${detailNFT.id}`} />
            ))}
          </Stack>

        </AccordionDetails>
      </Accordion>

      <MainTypography >{NFTCards.percentSharePerNFT}</MainTypography>
      <Stack direction={"row"} gap={1} >
        <MainTypography >{NFTCards.estProfit}</MainTypography>
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
