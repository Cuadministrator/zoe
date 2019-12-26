import React, { Component } from 'react'
import { Modal, View, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native'
import storage from '../../utils/storage'

const { getNativeData } = storage

class MyModal extends Component {
  state = {
    safeAreaBottomHeight: 0
  }

  async componentDidMount () {
    // 使用 SafeAreaView 来兼容 iphone X 会和react-navigation 产生冲突，故不适应
    if (Platform.OS === 'ios') {
      this.setState({
        safeAreaBottomHeight: await this.getSafeAreaBottomHeight()
      })
    }
  }

  componentWillUnmount() {
    this.onClose()
  }

  getSafeAreaBottomHeight = async () => {
    const height = await getNativeData('safeAreaBottomHeight') || '0'
    return parseInt(height)
  }

  onClose = () => {
    const {onRequestClose} = this.props
    onRequestClose && typeof onRequestClose === 'function' && onRequestClose()
  }

  render() {
    const { safeAreaBottomHeight } = this.state
    const { type = 'center', children, ...restProps } = this.props
    return (
      <Modal
        {...restProps}
        transparent>
        <View style={[
          styles.myModal,
          type === 'top' && {justifyContent: 'flex-start'},
          type === 'bottom' && {justifyContent: 'flex-end', marginBottom: safeAreaBottomHeight},
          type === 'left' && {flexDirection: 'row', alignItems: 'flex-start'},
          type === 'right' && {flexDirection: 'row', alignItems: 'flex-end'}
        ]}>
          {
            (type === 'center' || type === 'bottom' || type === 'right') && <TouchableWithoutFeedback onPress={this.onClose}>
              <View style={{flex: 1, height: '100%', width: '100%'}} />
            </TouchableWithoutFeedback>
          }
          {children}
          {
            // 如果 children 内部有滚动事件 使用和web 一样的方法会组织内部滚动
            (type === 'center' || type === 'top' || type === 'left') && <TouchableWithoutFeedback onPress={this.onClose}>
              <View style={{flex: 1, height: '100%', width: '100%'}} />
            </TouchableWithoutFeedback>
          }
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  myModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }
})

export default MyModal
