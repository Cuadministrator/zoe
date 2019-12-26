import React, { Component } from 'react'
import { View, Image, Text, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Platform } from 'react-native'

import funcUtils from '../../utils/funcs'
// image
import leftArrow from './image/arrow-left-tr.png'
import rightArrow from './image/arrow-right-tr.png'

const { rem } = funcUtils

class ImageViewer extends Component {
  constructor (props) {
    super()
    const { index } = props
    this.state = {
      index
    }
  }
  onPressForPre = () => {
    const { index } = this.state
    if (!index) return
    this.setState({
      index: index - 1
    })
  }
  onPressForNext = () => {
    const { imageUrls } = this.props
    const { index } = this.state
    if (index === imageUrls.length - 1) return
    this.setState({
      index: index + 1
    })
  }
  render () {
    const {imageUrls, onClick} = this.props
    const { index = 0 } = this.state
    if (!(imageUrls && imageUrls.length > 0)) return null
    return (
      <View style={{width: '100%', height: '100%'}}>
        <TouchableWithoutFeedback
          style={{width: '100%', height: '100%'}}
          onPress={onClick}
        >
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: imageUrls[index].url}}
            resizeMode='contain'
          />
        </TouchableWithoutFeedback>
        {
          !!index && <TouchableOpacity style={[styles.imageViewerControl, { left: rem(10) }]} onPress={this.onPressForPre}>
            <Image style={{width: '100%', height: '100%'}} source={leftArrow} />
          </TouchableOpacity>
        }
        {
          !(index === imageUrls.length - 1) && <TouchableOpacity style={[styles.imageViewerControl, { right: rem(10) }]} onPress={this.onPressForNext}>
            <Image style={{width: '100%', height: '100%'}} source={rightArrow} />
          </TouchableOpacity>
        }
        {
          !!(Platform.OS === 'web') && <View style={styles.pressView}>
            <Text style={styles.pressText}>{index + 1} / {imageUrls.length}</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageViewerControl: {
    width: rem(48),
    height: rem(48),
    position: 'absolute',
    transform: [{translateY: rem(-24)}],
    top: '50%'
  },
  pressView: {
    width: rem(100),
    position: 'absolute',
    top: rem(10),
    left: '50%',
    ...Platform.select({
      web: {
        transform: [{translateX: rem(-50)}]
      }
    })
  },
  pressText: {
    fontSize: rem(14),
    color: '#fff',
    textAlign: 'center'
  }
})

export default ImageViewer
