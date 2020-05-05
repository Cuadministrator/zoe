import store from 'react-native-simple-store'
import dataDefault, { checkStorages } from './config'

export const initAsyncStorage = () => {
  checkStorages.forEach((csItem, csIndex) => {
    store.get(csItem).then(res => {
      const defaultItem = dataDefault[`${csItem}Default`]
      if (!res && defaultItem) store.save(csItem, defaultItem)
    })
  })
  console.warn('initAsyncStorage success!')
}

export const clearAllAsyncStorage = () => {
  checkStorages.forEach((csItem, csIndex) => {
    store.get(csItem).then(res => {
      if (res) store.delete(csItem)
    })
  })
  console.warn('clearAllAsyncStorage success!')
}

const storage = {
  get: value => {
    return new Promise((resolve, reject) => {
      store.get(value).then(res => {
        resolve(res)
      })
    })
  },
  set: (key, value) => store.push(key, value)
}

export default storage
