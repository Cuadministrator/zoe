/**
 * 自建小程序永久存储
 * by 王辉华
 */
import { NativeModules } from 'react-native'

const { Amp, Ahs, StorageModule } = NativeModules

const _set = (key, value) => {
  if (!(StorageModule && StorageModule.putItem)) return console.warn('amp error: StorageModule undefined')
  StorageModule.putItem(key, value)
}

const _remove = (key) => {
  if (!(StorageModule && StorageModule.removeItem)) return console.warn('amp error: StorageModule undefined')
  StorageModule.removeItem(key)
}

/**
 * 获取原生数据
 * @param key
 * @returns {Promise<any>}
 */
const getNativeData = (key, type) => {
  return new Promise(async (resolve, reject) => {
    if (type) {
      // getNativeData undefined
      if (!(Ahs && Ahs.getNativeData)) reject(new Error('amp error: getNativeData undefined'))

      // key 必须是 string
      if (!(key && typeof key === 'string')) reject(new Error('amp error: key 必传且为 string'))

      resolve(Ahs.getNativeData(key))
    } else {
      // getNativeData undefined
      if (!(Amp && Amp.getNativeData)) reject(new Error('amp error: getNativeData undefined'))

      // key 必须是 string
      if (!(key && typeof key === 'string')) reject(new Error('amp error: key 必传且为 string'))

      resolve(Amp.getNativeData(key))
    }
  })
}

/**
 * 获取当前环境
 * 2=development=uat 0=pro
 * @returns {Promise<number>}
 */
const getEnvType = async () => {
  const envType = await getNativeData('envType')
  return parseInt(envType)
}

const AsyncStore = {
  getItem: async (key) => {
    if (!(StorageModule && StorageModule.getItem)) return console.warn('amp error: StorageModule undefined')
    const value = await StorageModule.getItem(key)
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
