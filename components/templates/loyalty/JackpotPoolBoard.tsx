import { Box, Stack } from "@mui/material";
import SelectBox from "components/common/SelectBox";
import { TypeTab, MyTabs2 } from "components/common/Tabs";
import React, { useState } from "react";
import { Clock2Icon, ClockIcon, CupIcon } from "utils/Icons";
import JackpotLeaderboard from "./components/JackpotLeaderboard";
import JackpotHistory from "./components/JackpotHistory";
import {
  LoyaltyJackpotLeaderboardType,
  LoyaltyJackpotHistoryType,
  LoyaltyJackpotSeasonInfoType,
} from "libs/types/loyaltyTypes";

type Props = {
  setSeason: (value: number) => void;
  leaderboard: LoyaltyJackpotLeaderboardType;
  leaderboardIsLoading: boolean;
  leaderboardIsError: boolean;
  history: LoyaltyJackpotHistoryType;
  historyIsLoading: boolean;
  historyIsError: boolean;
  seasonInfo: LoyaltyJackpotSeasonInfoType;
  seasonInfoIsLoading: boolean;
  seasonInfoIsError: boolean;
};

function JackpotPoolBoard({
  setSeason,
  leaderboard,
  leaderboardIsLoading,
  leaderboardIsError,
  history,
  historyIsLoading,
  historyIsError,
  seasonInfo,
  seasonInfoIsLoading,
  seasonInfoIsError,
}: Props) {
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

  const selectOptions = ["Current Season"];

  if (!seasonInfoIsLoading && !seasonInfoIsError) {
    for (let i = seasonInfo.currentSeason; i >= 1; i--) {
      if (i !== seasonInfo.currentSeason) {
        selectOptions.push(`Season #${i < 10 ? "0" : ""}${i}`);
      }
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
        <JackpotLeaderboard
          leaderboard={leaderboard}
          leaderboardIsLoading={leaderboardIsLoading}
          leaderboardIsError={leaderboardIsError}
        />
      ) : valueTab === 2 ? (
        <JackpotHistory
          history={history}
          historyIsLoading={historyIsLoading}
          historyIsError={historyIsError}
        />
      ) : (
        ""
      )}
    </Box>
  );
}

export default JackpotPoolBoard;
