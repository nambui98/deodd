import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import {
  LogoImage,
  bgWinStreakImage,
  bgLossStreakImage,
  coin0,
  coin6,
} from "utils/Images";
import { CupIcon, MobileIcon, ArrowDownIcon, ArrowUpIcon } from "utils/Icons";
import { Donut } from "../components/ui/donuts";
import { Colors } from "constants/index";
import { FlipPerUserTable } from "components/common/FlipPerUserTable";

type Props = {};

function TitleTextAbsolute({ text }: { text: string }) {
  return (
    <Typography
      top={"1rem"}
      left={"1rem"}
      position={"absolute"}
      textTransform={"uppercase"}
      variant="body2"
    >
      {text}
    </Typography>
  );
}

function CardType01({
  children,
  bgimg,
}: {
  children: React.ReactNode;
  bgimg: {
    backgroundImage: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundPosition?: string;
  };
}) {
  return (
    <Box
      p={2}
      bgcolor={"secondary.300"}
      borderRadius={1.5}
      height={"15.5rem"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      sx={bgimg}
    >
      {children}
    </Box>
  );
}

function CardType03({ children }: { children: React.ReactNode }) {
  return (
    <Box
      p={2}
      bgcolor={"secondary.300"}
      borderRadius={1.5}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      height={"15.375rem"}
    >
      {children}
    </Box>
  );
}

export default function Statistic({}: Props) {
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Typography variant="h2" mb={3}>
        Today stat
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <CardType01
            bgimg={{
              backgroundImage: `url(${bgWinStreakImage})`,
              backgroundSize: "cover",
            }}
          >
            <TitleTextAbsolute text="highest win streak" />
            <Box
              display={"flex"}
              gap={1}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h1">08</Typography>
              <Typography>Linh (38957***bF1)</Typography>
            </Box>
          </CardType01>
        </Grid>
        <Grid item md={6} xs={12}>
          <CardType01
            bgimg={{
              backgroundImage: `url(${bgLossStreakImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          >
            <TitleTextAbsolute text="highest loss streak" />
            <Typography variant="h1">05</Typography>
          </CardType01>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            p={2}
            bgcolor={"secondary.300"}
            borderRadius={1.5}
            height={"24.375rem"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              position={"relative"}
              alignSelf={"flex-start"}
              textTransform={"uppercase"}
              variant="body2"
            >
              flip result
            </Typography>
            <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  head
                </Typography>
                <Typography textTransform={"uppercase"} variant="caption">
                  6000 times (60%)
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ width: "10rem" }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
            >
              <Box
                position={"absolute"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography variant="h2" fontWeight={"700"}>
                  10000
                </Typography>
                <Typography variant="body2" textTransform={"uppercase"}>
                  times
                </Typography>
              </Box>
              <Donut data={[4000, 6000]} />
            </Box>
            <Box
              display={"flex"}
              textAlign={"end"}
              alignSelf={"flex-end"}
              gap={1}
            >
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  tail
                </Typography>
                <Typography textTransform={"uppercase"} variant="caption">
                  4000 times (40%)
                </Typography>
              </Box>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            p={2}
            bgcolor={"secondary.300"}
            borderRadius={1.5}
            height={"24.375rem"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              position={"relative"}
              alignSelf={"flex-start"}
              textTransform={"uppercase"}
              variant="body2"
            >
              user&apos;s flip choice
            </Typography>
            <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  head
                </Typography>
                <Typography textTransform={"uppercase"} variant="caption">
                  4479 times (44,7%)
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ width: "10rem" }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
            >
              <Box
                position={"absolute"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography variant="h2" fontWeight={"700"}>
                  10000
                </Typography>
                <Typography variant="body2" textTransform={"uppercase"}>
                  times
                </Typography>
              </Box>
              <Donut data={[4000, 6000]} />
            </Box>
            <Box
              display={"flex"}
              textAlign={"end"}
              alignSelf={"flex-end"}
              gap={1}
            >
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  tail
                </Typography>
                <Typography textTransform={"uppercase"} variant="caption">
                  5531 times (55,3%)
                </Typography>
              </Box>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            bgcolor={"secondary.300"}
            borderRadius={1.5}
            p={2}
            height={"24.375rem"}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TitleTextAbsolute text="flip total" />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={2}
            >
              <Image src={coin0} width={80} height={80} alt="coin-img" />
              <Typography variant="h1">59248731</Typography>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="body2"
                color={Colors.increase}
              >
                <ArrowUpIcon fill={Colors.increase} />
                40%
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <CardType03>
            <TitleTextAbsolute text="fee total" />
            <Box>
              <Typography mt={4} variant="h1">
                52.645{" "}
                <Typography
                  component={"span"}
                  variant="h2"
                  textTransform={"uppercase"}
                >
                  bnb
                </Typography>
              </Typography>
              <Typography
                mt={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
                variant="body2"
                color={Colors.decrease}
              >
                <ArrowDownIcon fill={Colors.decrease} />
                12%
              </Typography>
            </Box>
          </CardType03>

          <CardType03>
            <TitleTextAbsolute text="bnb total" />
            <Box>
              <Typography mt={4} variant="h1">
                164,242{" "}
                <Typography
                  component={"span"}
                  variant="h2"
                  textTransform={"uppercase"}
                >
                  bnb
                </Typography>
              </Typography>
              <Typography
                mt={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
                variant="body2"
                color={Colors.increase}
              >
                <ArrowUpIcon fill={Colors.increase} />
                24%
              </Typography>
            </Box>
          </CardType03>
        </Grid>

        <Grid item md={8} xs={12}>
          <Box
            bgcolor={"secondary.300"}
            borderRadius={1.5}
            height={"100%"}
            p={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              alignSelf={"flex-start"}
              textTransform={"uppercase"}
              variant="body2"
            >
              flip per user
            </Typography>
            <FlipPerUserTable />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <CardType03>
            <TitleTextAbsolute text="win percentage" />
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <CupIcon fill={Colors.primaryDark} width={"2.5rem"} />
              <Typography variant="h1">
                55
                <Typography variant="h2" component={"span"}>
                  %
                </Typography>
              </Typography>
            </Box>
          </CardType03>
        </Grid>
        <Grid item md={4} xs={12}>
          <CardType03>
            <TitleTextAbsolute text="mobile flips" />
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <MobileIcon fill={Colors.primary} width={"2.5rem"} />
              <Typography variant="h1">
                49
                <Typography variant="h2" component={"span"}>
                  %
                </Typography>
              </Typography>
            </Box>
          </CardType03>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            p={2}
            height={"15.375rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={LogoImage} width={133} height={80} alt="logo" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
