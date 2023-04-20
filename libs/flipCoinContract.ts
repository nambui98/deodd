import { BigNumber, Contract, ethers } from "ethers"
import { bftBusdToken, deoddContract, feeManagerContract, luckyProfile } from "./contract"

// export const handleFlipToken = async (etherSinger: any, index: number, coinSide: number, bnbSend: BigNumber) => {
//   const contract = new ethers.Contract(deoddContract.address, deoddContract.abi, etherSinger)
//   const res = await contract.flipTheCoin(
//     coinSide,
//     BigNumber.from(index.toString()),
//     { value: bnbSend }
//   )
//   return res.wait()
// }

// export const approvePurchase = async (price: string, ethersSigner: any) => {
//   const busdContract = new ethers.Contract(bftBusdToken.address, bftBusdToken.abi, ethersSigner);
//   const parsePrice = ethers.utils.parseUnits('1000000')
//   const res = await busdContract.approve(deoddContract.address, parsePrice);
//   return res.wait();
// }

// export const getAllowance = async (walletAddress: string, ethersSigner: any) => {
//   const busdContract = new ethers.Contract(bftBusdToken.address, bftBusdToken.abi, ethersSigner);
//   const res = await busdContract.allowance(walletAddress, deoddContract.address);
//   const convertAllowance = parseFloat(ethers.utils.formatUnits(res));
//   return convertAllowance;
// }

// export const getFlipTokenDetail = async (etherSinger: any, flipId: number) => {
//   const contract = new ethers.Contract(deoddContract.address, deoddContract.abi, etherSinger)
//   // const res = await contract.getFlip(flipId)
//   contract.on("FlipCoinResult", (from, to, value, event) => {
//     let transferEvent = {
//       from: from,
//       to: to,
//       value: value,
//       eventData: event,
//     }
//     console.log(JSON.stringify(transferEvent, null, 4))

//   });
//   return {};
//   // return res;
// }

// export const getLastFlipId = async (etherSinger: any, walletAddress: string) => {
//   const contract = new ethers.Contract(deoddContract.address, deoddContract.abi, etherSinger)
//   const res = await contract.getPlayerLatestFlipId(walletAddress)
//   return res;
// }

// export const getWinningStreakAmount = async (etherSinger: any, walletAddress: string) => {
//   const contract = new ethers.Contract(deoddContract.address, deoddContract.abi, etherSinger)
//   const res = await contract.getWinningStreakAmount(walletAddress)
//   return res;
// }

// export const getWinningStreakLength = async (etherSinger: any, walletAddress: string) => {
//   const contract = new ethers.Contract(deoddContract.address, deoddContract.abi, etherSinger)
//   const res = await contract.getWinningStreakLength(walletAddress)
//   return res;
// }

// export const getPlayerAssets = async (contract: Contract, walletAddress: string) => {
//   const res = await contract.getPlayerAsset(walletAddress)
//   return res;
// }

// export const getCalculateFee = async (etherSinger: any, amount: string) => {
//   const contract = new ethers.Contract(feeManagerContract.address, feeManagerContract.abi, etherSinger)
//   const res = await contract.calcTotalFee(ethers.utils.parseUnits(amount))
//   return res;
// }

// export const createProfile = async (etherSinger: any, username: string, avatar: number) => {
//   const contract = new ethers.Contract(luckyProfile.address, luckyProfile.abi, etherSinger)
//   const res = await contract.registerName(username, avatar)
//   return res.wait();
// }

// export const getUserInfo = async (contract: Contract, walletAddress: string) => {
//   const res = await contract.getUserInfo(walletAddress)
//   return res;
// }

// export const handleClaimAll = async (contract: Contract) => {
//   const res = await contract.claimBNB()
//   return res.wait()
// }