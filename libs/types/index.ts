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
export enum AudioPlay {
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
    audioPlayer: (value: AudioPlay) => void,

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
    wallet: string
    fId: BigNumber,
    requestId: BigNumber,
    amount: BigNumber,
    flipChoice: BigNumber,
    requestedAt: BigNumber,
}
export enum EnumNFT {
    BRONZE = 'BRONZE',
    GOLD = 'GOLD',
    DIAMOND = 'DIAMOND'
}
export enum EnumNFTNumber {
    BRONZE,
    GOLD,
    DIAMOND
}
export enum EnumNFTTitle {
    BRONZE = 'Bronze NFT Card',
    GOLD = 'Gold NFT Card',
    DIAMOND = 'Diamond NFT Card'
}
export enum HISTORY_TYPE {
    RECEIVE_TOSS_POINT = 'Reward Tosspoint when flip',
    RECEIVE_JACKPOT_REWARD = 'Jackpot Reward',
    CLAIM_JACKPOT_REWARD = 'Claim Jackpot Reward'
}
export enum HISTORY_TYPE_VALUE {
    RECEIVE_TOSS_POINT = 'Tosspoint',
    RECEIVE_JACKPOT_REWARD = 'BNB',
    CLAIM_JACKPOT_REWARD = 'BNB'
}
export enum MessageCommand {
    NEW_MESSAGE = 1,
    PINNED_MESSAGE = 2,
    UNPINNED_MESSAGE = 3,
    USERS_TYPING = 10,
}
export type TypeNFT = {
    id: number | string,
    type: number | string,
    image: string,
    amount: number,
}

export type TypeDataNFT = {
    total: number | undefined;
    data: {
        type: EnumNFT,
        list: TypeNFT[]
    }[];

} | undefined;
