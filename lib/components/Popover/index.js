import React from 'react'
import {StyleSheet, View, TouchableWithoutFeedback, Dimensions} from 'react-native'
import Modal from '../Modal'

// component
import Item from './item'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
// nativeEvent: { pageX, pageY } 需要做对比不能使用rem

class Popover extends React.Component {
  state = {
    modalVisible: false, // 显示气泡modal是否展示
    popViewStyle: null, // 气泡外层view样式
    triangleStyle: null, // 气泡三角形view样式
    touchViewWidth: 0, // 点击view的宽度
    touchViewHeight: 0 // 点击view的高度
  }

  onPress = (event) => {
    const { pageX, pageY } = event.nativeEvent
    const touchViewX = pageX // - locationX
    const touchViewY = pageY // - locationY
    const popViewStyle = {}
    const triangleStyle = { position: 'absolute' }
    if (deviceWidth / 2 > touchViewX) {
      popViewStyle['left'] = touchViewX - 8
      triangleStyle['left'] = 4
    } else {
      popViewStyle['right'] = deviceWidth - touchViewX - 8
      triangleStyle['right'] = 4
    }
    if (deviceHeight / 2 > touchViewY) {
      popViewStyle['top'] = touchViewY + 16
      triangleStyle['top'] = -8
    } else {
      popViewStyle['bottom'] = deviceHeight - touchViewY + 16
      triangleStyle['bottom'] = -8
      // 旋转箭头向下
      triangleStyle['transform'] = [{rotate: '180deg'}]
    }
    this.setState({
      popViewStyle,
      triangleStyle,
      modalVisible: true
    })
    return true
  }

  onChange = (value) => {
    const { onChange } = this.props
    if (onChange && typeof onChange === 'function') {
      onChange(value)
    }
    this.setState({modalVisible: false})
  }

  onClose = () => {
    const { onClose } = this.props
    this.setState({modalVisible: false})
    if (onClose && typeof onClose === 'function') {
      onClose()
    }
  }

  render () {
    const { children, overlay, style } = this.props
    const {
      modalVisible,
      popViewStyle,
      triangleStyle
    } = this.state
    return (
      <View style={style}>
        <TouchableWithoutFeedback
          onPress={this.onPress}>
          <View>
            {
              children
            }
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={modalVisible}
          onRequestClose={this.onClose}>
          <View
            style={[styles.popoverView, popViewStyle]}>
            <View style={[styles.triangle, triangleStyle]} />
            {
              overlay && overlay.length > 0 && overlay.map((item, i) => {
                return React.isValidElement(item)
                  ? React.cloneElement(
                    item,
                    {
                      onPress: this.onChange,
                      isLast: overlay.length === i + 1
                    })
                  : <Item
                    {...item}
                    onPress={this.onChange}
                    isLast={i + 1 === overlay.length} />
              })
            }
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popoverView: {
    backgroundColor: '#fff',
    borderRadius: 4,
    position: 'absolute'
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderTopColor: 'transparent',
    borderRightWidth: 4,
    borderRightColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#fff'
  }
})

Popover.Item = Item

export default Popover
