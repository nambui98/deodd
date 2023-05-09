import { BigNumber, Contract, ethers } from "ethers";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserService } from "../services/user.service";
import { connect, disconnect } from '@wagmi/core'
import { ENVIRONMENT_SWITCH } from "../libs/common";
import { deoddContract, deoddNFTContract, feeManagerContract, jackpotContract, luckyProfile, nftHolderContract } from "../libs/contract";
// import { getPlayerAssets, getUserInfo } from "../libs/flipCoinContract";
import { useAccount, useBalance, useConnect, useContractRead, useEnsAddress, useNetwork, useSwitchNetwork } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { DeoddService } from "libs/apis";
import { signMessage } from '@wagmi/core'
import { LocalStorage } from "libs/LocalStorage";

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

interface WalletContextType {
	walletAddress: any,
	walletIsConnected: boolean,
	setWalletAddress: (account: any) => void
	setIsLoading: Function;
	isLoading: boolean;
	bnbBalance: BigNumber,
	userInfo: { username: string, avatar: number },
	setUserInfo: Function,
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

const WalletContext = createContext<WalletContextType>({
	walletAddress: null,
	walletIsConnected: false,
	setWalletAddress: () => { },
	isLoading: false,
	setIsLoading: () => { },
	bnbBalance: BigNumber.from(0),
	userInfo: { username: '', avatar: 0 },
	setUserInfo: () => { },
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
	const [userInfo, setUserInfo] = useState<{ username: string, avatar: number }>({ username: "", avatar: 0 })
	const [walletAddress, setWalletAddress] = useState<any>();
	const [walletIsConnected, setWalletIsConnected] = useState<any>();
	const [refresh, setRefresh] = useState<boolean>(false);

	const { address, isConnected, isDisconnected, isConnecting, isReconnecting } = useAccount();

	const { chain } = useNetwork();
	const { data: ensAddress } = useEnsAddress({
		name: 'awkweb.eth',
	})
	const { chains, switchNetwork, switchNetworkAsync } = useSwitchNetwork()
	const { connectors } =
		useConnect();
	const { data: balance } = useBalance({
		address: walletAddress,
		watch: true
	})
	// const balanceBNBAssets = useContractRead({
	// 	address: deoddContract.address,
	// 	abi: deoddContract.abi,
	// 	functionName: 'getPlayerAsset',
	// 	args: [walletAddress],
	// 	watch: true
	// })

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
		}
	}, [chain]);


	useEffect(() => {
		const accessToken = LocalStorage.getAccessToken();
		const refreshToken = LocalStorage.getRefreshToken();
		const walletAddressLocal = LocalStorage.getWalletAddress();
		if (isConnected) {
			if (accessToken && refreshToken && walletAddressLocal === address) {
				setWalletIsConnected(isConnected);
				setWalletAddress(address);
			} else {
				handleConnectWallet();
			}
		} else {
			setWalletAddress(null);
			setWalletIsConnected(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, isConnected]);
	const handleAuthenticate = ({ wallet, signature }: {
		wallet: string, signature: string
	}) => {
		debugger
		DeoddService.loginWithWallet({ wallet, signature }).then((res) => {
			const { accessToken, refreshToken } = res.data.data;
			LocalStorage.setAccessToken(accessToken);
			LocalStorage.setRefreshToken(refreshToken);
			LocalStorage.setWalletAddress(wallet);
			setWalletIsConnected(true);
			setWalletAddress(wallet);
		}).catch((error) => {
			disconnect();
		});
	}

	const handleConnectWithCache = () => {
		if (isConnected) {
			return new Promise<{ account: `0x${string}` }>((resolve, reject) => {
				if (address) {
					LocalStorage.removeAccessToken();
					LocalStorage.removeRefreshToken();
					LocalStorage.removeWalletAddress();
					return resolve({ account: address });
				}
				return reject();
			}
			);
		} else
			return new Promise<{ account: `0x${string}` }>((resolve, reject) =>
				connect({
					connector: connectors[0],
				}).then(res => {
					LocalStorage.removeAccessToken();
					LocalStorage.removeRefreshToken();
					LocalStorage.removeWalletAddress();
					resolve({ account: res.account })
				}).catch((err) => reject())
			);
	}

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
		} else {
			let resultAddress: string;
			handleConnectWithCache()
				.then((res) => {
					resultAddress = res.account;
					return DeoddService.getUserNonce(`${resultAddress}`);
				})
				.then(res => {
					debugger
					if (res.data.data) {
						return res;
					} else {
						return DeoddService.signUp({ wallet: resultAddress });
					}
				})
				.then(
					({ data }) => {
						debugger
						const nonce = data.data.nonce || data.data;
						return signMessage({
							message: `Sign message to verify you are owner of wallet ${nonce}`,
						})
					}
				)
				.then((res) => {
					return handleAuthenticate({ wallet: resultAddress, signature: res })
				})
				.catch(err => {
					return disconnect();
				});
		}
	}

	useEffect(() => {
		if (balance?.formatted) {
			setBnbBalance(balance?.value!)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance?.formatted])

	useEffect(() => {
		//TODO : call api get Information 
		async function getUserInfo() {
			const userData = await DeoddService.getUserByPublicAddress(walletAddress);
			const user = userData.data.data;
			setUserInfo({ username: user.userName, avatar: user.avatarId });
		}

		const walletAddressLocal = LocalStorage.getWalletAddress();
		const nicknameLocal = LocalStorage.getNickname();
		if (nicknameLocal != null && walletAddressLocal == JSON.parse(nicknameLocal).wallet) {
			setUserInfo({ username: JSON.parse(nicknameLocal).username, avatar: JSON.parse(nicknameLocal).avatarId });
		} else {
			getUserInfo();
		}
	}, [walletAddress]);

	const value: WalletContextType = useMemo(() => {
		return {
			walletIsConnected,
			walletAddress,
			setWalletAddress,
			setIsLoading,
			isLoading,
			bnbBalance,
			userInfo,
			setUserInfo,
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		walletIsConnected,
		walletAddress,
		isLoading,
		bnbBalance,
		userInfo,
		setUserInfo,
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