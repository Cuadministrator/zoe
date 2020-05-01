// new
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContext } from '@react-navigation/native'

// 路由配置
import { navigationRef } from './NavigationService'

// screen
import HomeScreen from '../pages/home'
// import ScheduleListScreen from '../pages/schedule/list'
// import ScheduleDetailScreen from '../pages/schedule/detail'
import ScheduleStopWatchScreen from '../pages/schedule/watch'
import ScheduleHomeScreen from '../pages/schedule'

import BottomTabNavigator from '../route/BottomTabNavigator'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {/* <Stack.Screen name="ScheduleHomeScreen" component={ScheduleHomeScreen} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ScheduleStopWatchScreen" component={ScheduleStopWatchScreen} />
    </Stack.Navigator>
  )
}

export default Router
