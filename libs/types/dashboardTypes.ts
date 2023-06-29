export type DashboardErrorType = {
  streakData: {
    noData: boolean;
    errorMessage: string;
  };
  statData: {
    noData: boolean;
    errorMessage: string;
  };
  flipData: {
    noData: boolean;
    errorMessage: string;
  }
};

export type DashboardStreakType = {
  winStreak: number;
  lossStreak: number;
  username: string;
  winWallet: string;
};

export type DashboardFlipType = {
  tailResult: number;
  headResult: number;
  tailResultPercentage: number;
  headResultPercentage: number;
  tailChoice: number;
  headChoice: number;
  tailChoicePercentage: number;
  headChoicePercentage: number;
  numberFlipToday: number;
  flipCompareYesterdayPercentage: number;
  feeTotal: number;
  feeTotalCompareYesterdayPercentage: number;
  amountToday: number;
  amountCompareYesterdayPercentage: number;
  flipWinPercentage: number;
};

export type DashboardUserFlipType = [string, {
  percentFlip: number;
  numberFlip: number;
}][];