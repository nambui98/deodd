import { ENVIRONMENT_SWITCH } from "./common";
import { CONTRACT_DEV } from "./contract/dev";
import { CONTRACT_PROD } from "./contract/prod";
import luckyCryptoAbi from '../abi/LuckyCrypto.json'
import luckyProfileAbi from '../abi/luckyProfile.json'
import bfBusdToken from '../abi/LuckyBusd.json';

interface Map {
	[key: string]: any;
}

const addresses: Map = {
	['prod']: CONTRACT_PROD,
	['dev']: CONTRACT_DEV,
}

const address = addresses[ENVIRONMENT_SWITCH];

export const luckyCrypto = { address: address.luckyCrypto, abi: luckyCryptoAbi.abi }
export const luckyProfile = { address: address.luckyProfile, abi: luckyProfileAbi.abi }
export const bftBusdToken = { address: address.bFBusdToken, abi: bfBusdToken.abi }

