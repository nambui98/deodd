import { ENVIRONMENT_SWITCH } from "./common";
import { CONTRACT_DEV } from "./contract/dev";
import { CONTRACT_PROD } from "./contract/prod";
import deoddAbi from '../abi/Deodd.json'
import deoddNFTAbi from '../abi/DeoddNFT.json'
import luckyProfileAbi from '../abi/luckyProfile.json'
import bfBusdToken from '../abi/LuckyBusd.json';
import feeManager from '../abi/FeeManager.json';
import jackpot from '../abi/JackpotPool.json';
import nftholder from '../abi/NFTHolderPool.json';

interface Map {
	[key: string]: any;
}

const addresses: Map = {
	['prod']: CONTRACT_PROD,
	['dev']: CONTRACT_DEV,
}

const address = addresses[ENVIRONMENT_SWITCH];

export const deoddContract = { address: address.deodd, abi: deoddAbi.abi }
export const deoddNFTContract = { address: address.deoddNft, abi: deoddNFTAbi.abi }
export const luckyProfile = { address: address.luckyProfile, abi: luckyProfileAbi.abi }
export const bftBusdToken = { address: address.bFBusdToken, abi: bfBusdToken.abi }
export const feeManagerContract = { address: address.feeManager, abi: feeManager.abi }
export const jackpotContract = { address: address.jackpot, abi: jackpot.abi }
export const nftHolderContract = { address: address.nftholder, abi: nftholder.abi }
// export const nftContract = { address: address.feeManager, abi: feeManager.abi }

