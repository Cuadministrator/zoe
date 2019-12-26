import { Platform, NativeModules } from 'react-native'
import routerUtils from '../router/index.web'
const { OtherAppOpenWeb } = routerUtils

// 支付分类
const PAY_TYPE_ALIPAY = 'ALIPAY'
const PAY_TYPE_WECHAT = 'WECHAT'
const PAY_TYPE_ACCOUNT = 'ACCOUNT'
const PAY_TYPE_FQL_CREDIT = 'FQL_CREDIT'

// 支付 二级分类
const PAY_SUB_TYPE_ALIPAY_BAR_CODE = 'ALIPAY_BAR_CODE' // '支付宝条码支付网关'
const PAY_SUB_TYPE_WECHAT_BAR_CODE = 'WECHAT_BAR_CODE' // '微信收款码支付网关'

const PAY_SUB_TYPE_ALIPAY_APP = 'ALIPAY_APP' // '支付宝APP支付网关'
const PAY_SUB_TYPE_ALIPAY_PHONE_WEBSITE = 'ALIPAY_PHONE_WEBSITE' // '支付宝手机网站支付网关'
const PAY_SUB_TYPE_WECHAT_JSAPI = 'WECHAT_JSAPI' // '微信JSPAI支付网关'
const PAY_SUB_TYPE_WECHAT_APP = 'WECHAT_APP' // '微信APP支付网关'
const PAY_SUB_TYPE_WECHAT_H5 = 'WECHAT_H5' // '微信H5支付网关'
const PAY_SUB_TYPE_WECHAT_MINI_PROGRAM = 'WECHAT_MINI_PROGRAM' // '微信小程序支付网关'

const _alipayAPPPay = async (orderString, cb) => {
  if (Platform.OS === 'ios') { // rn ios
    if (NativeModules.AhsNativeModule && NativeModules.AhsNativeModule.doAliPayWithOrder) {
      NativeModules.AhsNativeModule.doAliPayWithOrder(orderString, (res) => {
        let data = {
          code: -1,
          msg: '服务异常，请重新尝试',
          data: null
        }
        if (res) {
          let code = ''
          if (res.resultStatus === '9000') {
            code = 0
          } else if (res.resultStatus === '6001') {
            code = -2 // 用户中途取消
          } else {
            code = -1
          }
          data = {
            code,
            msg: res.memo,
            data: res
          }
        }
        cb && typeof cb === 'function' && cb(data)
      })
    } else {
      console.warn('NativeModules.AhsNativeModule.doAliPayWithOrder undefined')
    }
  } else if (Platform.OS === 'android') { // rn android
    if (NativeModules.Amp && NativeModules.Amp.doAlipay) {
      const res = await NativeModules.Amp.doAlipay(orderString)
      let data = {
        code: -1,
        msg: '服务异常，请重新尝试',
        data: null
      }
      if (res) {
        let code = ''
        if (res.resultStatus === '9000') {
          code = 0
        } else if (res.resultStatus === '6001') {
          code = -2 // 用户中途取消
        } else {
          code = -1
        }
        data = {
          code,
          msg: res.memo,
          data: res
        }
      }
      cb && typeof cb === 'function' && cb(data)
    } else {
      console.warn('NativeModules.Amp.doAlipay undefined')
    }
  }
}

const _alipayH5Pay = (orderString) => {
  // 支付宝 手机网站支付转Native支付（https://docs.open.alipay.com/203/106493/）
  // 原生处理不需要web处理
  let form = document.createElement('form')
  form.id = 'jsform'
  form.method = 'post'
  form.action = orderString
  document.body.appendChild(form) // 将表单添加到页面内
  form.submit() // 提交
}

const _wxPayAPPPay = async (params, cb) => {
  if (Platform.OS === 'ios') { // rn ios
    if (NativeModules.AhsNativeModule && NativeModules.AhsNativeModule.doWxPayWithParam && NativeModules.AhsNativeModule.isWXAppInstalled) {
      NativeModules.AhsNativeModule.isWXAppInstalled((res) => {
        if (res) { // boolean
          NativeModules.AhsNativeModule.doWxPayWithParam(params, (res) => {
            let data = {
              code: -1,
              msg: '服务异常，请重新尝试'
            }
            if (res) {
              data = {
                code: res.errCode,
                msg: res.errStr
              }
            }
            cb && typeof cb === 'function' && cb(data)
          })
        } else {
          let data = {
            code: -1,
            msg: '请先安装微信'
          }
          cb && typeof cb === 'function' && cb(data)
        }
      })
    } else {
      console.warn('NativeModules.AhsNativeModule.doWxPayWithParam/isWXAppInstalled undefined')
    }
  } else if (Platform.OS === 'android') { // rn android
    if (NativeModules.Amp && NativeModules.Amp.doWxpay && NativeModules.Amp.isWXAppInstalled) {
      const isWxRes = await NativeModules.Amp.isWXAppInstalled()
      if (isWxRes) {
        const res = await NativeModules.Amp.doWxpay(params)
        let data = {
          code: -1,
          msg: '服务异常，请重新尝试'
        }
        if (res) {
          data = {
            code: res.code,
            msg: res.msg
          }
        }
        cb && typeof cb === 'function' && cb(data)
      } else {
        let data = {
          code: -1,
          msg: '请先安装微信'
        }
        cb && typeof cb === 'function' && cb(data)
      }
    } else {
      console.warn('NativeModules.Amp.doWxpay/isWXAppInstalled undefined')
    }
  }
}

const _wxPayMPPay = (paramsStr, redirectUrl) => {
  OtherAppOpenWeb.weChatMP.navigateTo({
    url: `/pages/payment/main?payment=${encodeURIComponent(paramsStr)}&redirectUrl=${redirectUrl}`
  })
}

const _wxPayJSAPIPay = (params, cb) => {
  // 假定微信版本 支持
  function onBridgeReady () {
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', params,
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          cb(res)
        }
      })
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

const _wxPayH5Pay = (mWebUrl, redirectUrl) => {
  window.location.href = `${mWebUrl}&redirect_url=${encodeURIComponent(redirectUrl || window.location.href)}`
}

const alipay = (subPayType, paramsStr, url, cb) => {
  if (subPayType === PAY_SUB_TYPE_ALIPAY_APP) {
    _alipayAPPPay(paramsStr, cb)
  } else if (subPayType === PAY_SUB_TYPE_ALIPAY_PHONE_WEBSITE) {
    _alipayH5Pay(paramsStr, cb)
  }
}

const wxPay = (subPayType, paramsStr, url, cb) => {
  if (subPayType === PAY_SUB_TYPE_WECHAT_MINI_PROGRAM) {
    _wxPayMPPay(paramsStr, url)
  } else if (subPayType === PAY_SUB_TYPE_WECHAT_JSAPI) {
    _wxPayJSAPIPay()
  } else if (subPayType === PAY_SUB_TYPE_WECHAT_APP) {
    try {
      _wxPayAPPPay(JSON.parse(paramsStr), cb)
    } catch (e) {
      console.warn('参数异常')
    }
  } else if (subPayType === PAY_SUB_TYPE_WECHAT_H5) {
    _wxPayH5Pay(paramsStr, url)
  }
}

export default {
  // 分类
  PAY_TYPE_ALIPAY,
  PAY_TYPE_WECHAT,
  PAY_TYPE_ACCOUNT,
  PAY_TYPE_FQL_CREDIT,
  // 二级
  PAY_SUB_TYPE_ALIPAY_BAR_CODE,
  PAY_SUB_TYPE_WECHAT_BAR_CODE,

  PAY_SUB_TYPE_ALIPAY_APP,
  PAY_SUB_TYPE_ALIPAY_PHONE_WEBSITE,
  PAY_SUB_TYPE_WECHAT_JSAPI,
  PAY_SUB_TYPE_WECHAT_APP,
  PAY_SUB_TYPE_WECHAT_H5,
  PAY_SUB_TYPE_WECHAT_MINI_PROGRAM,

  // 支付
  alipay,
  wxPay
}
