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

function pop (index) {
  _navigator && _navigator.dispatch(StackActions.pop({
    index
  }))
}