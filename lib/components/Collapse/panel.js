import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image } from 'react-native'

import iconArrowTop from './image/icon-arrowTop.png'

import funcs from '../../utils/funcs'
const { rem } = funcs

class Panel extends React.Component {
  componentDidMount = () => {}
  initData = () => {}
  onPress = () => {
    const { onPress } = this.props
    if (onPress && typeof onPress === 'function') {
      onPress()
    }
  }
  render = () => {
    const {
      isLast,
      showArrow = false,
      arrowPosition = 'left',
      header,
      headerViewStyle,
      headerTextStyle,
      children,
      childrenViewStyle,
      childrenTextStyle,
      active = false
    } = this.props
    return (
      <View style={[styles.panelView, isLast && {borderBottomWidth: 0}]}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={[styles.panelHeaderView, headerViewStyle]}>
            <View style={{flex: 1}}>
              {
                typeof header === 'string' ? <Text style={[styles.panelHeaderText, headerTextStyle]}>{header}</Text> : header
              }
            </View>
            {
              !!showArrow && <Image style={[styles.arrowStyle, arrowPosition === 'right' && {order: 1, marginRight: 0, marginLeft: rem(14)}, !active && {transform: [{rotate: '90deg'}]}]} source={iconArrowTop} />
            }
          </View>
        </TouchableWithoutFeedback>
        {
          !!(active && children) &&
            <View style={[styles.panelChildrenView, childrenViewStyle]}>
              {
                typeof children === 'string' ? <Text style={[styles.panelChildrenText, childrenTextStyle]}>{children}</Text> : children
              }
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  panelView: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9'
  },
  panelHeaderView: {
    padding: rem(14),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  panelHeaderText: {
    lineHeight: rem(20),
    fontSize: rem(14),
    color: '#000'
  },
  arrowStyle: {
    width: rem(12),
    height: rem(6),
    marginRight: rem(14),
    // order: -1,
    transform: [{rotate: '180deg'}]
  },
  panelChildrenView: {
    padding: rem(14),
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9'
  },
  panelChildrenText: {
    lineHeight: rem(20),
    fontSize: rem(14),
    color: '#000'
  }
})

export default Panel
