import qs from 'qs'
import storage from '../storage'
/**
 * 跳转小程序
 * @param MPName 跳转小程序的名字
 * @param funcName
 * @param args
 * @private
 */
const _callWeChatMPFunc = async (MPName, funcName, ...args) => {
  if (
    window.wx &&
    window.wx.miniProgram &&
    typeof window.wx.miniProgram[funcName] === 'function'
  ) {
    const cookieMPName = await storage.getNativeData('AHSM_mpName') // 当前环境 所在小程序
    if (cookieMPName && MPName && cookieMPName !== MPName) {
      const jumpPage = '/pages/jump/main?url=' // 小程序中转页（暂未区分两个小程序是否不一致）
      let obj = [...args][0]
      obj.url = `${jumpPage}${encodeURIComponent(obj.url)}`
      window.wx.miniProgram[funcName](obj) // @TODO 丢弃了其他参数 现在暂无使用
    } else {
      window.wx.miniProgram[funcName](...args)
    }
  }
}

// 第三方环境跳转
// @type {{weChatMP: {navigateTo: (function(*=): void)}}}
const OtherAppOpenWeb = {
  weChatMP: {
    // 跳转到小程序的相关页面
    navigateTo: (obj, MPName) => _callWeChatMPFunc(MPName, 'navigateTo', obj)
  }
}

/**
 * web端跳转方法
 * @param path 带 web domain 的链接
 * @param args[ search 查询条件/redirect 路由重定向的链接 ]
 * @private
 */
const openURL = async (path, ...args) => { // search = {}, redirect = window.location.href
  const search = args.length > 0 ? args[0] : {}
  const redirect = encodeURIComponent(args.length > 1 ? args[1] : window.location.href)
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
  let params = { ...search, redirect }
  let url = `${path}${path.split('?').length > 1 ? '&' : '?'}${qs.stringify(params)}`
  window.location.href = url
}

const openAmpURL = (url, params = {}, redirect = window.location.href) => {
  if (!url) return console.warn('amp error: url undefined')
  let search = { ...params, redirect: encodeURIComponent(redirect) }
  let newUrl = `${url}${url.split('?').length > 1 ? '&' : '?'}${qs.stringify(search)}`
  window.location.href = newUrl
}

const openOtherAmpURL = (url, params = {}, redirect = window.location.href) => {
  if (!url) return console.warn('amp error: url undefined')
  let search = { ...params, redirect: encodeURIComponent(redirect) }
  let newUrl = `${url}${url.split('?').length > 1 ? '&' : '?'}${qs.stringify(search)}`
  window.location.href = newUrl
}

export default {
  openURL,
  OtherAppOpenWeb, // 需要判断一定 web 平台
  openAmpURL,
  openOtherAmpURL
}
