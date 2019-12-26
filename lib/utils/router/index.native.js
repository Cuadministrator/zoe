import { Platform, Linking, NativeModules } from 'react-native'
import qs from 'qs'

const { Amp } = NativeModules

/**
 * 打开原生特点页面
 * @param path 带原生链接前缀的链接
 * @param args[ search 查询条件/redirect 路由重定向的链接 ]
 */
const openURL = (path, ...args) => {
  const search = args.length > 0 ? args[0] : {}
  const redirect = args.length > 1 ? encodeURIComponent(args[1]) : ''
  if (typeof search !== 'object') {
    console.warn('search参数必须为对象')
    return
  }
  // 处理path
  let pathArr = path.split('/:')
  if (pathArr.length > 1) {
    path = pathArr[0]
    pathArr.forEach((item, index) => {
      if (index !== 0) {
        if (search[item]) {
          path = `${path}/${search[item]}`
          delete search[item]
        } else {
          console.warn(`search参数缺少${item}`)
        }
      }
    })
  }
  let params = { ...search, path: redirect, rn: 'true' }
  let url = `${path}${path.split('?').length > 1 ? '&' : '?'}${qs.stringify(params)}`
  Linking.openURL(url)
}

const openAmpURL = (path, params = {}) => {
  if (!path) return console.warn('amp error: path undefined')
  if (!(Amp && Amp.openNativeUrl)) return console.warn('amp error: openNativeUrl undefined')
  Amp.openNativeUrl({
    name: path,
    ...Platform.select({
      ios: {
        props: params
      },
      android: {
        properties: params
      }
    }),
  })
}

const openOtherAmpURL = (path, params = {}, redirect, currentAndroidUrl) => {
  if (!path) return console.warn('amp error: path undefined')
  let newUrl = `${path}${path.split('?').length > 1 ? '&' : '?'}${qs.stringify(params)}`
  if (Platform.OS === 'android' && currentAndroidUrl) {
    NativeModules.RootViewModule && NativeModules.RootViewModule.addVisitedHistory && NativeModules.RootViewModule.addVisitedHistory(currentAndroidUrl)
  }
  Linking.openURL(newUrl)
}

export default {
  openURL,
  openAmpURL,
  openOtherAmpURL
}
