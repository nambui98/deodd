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
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

interface GameContextType {
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

const GameContext = createContext<GameContextType>({
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


export const useGameContext = () => useContext(GameContext);
export enum EnumResult {
	LOST,
	WIN
}
export const GameProvider: React.FC<IProps> = ({ children }) => {

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
	const queryClient = useQueryClient();
	const [dataSelected, setDataSelected] = useState<DataSelected>()
	const { refetch } = useContractRead({
		address: deoddContract.address,
		abi: deoddContract.abi,
		functionName: 'pendingRequestExists',
		args: [walletAddress],
		enabled: false,
	})

	const getResultByFlipId = useMutation({
		mutationFn: (fId: BigNumber) => {
			return DeoddService.getResultByFlipId(fId.toString())
		},
		onSuccess(data, variables, context) {
			const flipData = data?.data?.data?.flip;
			const userData = data?.data?.data?.userProfile;
			setGameResult({
				amount: parseFloat(ethers.utils.formatEther((flipData?.amount ?? 0).toString())),
				coinSide: flipData?.flip_choice,
				isWinner: flipData?.flip_result === EnumResult.WIN,
				// jackpotWin: jackpotReward
				jackpotWin: flipData?.jackpot_reward ?? 0,
				tokenId: flipData?.token_id,
				typeId: flipData?.type_id,
				tossPoints: flipData?.toss_point ?? 0,
				winningStreakLength: userData?.currentStreakLength ?? 0,
			})
			setStatusGame(StatusGame.FLIP_RESULT);
			setRefresh(!refresh);
			setIsFinish(false);
			queryClient.invalidateQueries({ queryKey: ['getTestail'] });
			audioPlayer(AudioPlay.STOP);
			if (flipData?.flip_result === EnumResult.WIN) {
				audioPlayer(AudioPlay.WIN);
			} else {
				audioPlayer(AudioPlay.LOST);
			}
		},
		retry: 15,
		retryDelay: 2000
	});
	//check pending transaction
	useEffect(() => {
		let timer: string | number | NodeJS.Timeout | undefined;
		if (statusGame === StatusGame.FLIPPING) {
			timer = setTimeout(() => {
				refetch().then(({ data }) => {
					if (data === true) {
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

	// useEffect(() => {
	// }, [third])

	useContractEvent({
		address: deoddContract.address,
		abi: deoddContract.abi,
		eventName: 'Flip',
		listener(...args) {
			if (isFinish) {
				let {
					wallet,
					fId
				}: FlipResultType = (args[6] as any).args;
				if (wallet === walletAddress) {
					audio.loop = false;
					audio.load();
					getResultByFlipId.mutateAsync(fId)
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
	return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}