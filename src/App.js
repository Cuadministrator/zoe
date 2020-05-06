import React, { useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { inject, observer } from 'mobx-react'
import SideMenu from 'react-native-side-menu'
import { enableScreens } from 'react-native-screens'

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

// components
import Menu from './pages/menu'

enableScreens()

// dayjs 注册
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekday)

// clearAllAsyncStorage()
initAsyncStorage()

const App = ({globalStore}) => {
  const navigate = (screen) => {
    globalStore.changeSideMenuVisible(false)
    navigationRef.current.navigate(screen)
  }
  return (
    // 安全区域
    <SafeAreaProvider>
      {/* 侧边栏组件 */}
      <SideMenu
        autoClosing
        isOpen={globalStore.sideMenuVisible}
        onChange={isOpen => !isOpen && globalStore.changeSideMenuVisible(isOpen)}
        menu={
          // 侧边栏菜单
          <Menu
            userData={globalStore.user}
            navigate={navigate}
          />
        }
      >
        {/* 路由容器 */}
        <NavigationContainer
          ref={navigationRef}
        >
          {/* 路由 */}
          <Route />
        </NavigationContainer>
      </SideMenu>
    </SafeAreaProvider>
  )
}

export default inject('globalStore')(observer(App))
