import { ethers } from "ethers"
import { bftBusdToken, luckyCrypto, luckyProfile } from "./contract"
import { formatMoney } from "./utils/utils"

export const handleFlipToken = async (etherSinger: any, amount: string, coinSide: number, bnbSend: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  // const res = await contract.flipCoin(coinSide, ethers.utils.parseUnits(amount), {gasLimit: 300000})
  console.log(amount, bnbSend)
  const res = await contract.flipCoin(coinSide, ethers.utils.parseUnits(amount), {value: ethers.utils.parseUnits(formatMoney(`${bnbSend}`)), gasLimit: 400000})
  return res.wait()
} 

export const approvePurchase = async (price: string, ethersSigner: any) => {
  const busdContract = new ethers.Contract(bftBusdToken.address, bftBusdToken.abi, ethersSigner);
  const parsePrice = ethers.utils.parseUnits('1000000')
  const res = await busdContract.approve(luckyCrypto.address, parsePrice);
  return res.wait();
}

export const getAllowance = async (walletAddress: string, ethersSigner: any) => {
  const busdContract = new ethers.Contract(bftBusdToken.address, bftBusdToken.abi, ethersSigner);
  const res = await busdContract.allowance(walletAddress, luckyCrypto.address);
  const convertAllowance = parseFloat(ethers.utils.formatUnits(res));
  return convertAllowance;
}

export const getFlipTokenDetail = async (etherSinger: any, flipId: number) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.getFlip(flipId)
  return res;
}

export const getLastFlipId = async (etherSinger: any, walletAddress: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.latestFlipIdOf(walletAddress)
  return res;
}

export const getWinningStreakAmount = async (etherSinger: any, walletAddress: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.getWinningStreakAmount(walletAddress)
  return res; 
}

export const getWinningStreakLength = async (etherSinger: any, walletAddress: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.getWinningStreakLength(walletAddress)
  return res; 
}

export const getPlayerAssets = async (etherSinger: any, walletAddress: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.getPlayerAsset(walletAddress)
  return res; 
}

export const getCalculateFee = async (etherSinger: any, amount: string) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.calculateFee(ethers.utils.parseUnits(amount))
  return res; 
}

export const createProfile = async (etherSinger: any, username: string, avatar: number) => {
  const contract = new ethers.Contract(luckyProfile.address, luckyProfile.abi, etherSinger)
  const res = await contract.registerName(username, avatar)
  return res.wait(); 
}

export const getUserInfo = async (etherSinger: any, walletAddress: string) => {
  const contract = new ethers.Contract(luckyProfile.address, luckyProfile.abi, etherSinger)
  const res = await contract.getUserInfo(walletAddress)
  return res; 
}

export const handleClaimAll = async (etherSinger: any) => {
  const contract = new ethers.Contract(luckyCrypto.address, luckyCrypto.abi, etherSinger)
  const res = await contract.claim()
  return res.wait()
}