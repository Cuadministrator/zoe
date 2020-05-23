import axios from 'axios'
import { Tip } from 'beeshell'

axios.defaults.withCredentials = true
export default async function request (
  options,
  config = {
    stopDefault: false,
  }
) {
  // 初始值
  options = {
    method: 'get',
    timeout: 10000,
    params: Object.assign(
      options.params || {}
    ),
    ...options
  }
  let {
    url,
    method = 'get'
  } = options

  // 未判断网关
  options.url = 'http://139.196.230.13:3000/' + url

  options.headers = {
    // 全局参数 推荐在此处添加
    // 网关鉴权需要的参数
    'Content-Type': 'application/json',
    ...options.headers
  }

  // get请求不带data
  if (method.toLocaleLowerCase() === 'get') {
    delete options['data']
  }

  return axios(options)
    .then(response => {
      let success = false // 定义接口是否成功 接口返回 且为 0 || 200
      const { statusText, status, data } = response
      let message = data.resultMessage || statusText || '服务异常，稍后再试'
      // 统一状态码
      // if (data.code === 0 || data.code === 200) { // 成功
      //   success = true
      // } else if (config && !config.stopDefault) { // 非成功
      //   Tip.show(message)
      // }
      if (data) {
        success = true
      }
      console.warn(url, data)
      console.warn(options.data)
      return Promise.resolve({
        success: success,
        message: message,
        statusCode: status,
        data: data
      })
    })
    .catch(error => {
      const { response, message } = error

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { statusText, status, data } = response
        statusCode = status
        msg = data.resultMessage || statusText
      } else {
        statusCode = 600
        msg = message || '网络错误'
      }

      /* eslint-disable */
      // 修改为 resolve 观察是否还有错误stacktrace-parser
      // https://github.com/facebook/react-native/pull/24399
      return Promise.resolve({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
