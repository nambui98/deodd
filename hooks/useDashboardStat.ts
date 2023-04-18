import { useEffect, useReducer } from "react";
import { getFlipPerUser } from "libs/apis/statisticapi";
import {
  getTopStreakToday,
  getFlipDashboardStat,
} from "libs/apis/statisticapi";

// This is sort function for userPerFlip
function matchValue(str: string): any {
  const matches = str.match(/\d+/g);
  if (matches != null) {
    const value = matches.length > 1 ? matches[1] : matches[0];
    return value;
  }
}

function sortFunction([a]: any, [b]: any) {
  if (matchValue(a) - matchValue(b) > 0) {
    return 1;
  } else {
    return -1;
  }
}
// -----

function reducer(state: any, action: any): any {
  switch (action.type) {
    case "set_flipped_true": {
      return { ...state, error: { ...state.error, haveFlipped: true } };
    }
    case "set_flipped_false": {
      return {
        ...state,
        error: { haveFlipped: false, errorMessage: action.payload },
      };
    }
    case "set_streak": {
      return {
        ...state,
        streak: {
          winStreak: action.payload.winStreak,
          lossStreak: action.payload.lossStreak,
          username: action.payload.username,
        },
      };
    }
    case "set_dashboard_stats": {
      return { ...state, flipDashboardStat: action.payload };
    }
    case "set_user_per_flip": {
      return { ...state, userPerFlip: action.payload };
    }
    case "set_total_user": {
      return { ...state, totalUser: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function useDashboardStat() {
  const [stats, dispatch] = useReducer(reducer, {
    error: {
      haveFlipped: true,
      errorMessage: "",
    },
    streak: {
      winStreak: 0,
      lossStreak: 0,
      username: "",
    },
    flipDashboardStat: {},
    userPerFlip: [],
    totalUser: 0,
  });

  useEffect(() => {
    async function returnStreakToday() {
      const promiseResult = await getTopStreakToday();
      const data = promiseResult.data.data;
      if (data != null) {
        dispatch({
          type: "set_streak",
          payload: {
            winStreak: data.highestWinStreak.currentStreakLength,
            lossStreak: data.highestLossStreak.currentStreakLength,
            username: data.highestWinStreak.username,
          },
        });
        dispatch({ type: "set_flipped_true" });
      } else {
        dispatch({
          type: "set_flipped_false",
          payload: promiseResult.data.meta.error_message,
        });
      }
    }
    returnStreakToday();

    async function returnFlipDashboardStat() {
      const promiseResult = await getFlipDashboardStat();
      const data = promiseResult.data.data;
      if (data != null) {
        dispatch({ type: "set_dashboard_stats", payload: data });
        dispatch({ type: "set_flipped_true" });
      } else {
        dispatch({
          type: "set_flipped_false",
          payload: promiseResult.data.meta.error_message,
        });
      }
    }
    returnFlipDashboardStat();

    async function returnFlipPerUser() {
      const promiseResult = await getFlipPerUser();
      const data = promiseResult.data.data;
      if (data != null) {
        const sortedFlip = (Object.entries(data.userPerFlip) as any).toSorted(
          sortFunction
        );
        dispatch({ type: "set_user_per_flip", payload: sortedFlip });
        dispatch({ type: "set_total_user", payload: data.totalUser });
        dispatch({ type: "set_error_true" });
      } else {
        dispatch({ type: "set_flipped_false" });
      }
    }
    returnFlipPerUser();
  }, []);

  return { ...stats };
}
