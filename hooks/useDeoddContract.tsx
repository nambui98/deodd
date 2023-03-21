import { BigNumber, Contract, ethers } from "ethers"
import { useEffect, useState } from "react"
import { deoddContract } from "../libs/contract"
import { useWalletContext } from "../contexts/WalletContext"
import { Convert } from "../utils/convert"
import { FlipResultType } from "../libs/types"
import { StatusGame } from "../pages/homepage"
export type resultType = {
    amount: string,
    coinSide: string,
    flipResult: string,
    tokenId: BigNumber,
    typeId: BigNumber,
    jackpotWin: BigNumber,
    tossPoints: BigNumber,
    winningStreakAmount: string,
    winningStreakLength: string
} | undefined
export const useDeoddContract = () => {
    const { ethersSigner, walletAccount, setRefresh, refresh } = useWalletContext();

    const [latestFlipId, setLatestFlipId] = useState<BigNumber | null | undefined>(null)
    const [isFinish, setIsFinish] = useState<boolean>(false)
    const [audio, setAudio] = useState<any>()
    const [contract, setContract] = useState<Contract>()
    const [statusGame, setStatusGame] = useState(StatusGame.flip)
    const [dataResult, setDataResult] = useState<resultType
    >()

    useEffect(() => {
        let audioInit;
        audioInit = new Audio('/assets/roll.mp3');
        audioInit.loop = true;
        setAudio(audioInit)
        if (ethersSigner) {
            let contractInit = new ethers.Contract(deoddContract.address, deoddContract.abi, ethersSigner)
            setContract(contractInit)
        }
    }, [ethersSigner])
    useEffect(() => {

    }, [])

    useEffect(() => {
        if (contract) {
            console.log("vào day");

            contract.on("FlipCoinResult", async (...args) => {
                console.log("===========================================================");
                let { amount, fId, flipChoice, jackpotReward, playerWin, timestamp, tokenId, tpoint, typeId, wallet }: FlipResultType = args[10].args;
                debugger
                audio.loop = false;
                audio.load();
                console.log("===========================================================");
                console.log(ethers.utils.formatEther(amount));
                setDataResult({
                    amount: parseFloat(ethers.utils.formatUnits(amount)).toString(),
                    coinSide: ethers.utils.formatUnits(flipChoice, 'wei'),
                    flipResult: ethers.utils.formatUnits(playerWin, 'wei'),
                    tokenId: tokenId,
                    typeId,
                    jackpotWin: jackpotReward,
                    tossPoints: tpoint,
                    winningStreakAmount: parseFloat(ethers.utils.formatUnits(jackpotReward)).toString(),
                    winningStreakLength: parseFloat(ethers.utils.formatUnits(tpoint, 'wei')).toString()
                })
                setStatusGame(StatusGame.result)
                setRefresh(!refresh)
                // }
            });
        }
    }, [contract, latestFlipId])

    useEffect(() => {
        if (isFinish === true) {
            getLatestFlipId();
        }
    }, [isFinish !== false, contract])

    const getLatestFlipId = async () => {
        const res = await contract?.getPlayerLatestFlipId(walletAccount)
        debugger
        setLatestFlipId(res)
    }
    const handleFlipToken = async (index: number, coinSide: number, bnbSend: BigNumber) => {
        const res = await contract!.flipTheCoin(
            coinSide,
            BigNumber.from(index.toString()),
            { value: bnbSend }
        );
        return res.wait()
    }
    const getFlipTokenDetail = () => {
        // debugger
        // contract.on("FlipCoinResult", (...args) => {
        //     // let transferEvent = {
        //     //     from: from,
        //     //     to: to,
        //     //     value: value,
        //     //     eventData: event,
        //     // }

        //     console.log("========================");
        //     console.log(JSON.stringify(args, null, 4))

        //     debugger
        // });

        // return {};
        // return res;
    }
    return { dataResult, audio, getFlipTokenDetail, handleFlipToken, getLatestFlipId, setIsFinish, setStatusGame, statusGame }
}