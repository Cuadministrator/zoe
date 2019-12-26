import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import doneIcon from './image/icon-check.png'
import todoIcon from './image/icon-uncheck.png'

import funcs from '../../utils/funcs'
const { rem } = funcs

class Radio extends React.Component {
  _OnPress = (data) => {
    const { onChange } = this.props
    if (onChange && typeof onChange === 'function') {
      onChange(data)
    }
  }
  render () {
    const {
      isChecked,
      data,
      disabled, // 不可选择 暂时未提供
      type,
      checkIcon = doneIcon,
      unCheckIcon = todoIcon,
      style,
      ...restProps
    } = this.props
    if (!data) return null
    return (
      <TouchableWithoutFeedback onPress={() => this._OnPress(data)}>
        <View style={[styles.contentContainer, type === 'left' ? styles.leftIcon : styles.rightIcon, style]} {...restProps}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
              !!data.icon && <Image
                style={{width: rem(20), height: rem(20), marginRight: rem(10), resizeMode: 'contain'}}
                source={data.icon}
              />
            }
            <Text style={styles.contentText}>{data.text}</Text>
          </View>
          <Image
            style={[styles.iconImage, type === 'left' ? styles.iconLeftImage : styles.iconRightImage]}
            source={isChecked ? checkIcon : unCheckIcon}
            resizeMode={'stretch'}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: rem(44),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: rem(14)
  },
  leftIcon: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  },
  rightIcon: {
    justifyContent: 'space-between'
  },
  textContainer: {
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    flex: 1
  },
  contentText: {
    fontSize: rem(14),
    color: '#333'
  },
  iconImage: {
    width: rem(17),
    height: rem(17)
  },
  iconLeftImage: {
    marginRight: rem(10)
  },
  iconRightImage: {
    marginLeft: rem(10)
  }
})

export default Radio
