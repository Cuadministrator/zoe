import React from 'react'
import { View, StyleSheet } from 'react-native'
import ResultPage from '../ResultPage'

class Page extends React.Component {
  render () {
    const {
      showErrorPage = false,
      errorConfig,
      style,
      header,
      footer,
      children
    } = this.props
    if (showErrorPage) return <ResultPage type={'500'} {...errorConfig} />
    return (
      <View style={[styles.container, style]}>
        {header}
        {children}
        {footer}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f9faff'
  }
})

export default Page
