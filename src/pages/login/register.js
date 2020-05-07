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
import { Input, Button, Tip } from 'beeshell'
import { Icon } from '../../components'

// utils
import { getStatusBarHeight } from '../../utils/func'
import { register } from '../../storage/user'

const { height: W_HEIGHT } = Dimensions.get('window')

const LoginInput = (props) => {
  const [pswMode, setPswMode] = useState(props && props.pswMode)
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e9e9e9',
      }}
    >
      {
        props.label &&
        <Text
          style={{
            fontSize: 14,
            color: '#222',
            marginRight: 20,
            width: 60
          }}
        >{props.label}</Text>
      }
      <Input
        autoCapitalize='none'
        secureTextEntry={pswMode === 'password'}
        style={styles.inputContainerStyle}
        {...props}
      />
    </View>
  )
}

@inject('globalStore')
@observer
class RegisterPage extends Component {
  state = {
    keyBoardHeight: 0,
    boxHeight: 0,
    account: '',
    psw: '',
    rewritePsw: '',
    name: '',
    email: '',
    pswMode: 'password',
    errMessage: '' // '*对不起，您没有访问权限，请与管理员联系' // '*对不起，您的密码或帐号错误'
  }

  async componentDidMount () {
    // 监控键盘，如果键盘遮挡登陆框，登陆框上浮
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    // 取消监控
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove()
  }

  onChangePswMode = () => {
    const { pswMode } = this.state
    this.setState({pswMode: pswMode === 'password' ? 'none' : 'password'})
  }

  // 点击登陆按钮
  onPressRegister = async () => {
    const { globalStore, navigation } = this.props
    const { account, psw, rewritePsw, name, email } = this.state
    if (!(account && psw && rewritePsw && name && email)) return
    if (psw !== rewritePsw) return Tip.show('两次输入密码不相同!')
    const res = await register({
      phone: account,
      password: psw,
      name,
      email
    })
    if (res) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    }
  }
  // 登陆框上浮
  _keyboardDidShow(e) {
    // 只有第一次才改变
    if (this.state.keyBoardHeight !== 0) return
    this.setState({
      keyBoardHeight: e.endCoordinates.height
    })
  }
  // 隐藏上浮
  _keyboardDidHide() {
    this.setState({
      keyBoardHeight: 0
    })
  }

  render() {
    const { account, psw, name, errMessage, email, rewritePsw, pswMode, keyBoardHeight, boxHeight } = this.state
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
                  注册
                </Text>
              </View>
            }
            <View
              style={styles.loginBox}
              onLayout={event => this.setState({boxHeight: event.nativeEvent.layout.height})}
            >
              <LoginInput
                keyboardType='numeric'
                label='手机号'
                value={account}
                placeholder='请输入手机号'
                placeholderTextColor='#999'
                onChange={account => this.setState({account})} />
              <LoginInput
                label='密码'
                value={psw}
                placeholder='请输入密码'
                pswMode='password'
                placeholderTextColor='#999'
                onChange={psw => this.setState({psw})} />
              <LoginInput
                label='密码'
                value={rewritePsw}
                placeholder='请再次输入密码'
                pswMode='password'
                placeholderTextColor='#999'
                onChange={rewritePsw => this.setState({rewritePsw})} />
              <LoginInput
                label='姓名'
                value={name}
                placeholder='请输入姓名'
                placeholderTextColor='#999'
                onChange={name => this.setState({name})} />
              <LoginInput
                label='电子邮箱'
                keyboardType='email-address'
                value={email}
                placeholder='请输入电子邮箱'
                placeholderTextColor='#999'
                onChange={email => this.setState({email})} />
              <Button
                type='primary'
                size='md'
                disabled={!(account && psw && rewritePsw && name && email)}
                style={styles.btnStyle}
                onPress={this.onPressRegister}>注册</Button>
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
    paddingHorizontal: 40,
    paddingVertical: 60,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 14,
  },
  inputContainerStyle: {
    flex: 1,
    height: 56,
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

export default RegisterPage
