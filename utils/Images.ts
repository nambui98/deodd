import { EnumNFT } from "libs/types";

export const BronzeImage = "/assets/images/bronze.png";
export const GoldImage = "/assets/images/gold.png";
export const DiamondImage = "/assets/images/diamond.png";
export const CampaignImage = "/assets/images/campaign.png";
export const CampaignImage2 = "/assets/images/campaign2.png";
export const CampaignImage3 = "/assets/images/campaign3.png";
export const CoinEmptyImage = "/assets/images/coin-empty.png";
export const Rank1Image = "/assets/images/rank_diamond.png";
export const Rank2Image = "/assets/images/rank_gold.png";
export const Rank3Image = "/assets/images/rank_silver.png";
export const AvatarImage = "/assets/images/avatar.png";
export const ReferralImage = "/assets/images/ref-banner.png";
export const LogoHeadImage = "/assets/icons/head.svg";
export const LoyaltyImage = "/assets/images/bgloyalty.png";
export const Loyalty2Image = "/assets/images/bgloyalty2.png";

export const LogoImage = "/assets/logos/logo.svg";
export const bgWinStreakImage = "/assets/images/bgwinstreak.png";
export const bgLossStreakImage = "/assets/images/bglossstreak.png";
export const coin0 = "/assets/images/coin/coin0.png";
export const coin6 = "/assets/images/coin/coin6.png";

export const VolumnImage = "/assets/icons/volume-high.svg";
export const VolumeTurnOffImage = "/assets/icons/volume-cross.svg";
export const BnbImage = "/assets/images/binance-coin-(bnb).png";
export const MoneyBagImage = "/assets/images/money-bag_1.png";
export const LotteryImage = "/assets/images/balls_1.png";
export const Avatar2Image = "/assets/images/avatar2.png";
export const TestailCoinImage = "/assets/images/testail_coin.png";

export const HeadCoinImage = "/assets/icons/head.svg";
export const TailCoinImage = "/assets/icons/tail.svg";
export const GoldCupImage = "/assets/images/gold-cup.png";
export const ArrowDownImage = "/assets/images/arrow-down.png";
export const MapIcon: { [key: string]: string } = {
  BNB: BnbImage,
  Bronze: BronzeImage,
  Gold: GoldImage,
  Diamond: DiamondImage,
};
export const MapIconNFT: { [key: number | string]: string } = {
  0: BronzeImage,
  1: GoldImage,
  2: DiamondImage,
};
export const MapIconNFTString: { [key in EnumNFT]: string } = {
  [EnumNFT.BRONZE]: BronzeImage,
  [EnumNFT.GOLD]: GoldImage,
  [EnumNFT.DIAMOND]: DiamondImage,
};

export const HowRef2EarnWorkImage = "/assets/images/how-ref2earn-work.png"
export const GoldenHourSidebarImage = "/assets/images/golden-hour-sidebar.svg"
