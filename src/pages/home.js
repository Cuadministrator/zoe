import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../utils/hoc'

// route
import { route2RouteString, routeString2RouteObj } from '../router/routeConfig'
// utils
import { TEST } from '../router/config'

class Home extends React.Component {
  componentDidMount () {
    const str = route2RouteString({
      name: 'Home',
      params: {
        a: '111',
        b: '222',
        c: '333'
      },
      queryParams: {
        id: 1,
        orderNo: 123
      }
    })
    console.warn('str', str)
    const obj = routeString2RouteObj(str)
    console.warn('obj', obj)
    const { navigator } = this.props
    console.warn('navigator', navigator)
    navigator.push({
      name: TEST
    })
  }
  render () {
    return (
      <View>
        <Text>hello world!</Text>
      </View>
    )
  }
}

export default helperPageHOC(Home)