import React, { Component } from 'react'
import { Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text, View } from 'react-native'
import funcs from '../../utils/funcs'
const { rem } = funcs

class Button extends Component {
  _onPress = (e) => {
    if (e && e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault() // 事件未被显示处理，阻止默认动作
    }
    const { disabled = false, onPress } = this.props
    if (disabled) return false
    if (onPress && typeof onPress === 'function') {
      onPress()
    }
  }

  render () {
    const {
      type,
      size = 'large',
      inline = true,
      active = true,
      disabled = false,
      btnViewStyle,
      btnTextStyle,
      disabledViewStyle,
      disabledTextStyle,
      title,
      children
      // onPress
    } = this.props
    // TouchableWithoutFeedback 内部不支持直接放Text元素 不能加样式 先去除
    const TouchableButton = (!active || disabled) ? TouchableWithoutFeedback : TouchableOpacity
    return (
      <TouchableButton
        onPress={this._onPress}>
        <View
          style={[
            styles.btnViewStyle,
            !inline && {width: '100%'},
            size === 'small' && styles.smallBtnViewStyle,
            type === 'primary' && styles.primaryStyle,
            btnViewStyle,
            disabled && disabledViewStyle
          ]}
        >
          {
            !!children && typeof children === 'object'
              ? children
              : <Text style={[
                styles.btnTextStyle,
                size === 'small' && {fontSize: rem(13)},
                btnTextStyle,
                disabled && disabledTextStyle
              ]}
              >{children || title}</Text>
          }
        </View>
      </TouchableButton>
    )
  }
}

const styles = StyleSheet.create({
  btnViewStyle: {
    backgroundColor: '#fff',
    height: rem(44),
    paddingLeft: rem(14),
    paddingRight: rem(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(5),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderStyle: 'solid'
  },
  smallBtnViewStyle: {
    height: rem(30),
    paddingLeft: rem(8),
    paddingRight: rem(8)
  },
  primaryStyle: {
    // ...Platform.select({
    //   web: {
    //     background: 'linear-gradient(90deg,rgba(255,240,59,1) 0%,rgba(255,214,41,1) 100%)'
    //   }
    // }),
    backgroundColor: '#f9e72c',
    borderWidth: 0
  },
  btnTextStyle: {
    color: '#333',
    fontSize: rem(16),
    backgroundColor: 'transparent'
  }
})

export default Button
