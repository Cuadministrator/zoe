import React from 'react'
import {ScrollView} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import ICP from '../index'

class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <ICP />
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
