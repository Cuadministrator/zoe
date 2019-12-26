import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, Platform} from 'react-native'
// utils
import funcs from '../../utils/funcs'

const { rem } = funcs

class InputItem extends Component {
  // // 解决 iOS 手机无法输入中文 https://www.jianshu.com/p/49544321295e
  // shouldComponentUpdate (nextProps) {
  //   const { value, defaultValue } = this.props
  //   return Platform.OS !== 'ios' || (value === nextProps.value && !nextProps.defaultValue) || (defaultValue === nextProps.defaultValue && !nextProps.value)
  // }

  render() {
    const {value, inputItemStyle, textInputStyle, children, titleStyle, textAlignVertical, ...restProps} = this.props
    return (
      <View style={[styles.inputItem, inputItemStyle]}>
        {
          !!children &&
          <View style={styles.titleView}>
            {
              typeof children === 'object'
                ? children
                : <Text style={[styles.title, titleStyle]} numberOfLines={1}>{children}</Text>
            }
          </View>
        }
        <TextInput
          underlineColorAndroid='transparent'
          style={[styles.textInput, textInputStyle]}
          value={value || ''} // 解决受控组件和非受控组件控制的问题 https://www.jianshu.com/p/35f603f36c6d
          {...Platform.OS === 'android' && textAlignVertical && {textAlignVertical}} // 修复 web 端不支持textAlignVertical
          {...restProps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: rem(48),
    borderColor: '#eee',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  titleView: {
    width: rem(80)
  },
  title: {
    color: '#333',
    fontSize: rem(14)
  },
  textInput: {
    flex: 1,
    borderWidth: 0,
    padding: 0
  }
})

export default InputItem
