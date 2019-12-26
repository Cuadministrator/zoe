import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Page from '../index'
import Footer from '../../Footer'

class Test extends React.Component {
  render () {
    return (
      <Page
        showErrorPage={false}
        errorConfig={{type: 'no'}}
        footer={
          <Footer>
            <View><Text>底部</Text></View>
          </Footer>
        }
      >
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
        <View style={{position: 'absolute', bottom: 50, right: 50}}><Text>test</Text></View>
      </Page>
    )
  }
}

export default helperPageHOC(Test)
