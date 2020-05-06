import React from 'react'
import { Provider } from 'mobx-react'

import App from './App'
import store from './store'

function setup() {
  class Root extends React.Component {
    render() {
      return (
        // mobx状态机 用于 存储用户信息 跨页面使用
        // Provider 用于 将store(状态机)中的数据传入各个页面
        <Provider {...store}>
          <App />
        </Provider>
      )
    }
  }
  return Root
}

export default setup
