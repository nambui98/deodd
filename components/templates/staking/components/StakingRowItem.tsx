import { useState } from "react";
import { ArrowDown3Icon, BnbIcon, TickCircleIcon, TickCircleOutlineIcon } from "utils/Icons";
import { Box, styled, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, useTheme } from "@mui/material";
import { getPathAvatarNFT } from "utils/checkAvatar";
import Image from "next/image";
import { EnumNFT, TypeNFT } from "libs/types";
import { Format } from "utils/format";
import { Utils } from "@/utils/index";

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
  expanded: boolean;
  handleExpand: VoidFunction,
  rewardPool: string | undefined
}

function StakingRowItem({ handleClickNFT, rewardPool, handleExpand, expanded, nftSelected, NFTCards, sharePercent, estimatedProfit }: StakingRowItemType) {
  const theme = useTheme();

  return (
    <>
      <Accordion
        disableGutters
        expanded={expanded}
        onChange={() => handleExpand()}
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
            width: "fit-content",
            [theme.breakpoints.down('md').replace("@media", "@container")]: {
              px: 1,
              width: '100%'
            },

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
          width: 1,
          maxHeight: 280,
          overflow: 'auto',
          [theme.breakpoints.down('md').replace("@media", "@container")]: {
            marginLeft: 0,
            px: 1
          },
        }}>
          <Stack sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: 500,
            }
          }} >
            {NFTCards.list.map((detailNFT, index) => (
              <FormControlLabel
                onClick={() => handleClickNFT(detailNFT)}
                key={index}
                name={`DeODD #${detailNFT.id}`}
                control={<Checkbox checked={nftSelected?.id === detailNFT.id}
                  icon={<TickCircleOutlineIcon />}
                  checkedIcon={<TickCircleIcon />} />}
                label={<Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Image src={detailNFT.image} width={24} height={24} alt={'Image nft'} />

                  DeODD #{detailNFT.id}</Stack>}
              />
            ))}
          </Stack>

        </AccordionDetails>
      </Accordion>

      <MainTypography sx={{
        [theme.breakpoints.down('md').replace("@media", "@container")]: {
          display: 'none'
        },
      }}>
        {Format.formatMoney(NFTCards.percentSharePerNFT)}%
      </MainTypography>
      <Stack direction={"row"} gap={1}
        sx={{
          [theme.breakpoints.down('md').replace("@media", "@container")]: {
            display: 'none'
          },
        }}
      >
        <MainTypography >{nftSelected && nftSelected.type === NFTCards.type ? Format.formatMoney(Utils.calculatorProfit(rewardPool, nftSelected, 1, 30)) : 0}</MainTypography>
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

