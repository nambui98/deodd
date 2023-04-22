import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AudioPlay, SiteContextType } from "../libs/types";

export const SiteContext = createContext<SiteContextType>({
    isLoading: false,
    setIsLoading: () => { },
    isError: false,
    setIsError: () => { },
    titleError: "",
    setTitleError: () => { },
    isSuccess: false,
    setIsSuccess: () => { },
    setTitleSuccess: () => { },
    titleSuccess: "",
    audioPlayer: () => { }

})

export const useSiteContext = () => useContext(SiteContext);
interface IProps {
    children: ReactNode
}

export const SiteProvider = ({ children }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [titleError, setTitleError] = useState<string>("");
    const [titleSuccess, setTitleSuccess] = useState<string>("");
    const [audioPlay, setAudioPlay] = useState<HTMLAudioElement | undefined>();
    const [audioLost, setAudioLost] = useState<HTMLAudioElement | undefined>();
    const [audioWin, setAudioWin] = useState<HTMLAudioElement | undefined>();
    useEffect(() => {

        setAudioPlay(new Audio("/assets/roll.mp3"))
        setAudioWin(new Audio("/assets/win.mp3"))
        setAudioLost(new Audio("/assets/lost.mp3"))
    }, [])

    const audioPlayer = (sound: AudioPlay) => {
        if (sound === AudioPlay.GET_READY) {
            audioPlay!.loop = true;
            audioPlay?.play()
        }
        if (sound === AudioPlay.WIN) {
            audioWin?.play()
        }
        if (sound === AudioPlay.LOST) {
            audioLost?.play()
        }
        if (sound === AudioPlay.STOP) {
            audioPlay?.pause();
            audioPlay!.currentTime = 0;
            audioWin?.pause();
            audioWin!.currentTime = 0;
            audioLost?.pause();
            audioLost!.currentTime = 0;
        }
    }
    const value = {
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        titleError,
        setTitleError,
        isSuccess,
        setIsSuccess,
        titleSuccess,
        setTitleSuccess,
        audioPlayer
    }
    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}