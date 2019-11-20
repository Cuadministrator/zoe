import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../utils/hoc'

// route
import { route2RouteString, routeString2RouteObj } from '../router/routeConfig'

class Test extends React.Component {
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
  }
  render () {
    return (
      <View>
        <Text>this is test page!</Text>
      </View>
    )
  }
}

export default helperPageHOC(Test)