import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../utils/hoc'

// route
import { route2RouteString, routeString2RouteObj } from '../router/routeConfig'
// utils
import { TEST } from '../router/config'

class Home extends React.Component {
  componentDidMount () {
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