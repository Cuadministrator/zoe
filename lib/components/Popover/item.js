import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

// utils
import funcs from '../../utils/funcs'
const { rem } = funcs

class Item extends React.Component {
  _onPress = () => {
    const { onPress, key, name, value, disabled = false } = this.props
    if (onPress && typeof onPress === 'function' && !disabled) {
      onPress({key, name, value})
    }
  }
  render () {
    const { key, name, icon, disabled = false, isLast, itemViewStyle, itemIconStyle, itemTextStyle } = this.props
    return (
      <TouchableOpacity key={key} onPress={this._onPress}>
        <View style={[styles.itemBox, itemViewStyle, isLast && { borderBottomWidth: 0, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }, disabled && { backgroundColor: '#eee' }]}>
          {
            !!icon && <Image style={[styles.itemImage, itemIconStyle]} source={icon} />
          }
          <Text style={[styles.itemText, itemTextStyle, disabled && { color: '#999' }]}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemBox: {
    paddingHorizontal: rem(10),
    paddingVertical: rem(10),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemImage: {
    width: rem(14),
    height: rem(14),
    marginRight: rem(4)
  },
  itemText: {
    fontSize: rem(12),
    color: '#333'
  }
})

export default Item
