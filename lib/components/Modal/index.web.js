import React, {Component} from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Modal from 'modal-enhanced-react-native-web'

class MyModal extends Component {
  componentWillUnmount() {
    this.onClose()
  }

  onClose = () => {
    const {onRequestClose} = this.props
    onRequestClose && typeof onRequestClose === 'function' && onRequestClose()
  }

  render() {
    const { type = 'center', children, ...restProps } = this.props
    return (
      <Modal
        {...restProps}
        style={{margin: 0}}>
        <TouchableWithoutFeedback onPress={this.onClose}>
          <View style={[
            styles.myModal,
            type === 'top' && {justifyContent: 'flex-start'},
            type === 'bottom' && {justifyContent: 'flex-end'},
            type === 'left' && {alignItems: 'flex-start'},
            type === 'right' && {alignItems: 'flex-end'}
          ]}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {children}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
