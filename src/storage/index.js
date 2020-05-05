import storage from 'react-native-simple-store'
import dataDefault, { checkStorages } from './config'

export const initAsyncStorage = () => {
  checkStorages.forEach((csItem, csIndex) => {
    storage.get(csItem).then(res => {
      const defaultItem = dataDefault[`${csItem}Default`]
      if (!res && defaultItem) storage.save(csItem, defaultItem)
    })
  })
  console.warn('initAsyncStorage success!')
}

export const clearAllAsyncStorage = () => {
  checkStorages.forEach((csItem, csIndex) => {
    storage.get(csItem).then(res => {
      if (res) storage.delete(csItem)
    })
  })
  console.warn('clearAllAsyncStorage success!')
}

// const storage = {
//   get: value => {
//     return new Promise((resolve, reject) => {
//       store.get(value).then(res => {
//         resolve(res)
//       })
//     })
//   },
//   set: (key, value) => {
//     return new Promise((resolve, reject) => {
//       store.save(key, value).then(res => {
//         resolve(res)
//       })
//     })
//   }
// }

export default storage
