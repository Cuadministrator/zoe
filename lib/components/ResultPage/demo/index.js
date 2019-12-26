import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import ResultPage from '../index'

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <View style={{height: 400}}>
          <ResultPage type={'408'} />
        </View>
        <ResultPage
          style={{height: 500}}
          type={'404'}
          text={'test'}
          textStyle={{color: 'red'}}
        >
          <View><Text>test</Text></View>
        </ResultPage>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
