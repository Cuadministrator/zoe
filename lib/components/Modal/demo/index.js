import React from 'react'
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Modal from '../index'

class Test extends React.Component {
  state = {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
  }
  showModal = (type) => {
    this.setState({
      [`visible${type}`]: true
    })
  }
  hideModal = () => {
    this.setState({
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
    })
  }
  render () {
    const { visible1, visible2, visible3, visible4, visible5 } = this.state
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <Button title='center' onPress={() => this.showModal(1)} />
        <Button title='top' onPress={() => this.showModal(2)} />
        <Button title='bottom' onPress={() => this.showModal(3)} />
        <Button title='left' onPress={() => this.showModal(4)} />
        <Button title='right' onPress={() => this.showModal(5)} />
        <Modal
          visible={visible1}
          onRequestClose={this.hideModal}
        >
          <View style={styles.row}><Text>ss</Text></View>
        </Modal>
        <Modal
          type={'top'}
          visible={visible2}
          onRequestClose={this.hideModal}
        >
          <View style={styles.row}><Text>ss</Text></View>
        </Modal>
        <Modal
          type={'bottom'}
          visible={visible3}
          onRequestClose={this.hideModal}
        >
          <View style={styles.row}><Text>ss</Text></View>
        </Modal>
        <Modal
          type={'left'}
          visible={visible4}
          onRequestClose={this.hideModal}
        >
          <View style={styles.row1}><Text>ss</Text></View>
        </Modal>
        <Modal
          type={'right'}
          visible={visible5}
          onRequestClose={this.hideModal}
        >
          <View style={styles.row1}><Text>ss</Text></View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: 100
  },
  row1: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 100,
    height: '100%'
  }
})

export default helperPageHOC(Test)
