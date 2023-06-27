import axios from 'axios';
import { LocalStorage } from 'libs/LocalStorage';
import { DeoddService } from 'libs/apis';

const BASEURL_DEV = 'https://apidev.deodd.io';
const BASEURL_PRODUCTION = 'https://api.deodd.io';

const apiRouter =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? BASEURL_DEV
    : process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION'
      ? BASEURL_PRODUCTION : ''
const vhIdRequest = axios.create({
  baseURL: apiRouter,
  headers: {
    "Content-Type": "application/json",
  },
})

vhIdRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (config.headers) {
      config.headers["Authorization"] = 'Bearer ' + token
    }
    return config
  },
  (err) => {
    return console.log(err)
  }
)

vhIdRequest.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (err.response) {
      // Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        if (err.response.data.meta.code === 1013) {
          try {
            const response = await DeoddService.refreshToken();
            const { accessToken } = response.data.data;
            LocalStorage.setAccessToken(accessToken);
            err.config.headers['Authorization'] = 'Bearer ' + accessToken;
            return vhIdRequest.request(err.config);
          } catch (error) {
            return console.log(error)
          }
        }
        else if (err.response.data.meta.code === 1012) {
          LocalStorage.removeAccessToken();
          LocalStorage.removeRefreshToken();
          LocalStorage.removeWalletAddress();
          window.location.reload();
        }
      } else {

        // ToastUtils.error(err.response.meta.message)
        return Promise.reject(err)
      }
    }

    return Promise.reject(err)
  }
)

export default vhIdRequest