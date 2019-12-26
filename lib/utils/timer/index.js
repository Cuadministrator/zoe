import dayjs from 'dayjs'

const checkTime = (value) => {
  if (typeof value === 'number') {
    return value < 10 ? `0${value}` : value.toString()
  }
  return value
}
class CountDown {
  timer = null
  constructor (props) {
    const { navigator, endDate, milliseconds = 1000, callback } = props
    if (navigator) {
      navigator.addListener('didFocus', () => {
        this.initTimer(endDate, milliseconds, callback)
      })
      navigator.addListener('didBlur', () => {
        this.deleteTimer()
      })
    }
    if (endDate && callback) {
      this.initTimer(endDate, milliseconds, callback)
    }
  }
  initTimer = (endDate, milliseconds, fn) => {
    const end = dayjs(endDate)
    const timerCallback = () => {
      const start = dayjs()
      const diff = end.diff(start)
      if (diff >= 0) {
        const d = checkTime(parseInt(diff / 86400000))
        const h = checkTime(parseInt(diff % 86400000 / 3600000))
        const m = checkTime(parseInt(diff % 86400000 % 3600000 / 60000))
        const s = checkTime(parseInt(diff % 86400000 % 3600000 % 60000 / 1000))
        if (fn && typeof fn === 'function') {
          fn({ d, h, m, s })
        }
        this.timer = setTimeout(timerCallback, milliseconds)
      } else {
        this.deleteTimer()
        if (fn && typeof fn === 'function') {
          fn(null)
        }
      }
    }
    timerCallback()
  }
  deleteTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}

export default {
  CountDown
}
