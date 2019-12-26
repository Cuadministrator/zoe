import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

class Line extends Component {
  render() {
    return <View style={styles.line} />
  }
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    transform: [{scaleY: 0.5}]
  }
})

export default Line
