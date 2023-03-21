import vhIdRequest from '../utils/vhIdRequest';

const apiRouter = 'https://testapi.befitter.io/deodd'

export const getRecentFlipping = async (offset: number) => {
  return vhIdRequest({
    url: `${apiRouter}/recent-flipping?limit=10&offset=${offset}`,
    method: 'get',
  })
}

export const getTopStreak = async (offset: number) => {
  return vhIdRequest({
    url: `${apiRouter}/top-streak?limit=10&offset=${offset}`,
    method: 'get',
  })
}

export const getHistory = async (walletAddress: string, offset: number) => {
  return vhIdRequest({
    url: `${apiRouter}/history?walletAddress=${walletAddress}&limit=10&offset=${offset}`,
    method: 'get',
  })
}

export const getUserByPublicAddress = async (walletAddress: string, offset: number) => {
  return vhIdRequest({
    url: `${apiRouter}/users/address?address=${walletAddress}`,
    method: 'get',
  })
}