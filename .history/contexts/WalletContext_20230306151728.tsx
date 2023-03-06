import { ethers, utils } from "ethers"
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
	bnbBalance: string,
	heeBalance: string,
	fiuBalance: string,
	shoeBalance: string,
	boxBalance: string,
	busdBalance: string,
	updateAssetsBalance: () => void
	claimBoxContract: any,
	refresh: boolean,
	setRefresh: (status: boolean) => void,
	bnbAssets: string,
	theme: 'light' | 'dark'
	setTheme: (theme: 'light' | 'dark') => void,
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
	bnbBalance: '',
	heeBalance: '',
	fiuBalance: '',
	shoeBalance: '',
	boxBalance: '',
	busdBalance: '',
	updateAssetsBalance: () => null,
	claimBoxContract: null,
	refresh: false,
	setRefresh: () => { },
	bnbAssets: '',
	theme: 'dark',
	setTheme: () => { },
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
		// console.error('wallet_addEthereumChain', addError);
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
	const [bnbBalance, setBnbBalance] = useState<string>('');
	const [heeBalance, setHeebalance] = useState<string>('');
	const [fiuBalance, setFiuBalance] = useState<string>('');
	const [shoeBalance, setShoeBalance] = useState<string>('');
	const [boxBalance, setBoxBalance] = useState<string>('');
	const [busdBalance, setBusdBalance] = useState<string>('');
	const [refresh, setRefresh] = useState<boolean>(false);
	const [bnbAssets, setBnbAssets] = useState<string>('')
	const [theme, setTheme] = useState<'light' | 'dark'>('dark')
	const [userInfo, setUserInfo] = useState<{ userName: string, avatar: string }>({ userName: '', avatar: '' })

	const handleDisconnectWallet = () => {
		UserService.removeCurrentUser();
	}

	const getInfoAddress = async () => {
		const res = await getUserInfo(ethersSigner, walletAccount)
		res && setUserInfo({ userName: res[0], avatar: ethers.utils.formatUnits(res[1], 'wei') })
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

			setBnbBalance(ethers.utils.formatEther(balance))
			setBnbAssets(ethers.utils.formatUnits(playerAssets))
		}
	}

	const handleChainChanged = async (chainId: any) => {
		// if (supportedChainIds.indexOf(chainId) >= 0) {
		// 	setChainIdIsSupported(true);
		// } else {
		// 	setChainIdIsSupported(false);
		// }
		window.location.reload();
	}

	useEffect(() => {

		const startApp = async (_ethereumProvider: any) => {
			//The provider detected by detectEthereumProvider() must be the same as window.ethereum
			// if (_ethereumProvider !== (window as any).ethereum) {
			// 	alert('Do you have multiple wallets installed?');
			// 	return;
			// }
			if (_ethereumProvider.isMetaMask === true) {
				setMetaMaskIsInstalled(true);
			}
			// Check if a MetaMask account has permission to connect to app
			const accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
			if (accounts.length > 0 && UserService.getCurrentUser()) {
				setWalletAccount(utils.getAddress(accounts[0]));
			};

			const _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
			// await _ethersProvider.send('eth_requestAccounts', []);
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
		walletAccount === null && handleDisconnectWallet()
	}, [walletAccount])

	useEffect(() => {
		ethersSigner && updateBalance()
		ethersSigner && getInfoAddress()
	}, [walletAccount, ethersSigner, refresh])

	useEffect(() => {
		// const changeChain = async () => {
		// 	if (!chainIdIsSupported) {
		// 		await changeNetwork(provider)
		// 	}
		// }
		// changeChain();

		if (!localStorage.getItem('theme')) {
			setTheme('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			setTheme((localStorage.getItem('theme') as 'dark' | 'light') || 'dark')
		}
	}, [])

	const value = {
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
		heeBalance: heeBalance,
		fiuBalance: fiuBalance,
		shoeBalance: shoeBalance,
		boxBalance: boxBalance,
		busdBalance: busdBalance,
		updateAssetsBalance: updateBalance,
		claimBoxContract,
		refresh: refresh,
		setRefresh: setRefresh,
		bnbAssets: bnbAssets,
		theme: theme,
		setTheme: setTheme,
		userInfo: userInfo
	}
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}