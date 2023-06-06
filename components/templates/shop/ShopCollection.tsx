import { Box, Typography, Stack, Button } from "@mui/material";
import {
  BronzeImage,
  GoldImage,
  DiamondImage,
  BgShopCollection,
} from "utils/Images";
import Image from "next/image";
import { ShareIcon } from "utils/Icons";

const ShopShareButton = () => {
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        px: 1.5,
        color: "text.disabled",
        border: "none",
        svg: {
          stroke: "none",
          border: "none",
        },
        "&:hover": {
          svg: {
            stroke: "none",
            border: "none",
          },
          border: "none",
        },
      }}
    >
      <ShareIcon width={20} />
      <Typography
        ml={1}
        fontSize={"0.875rem"}
        lineHeight={"1.25rem"}
        fontWeight={400}
      >
        Share
      </Typography>
    </Button>
  );
};

function ShopCollection() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BgShopCollection})`,
        backgroundSize: "cover",
        paddingInline: 12,
        paddingBlockStart: 5,
        paddingBlockEnd: 9.75,
        boxShadow: "0px 2px 16px hsla(55, 99%, 67%, 0.5)",
        position: "relative",
      }}
    >
      <ShopShareButton />
      <Stack>
        <Typography fontSize={"2.5rem"} fontWeight={700} mb={0.5}>
          DeODD NFT 1ST Collection
        </Typography>
        <Typography
          variant="body2"
          lineHeight={"1.25rem"}
          fontWeight={400}
          color={"text.disabled"}
          mb={1}
        >
          By{" "}
          <Box component={"span"} color={"text.secondary"} fontWeight={500}>
            deODD
          </Box>
        </Typography>
        <Typography
          variant="body2"
          lineHeight={"1.25rem"}
          fontWeight={400}
          color={"text.disabled"}
          mb={3}
        >
          Deodd is a smart contract that allows users to play Double or Nothing
          with their BSC tokens. Odds are 50/50 with a 3.25% fee that partly
          goes to Deodd NFT holders. The NFTs give its owners a portion of NFT
          Holder as passive income.
        </Typography>
        <Stack direction={"row"} gap={5}>
          <Stack gap={0.5}>
            <Typography
              fontSize={"0.875rem"}
              fontWeight={400}
              lineHeight={"1.25rem"}
              color={"text.disabled"}
            >
              Item amount
            </Typography>
            <Typography
              fontSize={"1.5rem"}
              lineHeight={"2rem"}
              fontWeight={700}
            >
              888
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <Typography
              fontSize={"0.875rem"}
              fontWeight={400}
              lineHeight={"1.25rem"}
              color={"text.disabled"}
            >
              Created
            </Typography>
            <Typography
              fontSize={"1.5rem"}
              lineHeight={"2rem"}
              fontWeight={700}
            >
              Apr 2023
            </Typography>
          </Stack>
          <Stack gap={0.5}>
            <Typography
              fontSize={"0.875rem"}
              fontWeight={400}
              lineHeight={"1.25rem"}
              color={"text.disabled"}
            >
              Chain
            </Typography>
            <Typography
              fontSize={"1.5rem"}
              lineHeight={"2rem"}
              fontWeight={700}
            >
              BSC
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ShopCollection;
