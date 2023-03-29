import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, Contract, ethers, utils } from "ethers";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { deoddContract } from '../libs/contract';
import { useWalletContext } from './WalletContext';
import { getUserByPublicAddress } from '../libs/apis/flipCoin';
import { FlipResultType } from '../libs/types';



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
	coinSide: string,
	flipResult: string,
	tokenId: BigNumber,
	typeId: BigNumber,
	jackpotWin: BigNumber,
	tossPoints: BigNumber,
	winningStreakAmount: string,
	winningStreakLength: string
} | undefined;

interface ContractContextType {
	statusGame: StatusGame,
	setStatusGame: Function,
	gameResult: GameResultType,
	setGameResult: Function,
	audio: any,
	setIsFinish: Function,
	isFinish: boolean,
}

const ContractContext = createContext<ContractContextType>({
	statusGame: StatusGame.flip,
	setStatusGame: () => { },
	gameResult: undefined,
	setGameResult: () => { },
	audio: undefined,
	setIsFinish: () => { },
	isFinish: false,
})

export const useContractContext = () => useContext(ContractContext);

export const ContractProvider: React.FC<IProps> = ({ children }) => {

	const { walletAddress, contractDeodd } = useWalletContext();
	const [statusGame, setStatusGame] = useState<StatusGame>(StatusGame.flip);
	const [gameResult, setGameResult] = useState<GameResultType>(undefined);
	const [latestFlipId, setLatestFlipId] = useState<BigNumber | null | undefined>(null)
	const [isFinish, setIsFinish] = useState<boolean>(false);

	const [contract, setContract] = useState<Contract>()
	const [audio, setAudio] = useState<any>();

	useEffect(() => {
		let audioInit;
		audioInit = new Audio('/assets/roll.mp3');
		audioInit.loop = true;
		setAudio(audioInit)
	}, [])

	// useEffect(() => {
	// 	if (ethersSigner) {
	// 		let contractInit = new ethers.Contract(deoddContract.address, deoddContract.abi, ethersSigner)
	// 		setContract(contractInit)
	// 	}
	// }, [ethersSigner])

	useEffect(() => {
		if (contract) {
			contract.on("FlipCoinResult", async (...args) => {
				console.log("===========================================================");
				if (isFinish) {
					const latestFlipId: BigNumber = await contractDeodd?.getPlayerLatestFlipId(walletAddress)
					let { amount, fId, flipChoice, jackpotReward, playerWin, timestamp, tokenId, tpoint, typeId, wallet }: FlipResultType = args[10].args;
					if (latestFlipId?.eq(fId)) {
						audio.loop = false;
						audio.load();
						let res = await getUserByPublicAddress(walletAddress);
						setGameResult({
							amount: parseFloat(ethers.utils.formatUnits(amount)).toString(),
							coinSide: ethers.utils.formatUnits(flipChoice, 'wei'),
							flipResult: ethers.utils.formatUnits(playerWin, 'wei'),
							tokenId: tokenId,
							typeId,
							jackpotWin: jackpotReward,
							tossPoints: tpoint,
							winningStreakAmount: res.status === 200 && res.data ? res.data.data.currentStreakAmount : 0,
							winningStreakLength: res.status === 200 && res.data ? res.data.data.currentStreakLength : 0
						})
						setStatusGame(StatusGame.result)
						// setRefresh(!refresh)
					}
				}
			});
		}
	}, [contract, isFinish])



	const value: ContractContextType = {
		statusGame,
		setStatusGame,
		gameResult,
		setGameResult,
		audio,
		isFinish,
		setIsFinish
	}
	return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>
}