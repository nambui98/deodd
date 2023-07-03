import { StatusGame, useGameContext } from "contexts/GameContext";
import { useSiteContext } from "contexts/SiteContext";
import { BigNumber } from "ethers";
import { AudioPlay } from "libs/types";
import { useCallback } from "react";
import { useWalletContext } from "../contexts/WalletContext";

export const useDeoddContract = () => {
    const { contractDeodd } = useWalletContext();

    const { setStatusGame } = useGameContext();
    const { setIsLoading, setIsError, audioPlayer, setTitleError, setTitleSuccess, setIsSuccess } = useSiteContext();
    const claimBNB = async () => {
        const res = await contractDeodd?.claimBNB();
        return res.wait();
    }

    const handleClaimBnb = useCallback(async () => {
        try {
            setIsLoading(true);
            let res = await claimBNB();
            setIsLoading(false);
            if (res.status) {
                setTitleSuccess('Claimed successfully')
                setIsSuccess(true);
            }
        } catch (error: any) {
            setIsLoading(false);
            setTitleError(error.reason || 'Something went wrong. Please try again!')
            setIsError(true);
        }
    }, [])

    const handleFlipToken = useCallback(async (index: number, coinSide: number, bnbSend: BigNumber) => {
        const res = await contractDeodd?.flipTheCoin(
            coinSide,
            BigNumber.from(index.toString()),
            { value: bnbSend }
        )

        audioPlayer(AudioPlay.GET_READY);
        setStatusGame(StatusGame.FLIPPING)
        return res.wait()
    }, [])
    return { handleClaimBnb, handleFlipToken }
}

