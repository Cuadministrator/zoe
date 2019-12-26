import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import QRCode from '../index'

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text>默认</Text>
          <QRCode value={'https://uat-portal-m.aihuishou.com/n/#/?version=new'} />
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text>自定义大小</Text>
          <QRCode value={'https://uat-portal-m.aihuishou.com/n/#/?version=new'} size={50} />
        </View>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
