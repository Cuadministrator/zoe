import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
// import EntypoIcons from 'react-native-vector-icons/dist/Entypo'
import { Icon } from '../components'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeArea } from 'react-native-safe-area-context'

// screen
import HomeScreen from '../pages/home'
import ScheduleScreen from '../pages/schedule'
import MineScreen from '../pages/mine'
import QuadrantScreen from '../pages/quadrant'
import TestScreen from '../pages/test'

// 以下导航栏组件按照 react-navigation 文档配置。

// 导航栏配置
const TabScreens = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      type: 'funcBar',
      tabBarLabel: '首页',
      tabBarIcon: 'list'
    }
  },
  {
    name: 'Quadrant',
    component: QuadrantScreen,
    options: {
      type: 'funcBar',
      tabBarLabel: '四象限',
      tabBarIcon: 'grid'
    }
  },
  {
    name: 'Schedule',
    component: ScheduleScreen,
    options: {
      type: 'funcBar',
      tabBarLabel: '时刻表',
      tabBarIcon: 'git-merge'
    }
  },
  {
    name: 'SideMenu',
    component: TestScreen,
    options: {
      type: 'sideMenu',
      tabBarLabel: '时刻列表',
      tabBarIcon: 'list'
    }
  },
]

const Tab = createBottomTabNavigator()

// 底部导航栏组件
const MyTabBar = ({
  state,
  descriptors,
  navigation,
  activeTintColor = '#F6BB42',
  inactiveTintColor = '#999',
  changeSideMenu
}) => {
  const safeArea = useSafeArea()
  const [showMenu, setShowMenu] = useState(true)
  let sideMenu = null
  let funcBarList = []
  if (
    state &&
    state.routes &&
    state.routes.length > 0
  ) {
    state.routes.forEach(
      (route, index) => {
        const type = descriptors[route.key].options.type
        if (type === 'funcBar') {
          funcBarList.push(route)
        } else if (type === 'sideMenu') {
          sideMenu = {id: index, value: route}
        }
      }
    )
  }
  return (
    <View
      style={[
        styles.stackNavigator,
        // 底部的安全区域高度设置
        { paddingBottom: safeArea.bottom || 16 }
      ]}
    >
      {
        !!sideMenu &&
        <View style={styles.leftView}>
          <Icon
            name='list'
            color={state.index === sideMenu.id ? activeTintColor : inactiveTintColor}
            size={32}
            onPress={changeSideMenu}
          />
        </View>
      }
      <View style={styles.tabNavigator}>
        {
          showMenu && funcBarList && funcBarList.length > 0 &&
          funcBarList.map((route, index) => {
            const routeLength = funcBarList.length
            const { options } = descriptors[route.key]
            // 如果不为 funcBar 的时候 不渲染
            if (options.type !== 'funcBar') return null
            const isFocused = state.index === index
            // 点击
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }
            // 长按
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }

            return (
              <TouchableOpacity
                key={`route_${index}`}
                onPress={onPress}
                onLongPress={onLongPress}>
                  <Icon
                    name={options.tabBarIcon}
                    color={
                      isFocused
                        ? activeTintColor
                        : inactiveTintColor
                    }
                    size={32} />
              </TouchableOpacity>
            )
          })
        }
        <TouchableOpacity
          style={[
          ]}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Icon
            name={showMenu ? 'maximize-2' : 'minimize-2'}
            color='#999'
            size={32}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const BottomTabNavigator = ({globalStore}) => {
  const changeSideMenu = () => {
    globalStore.changeSideMenuVisible(!globalStore.sideMenuVisible)
  }
  return (
    <Tab.Navigator
      tabBar={
        props =>
        <MyTabBar
          {...props}
          changeSideMenu={changeSideMenu}
        />
      }
      tabBarOptions={{
        activeTintColor: '#434a54',
        inactiveTintColor: '#e6e9ed'
      }}
    >
      {
        TabScreens && TabScreens.length > 0 &&
        TabScreens.map((tsItem, tsIndex) =>
          <Tab.Screen
            key={`tsItem_${tsIndex}`}
            {...tsItem}
          />
        )
      }
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  stackNavigator: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabNavigator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabItemView: {
  }
})

export default inject('globalStore')(observer(BottomTabNavigator))
