import classnames from 'classnames'
import React from 'react'
import Notification from 'rmc-notification'
import './index.web.css'

let messageInstance
const prefixCls = 'am-toast'

function getMessageInstance(mask, callback) {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
  (Notification).newInstance(
    {
      prefixCls,
      style: {}, // clear rmc-notification default style
      transitionName: 'am-fade',
      className: classnames({
        [`${prefixCls}-mask`]: mask,
        [`${prefixCls}-nomask`]: !mask
      })
    },
    (notification) => callback && callback(notification)
  )
}

function notice(
  content,
  type,
  duration = 2,
  onClose = undefined,
  mask = true
) {
  getMessageInstance(mask, notification => {
    messageInstance = notification
    notification.notice({
      duration,
      style: {},
      content: <div className={`${prefixCls}-text`} role='alert' aria-live='assertive'>
        <div>{content}</div>
      </div>,
      closable: true,
      onClose() {
        if (onClose) {
          onClose()
        }
        notification.destroy()
        notification = null
        messageInstance = null
      }
    })
  })
}

export default {
  show(content, duration, onClose, mask) {
    return notice(content, 'info', duration, onClose, mask)
  },
  hide() {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  }
}
