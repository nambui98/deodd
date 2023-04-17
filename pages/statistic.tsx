import React, { useState, useEffect } from "react";
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
import {
  getTopStreakToday,
  getFlipDashboardStat,
} from "libs/apis/statisticapi";

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
  const [topWinStreak, setTopWinStreak] = useState(0);
  const [topLossStreak, setTopLossStreak] = useState(0);
  const [streakUsername, setStreakUsername] = useState("");
  const [flipDashboardStat, setFlipDashboardStat] = useState({} as any);

  // Today's Win streak.
  useEffect(() => {
    async function returnTopStreakToday() {
      const promiseResult = await getTopStreakToday();
      const data = promiseResult.data.data;
      setTopWinStreak(data.highestWinStreak.currentStreakLength);
    }
    returnTopStreakToday();
  }, []);

  // Streak Username.
  useEffect(() => {
    async function returnTopStreakToday() {
      const promiseResult = await getTopStreakToday();
      const data = promiseResult.data.data;
      if (data != null) {
        setStreakUsername(data.highestWinStreak.username);
      }
    }
    returnTopStreakToday();
  }, []);

  // Today's Loss streak.
  useEffect(() => {
    async function returnTopStreakToday() {
      const promiseResult = await getTopStreakToday();
      const data = promiseResult.data.data;
      if (data != null) {
        setTopLossStreak(data.highestLossStreak.currentStreakLength);
      }
    }
    returnTopStreakToday();
  }, []);

  // DashboardStat.
  useEffect(() => {
    async function returnFlipDashboardStat() {
      const promiseResult = await getFlipDashboardStat();
      const data = promiseResult.data.data;
      if (data != null) {
        setFlipDashboardStat(data);
      }
    }
    returnFlipDashboardStat();
  }, []);

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
              {topWinStreak ? (
                <>
                  <Typography variant="h1">
                    {topWinStreak < 10 && topWinStreak >= 1
                      ? `0${topWinStreak}`
                      : topWinStreak}
                  </Typography>
                  <Typography>{streakUsername}</Typography>
                </>
              ) : (
                <Typography variant="h1">0</Typography>
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
            {topLossStreak ? (
              <Typography variant="h1">
                {topLossStreak < 10 && topLossStreak >= 1
                  ? `0${topLossStreak}`
                  : topLossStreak}
              </Typography>
            ) : (
              <Typography variant="h1">0</Typography>
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
            {flipDashboardStat ? (
              <>
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
                      {flipDashboardStat.numberFlipToday < 10
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
              </>
            ) : (
              <Typography variant="body2">
                Users have not flipped yet
              </Typography>
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
              user&apos;s flip choice
            </Typography>
            {flipDashboardStat ? (
              <>
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
                      {flipDashboardStat.numberFlipToday < 10
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
              </>
            ) : (
              <Typography variant="body2">
                Users have not flipped yet
              </Typography>
            )}
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
              {flipDashboardStat ? (
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
                    40%
                  </Typography>
                </>
              ) : (
                <Typography variant="h1"></Typography>
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
            {flipDashboardStat ? (
              <Box>
                <Typography mt={4} variant="h1">
                  {(flipDashboardStat.feeTotal / Math.pow(10, 18)).toFixed(3)}{" "}
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
              <Typography variant="h1">0</Typography>
            )}
          </DashboardCard>

          <DashboardCard
            justifyContent={"center"}
            height="15.375rem"
            position={"relative"}
          >
            <TitleTextAbsolute text="bnb total" />
            {flipDashboardStat ? (
              <Box>
                <Typography mt={4} variant="h1">
                  {(flipDashboardStat.amountToday / Math.pow(10, 18)).toFixed(
                    3
                  )}{" "}
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
              <Typography variant="h1">0</Typography>
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
                {flipDashboardStat ? flipDashboardStat.flipWinPercentage : "0"}
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
                49
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
