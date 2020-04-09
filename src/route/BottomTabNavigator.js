import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import EntypoIcons from 'react-native-vector-icons/dist/Entypo'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// screen
import HomeScreen from '../pages/home'
import ScheduleScreen from '../pages/schedule'
import ScheduleListScreen from '../pages/schedule/list'
import MineScreen from '../pages/mine'
import QuadrantScreen from '../pages/quadrant'


const TabScreens = [
  {
    name: 'Home',
    component: HomeScreen,
    type: 'funcBar',
    options: {
      type: 'funcBar',
      tabBarLabel: '首页',
      tabBarIcon: 'flow-tree'
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
      tabBarIcon: 'list'
    }
  },
  // {
  //   name: 'Mine',
  //   component: MineScreen,
  //   options: {
  //     type: 'funcBar',
  //     tabBarLabel: '我',
  //     tabBarIcon: 'shuffle'
  //   }
  // },
  {
    name: 'ScheduleList',
    component: ScheduleListScreen,
    options: {
      type: 'scheduleList',
      tabBarLabel: '时刻列表',
      tabBarIcon: 'list'
    }
  },
  {
    name: 'ScheduleAdd',
    component: ScheduleListScreen,
    options: {
      type: 'scheduleAdd',
      tabBarLabel: '时刻列表',
      tabBarIcon: 'list'
    }
  },
]

const Tab = createBottomTabNavigator()

const MyTabBar = ({
  state,
  descriptors,
  navigation,
  activeTintColor = 'red',
  inactiveTintColor = '#999'
}) => {
  let scheduleList = null
  let scheduleAdd = null
  if (
    state &&
    state.routes &&
    state.routes.length > 0
  ) {
    // navScheduleList = state.routes.find(route => descriptors[route.key].options.type === 'scheduleList')
    state.routes.forEach(
      (route, index) => {
        const type = descriptors[route.key].options.type
        if (type === 'scheduleList') {
          scheduleList = {id: index, value: route}
        } else if (type === 'scheduleAdd') {
          scheduleAdd = {id: index, value: route}
        }
      }
    )
  }
  return (
    <View style={styles.stackNavigator}>
      {
        !!scheduleList &&
        <View style={styles.leftView}>
          <EntypoIcons
            name='list'
            color={state.index === scheduleList.id ? activeTintColor : inactiveTintColor}
            size={26}
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
      {
        !!scheduleAdd &&
        <EntypoIcons
          name='circle-with-plus'
          color={state.index === scheduleAdd.id ? activeTintColor : inactiveTintColor}
          size={50}
          onPress={
            () => {
              // navigation.navigate()
            }
          }
        />
      }
      <View style={styles.tabNavigator}>
        {
          state && state.routes && state.routes.length > 0 &&
          state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            // 如果不为 funcBar 的时候 不渲染
            // console.warn(options)
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
                style={[
                  styles.tabItemView,
                  (index + 1) % 2 === 0 && { marginRight: 0 },
                  index <= 1 && { marginTop: 0 }
                ]}
                onPress={onPress}
                onLongPress={onLongPress}>
                  <EntypoIcons
                    name={options.tabBarIcon}
                    color={
                      isFocused
                        ? activeTintColor
                        : inactiveTintColor
                    }
                    size={26} />
              </TouchableOpacity>
            )
          })
        }
        <TouchableOpacity
          style={[
            styles.tabItemView,
            { marginRight: 0 }
          ]}
          // onPress={onPress}
          // onLongPress={onLongPress}
        >
            <EntypoIcons
              name='shuffle'
              color='#999'
              // color={
              //   isFocused
              //     ? activeTintColor
              //     : inactiveTintColor
              // }
              size={26} />
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
        activeTintColor: '#0074d9',
        inactiveTintColor: '#999'
      }}
    >
      {
        TabScreens && TabScreens.length > 0 &&
        TabScreens.map((tsItem, tsIndex) =>
          <Tab.Screen key={`tsItem_${tsIndex}`} {...tsItem} />
        )
      }
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  stackNavigator: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftView: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabNavigator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 70,
    height: 70
  },
  tabItemView: {
    marginTop: 10,
    marginRight: 10
  }
})

export default BottomTabNavigator
