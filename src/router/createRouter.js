import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { rem } from '../utils/func'

const RightBack = props => {
  const { onPress } = props
  return (
    <TouchableOpacity
        style={{
          width: rem(44),
          height: rem(44),
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={onPress}>
        <Image
          style={{
            width: rem(32),
            height: rem(32)
          }}
          source={require('../image/arrow-lift.png')} />
    </TouchableOpacity>
  )
}

const createNavigator = (config) => {
  const routerObj = {}
  const configKey = Object.keys(config)
  configKey.forEach(key => {
    const item = config[key]
    const { path, component, navigationOptions } = item
    if (path !== undefined && component) {
      component.defaultTitle = (navigationOptions && navigationOptions.title) || ''
      routerObj[key] = {
        ...item,
        screen: component
      }
    }
  })
  const AppNavigator = createStackNavigator(
    routerObj,
    {
      defaultNavigationOptions: { title: 'defaultPage' },
      navigationOptions: ({ scene, previous, navigation }) => ({
        headerStyle: {
          backgroundColor: '#fff',
          height: 44,
          elevation: 0 // 移除安卓环境下的阴影
        },
        headerTitleAlign: 'center',
        headerLeft: <RightBack
          onPress={
            () => { navigation.goBack(null) }
          } />,
        headerTitleStyle: {
          fontSize: rem(18),
          color: '#333',
          flex: 1,
          alignSelf: 'center',
          textAlign: 'center'
        }
      })
    }
  )
  return AppNavigator
}

export default createNavigator
