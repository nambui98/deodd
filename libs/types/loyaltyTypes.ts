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

export type LoyaltyJackpotSeasonInfoType = {
  currentSeason: number;
  startTime: string;
  currentReward: number;
  numberOfSeason: number;
  tossPointRequire: number;
  connectWalletTossPoint: number;
}

export type LoyaltyJackpotLeaderboardType = {
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

export type LoyaltyHolderLeaderboardType = {
  leaderboard: {
    rank: number;
    wallet: string;
    user_name: string;
    avatar_id: number;
    diamond_holding: number;
    gold_holding: number;
    bronze_holding: number;
  }[];
  currentUser: {
    rank: number;
    wallet: string;
    user_name: string;
    avatar_id: number;
    diamond_holding: number;
    gold_holding: number;
    bronze_holding: number;
  };
};

export type LoyaltyHolderHistoryType = {
  type: string;
  wallet: string;
  profit: number;
  token_id: number;
  stake_atz: string;
  unstake_atz: null | string;
  image_link: string;
}[];

export type LoyaltyHolderPeriodsInfoType = {
  current_prize: number;
  end_time: string;
  id: string;
  init_prize: number;
  is_active: boolean;
  is_claimed: boolean | null;
  reward: number | null;
  season: number;
  start_time: string;
}[]
