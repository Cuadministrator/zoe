import React from 'react'
import {Text, ScrollView} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Line from '../index'

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
        <Text>分割线</Text>
        <Line />
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
