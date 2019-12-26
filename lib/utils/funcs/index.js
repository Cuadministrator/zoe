import { Platform, NativeModules } from 'react-native'

const { Amp, Ahs } = NativeModules

const rem = num => Platform.OS === 'web' ? `${num / 100}rem` : num

const env = () => {
  if (Platform.OS === 'web') {
    const userAgent = window.navigator.userAgent
    return {
      wx: /MicroMessenger/i.test(userAgent),
      mp: window.__wxjs_environment === 'miniprogram' || /miniProgram/i.test(userAgent),
      androidApp: /aihuishou_official_android/i.test(userAgent),
      iOSApp: /aihuishou_official_ios/i.test(userAgent),
      // 判断是否在百度小程序中
      isSwanEnv: /swan/i.test(userAgent),
      // 判断是否在头条小程序中
      isToutiaoMicroApp: /NewsArticle/i.test(userAgent) || /toutiaomicroapp/i.test(userAgent),
      // 判断是否在快应用中
      isQuickApp: /hap/i.test(userAgent),

      // 以下环境变量没有测试
      iOS: /iPhone|iPad/.test(userAgent),
      android: /Linux;.*Android/.test(userAgent),

      // app 版本号 返回数字没有 .
      androidVersion: userAgent
        .replace(/.*aihuishou_official_android\/([\d.]+).*/g, '$1')
        .replace(/\./g, ''),
      iOSVersion: userAgent
        .replace(/.*aihuishou_official_ios\/([\d.]+).*/g, '$1')
        .replace(/\./g, ''),
    }
  } else {
    return {
      mp: false
    }
  }
}

const sendEvent = (params) => {
  if (Platform.OS === 'web') return
  if (!((Amp && Amp.sendEvent) || (Ahs && Ahs.sendEvent))) return console.warn('amp error: Amp.sendEvent undefined')

  if (Ahs.sendEvent) {
    Ahs.sendEvent(params)
  } else if (Amp.sendEvent) {
    Amp.sendEvent(params)
  }
}

export default {
  rem,
  env,
  sendEvent,
}
