import axios from 'axios';
// import { getLocalRefreshToken, updateLocalRefreshToken } from '../../services/token.service';

const vhIdRequest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

vhIdRequest.interceptors.request.use(
  (config) => {
    // const token = getLocalRefreshToken()
    // if (config.headers) {
    //   config.headers["Authorization"] = 'Bearer ' + token
    // }
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

        try {
          // localStorage.removeItem("user")

          return window.location.reload()
        } catch (error) {
          return console.log(error)
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