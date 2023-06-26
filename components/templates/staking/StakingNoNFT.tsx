import { Typography, Stack } from "@mui/material";
import MyImage from "components/ui/image";
import { CoinEmptyImage } from "utils/Images";
import { ButtonMain } from "components/ui/button";
import Link from "next/link";

function StakingNoNFT() {
  return (
    <>
      <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: "2rem", mb: 2 }}>NFT Staking</Typography>
      <Stack sx={{
        backgroundColor: "background.paper",
        width: 1,
        height: 364,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <MyImage
          sx={{
            width: { xs: 80, md: 144 },
            height: { xs: 80, md: 144 },
          }}
          src={CoinEmptyImage}
          alt="Empty Coin Image"
        />
        <Typography
          sx={{
            fontSize: "1rem",
            lineHeight: "1.375rem",
            fontWeight: 600,
            color: "secondary.100",
            textAlign: "center",
            mt: 3,
            mb: 5
          }}
        >
          You don’t have any NFT. <br />
          Let’s go shopping!
        </Typography>
        <Link href={"/shop"}>
          <ButtonMain
            active={true}
            title="Shop now"
            sx={{
              py: 1,
              px: 2,
              fontSize: "0.75rem",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.04em",

            }}
          />
        </Link>
      </Stack>
    </>
  );
}

export default StakingNoNFT;
