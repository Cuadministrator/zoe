import { NavigationActions, StackActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator (ref) {
  _navigator = ref
}

function navigate (routeName, params) {
  _navigator && _navigator.dispatch(
    NavigationActions.navigate(
      routeName,
      params
    )
  ) 
}

function back (key) {
  _navigator && _navigator.dispatch(NavigationActions.back({
    key
  }))
}

function setParams (params, key) {
  _navigator && _navigator.dispatch(
    NavigationActions.setParams({
      params,
      key
    })
  )
}

function replace (routeName, params) {
  _navigator && _navigator.dispatch(StackActions.replace({
    routeName,
    params
  })) 
}

function push (routeName, params) {
  _navigator && _navigator.dispatch(StackActions.push({
    routeName,
    params
  })) 
}

function reset (index, routeName, params) {
  _navigator && _navigator.dispatch(StackActions.reset({
    index,
    actions: [
      NavigationActions.navigate({
        routeName,
        params
      })
    ]
  })) 
}

function pop (index = 1) {
  _navigator && _navigator.dispatch(StackActions.pop({
    n: index
  }))
}

function getNavigation () {
  let curNavigation = null
  try {
    const { nav } = _navigator.state
    const routes = nav.routes
    curNavigation = routes[routes.length - 1]
  } catch (e) {
    console.warn('当前路由异常')
  }
  return curNavigation
}

export default {
  NavigationActions,
  StackActions,
  setTopLevelNavigator,
  navigate,
  back,
  setParams,
  replace,
  push,
  reset,
  pop,
  getNavigation
}
