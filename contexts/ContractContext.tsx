import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, Contract, ethers, utils } from "ethers";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserService } from "../services/user.service";
import { deoddContract } from '../libs/contract';
import { useWalletContext } from './WalletContext';
import { getUserByPublicAddress } from '../libs/apis/flipCoin';
import { AudioPlay, EnumNFT, FlipResultType } from '../libs/types';
import { useContractEvent, useContractRead } from 'wagmi';
import { useSiteContext } from './SiteContext';
import { TIMEOUT_FULLFILL } from 'constants/index';
import { DeoddService } from 'libs/apis';
// import { watchContractEvent } from '@wagmi/core'
// import { Contract, EventData, providers } from '@wagmi/contract';

interface IProps {
	children: ReactNode
}
export enum StatusGame {
	FLIP,
	FLIPPING,
	FLIP_RESULT,
	FLIP_LOG_DETAIL
}
export type GameResultType = {
	amount: number,
	coinSide?: number,
	isWinner?: boolean
	tokenId?: string,
	typeId?: EnumNFT,
	jackpotWin?: number,
	tossPoints?: number,
	winningStreakAmount?: string,
	winningStreakLength?: number
} | undefined;

interface ContractContextType {
	statusGame: StatusGame,
	setStatusGame: Function,
	gameResult: GameResultType,
	setGameResult: Function,
	audio: any,
	setIsFinish: Function,
	isFinish: boolean,
	dataSelected: DataSelected,
	setDataSelected: Function,
	openModalPendingTransaction: boolean,
	setOpenModalPendingTransaction: Function
}

const ContractContext = createContext<ContractContextType>({
	statusGame: StatusGame.FLIP,
	setStatusGame: () => { },
	gameResult: undefined,
	setGameResult: () => { },
	audio: undefined,
	setIsFinish: () => { },
	isFinish: false,
	dataSelected: undefined,
	setDataSelected: () => { },
	openModalPendingTransaction: false,
	setOpenModalPendingTransaction: () => { }
})
export type DataSelected = {
	coinSide?: 0 | 1,
	amount?: number,
	index?: number,
} | undefined


export const useContractContext = () => useContext(ContractContext);

export const ContractProvider: React.FC<IProps> = ({ children }) => {

	const { walletAddress, contractDeodd, refresh, setRefresh } = useWalletContext();
	const { audioPlayer } = useSiteContext();
	const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.FLIP);
	const [gameResult, setGameResult] = useState<GameResultType>({
		coinSide: undefined,
		amount: 0,
		isWinner: undefined,
		jackpotWin: undefined,
		tokenId: undefined,
		tossPoints: undefined,
		typeId: undefined,
		winningStreakAmount: undefined,
		winningStreakLength: undefined,
	});
	const [isFinish, setIsFinish] = useState<boolean>(false);
	const [openModalPendingTransaction, setOpenModalPendingTransaction] = useState<boolean>(false);

	const [dataSelected, setDataSelected] = useState<DataSelected>()
	const { refetch } = useContractRead({
		address: deoddContract.address,
		abi: deoddContract.abi,
		functionName: 'pendingRequestExists',
		args: [walletAddress],
		enabled: false,
	})

	//check pending transaction
	useEffect(() => {
		let timer: string | number | NodeJS.Timeout | undefined;
		if (statusGame === StatusGame.FLIPPING) {
			timer = setTimeout(() => {
				refetch().then(({ data }) => {
					debugger
					if (data === true) {

						debugger
						audioPlayer(AudioPlay.STOP);
						setIsFinish(false);
						setStatusGame(StatusGame.FLIP);
						setOpenModalPendingTransaction(true);
					}
				});
			}, TIMEOUT_FULLFILL);
		}
		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusGame])


	useContractEvent({
		address: deoddContract.address,
		abi: deoddContract.abi,
		eventName: 'FlipResult',
		async listener(...args) {
			if (isFinish) {
				debugger
				let {
					wallet,
					fId, randomValue, flipResult, timestamp
				}: FlipResultType = (args[5] as any).args;
				if (wallet === walletAddress) {
					audio.loop = false;
					audio.load();
					let res = await DeoddService.getResultByFlipId(fId.toString());
					console.log("flip_id: ", fId)
					console.log("current_streak: ", res.data.data.userProfile.currentStreakLength)
					setGameResult({
						amount: (dataSelected?.amount ?? 0),
						coinSide: dataSelected?.coinSide ?? 0,
						isWinner: flipResult.toNumber() === 0 ? false : true,

						// flipResult: flipResult.toNumber(),

						// coinSide: flipChoice.toNumber(),
						// flipResult: playerWin.toNumber() === 1 ? flipChoice.toNumber() : (flipChoice.toNumber() === 0 ? 1 : 0),
						// tokenId: tokenId,
						// typeId,
						// jackpotWin: jackpotReward
						jackpotWin: res.status === 200 && res.data ? res.data.data.flip.jackpot_reward : 0,
						tokenId: res.status === 200 && res.data ? res.data.data.flip.token_id : 0,
						typeId: res.status === 200 && res.data ? res.data.data.flip.type_id : 0,
						tossPoints: res.status === 200 && res.data ? res.data.data.flip.toss_point : 0,
						// winningStreakAmount: res.status === 200 && res.data ? res.data.data.userProfile.currentStreakAmount : 0,
						winningStreakLength: res.status === 200 && res.data ? res.data.data.userProfile.currentStreakLength : 0
					})
					setStatusGame(StatusGame.FLIP_RESULT);
					setRefresh(!refresh);
					setIsFinish(false);
					audioPlayer(AudioPlay.STOP);
					if (flipResult.toNumber() === 1) {
						audioPlayer(AudioPlay.WIN);
					} else {
						audioPlayer(AudioPlay.LOST);
					}
				}
			}
		},
	})
	const [audio, setAudio] = useState<any>();
	useEffect(() => {
		let audioInit;
		audioInit = new Audio('/assets/roll.mp3');
		audioInit.loop = true;
		setAudio(audioInit)
	}, [])

	const value = {
		statusGame,
		setStatusGame,
		gameResult,
		setGameResult,
		audio,
		isFinish,
		setIsFinish,
		dataSelected,
		setDataSelected,
		openModalPendingTransaction,
		setOpenModalPendingTransaction
	}
	// const value: ContractContextType = useMemo(() => {
	// 	return (
	// 		{
	// 			statusGame,
	// 			setStatusGame,
	// 			gameResult,
	// 			setGameResult,
	// 			audio,
	// 			isFinish,
	// 			setIsFinish,
	// 			dataSelected,
	// 			setDataSelected,

	// 		}
	// 	)

	// }, [statusGame,
	// 	gameResult,
	// 	audio,
	// 	isFinish,
	// 	dataSelected,
	// ])
	return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}