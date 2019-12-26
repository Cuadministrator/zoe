import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Button from '../index'

class Test extends React.Component {
  handlePress = () => {
    console.warn('test')
  }
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
        <Button onPress={this.handlePress}>正常</Button>
        <Button
          active={false}
          onPress={this.handlePress}
        >no active</Button>
        <Button
          onPress={this.handlePress}
          disabled
          disabledViewStyle={{backgroundColor: '#e9e9e9'}}
        >disabled</Button>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button>inline</Button>
          <Button size={'small'}>small</Button>
          <Button type={'primary'}>primary</Button>
        </View>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
