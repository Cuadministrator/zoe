import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
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
    name: 'ScheduleList',
    component: TestScreen,
    options: {
      type: 'scheduleList',
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
  inactiveTintColor = '#999'
}) => {
  const safeArea = useSafeArea()
  const [showMenu, setShowMenu] = useState(true)
  let scheduleList = null
  let funcBarList = []
  if (
    state &&
    state.routes &&
    state.routes.length > 0
  ) {
    state.routes.forEach(
      (route, index) => {
        const type = descriptors[route.key].options.type
        if (type === 'scheduleList') {
          scheduleList = {id: index, value: route}
        } else if (type === 'funcBar') {
          funcBarList.push(route)
        }
      }
    )
  }
  return (
    <View
      style={[
        styles.stackNavigator,
        // 底部的安全区域高度设置
        { paddingBottom: safeArea.bottom }
      ]}
    >
      {
        !!scheduleList &&
        <View style={styles.leftView}>
          <Icon
            name='list'
            color={state.index === scheduleList.id ? activeTintColor : inactiveTintColor}
            size={32}
            onPress={
              () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: scheduleList.value.key,
                  canPreventDefault: true,
                })
      
                if (!event.defaultPrevented) {
                  navigation.navigate(scheduleList.value.name)
                }
              }
            }
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
              size={32} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={
        props => <MyTabBar {...props} />
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
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerView: {
    position: 'absolute',
    bottom: 56,
    left: '50%',
    transform: [{translateX: -30}, {translateY: 30}]
  },
  tabNavigator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabItemView: {
  }
})

export default BottomTabNavigator
