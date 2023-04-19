import Image from "next/image";
import { coin0, coin6 } from "utils/Images";
import { Grid, Typography, Box } from "@mui/material";
import { Colors } from "constants/index";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";
import { ArrowDownIcon, ArrowUpIcon } from "utils/Icons";
import { DonutDisplay } from "./DonutDisplay";

type FlipPropsType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  flipDashboardStat: any;
};

export function FlipResultSection({ flipDashboardStat, error }: FlipPropsType) {
  return (
    <>
      <Grid item md={4} xs={12}>
        <DashboardCard
          flexDirection={"column"}
          justifyContent={"space-between"}
          height="24.375rem"
        >
          <Typography
            alignSelf={"flex-start"}
            textTransform={"uppercase"}
            variant="body2"
          >
            flip result
          </Typography>
          <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
            <Image src={coin0} width={24} height={24} alt="coin-head" />
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
          <DonutDisplay
            error={error}
            flipDashboardStat={flipDashboardStat}
            tail="tailResult"
            head="headResult"
          />
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
            <Image src={coin6} width={24} height={24} alt="coin-tail" />
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
            alignSelf={"flex-start"}
            textTransform={"uppercase"}
            variant="body2"
          >
            user&apos;s flip choice
          </Typography>
          <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
            <Image src={coin0} width={24} height={24} alt="coin-head" />
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
          <DonutDisplay
            error={error}
            flipDashboardStat={flipDashboardStat}
            tail="tailChoice"
            head="headChoice"
          />
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
            <Image src={coin6} width={24} height={24} alt="coin-tail" />
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
                <Typography variant="h1" fontSize={"3rem"}>
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
                  {Math.abs(flipDashboardStat.flipCompareYesterdayPercentage)}%
                </Typography>
              </>
            ) : (
              <Typography variant="body2">{error.errorMessage}</Typography>
            )}
          </Box>
        </DashboardCard>
      </Grid>
    </>
  );
}
