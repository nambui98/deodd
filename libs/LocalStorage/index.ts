const accessToken = 'access_token1';
const refreshToken = 'refresh_token1';
const walletAddress = 'wallet_address1';
const userInfo = "user_info1";
const isProfileModalOpened = 'is_profile_modal_opened';
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
const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(userInfo) ?? 'null');
}
const setUserInfo = (data: object) => {
    localStorage.setItem(userInfo, JSON.stringify(data));
}
const setIsProfileModalOpened = (isShow: boolean) => {
    localStorage.setItem(isProfileModalOpened, JSON.stringify(isShow));
}
const getIsProfileModalOpened = () => {
    return JSON.parse(localStorage.getItem(isProfileModalOpened) ?? 'null');
}
const removeIsProfileModalOpened = () => {
    return localStorage.removeItem(isProfileModalOpened);
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
    getUserInfo,
    setUserInfo,
    setIsProfileModalOpened,
    getIsProfileModalOpened,
    removeIsProfileModalOpened
}