import { ReactNode, createContext, useContext, useState } from "react";
import { SiteContextType } from "../libs/types";

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
        setTitleSuccess
    }
    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}