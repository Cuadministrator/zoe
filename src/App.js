import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// 配置
import { navigationRef } from './route/NavigationService'
import { Provider } from 'mobx-react'
import store from './store'
import { initAsyncStorage, clearAllAsyncStorage } from './storage'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekday from 'dayjs/plugin/weekday'



// route
import Route from './route'
import dayjs from 'dayjs'

// dayjs
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(weekday)


// clearAllAsyncStorage()
initAsyncStorage()

const App = () => {
  return (
    <Provider {...store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}>
          <Route />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
