import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import NavigationService from '../mask/react-navigation.native'
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
      navigationOptions: ({ scene, previous, navigation }) => ({
        headerStyle: {
          backgroundColor: '#fff',
          height: 44,
          elevation: 0 // 移除安卓环境下的阴影
        },
        headerLeft: <RightBack
          onPress={
            () => { navigation.goBack(null) }
          }
        />,
        headerTitleAlign: 'center',
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
  // return class extends React.Component {
  //   render () {
  //     return (
  //       <AppNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef)}}></AppNavigator>
  //     )
  //   }
  // }
}

export default createNavigator
