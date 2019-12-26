import Toast from 'react-native-root-toast'

// 参考使用文档 https://github.com/magicismight/react-native-root-toast
export default {
  show (content, duration = 2, onClose = () => {}, mask = true) {
    return Toast.show(content, {
      duration: duration * 1000,
      position: Toast.positions.CENTER,
      shadow: mask,
      onHidden: onClose
    })
  }
}
