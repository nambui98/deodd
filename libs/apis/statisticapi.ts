import vhIdRequest from '../utils/vhIdRequest';

const apiRouter = 'https://testapi.befitter.io/deodd'

export const getTopStreakToday = async () => {
  return vhIdRequest({
    url: `${apiRouter}//topstreak/today`,
    method: 'get',
  })
}