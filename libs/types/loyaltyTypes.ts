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

export type LoyaltyHolderLeaderboardType = {
  currentPeriod: number;
  leaderboardList: {
    rank: number;
    owner: string;
    userName: string;
    avatarId: number;
    totalDiamondNFT: number;
    totalGoldNFT: number;
    totalBronzeNFT: number;
  }[];
  connectWallet: {
    rank: number;
    owner: string;
    userName: string;
    avatarId: number;
    totalDiamondNFT: number;
    totalGoldNFT: number;
    totalBronzeNFT: number;
  };
};

export type LoyaltyHolderHistoryType = {
  tokenId: string;
  typeId: string;
  profit: number;
}[];

export type LoyaltyPeriodInfoType = {
  currentPeriod: number;
  startTime: string;
  endTime: string;
  currentPrize: number;
  currentReward: number;
  totalReward: number;
  isActive: boolean;
};
