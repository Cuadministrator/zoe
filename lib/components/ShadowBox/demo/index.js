import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import ShadowBox from '../index'

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <Text>这个是阴影边框</Text>
        <ShadowBox>
          <View>
            <Text>这个是阴影边框</Text>
          </View>
        </ShadowBox>
        <Text>没有top</Text>
        <ShadowBox loseType='top'>
          <View>
            <Text>这个是阴影边框</Text>
          </View>
        </ShadowBox>
        <Text>没有bottom</Text>
        <ShadowBox loseType='bottom'>
          <View>
            <Text>这个是阴影边框</Text>
          </View>
        </ShadowBox>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
