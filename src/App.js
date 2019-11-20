/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  View
} from 'react-native';

// router
import { createAppContainer } from 'react-navigation'
import createNavigator from './router/createRouter'
import { routeConfig } from './router/routeConfig'
// mobx
import { Provider } from 'mobx-react/native'
import { store } from './store'

class App extends React.Component {
  render () {
    const Router = createAppContainer(createNavigator(routeConfig))
    return (
      <Provider {...store}>
        <View style={{flex: 1, backgroundColor: '#F9FAFF'}}>
          <Router />
          {/* <Loading /> */}
          {/* <Confirm /> */}
        </View>
      </Provider>
    )
  }
}

export default App
