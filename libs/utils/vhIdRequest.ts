import axios from 'axios';
import { LocalStorage } from 'libs/LocalStorage';
import { DeoddService } from 'libs/apis';
// import { getLocalRefreshToken, updateLocalRefreshToken } from '../../services/token.service';

const apiRouter = 'https://testapi.befitter.io/deodd'
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
      debugger
      // Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        if (err.response.data.meta.code === 1013) {
          try {
            const response = await DeoddService.refreshToken();
            const { accessToken } = response.data.data;
            LocalStorage.setAccessToken(accessToken);
            debugger
            err.config.headers['Authorization'] = 'Bearer ' + accessToken;
            return vhIdRequest.request(err.config);
          } catch (error) {
            return console.log(error)
          }

        }
      } else {
        // ToastUtils.error(err.response.meta.message)
        return false;
      }
    }

    return Promise.reject(err)
  }
)

export default vhIdRequest