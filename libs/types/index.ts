import { EmotionCache } from "@emotion/cache";
import { AppProps } from "next/app";

export type AppPropsCustom = AppProps & {
    emotionCache: EmotionCache
}
export type ColorModeType = {
    darkMode: boolean,
    setDarkMode: (value: boolean) => void
}