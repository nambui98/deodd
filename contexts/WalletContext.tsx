import { BigNumber, Contract, ethers, utils } from "ethers"
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import detectEthereumProvider from '@metamask/detect-provider';
import { UserService } from "../services/user.service";

import { ENVIRONMENT_SWITCH } from "../libs/common";
import { deoddContract, feeManagerContract, luckyProfile } from "../libs/contract";
import { getPlayerAssets, getUserInfo } from "../libs/flipCoinContract";
import { useAccount, useBalance, useConnect, useNetwork, useProvider, useSwitchNetwork } from "wagmi";
import { fetchBalance } from '@wagmi/core';
import { disconnect } from "process";
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
	updateAssetsBalance: () => void
	bnbAssets: BigNumber,
	bnbBalance: BigNumber,
	userInfo: { userName: string, avatar: string },
	contractProfile: Contract | undefined,
	contractDeodd: Contract | undefined,
	contractFeeManager: Contract | undefined,
	handleConnectWallet: () => any
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
	updateAssetsBalance: () => null,
	bnbBalance: BigNumber.from(0),
	bnbAssets: BigNumber.from(0),
	userInfo: { userName: '', avatar: '' },
	contractDeodd: undefined,
	contractProfile: undefined,
	contractFeeManager: undefined,
	handleConnectWallet: () => { }
})

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider: React.FC<IProps> = ({ children }) => {
	// const [provider, setProvider] = useState<any>();
	// const [ethersProvider, setEthersProvider] = useState<any>();
	// const [ethersSigner, setEthersSigner] = useState<any>();
	// const [activePopup, setActivePopup] = useState<boolean>(false);
	// const [walletAccount, setWalletAccount] = useState<any>();
	const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState<boolean>(false);
	// const [chainIdIsSupported, setChainIdIsSupported] = useState<boolean>(false);
	const [bnbBalance, setBnbBalance] = useState<BigNumber>(BigNumber.from(0));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [bnbAssets, setBnbAssets] = useState<BigNumber>(BigNumber.from(0))
	const [userInfo, setUserInfo] = useState<{ userName: string, avatar: string }>({ userName: '', avatar: '' })
	const [walletAddress, setWalletAddress] = useState<any>();
	const [walletIsConnected, setWalletIsConnected] = useState<any>();

	const { address, connector, isConnected } = useAccount();
	const { chain } = useNetwork();
	// const { chains } = useProvider();
	const { switchNetworkAsync } = useSwitchNetwork();
	const { connect, connectors, error, pendingConnector } =
		useConnect();
	const balance = useBalance({
		address: walletAddress,
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
	// get balance
	const getBalance: any = async (addressToken: `0x${string}`) => {
		let token;
		try {
			token = await fetchBalance({
				token: addressToken,
				address: walletAddress,
			});
		} catch (err) {
			console.log(err);
		}
		return token;
	};
	useEffect(() => {
		setWalletIsConnected(isConnected);
		setWalletAddress(address);
		if (address) {
			UserService.setCurrentUser(address);
		}
	}, [address, isConnected]);

	const handleDisconnectWallet = () => {
		UserService.removeCurrentUser();
		disconnect();
	}

	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(luckyProfile.address, luckyProfile.abi, signer);
			const contractDeodd = new ethers.Contract(deoddContract.address, deoddContract.abi, signer)
			const contractFeeManager = new ethers.Contract(feeManagerContract.address, feeManagerContract.abi, signer)
			setContractProfile(contract);
			setContractDeodd(contractDeodd);
			setContractFeeManager(contractFeeManager);
		}
	}, [chain]);


	const handleConnectWallet = async () => {
		const needsInjectedWalletFallback =
			typeof window !== 'undefined' &&
			window.ethereum &&
			!window.ethereum.isMetaMask &&
			!window.ethereum.isCoinbaseWallet;
		debugger
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
	const getInfoAddress = async () => {
		if (walletAddress && contractProfile) {
			const res = await getUserInfo(contractProfile, walletAddress)
			res && setUserInfo({ userName: res[0], avatar: ethers.utils.formatUnits(res[1], 'wei') })
		}
	}

	const updateBalance = async () => {
		if (walletAddress && contractDeodd) {
			const playerAssets = await getPlayerAssets(contractDeodd, walletAddress)
			//GET balance
			setBnbBalance(balance?.data?.value!)
			setBnbAssets(playerAssets)
		}
	}

	useEffect(() => {
		if (walletIsConnected && walletAddress) {
			updateBalance();
			getInfoAddress();
		}
	}, [walletAddress, walletIsConnected])

	const value: wallerContextType = {
		walletIsConnected,
		walletAddress,
		setWalletAddress,
		setIsLoading,
		isLoading,
		updateAssetsBalance: updateBalance,
		bnbBalance: bnbBalance,
		bnbAssets: bnbAssets,
		userInfo: userInfo,
		handleConnectWallet,
		contractDeodd,
		contractProfile,
		contractFeeManager
	}
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}