import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'

// screen
import Mine from '../pages/mine'

const Drawer = createDrawerNavigator()

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
      }}
    >
      <Drawer.Screen name="Mine" component={Mine} />
    </Drawer.Navigator>
  )
}

export default MyDrawer
