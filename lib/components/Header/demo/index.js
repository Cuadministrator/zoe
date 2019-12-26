import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'

import Header from '../index'

class Test extends React.Component {
  render () {
    const { navigator } = this.props
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <Header
          visible={false}
          navigator={navigator}
          headerRight={
            <Text onPress={() => console.warn('右侧点击')}>右侧</Text>
          }
        >顶部导航(不展示)</Header>
        <Header
          navigator={navigator}
          headerRight={
            <Text onPress={() => console.warn('右侧点击')}>右侧</Text>
          }
        >顶部导航</Header>
      </View>
    )
  }
}

export default helperPageHOC(Test)
