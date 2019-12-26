import React from 'react'
import { StyleSheet, View } from 'react-native'

import Radio from './radio'

import funcs from '../../utils/funcs'
const { rem } = funcs

class RadioGroup extends React.Component {
  _OnPress = (data) => {
    const { onChange } = this.props
    if (onChange && typeof onChange === 'function') {
      onChange(data.value, data)
    }
  }
  render () {
    const { value, data, type, checkIcon, unCheckIcon, style, itemStyle, col } = this.props
    if (!data) return null
    return (
      <View style={[styles.radioGroupContainer, style, col === 2 && styles.radioGroupContainerCol]}>
        {
          data && data.length > 0 && data.map((item, i) =>
            <Radio
              key={`radio_${i}`}
              data={item}
              type={type}
              style={[col === 2 && styles.itemStyleCol, i + 1 === data.length && {borderBottomWidth: 0}, itemStyle]}
              checkIcon={checkIcon}
              unCheckIcon={unCheckIcon}
              onChange={this._OnPress}
              isChecked={value === item.value} />)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  radioGroupContainer: {
  },
  radioGroupContainerCol: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemStyleCol: {
    borderBottomWidth: 0,
    width: '50%',
    height: rem(30)
  }
})

export default RadioGroup
