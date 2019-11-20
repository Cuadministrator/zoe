import {Platform} from 'react-native'

const rem = num => Platform.OS === 'web' ? `${num}rem` : num

export {
  rem
}