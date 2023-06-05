import { createContext, useContext } from "react";
import { useDashboardStat } from "hooks/useDashboardStat";

type DashboardContextType = {
  error: {
    streakData: boolean;
    statData: boolean;
    flipData: boolean;
    errorMessage: string;
  };
  flipDashboardStat: {
    [index: string]: any;
  };
  streak: {
    winStreak: number;
    lossStreak: number;
    username: string;
    winWallet: string;
  };
  userFlipStat: {
    [index: string]: any;
  };
}

const DashboardContext = createContext<DashboardContextType>({
  error: {
    streakData: false,
    statData: false,
    flipData: false,
    errorMessage: "",
  },
  flipDashboardStat: {},
  streak: {
    winStreak: 0,
    lossStreak: 0,
    username: "",
    winWallet: "",
  },
  userFlipStat: {},
});

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { error, flipDashboardStat, streak, userFlipStat } =
    useDashboardStat();

  return <DashboardContext.Provider value={{ error, flipDashboardStat, streak, userFlipStat }}>{children}</DashboardContext.Provider>
}
