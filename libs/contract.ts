import deoddAbi from '../abi/Deodd.json';
import { CONTRACT_DEV } from "./contract/dev";
import { CONTRACT_PROD } from "./contract/prod";

interface Map {
	[key: string]: any;
}
const addresses: Map = {
	PRODUCTION: CONTRACT_PROD,
	DEV: CONTRACT_DEV,
}
const address = addresses[process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'DEV'];
export const deoddContract = { address: address.deodd, abi: deoddAbi.abi }