import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
// component
import Popover from '../index'
// image
import iconPublic from '../image/icon-public.png'
// utils
import funcs from '../../../utils/funcs'
const { rem } = funcs

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <Popover
          style={{width: rem(100), height: rem(100), padding: rem(14), backgroundColor: '#d7d7d7'}}
          onChange={(value) => console.log(value)}
          overlay={
            [
              <Popover.Item key={1} icon={iconPublic} name='我只是单纯的Popover.Item' value={1} />,
              <Popover.Item key={2} icon={iconPublic} name='我只是单纯的Popover.Item' value={2} />,
              <Popover.Item key={3} icon={iconPublic} name='我只是单纯的Popover.Item' value={3} />,
              <Popover.Item key={4} icon={iconPublic} name='我只是被禁用的Popover.Item' value={4} disabled />
            ]
          }>
          <Text style={{width: rem(100), height: rem(50), fontSize: rem(14), color: '#333'}}>测试1</Text>
        </Popover>
        <View style={{padding: rem(100), backgroundColor: 'red'}}>
          <Popover
            style={{width: rem(150), height: rem(300), backgroundColor: 'yellow'}}
            onChange={(value) => console.log(value)}
            overlay={
              [
                {key: 1, name: '我只是单纯的Popover.Item', value: '1'},
                {key: 2, name: '我只是单纯的Popover.Item1', value: '2'},
                {key: 3, name: '我只是被禁用的Popover.Item2', value: '3', disabled: true}
              ]
            }>
            <View>
              <Text style={{width: rem(100), height: rem(100), backgroundColor: 'blue', textAlign: 'center', fontSize: rem(14), color: '#333'}}>测试2</Text>
              <Text style={{width: rem(100), height: rem(100), backgroundColor: 'green', textAlign: 'center', fontSize: rem(14), color: '#333'}}>测试2</Text>
              <Text style={{width: rem(100), height: rem(100), backgroundColor: 'orange', textAlign: 'center', fontSize: rem(14), color: '#333'}}>测试2</Text>
            </View>
          </Popover>
        </View>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
