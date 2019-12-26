import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import InputItem from '../index'

class Test extends React.Component {
  state = {
    formData: {}
  }
  setFromProperty = (key, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: value
      }
    })
  }
  render () {
    const {formData} = this.state
    return (
      <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#fff', paddingHorizontal: 10 }}>
        <InputItem
          value={formData.test1}
          onChangeText={(text) => this.setFromProperty('test1', text)}
          placeholder={'左侧有值'}
        >title</InputItem>
        <InputItem
          value={formData.test2}
          onChangeText={(text) => this.setFromProperty('test2', text)}
          placeholder={'左侧无值'}
        />
        <InputItem
          value={formData.test3}
          onChangeText={(text) => this.setFromProperty('test3', text)}
          placeholder={'左侧自定义'}
        ><View><Text style={{color: 'red'}}>红色</Text><Text>title</Text></View></InputItem>
        <InputItem
          inputItemStyle={{borderBottomWidth: 0}}
          value={formData.test4}
          onChangeText={(text) => this.setFromProperty('test4', text)}
          placeholder={'无下划线'}
        >左侧超长左侧超长左侧超长</InputItem>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
