import Image from "next/image";
import { Typography, Box } from "@mui/material";
import { Colors } from "constants/index";
import { CupIcon, MobileIcon } from "utils/Icons";
import { LogoImage } from "utils/Images";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";
import { FlipPerUserTable } from "./FlipPerUserTable";
import { CompareText } from "./CompareText";
import { DashboardErrorType, DashboardFlipType, DashboardUserFlipType } from "libs/types/dashboardTypes";

type TotalPropsType = {
  error: DashboardErrorType;
  userFlipStat: DashboardUserFlipType;
  flipDashboardStat: DashboardFlipType;
};

export function TotalSection({
  flipDashboardStat,
  error,
  userFlipStat,
}: TotalPropsType) {
  return (
    <>
      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 2"
          },
          gridColumn: { xs: "auto / span 6", md: "auto / span 2" } // fallback
        })}
        justifyContent={"center"}
        height="13.375rem"
        position={"relative"}
      >
        <TitleTextAbsolute text="fee total" />
        {!error.flipData.noData ? (
          <Box>
            <Typography mt={4} variant="h1" fontSize={"3rem"} lineHeight={1.265}>
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
            <CompareText data={flipDashboardStat.feeTotalCompareYesterdayPercentage} mt={2} />
          </Box>
        ) : (
          <Typography variant="body2">{error.flipData.errorMessage}</Typography>
        )}
      </DashboardCard >

      <DashboardCard flexDirection={"column"} height="100%" gridRow={"auto / span 2"} sx={theme => ({
        [theme.breakpoints.up("xs").replace("@media", "@container")]: {
          gridColumn: "auto / span 6"
        },
        [theme.breakpoints.up("md").replace("@media", "@container")]: {
          gridColumn: "auto / span 4"
        },
        gridColumn: { xs: "auto / span 6", md: "auto / span 4" } // fallback
      })}>
        <Typography
          alignSelf={"flex-start"}
          textTransform={"capitalize"}
          variant="body2"
        >
          flip of user
        </Typography>
        <FlipPerUserTable
          userFlipStat={userFlipStat}
          error={error}
        />
      </DashboardCard>

      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 2"
          },
          gridColumn: { xs: "auto / span 6", md: "auto / span 2" } // fallback
        })}
        justifyContent={"center"}
        height="13.375rem"
        position={"relative"}
      >
        <TitleTextAbsolute text="BNB total" />
        {!error.flipData.noData ? (
          <Box>
            <Typography mt={4} variant="h1" fontSize={"3rem"} lineHeight={1.265}>
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
            <CompareText data={flipDashboardStat.amountCompareYesterdayPercentage} mt={2} />
          </Box>
        ) : (
          <Typography variant="body2">{error.flipData.errorMessage}</Typography>
        )}
      </DashboardCard>

      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 2"
          },
          gridColumn: { xs: "auto / span 6", md: "auto / span 2" } // fallback
        })}
        justifyContent={"center"}
        height="13.375rem"
        position={"relative"}
      >
        <TitleTextAbsolute text="win percentage" />
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <CupIcon fill={Colors.primaryDark} width={"2.5rem"} />
          <Typography variant="h1" fontSize={"3rem"} lineHeight={1.265}>
            {!error.flipData.noData ? flipDashboardStat.flipWinPercentage : "0"}
            <Typography variant="h2" component={"span"} fontSize={"1.5rem"}>
              %
            </Typography>
          </Typography>
        </Box>
      </DashboardCard>

      <DashboardCard
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 2"
          },
          gridColumn: { xs: "auto / span 6", md: "auto / span 2" } // fallback
        })}
        justifyContent={"center"}
        height="13.375rem"
        position={"relative"}
      >
        <TitleTextAbsolute text="mobile flips" />
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <MobileIcon fill={Colors.primary} width={"2.5rem"} />
          <Typography variant="h1" fontSize={"3rem"} lineHeight={1.265}>
            {!error.flipData.noData ? "49" : "0"}
            <Typography variant="h2" component={"span"} fontSize={"1.5rem"}>
              %
            </Typography>
          </Typography>
        </Box>
      </DashboardCard>
      <Box
        sx={theme => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            gridColumn: "auto / span 6"
          },
          [theme.breakpoints.up("md").replace("@media", "@container")]: {
            gridColumn: "auto / span 2"
          },
          gridColumn: { xs: "auto / span 6", md: "auto / span 2" } // fallback
        })}
        p={2}
        height={"13.375rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src={LogoImage} width={133} height={80} alt="logo" />
      </Box>
    </>
  );
}
