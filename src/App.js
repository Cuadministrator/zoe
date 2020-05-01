import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// 配置
import { navigationRef } from './route/NavigationService'
import { initAsyncStorage, clearAllAsyncStorage } from './storage'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'


// route
import Route from './route'
import dayjs from 'dayjs'

// dayjs
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)


clearAllAsyncStorage()
initAsyncStorage()

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}>
        <Route />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
