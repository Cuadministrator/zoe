import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'

import funcs from '../../../utils/funcs'

import RadioGroup from '../index'
const { Radio } = RadioGroup

const { rem } = funcs

class Test extends React.Component {
  state = {
    radioValue: true,
    radioGroupValue: 0,
    radioGroupData: [
      {text: '我是第一个radio', value: 0},
      {text: '我是第二个radio', value: 1},
      {text: '我是第三个radio', value: 2},
      {text: '我是第四个radio', value: 3},
      {text: '我是第五个radio', value: 4},
      {text: '我是第六个radio', value: 5}]
  }
  render () {
    const { radioValue, radioGroupData, radioGroupValue } = this.state
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <View style={{height: 400}}>
          <Text style={{fontSize: rem(14), color: '#333', marginVertical: rem(14), paddingHorizontal: rem(14)}}>radio组件</Text>
          <Radio
            type={'left'}
            data={{text: '我是第一个radio', value: 0}}
            isChecked={radioValue}
            onChange={(v, item) => this.setState({radioValue: !radioValue})} />
          <Text style={{fontSize: rem(14), color: '#333', marginVertical: rem(14), paddingHorizontal: rem(14)}}>radioGroup组件(选中图标左边)</Text>
          <RadioGroup
            type={'left'}
            data={radioGroupData}
            value={radioGroupValue}
            onChange={(v, item) => this.setState({radioGroupValue: v})} />
          <Text style={{fontSize: rem(14), color: '#333', marginVertical: rem(14), paddingHorizontal: rem(14)}}>radioGroup组件(选中图标右边)</Text>
          <RadioGroup
            type={'right'}
            data={radioGroupData}
            value={radioGroupValue}
            onChange={(v, item) => this.setState({radioGroupValue: v})} />
          <Text style={{fontSize: rem(14), color: '#333', marginVertical: rem(14), paddingHorizontal: rem(14)}}>radioGroup组件(展示两列)</Text>
          <RadioGroup
            col={2}
            type={'left'}
            data={radioGroupData}
            value={radioGroupValue}
            onChange={(v, item) => this.setState({radioGroupValue: v})} />
        </View>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
