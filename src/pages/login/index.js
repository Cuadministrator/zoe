import React, { Component, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native'
import { inject, observer } from 'mobx-react'

// components
import { Input, Button } from 'beeshell'
import { Icon } from '../../components'

// utils
import { getStatusBarHeight } from '../../utils/func'

// service

const { height: W_HEIGHT } = Dimensions.get('window')

const LoginInput = (props) => {
  const [pswMode, setPswMode] = useState(props && props.pswMode)
  return <Input
    autoCapitalize='none'
    secureTextEntry={pswMode === 'password'}
    style={styles.inputContainerStyle}
    {...props}
  />
}

@inject('globalStore')
@observer
class LoginPage extends Component {
  state = {
    keyBoardHeight: 0,
    boxHeight: 0,
    account: '',
    psw: '',
    pswMode: 'password',
    errMessage: '' // '*对不起，您没有访问权限，请与管理员联系' // '*对不起，您的密码或帐号错误'
  }

  async componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
  }

  onChangePswMode = () => {
    const { pswMode } = this.state
    this.setState({pswMode: pswMode === 'password' ? 'none' : 'password'})
  }

  onPressLogin = async () => {
    const { globalStore, navigation } = this.props
    const { account, psw } = this.state
    if (!(account && psw)) return
    await globalStore.login({
      account, password: psw
    })
    if(globalStore.user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabNavigator' }],
      })
    }
  }

  _keyboardDidShow(e) {
    // 只有第一次才改变
    if (this.state.keyBoardHeight !== 0) return
    this.setState({
      keyBoardHeight: e.endCoordinates.height
    })
  }

  _keyboardDidHide() {
    this.setState({
      keyBoardHeight: 0
    })
  }

  render() {
    const { account, psw, errMessage, pswMode, keyBoardHeight, boxHeight } = this.state
    const showTag = (W_HEIGHT - keyBoardHeight - getStatusBarHeight(true)) > (boxHeight + 136)
    return (
      <>
        <ScrollView
          bounces={false}
          style={styles.scrollViewStyle}
        >
          <View style={{height: getStatusBarHeight(true), backgroundColor: '#F42A2A'}} />
          <ImageBackground
            source={require('../../image/login-bg.png')}
            style={styles.imageBackgroundStyle}
            imageStyle={styles.backgroundImageStyle}
          >
            {
              showTag && <View style={{height: 136, justifyContent: 'center', paddingHorizontal: 40}}>
                <Text
                  style={styles.titleText}
                >
                  登录
                </Text>
              </View>
            }
            <View
              style={styles.loginBox}
              onLayout={event => this.setState({boxHeight: event.nativeEvent.layout.height})}
            >
              <LoginInput
                keyboardType='email-address'
                value={account}
                placeholder='请输入账号'
                placeholderTextColor='#999'
                onChange={account => this.setState({account})} />
              <LoginInput
                value={psw}
                placeholder='请输入密码'
                pswMode='password'
                placeholderTextColor='#999'
                onChange={psw => this.setState({psw})} />
              <Button
                type='primary'
                size='md'
                disabled={!(account && psw)}
                style={styles.btnStyle}
                onPress={this.onPressLogin}>登录</Button>
              {
                !!errMessage && <Text style={styles.errText}>{errMessage}</Text>
              }
            </View>
          </ImageBackground>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
  titleText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '500',
  },
  imageBackgroundStyle: {
    paddingTop: 14,
  },
  backgroundImageStyle: {
    width: '100%',
    height: 256,
    resizeMode: 'stretch',
  },
  // 登录
  loginBox: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 14,
  },
  inputContainerStyle: {
    height: 44,
    borderBottomColor: '#F0F0F0',
  },
  inputIconClose: {
    marginRight: 25
  },
  pswIcon: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{translateY: -7}]
  },
  btnContainer: {
    marginTop: 40
  },
  btnStyle: {
    height: 48,
    marginTop: 40,
    borderRadius: 24,
    backgroundColor: '#F42A2A'
  },
  errText: {
    fontSize: 14,
    color: '#F42A2A',
    width: 300,
    position: 'absolute',
    bottom: 118,
    left: '50%',
    textAlign: 'center',
    transform: [{translateX: -150}]
  },
})

export default LoginPage
