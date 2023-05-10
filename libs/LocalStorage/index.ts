const accessToken = 'access_token';
const refreshToken = 'refresh_token';
const walletAddress = 'wallet_address';
const nickname = "nickname";
const setAccessToken = (token: string) => {
    localStorage.setItem(accessToken, token);
}
const getAccessToken = () => {
    return localStorage.getItem(accessToken);
}
const removeAccessToken = () => {
    return localStorage.removeItem(accessToken);
}
const setRefreshToken = (token: string) => {
    localStorage.setItem(refreshToken, token);
}
const getRefreshToken = () => {
    return localStorage.getItem(refreshToken);
}
const removeRefreshToken = () => {
    return localStorage.removeItem(refreshToken);
}
const setWalletAddress = (address: string) => {
    localStorage.setItem(walletAddress, address);
}
const getWalletAddress = () => {
    return localStorage.getItem(walletAddress);
}
const removeWalletAddress = () => {
    return localStorage.removeItem(walletAddress);
}
const getNickname = () => {
    return localStorage.getItem(nickname);
}

export const LocalStorage = {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    setWalletAddress,
    getWalletAddress,
    removeWalletAddress,
    getNickname,
}