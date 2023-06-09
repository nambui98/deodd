import deoddAbi from '../abi/Deodd.json';
import deoddShopAbi from '../abi/DeoddShop.json';
import deoddNFTAbi from '../abi/DeoddNFT.json';
import dusdAbi from '../abi/DeoddUSD.json';
import nftHolderAbi from '../abi/NFTHolder.json';
import { CONTRACT_DEV } from "./contract/dev";
import { CONTRACT_PROD } from "./contract/prod";
import { erc20ABI } from 'wagmi';

interface Map {
	[key: string]: any;
}
const addresses: Map = {
	MAINNET: CONTRACT_PROD,
	PRE_MAINNET: CONTRACT_PROD,
	TESTNET: CONTRACT_DEV,
}
const address = addresses[process.env.NEXT_PUBLIC_ENVIRONMENT_BLOCKCHAIN ?? 'TESTNET'];
export const deoddContract = { address: address.deodd, abi: deoddAbi.abi }
export const deoddShopContract = { address: address.deoddShop, abi: deoddShopAbi.abi }
export const deoddNFTContract = { address: address.deoddNFT, abi: deoddNFTAbi.abi }
export const dusdContract = { address: address.dusd, abi: dusdAbi.abi }
export const nftHolderContract = { address: address.nftHolder, abi: nftHolderAbi.abi }