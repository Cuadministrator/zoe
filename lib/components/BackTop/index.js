import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'
import funcs from '../../utils/funcs'
const { rem } = funcs

class BackTop extends React.Component {
  toTop = () => {
    const { target, onClick } = this.props
    target.scrollTo({x: 0, y: 0, animated: true})
    onClick && typeof onClick === 'function' && onClick()
  }

  render () {
    const { contentOffsetHeight, visibilityHeight } = this.props
    if (!(contentOffsetHeight && visibilityHeight)) return null
    if (contentOffsetHeight < visibilityHeight) return null
    return (
      <TouchableOpacity style={styles.backTop} onPress={this.toTop}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>回顶部</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  backTop: {
    zIndex: 10,
    position: 'absolute',
    bottom: rem(88),
    right: rem(44)
  },
  container: {
    width: rem(50),
    height: rem(50),
    borderRadius: 25,
    ...Platform.select({
      web: {
        borderRadius: '50%'
      }
    }),
    borderStyle: 'solid',
    borderColor: '#ECD2A1',
    borderWidth: 1,
    backgroundColor: 'rgba(54,45,40,0.6)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#ECD2A1',
    fontSize: rem(12)
  }
})

export default BackTop
