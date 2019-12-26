import React from 'react'
import {View, Button} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Toast from '../index'

class Test extends React.Component {
  show = () => {
    Toast.show('test')
  }

  show2 = () => {
    Toast.show('test', 2, () => {
      console.warn('回调')
    })
  }

  render () {
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <Button title='普通toast' onPress={this.show} />
        <Button title='回调toast' onPress={this.show2} />
      </View>
    )
  }
}

export default helperPageHOC(Test)
