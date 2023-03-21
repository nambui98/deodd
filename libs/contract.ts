import { ENVIRONMENT_SWITCH } from "./common";
import { CONTRACT_DEV } from "./contract/dev";
import { CONTRACT_PROD } from "./contract/prod";
import deoddAbi from '../abi/Deodd.json'
import deoddNFTAbi from '../abi/DeoddNFT.json'
import luckyProfileAbi from '../abi/luckyProfile.json'
import bfBusdToken from '../abi/LuckyBusd.json';
import feeManager from '../abi/FeeManager.json';

interface Map {
	[key: string]: any;
}

const addresses: Map = {
	['prod']: CONTRACT_PROD,
	['dev']: CONTRACT_DEV,
}

const address = addresses[ENVIRONMENT_SWITCH];

export const deoddContract = { address: address.deodd, abi: deoddAbi.abi }
export const deoddNFTContract = { address: address.deoddNFT, abi: deoddNFTAbi.abi }
export const luckyProfile = { address: address.luckyProfile, abi: luckyProfileAbi.abi }
export const bftBusdToken = { address: address.bFBusdToken, abi: bfBusdToken.abi }
export const feeManagerContract = { address: address.feeManager, abi: feeManager.abi }

