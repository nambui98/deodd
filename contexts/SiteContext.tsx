import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
    audioPlayer: () => { },
    isTurnOffAudio: false,
    turnOffAudio: () => { },
    isGoldenHour: false,
    setIsGoldenHour: () => { },

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
    const [isTurnOffAudio, setIsTurnOffAudio] = useState<boolean>(false);
    const [isGoldenHour, setIsGoldenHour] = useState<boolean>(false);
    useEffect(() => {
        setAudioPlay(new Audio("/assets/roll.mp3"))
        setAudioWin(new Audio("/assets/win.mp3"))
        setAudioLost(new Audio("/assets/lost.mp3"))
        let isTurnOff = localStorage.getItem("audioTurnOff") ? JSON.parse(localStorage.getItem("audioTurnOff")!) : false;
        setIsTurnOffAudio(isTurnOff)
    }, [])
    useEffect(() => {
        if (audioWin && audioPlay && audioLost) {
            if (isTurnOffAudio) {
                audioPlay!.muted = true;
                audioLost!.muted = true;
                audioWin!.muted = true;
            } else {
                audioPlay!.muted = false;
                audioLost!.muted = false;
                audioWin!.muted = false;
            }
        }
    }, [isTurnOffAudio, audioPlay, audioWin, audioLost])

    const turnOffAudio = () => {
        if (isTurnOffAudio) {
            localStorage.setItem("audioTurnOff", 'false');
            setIsTurnOffAudio(false);
        } else {
            localStorage.setItem("audioTurnOff", 'true');
            setIsTurnOffAudio(true);
            if (isTurnOffAudio) {
                audioPlay!.muted = true;
                audioLost!.muted = true;
                audioWin!.muted = true;
            }
        }
    }
    const audioPlayer = useCallback((sound: AudioPlay) => {
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
            if (audioWin && audioPlay && audioLost) {
                audioPlay?.pause();
                audioPlay!.currentTime = 0;
                audioWin?.pause();
                audioWin!.currentTime = 0;
                audioLost?.pause();
                audioLost!.currentTime = 0;

            }
        }

        // }
    }, [audioPlay, audioWin, audioLost])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value: SiteContextType = useMemo(() => {
        return {
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
            audioPlayer,
            isTurnOffAudio,
            turnOffAudio,
            isGoldenHour,
            setIsGoldenHour,
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoading,
        isError,
        titleError,
        isSuccess,
        titleSuccess,
        isTurnOffAudio,
        audioPlayer,
        isGoldenHour,
        setIsGoldenHour,
        // isTurnOffAudio
    ])
    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}