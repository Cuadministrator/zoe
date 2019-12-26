import React from 'react'
import { View, Text } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Tabs from '../index'

const tabs = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
  { title: 'Third Tab' },
]

const tabs2 = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
  { title: 'Third Tab' },
  { title: 'Third Tab' },
  { title: 'Third Tab' },
  { title: 'Third Tab' },
  { title: 'Third Tab' },
  { title: 'Third Tab' },
]

class Test extends React.Component {
  state = {
    page: 0
  }

  handleChange = (item, index) => {
    console.log(item, index)
    this.setState({
      page: index
    })
  }

  render () {
    const { page } = this.state
    return (
      <View>
        <Tabs
          tabs={tabs}
          page={page}
          onChange={this.handleChange}
        />
        <Tabs
          type='scroll'
          tabs={tabs2}
          page={page}
          onChange={this.handleChange}
        />
        <View>
          <Text>第{page + 1}页</Text>
        </View>
      </View>
    )
  }
}

export default helperPageHOC(Test)
