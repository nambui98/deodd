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
import { DashboardCard } from "../components/ui/dashboard/DashboardCard";
import { Colors } from "constants/index";
import { FlipPerUserTable } from "components/common/FlipPerUserTable";
import { useDashboardStat } from "hooks/useDashboardStat";

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

export default function Statistic() {
  const { error, streak, flipDashboardStat } = useDashboardStat();

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Typography variant="h2" mb={3}>
        Today stat
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <DashboardCard
            justifyContent={"center"}
            position={"relative"}
            height="15.5rem"
            sx={{
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
              {error.haveFlipped ? (
                <>
                  <Typography variant="h1">
                    {streak.winStreak < 10 && streak.winStreak >= 1
                      ? `0${streak.winStreak}`
                      : streak.winStreak}
                  </Typography>
                  <Typography>{streak.username}</Typography>
                </>
              ) : (
                <Typography variant="h3">{error.errorMessage}</Typography>
              )}
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardCard
            justifyContent={"center"}
            position={"relative"}
            height="15.5rem"
            sx={{
              backgroundImage: `url(${bgLossStreakImage})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
            }}
          >
            <TitleTextAbsolute text="highest loss streak" />
            {error.haveFlipped ? (
              <Typography variant="h1">
                {streak.lossStreak < 10 && streak.lossStreak >= 1
                  ? `0${streak.lossStreak}`
                  : streak.lossStreak}
              </Typography>
            ) : (
              <Typography variant="h3">{error.errorMessage}</Typography>
            )}
          </DashboardCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            flexDirection={"column"}
            justifyContent={"space-between"}
            height="24.375rem"
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
              <Image src={coin0} width={24} height={24} alt="coin-icon" />
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  head
                </Typography>
                <Typography textTransform={"uppercase"} variant="body2">
                  {flipDashboardStat.headResult} times{" "}
                  <Typography variant="caption" component={"span"}>
                    ({flipDashboardStat.headResultPercentage}%)
                  </Typography>
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
                  {/* If user have not flipped, return 0. If yes, check if it's smaller than 10 and append 0 before it */}
                  {!error.haveFlipped
                    ? "0"
                    : flipDashboardStat.numberFlipToday < 10
                    ? "0" + flipDashboardStat.numberFlipToday
                    : flipDashboardStat.numberFlipToday}
                </Typography>
                <Typography variant="body2" textTransform={"uppercase"}>
                  times
                </Typography>
              </Box>
              <Donut
                data={[
                  flipDashboardStat.tailResult,
                  flipDashboardStat.headResult,
                ]}
              />
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
                  color={"error.100"}
                  textTransform={"uppercase"}
                >
                  tail
                </Typography>
                <Typography textTransform={"uppercase"} variant="body2">
                  {flipDashboardStat.tailResult} times{" "}
                  <Typography variant="caption" component={"span"}>
                    ({flipDashboardStat.tailResultPercentage}%)
                  </Typography>
                </Typography>
              </Box>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            flexDirection={"column"}
            justifyContent={"space-between"}
            height="24.375rem"
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
              <Image src={coin0} width={24} height={24} alt="coin-icon" />
              <Box>
                <Typography
                  variant="h3"
                  color={"secondary.main"}
                  textTransform={"uppercase"}
                >
                  head
                </Typography>
                <Typography textTransform={"uppercase"} variant="body2">
                  {flipDashboardStat.headChoice} times{" "}
                  <Typography variant="caption" component={"span"}>
                    ({flipDashboardStat.headChoicePercentage}%)
                  </Typography>
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
                  {/* If user have not flipped, return 0. If yes, check if it's smaller than 10 and append 0 before it */}
                  {!error.haveFlipped
                    ? "0"
                    : flipDashboardStat.numberFlipToday < 10
                    ? "0" + flipDashboardStat.numberFlipToday
                    : flipDashboardStat.numberFlipToday}
                </Typography>
                <Typography variant="body2" textTransform={"uppercase"}>
                  times
                </Typography>
              </Box>
              <Donut
                data={[
                  flipDashboardStat.tailChoicePercentage,
                  flipDashboardStat.headChoicePercentage,
                ]}
              />
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
                  color={"error.100"}
                  textTransform={"uppercase"}
                >
                  tail
                </Typography>
                <Typography textTransform={"uppercase"} variant="body2">
                  {flipDashboardStat.tailChoice} times{" "}
                  <Typography variant="caption" component={"span"}>
                    ({flipDashboardStat.tailChoicePercentage}%)
                  </Typography>
                </Typography>
              </Box>
              <Image src={coin6} width={24} height={24} alt="coin-icon" />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            flexDirection={"column"}
            justifyContent={"center"}
            height="24.375rem"
            position={"relative"}
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
              {error.haveFlipped ? (
                <>
                  <Typography variant="h1">
                    {flipDashboardStat.numberFlipToday < 10
                      ? "0" + flipDashboardStat.numberFlipToday
                      : flipDashboardStat.numberFlipToday}
                  </Typography>
                  <Typography
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    variant="body2"
                    color={
                      flipDashboardStat.flipCompareYesterdayPercentage < 0
                        ? Colors.decrease
                        : Colors.increase
                    }
                  >
                    {flipDashboardStat.flipCompareYesterdayPercentage < 0 ? (
                      <ArrowDownIcon fill={Colors.decrease} />
                    ) : (
                      <ArrowUpIcon fill={Colors.increase} />
                    )}
                    {Math.abs(flipDashboardStat.flipCompareYesterdayPercentage)}
                    %
                  </Typography>
                </>
              ) : (
                <Typography variant="body2">{error.errorMessage}</Typography>
              )}
            </Box>
          </DashboardCard>
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <DashboardCard
            justifyContent={"center"}
            height="15.375rem"
            position={"relative"}
          >
            <TitleTextAbsolute text="fee total" />
            {error.haveFlipped ? (
              <Box>
                <Typography mt={4} variant="h1">
                  {+(flipDashboardStat.feeTotal / Math.pow(10, 18)).toFixed(3)}{" "}
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
                  color={
                    flipDashboardStat.feeTotalCompareYesterdayPercentage < 0
                      ? Colors.decrease
                      : Colors.increase
                  }
                >
                  {flipDashboardStat.feeTotalCompareYesterdayPercentage < 0 ? (
                    <ArrowDownIcon fill={Colors.decrease} />
                  ) : (
                    <ArrowUpIcon fill={Colors.increase} />
                  )}
                  {Math.abs(
                    flipDashboardStat.feeTotalCompareYesterdayPercentage
                  )}
                  %
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2">{error.errorMessage}</Typography>
            )}
          </DashboardCard>

          <DashboardCard
            justifyContent={"center"}
            height="15.375rem"
            position={"relative"}
          >
            <TitleTextAbsolute text="bnb total" />
            {error.haveFlipped ? (
              <Box>
                <Typography mt={4} variant="h1">
                  {
                    +(flipDashboardStat.amountToday / Math.pow(10, 18)).toFixed(
                      3
                    )
                  }{" "}
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
                  color={
                    flipDashboardStat.feeTotalCompareYesterdayPercentage < 0
                      ? Colors.decrease
                      : Colors.increase
                  }
                >
                  {flipDashboardStat.feeTotalCompareYesterdayPercentage < 0 ? (
                    <ArrowDownIcon fill={Colors.decrease} />
                  ) : (
                    <ArrowUpIcon fill={Colors.increase} />
                  )}
                  {Math.abs(flipDashboardStat.amountCompareYesterdayPercentage)}
                  %
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2">{error.errorMessage}</Typography>
            )}
          </DashboardCard>
        </Grid>

        <Grid item md={8} xs={12}>
          <DashboardCard flexDirection={"column"} height="100%">
            <Typography
              alignSelf={"flex-start"}
              textTransform={"uppercase"}
              variant="body2"
            >
              flip per user
            </Typography>
            <FlipPerUserTable />
          </DashboardCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            justifyContent={"center"}
            height="15.375rem"
            position={"relative"}
          >
            <TitleTextAbsolute text="win percentage" />
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <CupIcon fill={Colors.primaryDark} width={"2.5rem"} />
              <Typography variant="h1">
                {error.haveFlipped ? flipDashboardStat.flipWinPercentage : "0"}
                <Typography variant="h2" component={"span"}>
                  %
                </Typography>
              </Typography>
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            justifyContent={"center"}
            height="15.375rem"
            position={"relative"}
          >
            <TitleTextAbsolute text="mobile flips" />
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <MobileIcon fill={Colors.primary} width={"2.5rem"} />
              <Typography variant="h1">
                {error.haveFlipped ? "49" : "0"}
                <Typography variant="h2" component={"span"}>
                  %
                </Typography>
              </Typography>
            </Box>
          </DashboardCard>
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
