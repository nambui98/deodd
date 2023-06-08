export type LoyaltyJackpotHistoryType = {
  endTime: string;
  jackpot: number;
  startTime: string;
  tossPointRequire: number;
  userTossPoint: number;
  winnerAvatarId: number;
  winnerUserName: string;
  winnerWallet: string;
};

export type LoyaltyJackpotLeaderboardType = {
  currentSeason: number;
  leaderboardList: {
    rank: number;
    wallet: string;
    userName: string;
    avatarId: number;
    tossPoint: number;
  }[];
  connectWallet: {
    rank: number;
    wallet: string;
    userName: string;
    avatarId: number;
    tossPoint: number;
  };
};

export type LoyaltyLoadingType = {
  leaderboard: boolean;
  history: boolean;
};
