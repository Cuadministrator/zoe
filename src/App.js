import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// 配置
import { navigationRef } from './route/NavigationService'

// route
import Route from './route'

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
