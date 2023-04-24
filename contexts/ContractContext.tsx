import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, Contract, ethers, utils } from "ethers";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { deoddContract } from '../libs/contract';
import { useWalletContext } from './WalletContext';
import { getUserByPublicAddress } from '../libs/apis/flipCoin';
import { AudioPlay, FlipResultType } from '../libs/types';
import { useContractEvent } from 'wagmi';
import { useSiteContext } from './SiteContext';
// import { watchContractEvent } from '@wagmi/core'
// import { Contract, EventData, providers } from '@wagmi/contract';

interface IProps {
	children: ReactNode
}
export enum StatusGame {
	flip,
	flipping,
	result,
}
export type GameResultType = {
	amount: string,
	coinSide: number,
	flipResult: number,
	tokenId?: BigNumber,
	typeId?: BigNumber,
	jackpotWin?: BigNumber,
	tossPoints?: BigNumber,
	winningStreakAmount?: string,
	winningStreakLength?: string
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
}

const ContractContext = createContext<ContractContextType>({
	statusGame: StatusGame.flip,
	setStatusGame: () => { },
	gameResult: undefined,
	setGameResult: () => { },
	audio: undefined,
	setIsFinish: () => { },
	isFinish: false,
	dataSelected: undefined,
	setDataSelected: () => { },
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
	const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.flip);
	const [gameResult, setGameResult] = useState<GameResultType>(undefined);
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const [dataSelected, setDataSelected] = useState<DataSelected>()
	// const unWatch = watchContractEvent(
	// 	{
	// 		address: deoddContract.address,
	// 		abi: deoddContract.abi,
	// 		eventName: 'FlipCoinResult',

	// 	},
	// 	async (...args) => {
	// 		debugger
	// 		if (isFinish) {
	// 			const latestFlipId: BigNumber = await contractDeodd?.getPlayerLatestFlipId(walletAddress)
	// 			console.log("latestFlipId: " + latestFlipId);

	// 			let { amount, fId, flipChoice, jackpotReward, playerWin, timestamp, tokenId, tpoint, typeId, wallet }: FlipResultType = (args[10] as any).args;
	// 			if (latestFlipId?.eq(fId)) {
	// 				audio.loop = false;
	// 				audio.load();
	// 				let res = await getUserByPublicAddress(walletAddress, fId.toString());
	// 				console.log(res);
	// 				console.log("result from backend: " + res);
	// 				console.log(playerWin.toNumber());

	// 				debugger
	// 				setGameResult({
	// 					amount: parseFloat(ethers.utils.formatUnits(amount)).toString(),
	// 					coinSide: flipChoice.toNumber(),
	// 					flipResult: playerWin.toNumber() === 1 ? flipChoice.toNumber() : (flipChoice.toNumber() === 0 ? 1 : 0),
	// 					tokenId: tokenId,
	// 					typeId,
	// 					jackpotWin: jackpotReward,
	// 					tossPoints: tpoint,
	// 					winningStreakAmount: res.status === 200 && res.data ? res.data.data.currentStreakAmount : 0,
	// 					winningStreakLength: res.status === 200 && res.data ? res.data.data.currentStreakLength : 0
	// 				})
	// 				setStatusGame(StatusGame.result);
	// 				setRefresh(!refresh);
	// 				setIsFinish(false);
	// 				const audioResult = new Audio(`/assets/${playerWin.gt(BigNumber.from(0)) ? 'win' : 'lost'}.mp3`);
	// 				audioResult.play();
	// 				// audioResult.load();
	// 			}
	// 		}
	// 	},
	// )
	useContractEvent({
		address: deoddContract.address,
		abi: deoddContract.abi,
		eventName: 'FlipResult',
		async listener(...args) {
			debugger
			if (isFinish) {
				// const latestFlipId: BigNumber = await contractDeodd?.getPlayerLatestFlipId(walletAddress)
				// console.log("latestFlipId: " + latestFlipId);
				debugger
				let {
					//  amount, 
					fId, randomValue, flipResult, timestamp
					// flipChoice, jackpotReward, playerWin, timestamp, tokenId, tpoint, typeId, wallet 
				}: FlipResultType = (args[4] as any).args;
				// if (latestFlipId?.eq(fId)) {
				audio.loop = false;
				audio.load();
				// let res = await getUserByPublicAddress(walletAddress, fId.toString());
				// console.log(res);
				// console.log("result from backend: " + res);
				// console.log(playerWin.toNumber());

				debugger
				setGameResult({
					amount: (dataSelected?.amount ?? 0).toString(),
					coinSide: dataSelected?.coinSide ?? 0,
					flipResult: flipResult.toNumber(),

					// coinSide: flipChoice.toNumber(),
					// flipResult: playerWin.toNumber() === 1 ? flipChoice.toNumber() : (flipChoice.toNumber() === 0 ? 1 : 0),
					// tokenId: tokenId,
					// typeId,
					// jackpotWin: jackpotReward,
					// tossPoints: tpoint,
					// winningStreakAmount: res.status === 200 && res.data ? res.data.data.currentStreakAmount : 0,
					// winningStreakLength: res.status === 200 && res.data ? res.data.data.currentStreakLength : 0
				})
				setStatusGame(StatusGame.result);
				setRefresh(!refresh);
				setIsFinish(false);

				audioPlayer(AudioPlay.STOP);
				if (BigNumber.from(dataSelected?.coinSide).eq(flipResult)) {
					audioPlayer(AudioPlay.WIN);
				} else {
					audioPlayer(AudioPlay.LOST);
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
	// useEffect(() => {
	// 	let eventName = 'FlipCoinResult';

	// 	contractDeodd?.on(eventName, async (...args) => {
	// 		debugger
	// 		if (isFinish) {
	// 			const latestFlipId: BigNumber = await contractDeodd?.getPlayerLatestFlipId(walletAddress)
	// 			console.log("latestFlipId: " + latestFlipId);

	// 			let { amount, fId, flipChoice, jackpotReward, playerWin, timestamp, tokenId, tpoint, typeId, wallet }: FlipResultType = (args[10] as any).args;
	// 			if (latestFlipId?.eq(fId)) {
	// 				audio.loop = false;
	// 				audio.load();
	// 				let res = await getUserByPublicAddress(walletAddress, fId.toString());
	// 				console.log(res);
	// 				console.log("result from backend: " + res);
	// 				console.log(playerWin.toNumber());

	// 				debugger
	// 				setGameResult({
	// 					amount: parseFloat(ethers.utils.formatUnits(amount)).toString(),
	// 					coinSide: flipChoice.toNumber(),
	// 					flipResult: playerWin.toNumber() === 1 ? flipChoice.toNumber() : (flipChoice.toNumber() === 0 ? 1 : 0),
	// 					tokenId: tokenId,
	// 					typeId,
	// 					jackpotWin: jackpotReward,
	// 					tossPoints: tpoint,
	// 					winningStreakAmount: res.status === 200 && res.data ? res.data.data.currentStreakAmount : 0,
	// 					winningStreakLength: res.status === 200 && res.data ? res.data.data.currentStreakLength : 0
	// 				})
	// 				setStatusGame(StatusGame.result);
	// 				setRefresh(!refresh);
	// 				setIsFinish(false);
	// 				const audioResult = new Audio(`/assets/${playerWin.gt(BigNumber.from(0)) ? 'win' : 'lost'}.mp3`);
	// 				audioResult.play();
	// 				// audioResult.load();
	// 			}
	// 		}
	// 	});

	// }, [contractDeodd])

	const value: ContractContextType = {
		statusGame,
		setStatusGame,
		gameResult,
		setGameResult,
		audio,
		isFinish,
		setIsFinish,
		dataSelected,
		setDataSelected,
	}
	return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}