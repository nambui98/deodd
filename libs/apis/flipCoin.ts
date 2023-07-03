import vhIdRequest from '../utils/vhIdRequest';

const apiRouter = 'https://testapi.befitter.io/deodd'

export const getRecentFlipping = async () => {
  return vhIdRequest({
    url: `/deodd/recent`,
    method: 'get',
  })
}

export const getTopStreak = async () => {
  return vhIdRequest({
    url: `/deodd/topstreak`,
    method: 'get',
  })
}

export const getTopNetGains = async () => {
  return vhIdRequest({
    url: `/deodd/topnetgains`,
    method: 'get',
  })
}

export const getHistory = async (walletAddress: string, offset: number) => {
  return vhIdRequest({
    url: `/deodd/history?walletAddress=${walletAddress}&limit=10&offset=${offset}`,
    method: 'get',
  })
}

export const getUserByPublicAddress = async (walletAddress: string, flipId: string) => {
  return vhIdRequest({
    url: `/deodd/users/address?address=${walletAddress}&flipId=${flipId}`,
    method: 'get',
  })
}