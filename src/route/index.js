// new
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContext } from '@react-navigation/native'

// 路由配置
import { navigationRef } from './NavigationService'

// screen
import LoginScreen from '../pages/login'
import RegisterScreen from '../pages/login/register'
import ScheduleStopWatchScreen from '../pages/schedule/watch'
import HelpScreen from '../pages/menu/help'
import CollectScreen from '../pages/menu/collect'
// 底部导航栏
import BottomTabNavigator from './BottomTabNavigator'
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
      }}
    >
      {/* 登陆页 */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* 注册 */}
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      {/* 使用帮助 */}
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          headerTitle: '帮助文档',
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      {/* 个人成就 */}
      <Stack.Screen
        name="CollectScreen"
        component={CollectScreen}
        options={{
          headerTitle: '个人成就',
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      {/* 底部导航栏 */}
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {/* 任务页 */}
      <Stack.Screen name="ScheduleStopWatchScreen" component={ScheduleStopWatchScreen} />
    </Stack.Navigator>
  )
}

export default Router
