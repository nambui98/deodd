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
export enum AudioPlay{
    GET_READY,
    WIN,
    LOST,
    STOP
}
export type SiteContextType = {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    isError: boolean,
    setIsError: (value: boolean) => void;
    titleError: string;
    setTitleError: (value: string) => void;
    isSuccess: boolean,
    setIsSuccess: (value: boolean) => void;
    titleSuccess: string;
    setTitleSuccess: (value: string) => void;
    audioPlayer:(value: AudioPlay) => void,

    isTurnOffAudio: boolean,
    turnOffAudio: VoidFunction;
    isGoldenHour: boolean;
    setIsGoldenHour: (value: boolean) => void;
}


export type FlipResultType = {
    // amount: BigNumber,
    // fId: BigNumber,
    // flipChoice: BigNumber,
    // jackpotReward: BigNumber,
    // playerWin: BigNumber,
    // timestamp: BigNumber,
    // tokenId: BigNumber,
    // tpoint: BigNumber,
    // typeId: BigNumber,
    wallet: string,

    fId: BigNumber,
    randomValue: BigNumber,
    flipResult: BigNumber,
    timestamp: BigNumber,
}
export enum EnumNFT {
    BRONZE,
    GOLD,
    DIAMOND
}