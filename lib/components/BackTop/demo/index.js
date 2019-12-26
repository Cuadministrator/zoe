import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import BackTop from '../index'

class Test extends React.Component {
  state = {
    contentOffsetY: 0, // 滚动条Y位置
  }
  // 页面 滚动
  handlePageScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y
    this.setState({
      contentOffsetY: y
    })
  }
  render () {
    const {contentOffsetY} = this.state
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <ScrollView
          style={{ flex: 1, height: '100%' }}
          scrollEventThrottle={200}
          onScroll={this.handlePageScroll}
          ref={ref => { this.refListView = ref }}>
          <View style={{height: 400}}><Text>内容1</Text></View>
          <View style={{height: 400}}><Text>内容2</Text></View>
          <View style={{height: 400}}><Text>内容3</Text></View>
          <View style={{height: 400}}><Text>内容4</Text></View>
        </ScrollView>
        <BackTop
          target={this.refListView}
          contentOffsetHeight={contentOffsetY}
          visibilityHeight={800}
        />
      </View>
    )
  }
}

export default helperPageHOC(Test)
