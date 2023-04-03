import { CacheProvider } from "@emotion/react";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import createEmotionCache from "../libs/createEmotionCache";
import { IProps } from "../libs/interfaces";
import { AppPropsCustom, ColorModeType } from "../libs/types";
import { darkTheme, lightTheme } from "../utils/theme";

export const ColorModeContext = createContext<ColorModeType>({
    darkMode: true,
    setDarkMode: () => { }
})

export const useColorModeContext = () => useContext(ColorModeContext);
export const ColorModeProvider: React.FC<AppPropsCustom & IProps> = (props) => {

    const clientSideEmotionCache = createEmotionCache();
    const { emotionCache = clientSideEmotionCache, pageProps, children } = props;
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [darkMode, setDarkMode] = useState<boolean>(prefersDarkMode);
    useEffect(() => {
        const mode = localStorage.getItem("mode") === "true";
        // set mode
        setDarkMode(mode);
    }, []);
    const _setDarkMode = (newmode: boolean) => {
        console.log(`set localStore ${newmode}`);
        localStorage.setItem("mode", newmode.toString());
        setDarkMode(newmode);
    };
    const value = {
        darkMode,
        setDarkMode: _setDarkMode
    }
    return <CacheProvider value={emotionCache}>
        <ColorModeContext.Provider value={value}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    </CacheProvider>
}