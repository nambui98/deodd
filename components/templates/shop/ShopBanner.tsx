import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import {
  BgShopCollection,
  Bronze2Image,
  Diamond2Image,
  Diamond3Image,
  Gold2Image
} from "utils/Images";
import ShareButton from "./components/ShareButton";

// const ShareButton = dynamic(() => import("./components/ShareButton"), { ssr: true });
function ShopBanner({ amount }: { amount: number }) {
  return (
    <Stack mx={{ xs: -3, md: 0 }}>
      <Box
        sx={{
          backgroundImage: `url(${BgShopCollection})`,
          backgroundSize: "cover",
          px: { xs: 2, md: 12 },
          pt: { xs: 2, md: 5 },
          pb: { xs: 3, md: 9.75 },
          boxShadow: { xs: 'none', md: "0px 2px 16px hsla(55, 99%, 67%, 0.5)" },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 2
          }}
        >
          <ShareButton title="Deodd NFT 1st collection" description="Own your NFTs and participate in a decentralized coin flip and lottery mechanism by using your BNB with DeODD." />
        </Box>
        <Grid container >
          <Grid item xs={12} md={7.2}>
            <Stack>
              <Typography width={{ xs: 235, md: 1 }} fontSize={{ xs: 24, md: 40 }} fontWeight={700} mb={{ xs: 2, md: 0.5 }}>
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
                mb={{ xs: 2, md: 3 }}
              >
                Deodd is a smart contract that allows users to play Double or Nothing
                with their BSC tokens. Odds are 50/50 with a 3.25% fee that partly
                goes to Deodd NFT holders. The NFTs give its owners a portion of NFT
                Holder as passive income.
              </Typography>
              <Stack direction={"row"} gap={5}>
                <Stack gap={0.5}>
                  <Typography
                    fontSize={{ xs: 12, md: "0.875rem" }}
                    fontWeight={400}
                    lineHeight={{ xs: '16px', md: "1.25rem" }}
                    color={"text.disabled"}
                  >
                    Initial release
                  </Typography>
                  <Typography
                    fontSize={{ xs: 16, md: "1.5rem" }}
                    lineHeight={{ xs: '22px', md: "2rem" }}
                    fontWeight={700}
                  >
                    1983
                  </Typography>
                </Stack>
                <Stack gap={0.5}>
                  <Typography
                    fontSize={{ xs: 12, md: "0.875rem" }}
                    fontWeight={400}
                    lineHeight={{ xs: '16px', md: "1.25rem" }}
                    color={"text.disabled"}
                  >
                    Created
                  </Typography>
                  <Typography

                    fontSize={{ xs: 16, md: "1.5rem" }}
                    lineHeight={{ xs: '22px', md: "2rem" }}
                    fontWeight={700}
                  >
                    June 2023
                  </Typography>
                </Stack>
                <Stack gap={0.5}>
                  <Typography
                    fontSize={{ xs: 12, md: "0.875rem" }}
                    fontWeight={400}
                    lineHeight={{ xs: '16px', md: "1.25rem" }}
                    color={"text.disabled"}
                  >
                    Chain
                  </Typography>
                  <Typography
                    fontWeight={700}
                    fontSize={{ xs: 16, md: "1.5rem" }}
                    lineHeight={{ xs: '22px', md: "2rem" }}

                  >
                    BSC
                  </Typography>
                </Stack>
              </Stack>

            </Stack>
          </Grid>
        </Grid>
      </Box >
      <Grid display={{ xs: 'none', md: 'flex' }} container direction={'row'} zIndex={1} alignItems={'flex-end'} spacing={4} px={12} mt={'-16vw'} >
        <Grid item xs={2.4}>
          <img src={Bronze2Image} width={'100%'} />
        </Grid>
        <Grid item xs={2.4}>
          <img src={Gold2Image} width={'100%'} />
        </Grid>
        <Grid item xs={2.4}>
          <img src={Diamond3Image} width={'100%'} />
        </Grid>
        <Grid item xs={4.8}>
          <img src={Diamond2Image} width={'100%'} />
        </Grid>
      </Grid>
      <Divider sx={{ my: { xs: 2, md: 5 }, display: { xs: 'none', md: 'block' } }} />
    </Stack >
  );
}

export default ShopBanner;
