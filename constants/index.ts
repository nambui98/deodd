import { EnumNFTNumber } from "libs/types";

export const Colors = {
  primary: "#FC753F",
  primaryDark: "#FEF156",
  secondary: "#96A5C0",
  secondaryDark: "#FEF156",
  increase: "#29C778",
  decrease: "#C72929",
  white: "#fff",
  bg80: '#161821'

};
export const MINXIMUM_BALANCE_DEPOSIT = 0;
export const DRAWER_WIDTH = 320;
export const SERVICE_FEE = 0.035; //35%
export const VRF_FEE = 0.003;

export const AMOUNTS = [0.01, 0.02, 0.04, 0.07, 0.1, 0.13, 0.16, 0.19]
export const AMOUNTS_REAL_RECEIVE: { [key: string]: number } = {
  '0.013': 0.01,
  '0.023': 0.02,
  '0.043': 0.04,
  '0.073': 0.07,
  '0.103': 0.1,
  '0.133': 0.13,
  '0.163': 0.16,
  '0.193': 0.19
}
export const TIMEOUT_FULLFILL = 65000 //miniseconds
export const SHARE = {
  title: 'Share the link on social media, let your friends join the game, and see your wallet skyrocket.',
}
export const IPS_NOT_SUPORT: { [key: string]: string } = {
  VN: 'VN',
}

export const UPSTREAM_MESSAGE = 7;
export const DOWNSTREAM_MESSAGE = 8;

export const UrlBlockExplorer = process.env.NEXT_PUBLIC_ENVIRONMENT_BLOCKCHAIN === 'TESTNET'
  ? 'https://testnet.bscscan.com'
  : 'https://bscscan.com'
export const mapTypeTitle: { [key in EnumNFTNumber]: string } = {
  [EnumNFTNumber.BRONZE]: 'Bronze NFT Card',
  [EnumNFTNumber.GOLD]: 'Gold NFT Card',
  [EnumNFTNumber.DIAMOND]: 'Diamond NFT Card'
}