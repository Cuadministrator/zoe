import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// 配置
// 路由跳转
import { navigationRef } from './route/NavigationService'
// 数据存储 本地缓存
import { initAsyncStorage, clearAllAsyncStorage } from './storage'
// dayjs 配置
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween' // 在两个时间点中
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // >= 某个时间
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore' // <= 某个时间
import weekday from 'dayjs/plugin/weekday' // 目前在星期几

// route 路由 初始化页面 以及 页面跳转
import Route from './route'

// dayjs 注册
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekday)

// clearAllAsyncStorage()
initAsyncStorage()

const App = () => {
  return (
    // 安全区域
    <SafeAreaProvider>
      {/* 路由容器 */}
      <NavigationContainer
        ref={navigationRef}
      >
        {/* 路由 */}
        <Route />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
