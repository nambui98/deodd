import { Box, Stack } from "@mui/material";
import SelectBox from "components/common/SelectBox";
import { TypeTab, MyTabs2 } from "components/common/Tabs";
import React, { useState } from "react";
import { Clock2Icon, ClockIcon, CupIcon } from "utils/Icons";
import HolderHistory from "./components/HolderHistory";
import HolderLeaderboard from "./components/HolderLeaderboard";
import {
  LoyaltyHolderLeaderboardType,
  LoyaltyHolderHistoryType,
  LoyaltyHolderPeriodsInfoType,
} from "libs/types/loyaltyTypes";
import { UseQueryResult } from "@tanstack/react-query";

type PropsType = {
  periodsInfo: UseQueryResult<LoyaltyHolderPeriodsInfoType, unknown>;
  leaderboard: UseQueryResult<LoyaltyHolderLeaderboardType, unknown>;
  history: UseQueryResult<LoyaltyHolderHistoryType, unknown>;
  setPeriod: (value: number) => void;
};

function HolderPoolBoard({
  periodsInfo,
  leaderboard,
  history,
  setPeriod,
}: PropsType) {
  const [valueTab, setValueTab] = useState(1);

  const listTabs: TypeTab[] = [
    {
      id: 1,
      title: "Leaderboard",
      icon: (
        <Box mr={1} lineHeight={0}>
          <CupIcon width={20} />
        </Box>
      ),
    },
    {
      id: 2,
      title: "History",
      icon: (
        <Box mr={1} lineHeight={0}>
          {valueTab === 2 ? (
            <ClockIcon width={20} />
          ) : (
            <Clock2Icon width={20} />
          )}
        </Box>
      ),
    },
  ];

  let selectOptions = ["Current Period"];

  if (!periodsInfo.isLoading && !periodsInfo.isError) {
    for (let i = 1; i < periodsInfo.data.length; i++) {
      selectOptions.push(
        `Period #${i < 10 ? "0" : ""}${periodsInfo.data[i].season}`
      );
    }
  }

  return (
    <Box width={1}>
      <Stack
        direction={"row"}
        mb={valueTab === 1 ? 2 : valueTab === 2 ? 3 : 2}
        gap={2}
        justifyContent={"space-between"}
        sx={(theme) => ({
          [theme.breakpoints.up("xs").replace("@media", "@container")]: {
            flexDirection: "column",
          },
          "@container (min-width: 1000px)": {
            flexDirection: "row",
          }, // larger then "md" screen a little because the layout is short of width
          flexDirection: { xs: "column", md: "row" }, // fallback
          mx: { xs: 2, md: 0 },
        })}
      >
        <MyTabs2 listTabs={listTabs} value={valueTab} setValue={setValueTab} />
        <SelectBox selectOptions={selectOptions} setValue={setPeriod} />
      </Stack>

      {valueTab === 1 ? (
        <HolderLeaderboard leaderboard={leaderboard} />
      ) : valueTab === 2 ? (
        <HolderHistory history={history} />
      ) : (
        ""
      )}
    </Box>
  );
}

export default HolderPoolBoard;
