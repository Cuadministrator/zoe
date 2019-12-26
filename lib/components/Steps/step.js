import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Utils from '../../utils'
const { funcsUtils: { rem } } = Utils

const enumIcon = {
  'todo': require('./image/icon-todo.png'),
  'doing': require('./image/icon-doing.png'),
  'done': require('./image/icon-done.png')
}
class Step extends React.Component {
  renderForTextPropsDom = (children, _props) => {
    if (!children) return null
    return (
      typeof children === 'string' ? <Text {..._props}>{children}</Text> : children
    )
  }
  render () {
    const {
      // 外部传入属性
      header, title, description, icon, size, direction, status, contentStyle,
      // 内部属性
      isFirst, isLast
    } = this.props
    const { renderForTextPropsDom } = this
    return (
      <View style={[direction === 'vertical' ? styles.verticalStepView : styles.stepView]}>
        <View style={[styles.headerView, direction === 'vertical' && { maxWidth: '100%' }]}>
          {
            renderForTextPropsDom(header, {
              style: [styles.headerText, direction === 'vertical' && { textAlign: 'center' }]
            })
          }
        </View>
        <View style={[styles.iconView, direction === 'vertical' ? { flexDirection: 'row', width: '100%', marginVertical: rem(8), height: rem(20) } : { marginRight: rem(10), width: rem(20) }]}>
          {
            <View style={[
              styles.lineView,
              isFirst ? { borderColor: 'transparent' } : (status === 'doing' || status === 'done') && { borderColor: '#F9E72C' },
              direction === 'vertical' ? { height: rem(1), borderTopWidth: 1 } : { width: rem(1), borderLeftWidth: 1 },
            ]} />
          }
          <View style={[styles.iconImage, size === 'small' && styles.smallIconImage]}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={(status && enumIcon[status]) || icon || null} />
          </View>
          {
            <View style={[
              styles.lineView,
              isLast ? { borderColor: 'transparent' } : status === 'done' && { borderColor: '#F9E72C' },
              direction === 'vertical' ? { height: rem(1), borderTopWidth: 1 } : { width: rem(1), borderLeftWidth: 1 }
            ]} />
          }
        </View>
        <View style={[
          styles.contentView,
          direction === 'vertical' ? { paddingHorizontal: rem(5) } : { paddingVertical: rem(5) },
          contentStyle
        ]}>
          {
            renderForTextPropsDom(title, {
              style: [styles.titleText, size === 'small' && { fontSize: rem(13) }, direction === 'vertical' && { textAlign: 'center' }]
            })
          }
          {
            renderForTextPropsDom(description, {
              style: [styles.descriptionText, direction === 'vertical' && { textAlign: 'center' }]
            })
          }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  stepView: {
    width: '100%',
    flexDirection: 'row'
  },
  verticalStepView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  headerView: {
    maxWidth: rem(60),
    paddingTop: rem(5),
    justifyContent: 'center'
  },
  headerText: {
    fontSize: rem(12),
    color: '#9b9b9b',
    textAlign: 'center'
  },
  iconView: {
    alignItems: 'center'
  },
  iconImage: {
    width: rem(20),
    height: rem(20),
    borderRadius: rem(20),
    backgroundColor: '#d9d9d9',
    overflow: 'hidden'
  },
  smallIconImage: {
    width: rem(12),
    height: rem(12),
    borderRadius: rem(12)
  },
  lineView: {
    flex: 1,
    borderColor: '#d8d8d8'
  },
  contentView: {
    flex: 1
  },
  titleText: {
    fontSize: rem(14),
    lineHeight: rem(20),
    color: '#333'
  },
  descriptionText: {
    fontSize: rem(12),
    lineHeight: rem(16),
    color: '#d7d7d7',
    marginTop: rem(5)
  }
})

export default Step
