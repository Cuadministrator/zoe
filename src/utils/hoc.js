import React from 'react'
import { Linking } from 'react-native'
import { routeConfig } from '../router/routeConfig'
import qs from 'qs'

const paramsFilter = (path, params) => {
  let tmpObj = {}
  const pathArr = path.split('/')
  for (let i = 0; i < pathArr.length; i++) {
    const item = pathArr[i]
    if (item.slice(0, 1) === ':') {
      const paramsKey = item.slice(1)
      if (Object.keys(params).includes(paramsKey)) {
        tmpObj[paramsKey] = params[paramsKey]
      } else {
        tmpObj = null
        break
      }
    }
  }
  return tmpObj
}

const mergeParams = obj => {
  const { name, params, queryParams } = obj

  const routeObj = routeConfig[name]
  if (!routeObj) return console.warn('DEBUG: 非法路由')

  const paramsObj = paramsFilter(routeObj.path, params)
  if (!paramsObj) return console.warn('DEBUG: 路由参数错误')

  const query = {...paramsObj, ...queryParams}

  return query
}

const RouteContext = React.createContext()

const helperPageHOC = Component => class PageHOCWrapper extends React.Component {
  static navigationOptions ({ navigation }) {
    const { params } = navigation.state

    if (params && params.customTitle) {
      return { title: params.customTitle }
    } else if (PageHOCWrapper.defaultTitle) {
      return { title: PageHOCWrapper.defaultTitle }
    }
  }

  render () {
    const { navigation } = this.props
    const navigator = {}
  
    navigator.Linking = Linking
    navigator.test = text => alert(text)

    navigator.goBack = () => {
      navigation.goBack(null)
    }
    navigator.replace = obj => {
      navigation.replace(obj.name, mergeParams(obj))
    }
    navigator.push = obj => {
      navigation.push(obj.name, mergeParams(obj))
    }
    navigator.navigate = obj => {
      navigator.navigate(obj.name, mergeParams(obj))
    }
    navigator.params = navigation.state.params || {}

    // 为了和后续可能的web端统一
    let routeName = routeConfig[navigation.state.routeName].path
    let searchObj = {...navigation.state.params}
    let routeNameList = routeName.split(':')
    if (routeNameList.length > 1) {
      for (let i = 1; i < routeNameList.length; i++) {
        const itemValue = routeNameList[i]
        routeNameList[i] = searchObj[routeNameList[i]]
        delete searchObj[itemValue] // 这里需要注意，不能改变原对象 navigation.state.params
      }
    }
    navigator.state = {
      pathname: routeNameList.join(''),
      search: `?${qs.stringify(searchObj)}`
    }

    // 修改页面标题
    navigator.changeTitle = title => {
      navigation.setParams({
        customTitle: title
      })
    }

    // 订阅导航生命周期的更新
    navigator.addListener = (event, fn) => {
      if (event && typeof event === 'string' && fn && typeof fn === 'function') {
        navigation.addListener(event, payload => { fn(payload) })
      } else {
        console.log('DEBUG: 生命周期定义错误')
      }
    }

    // https://github.com/react-navigation/react-navigation/issues/3326
    return (
      <RouteContext.Provider value={{ navigator }}>
        <Component {...this.props} navigator={navigator} />
      </RouteContext.Provider>
    )
  }
}

const helperHOC = Component => class extends React.Component {
  render () {
    return (
      <RouteContext.Consumer>
        { value => <Component {...value} {...this.props} /> }
      </RouteContext.Consumer>
    )
  }
}

export {
  helperHOC,
  helperPageHOC
}