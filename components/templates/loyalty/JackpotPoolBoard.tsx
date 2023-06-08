import { Box, Stack } from "@mui/material";
import SelectBox from "components/common/SelectBox";
import { TypeTab, MyTabs2 } from "components/common/Tabs";
import React, { useState } from "react";
import { Clock2Icon, CupIcon } from "utils/Icons";
import JackpotLeaderboard from "./components/JackpotLeaderboard";
import JackpotHistory from "./components/JackpotHistory";
import {
  LoyaltyJackpotLeaderboardType,
  LoyaltyJackpotHistoryType,
  LoyaltyLoadingType,
} from "libs/types/loyaltyTypes";

type Props = {
  leaderboard: LoyaltyJackpotLeaderboardType;
  setSeason: (value: string | number) => void;
  history: LoyaltyJackpotHistoryType;
  loading: LoyaltyLoadingType;
};

function JackpotPoolBoard({ leaderboard, setSeason, history, loading }: Props) {
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
          <Clock2Icon width={20} />
        </Box>
      ),
    },
  ];

  const selectOptions = [];

  for (let i = leaderboard.currentSeason; i >= 1; i--) {
    if (i === leaderboard.currentSeason) {
      selectOptions.push({
        value: "current",
        text: "Current Season",
      });
    } else {
      selectOptions.push({
        value: i,
        text: `Season ${i}`,
      });
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
        <SelectBox selectOptions={selectOptions} setValue={setSeason} />
      </Stack>

      {valueTab === 1 ? (
        <JackpotLeaderboard loading={loading} leaderboard={leaderboard} />
      ) : valueTab === 2 ? (
        <JackpotHistory loading={loading} history={history} />
      ) : (
        ""
      )}
    </Box>
  );
}

export default JackpotPoolBoard;
