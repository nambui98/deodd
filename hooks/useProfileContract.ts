import { useWalletContext } from "../contexts/WalletContext";

export const useProfileContract = () => {
    const { walletAddress, contractProfile, isLoading, setIsLoading, bnbAssets } = useWalletContext();

    const registerName = async (username: string, avatar: number) => {
        const res = await contractProfile?.registerName(username, avatar)
        return res.wait();
    }

    return { registerName }
}
