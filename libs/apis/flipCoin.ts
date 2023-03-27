import vhIdRequest from '../utils/vhIdRequest';

const apiRouter = 'https://testapi.befitter.io/deodd'

export const getRecentFlipping = async () => {
  return vhIdRequest({
    url: `${apiRouter}/recent`,
    method: 'get',
  })
}

export const getTopStreak = async () => {
  return vhIdRequest({
    url: `${apiRouter}/topstreak`,
    method: 'get',
  })
}

export const getTopNetGains = async () => {
  return vhIdRequest({
    url: `${apiRouter}/topnetgains`,
    method: 'get',
  })
}

export const getHistory = async (walletAddress: string, offset: number) => {
  return vhIdRequest({
    url: `${apiRouter}/history?walletAddress=${walletAddress}&limit=10&offset=${offset}`,
    method: 'get',
  })
}

export const getUserByPublicAddress = async (walletAddress: string) => {
  return vhIdRequest({
    url: `${apiRouter}/users/address?address=${walletAddress}`,
    method: 'get',
  })
}