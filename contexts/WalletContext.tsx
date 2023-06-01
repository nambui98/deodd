import { BigNumber, Contract, ethers } from "ethers";
import { LocalStorage } from "libs/LocalStorage";
import { DeoddService } from "libs/apis";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useConnect, useDisconnect, useNetwork, useSignMessage, useSwitchNetwork } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { deoddContract } from "../libs/contract";

interface walletContextType {
	walletAddress: any,
	walletIsConnected: boolean,
	setWalletAddress: (account: any) => void
	setIsLoading: Function;
	isLoading: boolean;
	bnbBalance: BigNumber,
	userInfo: { username: string, avatar: number },
	setUserInfo: Function,
	contractDeodd: Contract | undefined,
	handleConnectWallet: () => any,
	setRefresh: (refresh: boolean) => void,
	refresh: boolean,
	isConnectingWallet: boolean
}

interface IProps {
	children: ReactNode
}

const WalletContext = createContext<walletContextType>({
	walletAddress: null,
	walletIsConnected: false,
	setWalletAddress: () => { },
	isLoading: false,
	setIsLoading: () => { },
	bnbBalance: BigNumber.from(0),
	userInfo: { username: '', avatar: 0 },
	setUserInfo: () => { },
	contractDeodd: undefined,
	handleConnectWallet: () => { },
	refresh: false,
	setRefresh: () => { },
	isConnectingWallet: false
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
	const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);
	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage()

	const { chain } = useNetwork();

	const { disconnect } = useDisconnect()
	const { switchNetworkAsync } = useSwitchNetwork()

	const { connectAsync, connectors } =
		useConnect();
	const { data: balance } = useBalance({
		address: walletAddress,
		watch: true
	})

	const [contractDeodd, setContractDeodd] = useState<
		Contract | undefined
	>();
	useEffect(() => {
		if (bscTestnet.id !== chain?.id) {
			// switchNetworkCus()
			switchNetworkAsync?.(bscTestnet.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chain])
	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);
			const signer = provider.getSigner();
			const contractDeodd = new ethers.Contract(deoddContract.address, deoddContract.abi, signer)
			setContractDeodd(contractDeodd);
		}
	}, [chain]);


	useEffect(() => {
		const accessToken = LocalStorage.getAccessToken();
		const refreshToken = LocalStorage.getRefreshToken();
		const walletAddressLocal = LocalStorage.getWalletAddress();
		if (isConnected && address) {
			if (accessToken && refreshToken && walletAddressLocal === address) {
				setWalletIsConnected(isConnected);
				setWalletAddress(address);
			}
			else {
				if (isConnectingWallet === false) {
					handleConnectWallet();
				}
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
		DeoddService.loginWithWallet({ wallet, signature }).then((res) => {
			const { accessToken, refreshToken } = res.data.data;
			LocalStorage.setAccessToken(accessToken);
			LocalStorage.setRefreshToken(refreshToken);
			LocalStorage.setWalletAddress(wallet);
			LocalStorage.setIsProfileModalOpened(false);
			setWalletIsConnected(true);
			setWalletAddress(wallet);
			setIsConnectingWallet(false)
		}).catch((error) => {
			disconnect();
		});
	}

	const handleConnectWithCache = () => {

		LocalStorage.removeAccessToken();
		LocalStorage.removeRefreshToken();
		LocalStorage.removeWalletAddress();
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
		}

		return new Promise<{ account: `0x${string}` }>((resolve, reject) =>
			connectAsync({
				connector: connectors[0],

			}).then(res => {
				LocalStorage.removeAccessToken();
				LocalStorage.removeRefreshToken();
				LocalStorage.removeWalletAddress();
				resolve({ account: res.account })
			}).catch((err) => reject())
		);
	}
	const handleSignMessage = () => {
		DeoddService.getUserNonce(`${address}`)
			.then(res => {
				if (res.data.data) {
					return res;
				} else {
					return DeoddService.signUp({ wallet: `${address}` });
				}
			})
			.then(
				({ data }) => {
					const nonce = data.data.nonce || data.data;
					return signMessageAsync({
						message: `Sign message to verify you are owner of wallet ${nonce}`,
					})
				}
			)
			.then((res) => {
				return handleAuthenticate({ wallet: `${address}`, signature: res })
			})
			.catch(err => {
				return disconnect();
			});

	}
	const handleConnectWallet = async () => {
		const needsInjectedWalletFallback =
			typeof window !== 'undefined' &&
			window.ethereum &&
			!window.ethereum.isMetaMask &&
			!window.ethereum.isCoinbaseWallet;
		setIsConnectingWallet(true);
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
					if (res.data.data) {
						return res;
					} else {
						return DeoddService.signUp({ wallet: resultAddress });
					}
				})
				.then(
					({ data }) => {
						const nonce = data.data.nonce || data.data;
						return signMessageAsync({
							message: `Sign message to verify you are owner of wallet ${nonce}`,
						})
					}
				)
				.then((res) => {
					return handleAuthenticate({ wallet: resultAddress, signature: res })
				})
				.catch(err => {
					setIsConnectingWallet(false);
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
			setUserInfo({ username: user?.userName, avatar: user?.avatarId ?? 0 });
			LocalStorage.setUserInfo({
				wallet: walletAddress,
				username: user.userName,
				avatarId: user.avatarId ?? 0,
			});
		}
		if (walletAddress) {
			const walletAddressLocal = LocalStorage.getWalletAddress();
			const userInfoLocal = LocalStorage.getUserInfo();
			if (userInfoLocal != null && walletAddressLocal == userInfoLocal.wallet) {
				setUserInfo({ username: userInfoLocal.username, avatar: userInfoLocal.avatarId ?? 0 });

			} else {
				getUserInfo();
			}
		}

	}, [walletAddress]);

	const value: walletContextType = useMemo(() => {
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
			refresh,
			setRefresh,
			isConnectingWallet
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		walletIsConnected,
		walletAddress,
		isLoading,
		bnbBalance,
		userInfo,
		contractDeodd,
		refresh,
		isConnectingWallet
	])
	return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}