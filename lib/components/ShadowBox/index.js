import React from 'react'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'

import funcs from '../../utils/funcs'

import middleImg from './image/bg-shadow.png'
import upImg from './image/shadowUp.png'
import downImg from './image/shadowDown.png'

const { rem } = funcs

class shadowBox extends React.Component {
  render () {
    const { loseType, children } = this.props
    return (
      <View style={styles.shadowBox}>
        {loseType !== 'top' && <Image style={[styles.verticalImage]} source={upImg} />}
        <ImageBackground
          style={{
            width: '100%'
          }}
          imageStyle={{
            width: '100%',
            resizeMode: 'stretch'
          }}
          source={middleImg}>
          <View style={{marginLeft: rem(22), marginRight: rem(22)}}>
            { children }
          </View>
        </ImageBackground>
        {loseType !== 'bottom' && <Image style={[styles.verticalImage]} source={downImg} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  shadowBox: {
    width: '100%'
  },
  verticalImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: rem(9)
  }
})

export default shadowBox
