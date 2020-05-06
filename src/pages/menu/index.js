import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'


import { Icon } from '../../components'

const SideMenuRow = ({
  icon,
  label,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={styles.sideMenuRow}
      onPress={onPress}
    >
      <Icon
        name={icon}
        size={20}
        color='#aab2bd'
        style={styles.sideMenuRowIcon}
      />
      <Text style={styles.sideMenuRowText}>{label}</Text>
    </TouchableOpacity>
  )
}

const SideMenu = ({
  userData,
  navigate
}) => {
  const safeArea = useSafeArea()
  const goLogin = () => {
    navigate('LoginScreen')
  }
  const goHelp = () => {
    navigate('HelpScreen')
  }
  const goCollect = () => {
    navigate('CollectScreen')
  }
  return (
    <View
      style={[
        styles.sideMenu,
        { paddingTop: safeArea.top + 40 }
      ]}
    >
      {
        userData
          ? <View style={styles.userView}>
            <Image
              style={styles.headerImg}
              source={require('../../image/headerImg.jpeg')}
            />
            {
              userData.name &&
              <Text style={styles.userText}>{userData.name}</Text>
            }
            {
              userData.phone &&
              <Text style={[styles.userText, { marginTop: 10 }]}>{userData.phone}</Text>
            }
          </View>
          : <TouchableOpacity
              style={styles.loginView}
              onPress={goLogin}
            >
            <Text style={[{ fontSize: 28, color: '#999' }]}>登陆</Text>
          </TouchableOpacity>
      }
      <View style={styles.userLine} />
      <View style={styles.sideMenuRows}>
        {
          userData &&
          <SideMenuRow
            icon='award'
            label='我的成就'
            onPress={goCollect}
          />
        }
        <SideMenuRow
          icon='help-circle'
          label='使用帮助'
          onPress={goHelp}
        />
      </View>
    </View>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#434a54'
  },
  loginView: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
    borderRadius: 48
  },
  userView: {
    alignItems: 'center',
  },
  headerImg: {
    width: 96,
    height: 96,
    backgroundColor: '#222',
    borderRadius: 48,
    marginBottom: 20
  },
  userText: {
    fontSize: 12,
    color: '#e6e9ed'
  },
  userLine: {
    width: '80%',
    height: 1,
    marginTop: 25,
    backgroundColor: '#e9e9e9'
  },
  sideMenuRows: {
    width: '100%'
  },
  sideMenuRow: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  sideMenuRowIcon: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    transform: [{translateY: -10}]
  },
  sideMenuRowText: {
    fontSize: 16,
    color: '#ccd1d9',
  }
})