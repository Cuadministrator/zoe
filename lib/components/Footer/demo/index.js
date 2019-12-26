import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Footer from '../index'

class Test extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <ScrollView style={{ flex: 1, height: '100%' }}>
          <Text>内容</Text>
        </ScrollView>
        <Footer>
          <View><Text>底部</Text></View>
        </Footer>
      </View>
    )
  }
}

export default helperPageHOC(Test)
