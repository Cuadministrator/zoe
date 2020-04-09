import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../utils/hoc'

// route

class Test extends React.Component {
  componentDidMount () {
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