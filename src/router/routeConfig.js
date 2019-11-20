import qs from 'qs'
import * as config from './config'
import Home from '../pages/home'
import Test from '../pages/test'

const routeConfig = {
  [config.HOME]: {
    path: 'a/:id/b/c/:orderNo',
    exact: true,
    component: Home,
    navigationOptions: {
      title: '主页'
    }
  },
  [config.TEST]: {
    path: 'test',
    component: Test,
    navigationOptions: {
      title: '测试页'
    }
  }
}

// 约定str格式为：a/b?c=1&d=2
// /a/b?c=1&d=2
const routeString2RouteObj = str => {
  if (!str) return null

  const strArr = str.split('?')
  if (strArr.length > 2) return null

  const pathStr = strArr[0]
  const searchStr = strArr[1]

  // params 处理
  const pathArr = pathStr.split('/')

  // 处理首尾空格
  if (!pathArr[0]) pathArr.shift()
  if (!pathArr[pathArr.length - 1]) pathArr.pop()

  const routeConfigKeys = Object.keys(routeConfig)

  const recursionRouteConfig = (routeConfigKeys, i) => {
    if (routeConfigKeys.length < i + 1) return {}

    const key = routeConfigKeys[i]
    const routeItem = routeConfig[key]
    const routePath = routeItem['path']
    const routePathArr = routePath.split('/')

    if (routePathArr.length !== pathArr.length) return {...recursionRouteConfig(routeConfigKeys, i + 1)}

    const recursionRoutePath = (routePathArr, j) => {
      if (routePathArr.length < j + 1) return {}
      if (routePathArr[j] === pathArr[j]) return {...recursionRoutePath(routePathArr, j + 1)}

      if (routePathArr[j].includes(':')) {
        return {
          name: key,
          params: {
            [routePathArr[j].slice(1)]: pathArr[j],
            ...(recursionRoutePath(routePathArr, j + 1).params || {})
          }
        }
      }

      return {...recursionRouteConfig(routeConfigKeys, i + 1)}
    }
    return recursionRoutePath(routePathArr, 0)
  }

  const { name = '', params = {} } = recursionRouteConfig(routeConfigKeys, 0)

  if (!name) return null

  return {
    name,
    params,
    queryParams: searchStr ? qs.parse(searchStr) : {}
  }
}

const route2RouteString = obj => {
  const { name, params, queryParams } = obj
  if (!name) return ''

  const routeConfigKeys = Object.keys(routeConfig)

  // 递归调用
  const recursionRoute = (routeConfigKeys, i) => {
    if (routeConfigKeys.length < i + 1) return { paramsArr: [], queryParamsObj: null }

    const key = routeConfigKeys[i]
    const routeItem = routeConfig[key]
    const routePath = routeItem['path']
    // 进入递归寻找下一个routeConfig中的item
    if (name !== key) return recursionRoute(routeConfigKeys, i + 1)

    const allParams = { ...queryParams, ...params }
    const routePathArr = routePath.split('/')
    
    // 递归调用
    const recursionRouteArr = (routePathArr, j) => {
      if (routePathArr.length < j + 1) return []
      const currentPathItem = routePathArr[j]
      // 获取动态路由参数 :id
      if (currentPathItem.includes(':')) {
        const paramKey = currentPathItem.slice(1)
        if (Object.keys(allParams).includes(paramKey)) {
          const searchParams = allParams[paramKey]
          delete allParams[paramKey]
          return [searchParams, ...recursionRouteArr(routePathArr, j + 1)]
        } else {
          return []
        }
      }
      // 获取路由参数
      return [currentPathItem, ...recursionRouteArr(routePathArr, j + 1)] 
    }

    // 匹配成功
    return {
      paramsArr: recursionRouteArr(routePathArr, 0),
      queryParamsObj: allParams
    }
  }

  const { paramsArr, queryParamsObj } = recursionRoute(routeConfigKeys, 0)

  if (!paramsArr.length) return ''

  const paramsStr = paramsArr.join('/')
  const queryParamsStr = qs.stringify(queryParamsObj)

  if (queryParamsStr) return `${paramsStr}?${queryParamsStr}`

  return paramsStr
}

export {
  routeConfig,
  routeString2RouteObj,
  route2RouteString
}