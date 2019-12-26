import React from 'react'
import {StyleSheet, View} from 'react-native'

class Collapse extends React.Component {
  state = {
    activeKeys: []
  }
  componentDidMount = () => {
    this.initData()
  }
  initData = () => {
    const { defaultActiveKey } = this.props
    if (defaultActiveKey && defaultActiveKey.length > 0) {
      this.setState({
        activeKeys: defaultActiveKey
      })
    }
  }
  onPress = (key, callBack) => {
    const { disable } = this.props
    const { activeKeys } = this.state
    if (disable) return // 禁用后的面板展开将无法通过用户交互改变
    if (activeKeys.includes(key)) {
      const i = activeKeys.findIndex(item => item === key)
      activeKeys.splice(i, 1)
    } else {
      activeKeys.push(key)
    }
    this.setState({activeKeys}, () => {
      // 完成点击展开后的回调
      if (callBack && typeof callBack === 'function') {
        callBack()
      }
    })
  }
  render = () => {
    const { children, style } = this.props
    const { activeKeys } = this.state
    if (!children) return null
    // 兼容 children 中含有单个 panel 和 数组map解构 获取所有子项的数量
    const childrenCount = React.Children.count(children)
    return (
      <View style={[styles.collapseView, style]}>
        {
          React.Children.map(children, (item, i) => {
            if (!(item && item.key)) return null
            return (
              React.cloneElement(
                item,
                {
                  active: activeKeys.includes(item.key), // 以外部传入的 active 决定是否启用该panel
                  ...item.props,
                  isLast: childrenCount === i + 1,
                  onPress: () => this.onPress(item.key, item.props.onPress) // 重写 onPress 删除 或 添加 activekeys 结束后执行原本onPress回调
                }
              )
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  collapseView: {
    borderWidth: 1,
    borderColor: '#d9d9d9'
  }
})
export default Collapse
