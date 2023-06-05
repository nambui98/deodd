import Image from "next/image";
import { coin0, coin6 } from "utils/Images";
import { Typography, Box, Stack } from "@mui/material";
import { Colors } from "constants/index";
import { DashboardCard } from "./DashboardCard";
import { TitleTextAbsolute } from "./TitleTextAbsolute";
import { ArrowDownIcon, ArrowUpIcon } from "utils/Icons";
import { DonutDisplay } from "./DonutDisplay";
import { CompareText } from "./CompareText";
import { useDashboardContext } from "contexts/DashboardContext";

export function FlipResultSection() {
  const { error, flipDashboardStat } = useDashboardContext();

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
        flexDirection={"column"}
        justifyContent={"space-between"}
        height="22.375rem"
      >
        <Typography
          alignSelf={"flex-start"}
          textTransform={"capitalize"}
          variant="body2"
        >
          flip result
        </Typography>
        <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
          <Image src={coin0} width={24} height={24} alt="coin-head" />
          <Stack gap={0.5}>
            <Typography
              variant="h3"
              lineHeight={"1.25rem"}
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
          </Stack>
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
          <Stack gap={0.5}>
            <Typography
              variant="h3"
              lineHeight={"1.25rem"}
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
          </Stack>
          <Image src={coin6} width={24} height={24} alt="coin-tail" />
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
        flexDirection={"column"}
        justifyContent={"space-between"}
        height="22.375rem"
      >
        <Typography
          alignSelf={"flex-start"}
          textTransform={"capitalize"}
          variant="body2"
        >
          user&apos;s flip choice
        </Typography>
        <Box display={"flex"} alignSelf={"flex-start"} gap={1}>
          <Image src={coin0} width={24} height={24} alt="coin-head" />
          <Stack gap={0.5}>
            <Typography
              variant="h3"
              lineHeight={"1.25rem"}
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
          </Stack>
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
          <Stack gap={0.5}>
            <Typography
              variant="h3"
              lineHeight={"1.25rem"}
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
          </Stack>
          <Image src={coin6} width={24} height={24} alt="coin-tail" />
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
        flexDirection={"column"}
        justifyContent={"center"}
        height="22.375rem"
        position={"relative"}
        gap={2}
      >
        <TitleTextAbsolute text="flip total" />

        <Image src={coin0} width={80} height={80} alt="coin-img" />
        {error.statData ? (
          <>
            <Typography variant="h1" fontSize={"3rem"} lineHeight={"3.8125rem"}>
              {flipDashboardStat.numberFlipToday < 10
                ? "0" + flipDashboardStat.numberFlipToday
                : flipDashboardStat.numberFlipToday}
            </Typography>
            <CompareText data={flipDashboardStat.flipCompareYesterdayPercentage} />
          </>
        ) : (
          <Typography variant="body2">{error.errorMessage}</Typography>
        )}
      </DashboardCard>
    </>
  );
}
