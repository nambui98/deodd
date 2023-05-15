import { useWalletContext } from "../contexts/WalletContext";

export const useProfileContract = () => {
    const { contractProfile } = useWalletContext();

    const registerName = async (username: string, avatar: number) => {
        const res = await contractProfile?.registerName(username, avatar)
        return res.wait();
    }

    return { registerName }
}
