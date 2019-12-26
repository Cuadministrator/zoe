import React from 'react'
import { ScrollView } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'

import Button from '../../Button/index'
import InputItem from '../../InputItem/index'
import Collapse from '../index'
const { Panel } = Collapse

class Test extends React.Component {
  state = {
    inputValue: ''
  }
  render () {
    const { inputValue } = this.state
    return (
      <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#fff' }}>
        <Collapse>
          <Panel
            key={'panelItem_no'}
            header={'无内容的 Panel'}
            showArrow={false}
            arrowPosition='right' />
          <Panel
            key={`panelItem_normal`}
            header={'普通的 Panel'}
            // childrenViewStyle={{padding: 0}}
            showArrow={true}
            arrowPosition='right'>我是一个普通的 Panel</Panel>
          <Panel
            key={`panelItem_button`}
            header={'包含 Button 的 Panel'}
            childrenViewStyle={{padding: 0}}
            showArrow={true}
            arrowPosition='right'>
            <Button
              type='primary'>我是一个普通的Button</Button>
          </Panel>
          <Panel
            key={`panelItem_inputItem`}
            header={'包含 InputItem 的 Panel'}
            childrenViewStyle={{paddingVertical: 0}}
            showArrow={true}
            arrowPosition='right'>
            <InputItem
              value={inputValue}
              onChangeText={(inputValue) => { this.setState({inputValue}) }}
              placeholder={'左侧无值'}
            />
          </Panel>
          <Panel
            key={`panelItem_collapse`}
            header={'包含 Collapse 的 Panel'}
            childrenViewStyle={{paddingVertical: 0, paddingRight: 0}}
            showArrow={true}
            arrowPosition='right'>
            <Collapse
              collapseViewStyle={{borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0}}>
              <Panel
                key={`panelItem_normal`}
                header={'普通的 Panel'}
                childrenViewStyle={{paddingRight: 0}}
                showArrow={true}
                arrowPosition='right'>我是一个普通的 Panel</Panel>
            </Collapse>
          </Panel>
        </Collapse>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
