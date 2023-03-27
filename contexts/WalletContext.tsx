import { BigNumber, ethers, utils } from "ethers"
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import detectEthereumProvider from '@metamask/detect-provider';
import { UserService } from "../services/user.service";

import { ENVIRONMENT_SWITCH } from "../libs/common";
import { luckyProfile } from "../libs/contract";
import { getPlayerAssets, getUserInfo } from "../libs/flipCoinContract";

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
const supportedChainIds = [network.chainId];

interface wallerContextType {
	activePopup: boolean,
	setToggleActivePopup: (status: boolean) => void,
	provider: any,
	ethersProvider: any,
	ethersSigner: any,
	walletAccount: any,
	setWalletAccount: (account: any) => void
	metaMaskIsInstalled: boolean,
	chainIdIsSupported: boolean,
	bnbBalance: BigNumber,
	updateAssetsBalance: () => void
	refresh: boolean,
	setRefresh: (status: boolean) => void,
	bnbAssets: BigNumber,
	userInfo: { userName: string, avatar: string }
}

interface IProps {
	children: ReactNode
}

const WalletContext = createContext<wallerContextType>({
	activePopup: false,
	setToggleActivePopup: () => { },
	provider: null,
	ethersProvider: null,
	ethersSigner: null,
	walletAccount: null,
	setWalletAccount: () => { },
	metaMaskIsInstalled: false,
	chainIdIsSupported: false,
	bnbBalance: BigNumber.from(0),
	updateAssetsBalance: () => null,
	refresh: false,
	setRefresh: () => { },
	bnbAssets: BigNumber.from(0),
	userInfo: { userName: '', avatar: '' }
})

export const useWalletContext = () => useContext(WalletContext);

export async function changeNetwork(provider: any) {
	try {
		await provider.request({
			method: "wallet_addEthereumChain",
			params: [{ ...network }]
		});
		window.location.reload();
	} catch (addError: any) {
	}
}

export const WalletProvider: React.FC<IProps> = ({ children }) => {
	const [provider, setProvider] = useState<any>();
	const [ethersProvider, setEthersProvider] = useState<any>();
	const [ethersSigner, setEthersSigner] = useState<any>();
	const [activePopup, setActivePopup] = useState<boolean>(false);
	const [walletAccount, setWalletAccount] = useState<any>();
	const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState<boolean>(false);
	const [chainIdIsSupported, setChainIdIsSupported] = useState<boolean>(false);
	const [claimBoxContract, setClaimBoxContract] = useState<any>();
	const [bnbBalance, setBnbBalance] = useState<BigNumber>(BigNumber.from(0));
	const [refresh, setRefresh] = useState<boolean>(false);
	const [bnbAssets, setBnbAssets] = useState<BigNumber>(BigNumber.from(0))
	const [userInfo, setUserInfo] = useState<{ userName: string, avatar: string }>({ userName: '', avatar: '' })

	const handleDisconnectWallet = () => {
		UserService.removeCurrentUser();
	}

	const getInfoAddress = async () => {
		if (walletAccount) {
			const res = await getUserInfo(ethersSigner, walletAccount)
			res && setUserInfo({ userName: res[0], avatar: ethers.utils.formatUnits(res[1], 'wei') })
		}
	}

	const handleWalletAccountsChanged = async (accounts: any) => {
		if (accounts.length > 0) {
			setWalletAccount(utils.getAddress(accounts[0]))
			UserService.setCurrentUser(utils.getAddress(accounts[0]))
		} else {
			handleDisconnectWallet();
			window.location.reload();
		}
	}

	const updateBalance = async () => {
		if (walletAccount && ethersSigner) {
			const playerAssets = await getPlayerAssets(ethersSigner, walletAccount)
			//GET balance
			const balance = await ethersProvider.getBalance(walletAccount);
			setBnbBalance(balance)
			setBnbAssets(playerAssets)
		}
	}

	const handleChainChanged = async (chainId: any) => {
		window.location.reload();
	}

	useEffect(() => {

		const startApp = async (_ethereumProvider: any) => {
			if (_ethereumProvider.isMetaMask === true) {
				setMetaMaskIsInstalled(true);
			}
			const accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
			if (accounts.length > 0 && UserService.getCurrentUser()) {
				setWalletAccount(utils.getAddress(accounts[0]));
			};

			const _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
			setEthersProvider(_ethersProvider);
			const _ethersSigner = await _ethersProvider.getSigner();
			setEthersSigner(_ethersSigner);
			const chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
			if (supportedChainIds.indexOf(chainId) >= 0) {
				console.log(123123)
				setChainIdIsSupported(true);
			}
			_ethereumProvider.on('accountsChanged', handleWalletAccountsChanged);
			_ethereumProvider.on('chainChanged', handleChainChanged);
		};
		const init = async () => {
			//detect whether the browser is connected to a provider
			let ethereumProvider = await detectEthereumProvider({ silent: true });
			if (ethereumProvider) {
				setProvider(ethereumProvider);
				await startApp(ethereumProvider);
			}

		};
		init();
		return () => {
			if (provider) {
				provider.removeListener('accountsChanged', handleWalletAccountsChanged);
				provider.removeListener('chainChanged', handleChainChanged);
			}
		}
	}, []);

	useEffect(() => {
		if (walletAccount === null) {
			handleDisconnectWallet();
		}
	}, [walletAccount])

	useEffect(() => {
		if (ethersSigner) {
			updateBalance();
			getInfoAddress();
		}
	}, [walletAccount, ethersSigner, refresh])

	const value: wallerContextType = {
		activePopup,
		setToggleActivePopup: setActivePopup,
		provider,
		ethersProvider,
		ethersSigner,
		walletAccount,
		setWalletAccount,
		metaMaskIsInstalled,
		chainIdIsSupported,
		bnbBalance: bnbBalance,
		updateAssetsBalance: updateBalance,
		refresh: refresh,
		setRefresh: setRefresh,
		bnbAssets: bnbAssets,
		userInfo: userInfo
	}
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}