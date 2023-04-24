import Image from "next/image";
import { Grid, Typography, Box } from "@mui/material";
import { Colors } from "constants/index";
import { CupIcon, MobileIcon, ArrowDownIcon, ArrowUpIcon } from "utils/Icons";
import { LogoImage } from "utils/Images";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";
import { FlipPerUserTable } from "./FlipPerUserTable";

type TotalPropsType = {
  error: {
    haveFlipped: boolean;
    errorMessage: string;
  };
  userPerFlip: any;
  totalUser: number;
  flipDashboardStat: any;
};

export function TotalSection({
  flipDashboardStat,
  error,
  userPerFlip,
  totalUser,
}: TotalPropsType) {
  return (
    <>
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
              <Typography mt={4} variant="h1" fontSize={"3rem"}>
                {+(flipDashboardStat.feeTotal / Math.pow(10, 18)).toFixed(3)}{" "}
                <Typography
                  component={"span"}
                  variant="h2"
                  textTransform={"uppercase"}
                  fontSize={"1.5rem"}
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
                {Math.abs(flipDashboardStat.feeTotalCompareYesterdayPercentage)}
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
              <Typography mt={4} variant="h1" fontSize={"3rem"}>
                {+(flipDashboardStat.amountToday / Math.pow(10, 18)).toFixed(3)}{" "}
                <Typography
                  component={"span"}
                  variant="h2"
                  textTransform={"uppercase"}
                  fontSize={"1.5rem"}
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
                {Math.abs(flipDashboardStat.amountCompareYesterdayPercentage)}%
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
            textTransform={"capitalize"}
            variant="body2"
          >
            flip per user
          </Typography>
          <FlipPerUserTable
            userPerFlip={userPerFlip}
            totalUser={totalUser}
            error={error}
          />
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
            <Typography variant="h1" fontSize={"3rem"}>
              {error.haveFlipped ? flipDashboardStat.flipWinPercentage : "0"}
              <Typography variant="h2" component={"span"} fontSize={"1.5rem"}>
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
            <Typography variant="h1" fontSize={"3rem"}>
              {error.haveFlipped ? "49" : "0"}
              <Typography variant="h2" component={"span"} fontSize={"1.5rem"}>
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
    </>
  );
}
