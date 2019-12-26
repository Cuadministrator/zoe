import Cookies from 'js-cookie'

const _set = (key, value) => Cookies.set(`${key}`, value)
const _remove = key => Cookies.remove(`${key}`)

/**
 * 获取原生值
 * 为了和原生一直封装为异步
 * @param key
 * @returns {Promise<any>}
 */
const getNativeData = (key) => {
  return new Promise((resolve, reject) => {
    // Cookies undefined
    if (!(Cookies)) reject(new Error('amp error: Cookies undefined'))
    // key 必须是 string
    if (!(key && typeof key === 'string')) reject(new Error('amp error: key 必传且为 string'))

    resolve(Cookies.get(`${key}`))
  })
}

/**
 * 获取当前环境
 * 2=development=uat 0=pro
 * @returns {Promise<number>}
 */
const getEnvType = async () => {
  const envType = process.env.NODE_ENV === 'development' ? 2 : 0
  return Promise.resolve(envType)
}

const AsyncStore = {
  getItem: async (key) => {
    const value = await getNativeData(key)
    return value
  },
  setItem: (key, value) => {
    _set(key, value)
  },
  removeItem: (key) => {
    _remove(key)
  }
}

export default {
  getNativeData,
  getEnvType,
  AsyncStore
}
