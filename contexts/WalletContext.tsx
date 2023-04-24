import { BigNumber, Contract, ethers } from "ethers";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserService } from "../services/user.service";

import { ENVIRONMENT_SWITCH } from "../libs/common";
import { deoddContract, deoddNFTContract, feeManagerContract, jackpotContract, luckyProfile, nftHolderContract } from "../libs/contract";
// import { getPlayerAssets, getUserInfo } from "../libs/flipCoinContract";
import { useAccount, useBalance, useConnect, useContractRead, useEnsAddress, useNetwork, useSwitchNetwork } from "wagmi";
import { bscTestnet } from "wagmi/chains";
interface Map {
	[key: string]: any;
}

const networks: Map = {
	['bscTestnet']: {
		chainId: `0x${Number(97).toString(16)}`,
		chainName: 'Binance Smart Chain Testnet',
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "tBNB",
			decimals: 18
		},
		rpcUrls: [
			"https://data-seed-prebsc-1-s1.binance.org:8545",
			"https://data-seed-prebsc-2-s1.binance.org:8545",
			"https://data-seed-prebsc-1-s2.binance.org:8545",
			"https://data-seed-prebsc-2-s2.binance.org:8545",
			"https://data-seed-prebsc-1-s3.binance.org:8545",
			"https://data-seed-prebsc-2-s3.binance.org:8545"
		],
		blockExplorerUrls: ["https://testnet.bscscan.com"],
	},
	['bscMainnet']: {
		chainId: `0x${Number(56).toString(16)}`,
		chainName: 'BNB Chain',
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "BNB",
			decimals: 18
		},
		rpcUrls: [
			"https://bsc-dataseed.binance.org/",
			"https://bsc-dataseed1.binance.org/",
			"https://bsc-dataseed2.binance.org/",
			"https://bsc-dataseed3.binance.org/",
			"https://bsc-dataseed4.binance.org/",
			"https://bsc-dataseed1.defibit.io/",
			"https://bsc-dataseed2.defibit.io/",
			"https://bsc-dataseed3.defibit.io/",
			"https://bsc-dataseed4.defibit.io/",
			"https://bsc-dataseed1.ninicoin.io/",
			"https://bsc-dataseed2.ninicoin.io/",
			"https://bsc-dataseed3.ninicoin.io/",
			"https://bsc-dataseed4.ninicoin.io/"
		],
		blockExplorerUrls: ["https://bscscan.com/"],
	},
	['localhost8545']: {
		chainId: `0x${Number(1337).toString(16)}`,
		chainName: 'Localhost 8545',
		nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
		rpcUrls: ['http://127.0.0.1:8545'],
		blockExplorerUrls: ['']
	}
};

const network = networks[ENVIRONMENT_SWITCH === 'prod' ? 'bscMainnet' : 'bscTestnet'];

interface wallerContextType {
	walletAddress: any,
	walletIsConnected: boolean,
	setWalletAddress: (account: any) => void
	setIsLoading: Function;
	isLoading: boolean;
	bnbAssets: BigNumber,
	bnbBalance: BigNumber,
	userInfo: { userName: string, avatar: string },
	contractProfile: Contract | undefined,
	contractDeodd: Contract | undefined,
	contractDeoddNft: Contract | undefined,
	contractFeeManager: Contract | undefined,
	contractJackpot: Contract | undefined,
	contractNftHolder: Contract | undefined,
	handleConnectWallet: () => any,
	setRefresh: (refresh: boolean) => void,
	refresh: boolean
}

interface IProps {
	children: ReactNode
}

const WalletContext = createContext<wallerContextType>({
	walletAddress: null,
	walletIsConnected: false,
	setWalletAddress: () => { },
	isLoading: false,
	setIsLoading: () => { },
	bnbBalance: BigNumber.from(0),
	bnbAssets: BigNumber.from(0),
	userInfo: { userName: '', avatar: '' },
	contractDeodd: undefined,
	contractProfile: undefined,
	contractFeeManager: undefined,
	contractJackpot: undefined,
	contractNftHolder: undefined,
	contractDeoddNft: undefined,
	handleConnectWallet: () => { },
	refresh: false,
	setRefresh: () => { },
})

export const useWalletContext = () => useContext(WalletContext);

const switchNetworkCus = async () => {
	const bscTestnetCus = {
		chainId: `0x${Number(bscTestnet.id).toString(16)}`,
		chainName: bscTestnet.name,
		nativeCurrency: bscTestnet.nativeCurrency,
		rpcUrls: [
			"https://data-seed-prebsc-1-s1.binance.org:8545/",
			"https://data-seed-prebsc-2-s1.binance.org:8545/",
			"http://data-seed-prebsc-1-s2.binance.org:8545/",
			"http://data-seed-prebsc-2-s2.binance.org:8545/",
			"https://data-seed-prebsc-1-s3.binance.org:8545/",
			"https://data-seed-prebsc-2-s3.binance.org:8545/"
		],
		blockExplorerUrls: ["https://testnet.bscscan.com"]
	}
	if (!window.ethereum) {
		// throw new Error("No crypto wallet found")
	} else {
		await (window.ethereum as any).request({
			method: "wallet_addEthereumChain",
			params: [
				{
					...bscTestnetCus
				}
			]
		});
	}

}

export const WalletProvider: React.FC<IProps> = ({ children }) => {
	const [bnbBalance, setBnbBalance] = useState<BigNumber>(BigNumber.from(0));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [bnbAssets, setBnbAssets] = useState<BigNumber>(BigNumber.from(0))
	const [userInfo, setUserInfo] = useState<{ userName: string, avatar: string }>({ userName: '', avatar: '' })
	const [walletAddress, setWalletAddress] = useState<any>();
	const [walletIsConnected, setWalletIsConnected] = useState<any>();
	const [refresh, setRefresh] = useState<boolean>(false);

	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();
	const { data: ensAddress } = useEnsAddress({
		name: 'awkweb.eth',
	})
	const { chains, switchNetwork, switchNetworkAsync } = useSwitchNetwork()
	const { connect, connectors } =
		useConnect();
	const { data: balance } = useBalance({
		address: walletAddress,
		watch: true
	})
	const balanceBNBAssets = useContractRead({
		address: deoddContract.address,
		abi: deoddContract.abi,
		functionName: 'getPlayerAsset',
		args: [walletAddress],
		watch: true
	})

	const { data: resInfo }: { data: any[] | undefined } = useContractRead({
		address: luckyProfile.address,
		abi: luckyProfile.abi,
		functionName: 'getUserInfo',
		args: [walletAddress],
		watch: true
	})
	const [contractProfile, setContractProfile] = useState<
		Contract | undefined
	>();
	const [contractDeodd, setContractDeodd] = useState<
		Contract | undefined
	>();
	const [contractFeeManager, setContractFeeManager] = useState<
		Contract | undefined
	>();
	const [contractJackpot, setContractJackpot] = useState<
		Contract | undefined
	>();
	const [contractNftHolder, setContractNftHolder] = useState<
		Contract | undefined
	>();
	const [contractDeoddNft, setContractDeoddNft] = useState<
		Contract | undefined
	>();
	useEffect(() => {
		if (bscTestnet.id !== chain?.id) {

			switchNetworkCus()
			// switchNetworkAsync?.(bscTestnet.id);
		}

		// if (switchNetwork) {
		// debugger
		// switchNetwork?.(bscTestnet.id);
		// }
	}, [chain])

	useEffect(() => {
		setWalletIsConnected(isConnected);
		setWalletAddress(address);
		if (address) {
			UserService.setCurrentUser(address);
		}
	}, [address, isConnected]);

	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);
			const signer = provider.getSigner();
			const contractProfile = new ethers.Contract(luckyProfile.address, luckyProfile.abi, signer);
			const contractDeodd = new ethers.Contract(deoddContract.address, deoddContract.abi, signer)
			const contractFeeManager = new ethers.Contract(feeManagerContract.address, feeManagerContract.abi, signer)
			const contractJackpot = new ethers.Contract(jackpotContract.address, jackpotContract.abi, signer)
			const contractNftHolder = new ethers.Contract(nftHolderContract.address, nftHolderContract.abi, signer)
			const contractDeoddNft = new ethers.Contract(deoddNFTContract.address, deoddNFTContract.abi, signer)
			setContractProfile(contractProfile);
			setContractDeodd(contractDeodd);
			setContractFeeManager(contractFeeManager);
			setContractJackpot(contractJackpot);
			setContractNftHolder(contractNftHolder);
			setContractDeoddNft(contractDeoddNft);
			// console.log(ensAddress);

			// let etherscanProvider = new ethers.providers.JsonRpcProvider(
			// 	"https://data-seed-prebsc-1-s1.binance.org:8545/",
			// 	{
			// 		chainId: 97,
			// 		name: chain?.name ?? ''
			// 	}
			// );
			// debugger
			// etherscanProvider.getLogs({
			// 	fromBlock: 0,
			// 	toBlock: 'latest',
			// 	address: walletAddress,
			// }).then((history) => {
			// 	debugger
			// 	history.forEach((tx) => {
			// 		console.log(tx);
			// 	})
			// });

		}
	}, [chain]);

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			// check if MetaMask is installed and connected
	// 			if (window.ethereum) {
	// 				//   const provider = window.ethereum;
	// 				//   await provider.request({ method: 'eth_requestAccounts' });
	// 				//   const activity = await provider.request({ method: 'eth_getTransactionByAddress', params: [walletAddress, { fromBlock: '0', toBlock: 'latest' }] });
	// 				//   debugger
	// 			} else {
	// 				console.error('MetaMask is not installed.');
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
	// 	fetchData();
	// }, [])


	const handleConnectWallet = async () => {
		const needsInjectedWalletFallback =
			typeof window !== 'undefined' &&
			window.ethereum &&
			!window.ethereum.isMetaMask &&
			!window.ethereum.isCoinbaseWallet;
		if (needsInjectedWalletFallback === undefined) {
			let a = document.createElement('a');
			a.target = '_blank';
			a.href = 'https://metamask.io/download';
			a.click();
		} else if (!walletIsConnected) {
			connect({ connector: connectors[0] })
			// const providerEthers = await new ethers.providers.Web3Provider(provider);
			// const address = await providerEthers.send("eth_requestAccounts", []);
			// if (address) {
			// 	setWalletAddress(ethers.utils.getAddress(address[0]));
			// 	UserService.setCurrentUser(address[0]);
			// 	setActivePopup(false);
			// } else {
			// 	const signer = providerEthers.getSigner();
			// 	const signature = await signer.signMessage("Please sign this transaction");
			// 	if (address && signature) {
			// 		setWalletAddress(ethers.utils.getAddress(address[0]));
			// 		UserService.setCurrentUser(address[0]);
			// 		setActivePopup(false);
			// 	}
			// }
			// if (!chainIdIsSupported) {
			// 	await changeNetwork(provider)
			// }
		}

	}



	useEffect(() => {
		if (balanceBNBAssets.data !== undefined) {
			setBnbAssets((balanceBNBAssets?.data! as BigNumber));
		} else {
			setBnbAssets(BigNumber.from(0))
		}

	}, [balanceBNBAssets.data, walletIsConnected])

	useEffect(() => {
		if (balance?.formatted) {
			setBnbBalance(balance?.value!)
		}
	}, [balance?.formatted])

	useEffect(() => {
		if (resInfo) {
			let info = {
				userName: resInfo[0], avatar: ethers.utils.formatUnits(resInfo[1], 'wei')
			}
			setUserInfo(info)
		}
	}, [resInfo?.[0], (resInfo?.[1] as BigNumber)?.toNumber()])

	const value: wallerContextType = useMemo(() => {
		return {
			walletIsConnected,
			walletAddress,
			setWalletAddress,
			setIsLoading,
			isLoading,
			bnbBalance,
			bnbAssets,
			userInfo,
			handleConnectWallet,
			contractDeodd,
			contractProfile,
			contractFeeManager,
			contractJackpot,
			contractNftHolder,
			contractDeoddNft,
			refresh,
			setRefresh
		}

	}, [
		walletIsConnected,
		walletAddress,
		isLoading,
		bnbBalance,
		bnbAssets,
		userInfo,
		contractDeodd,
		contractProfile,
		contractFeeManager,
		contractJackpot,
		contractNftHolder,
		contractDeoddNft,
		refresh,
	])
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}