import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import funcs from '../../utils/funcs'
const { rem } = funcs

class Footer extends Component {
  render() {
    const {style, children} = this.props
    return <View style={styles.footer}>
      <View style={styles.footerShadow}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.03)']}
          style={{height: rem(10), width: '100%'}} />
      </View>
      <View style={[styles.footerBody, style]}>{children}</View>
    </View>
  }
}

const styles = StyleSheet.create({
  footer: {
    width: '100%'
  },
  footerShadow: {
    position: 'absolute',
    top: rem(-10),
    left: 0,
    width: '100%'
  },
  footerBody: {
    height: rem(44),
    width: '100%',
    backgroundColor: '#fff'
  }
})

export default Footer
