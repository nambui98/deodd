import { EmotionCache } from "@emotion/cache";
import { BigNumber } from "ethers";
import { AppProps } from "next/app";

export type AppPropsCustom = AppProps & {
    emotionCache: EmotionCache
}
export type ColorModeType = {
    darkMode: boolean,
    setDarkMode: (value: boolean) => void
}

export type FlipResultType = {
    amount: BigNumber,
    fId: BigNumber,
    flipChoice: BigNumber,
    jackpotReward: BigNumber,
    playerWin: BigNumber,
    timestamp: BigNumber,
    tokenId: BigNumber,
    tpoint: BigNumber,
    typeId: BigNumber,
    wallet: string
}