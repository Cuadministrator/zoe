// new
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContext } from '@react-navigation/native'

// 路由配置
import { navigationRef } from './NavigationService'

// screen
import LoginScreen from '../pages/login'
import ScheduleStopWatchScreen from '../pages/schedule/watch'
// 底部导航栏
import BottomTabNavigator from '../route/BottomTabNavigator'
// 路由堆栈
const Stack = createStackNavigator()

// 路由按照react-navigation 文档配置

const Router = () => {
  return (
    <Stack.Navigator
      // 初始化页面
      initialRouteName="BottomTabNavigator" // 初始页面选择底部导航栏默认页面
      screenOptions={{
        headerShown: false // 不显示头
      }}>
      {/* 登陆页 */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* 底部导航栏 */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {/* 任务页 */}
      <Stack.Screen name="ScheduleStopWatchScreen" component={ScheduleStopWatchScreen} />
    </Stack.Navigator>
  )
}

export default Router
