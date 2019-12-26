import React from 'react'
import { View } from 'react-native'

// component
import Step from './step'

class Steps extends React.Component {
  onChange = () => {
    const { onChange } = this.props
    if (onChange && typeof onChange === 'function') {
      onChange()
    }
  }
  render () {
    const { data, style, current, direction, size, children } = this.props
    const childrenCount = children && React.Children.count(children)
    if (children && childrenCount > 0) {
      return (
        <View style={[style, direction === 'vertical' && { flexDirection: 'row' }]}>
          {
            React.Children.map(children, (childrenItem, i) => {
              const isFirst = i === 0
              const isLast = childrenCount === i + 1
              let props = { isFirst, isLast, direction, size }
              if (current) {
                if (current > i) {
                  props = {
                    status: 'done',
                    ...props
                  }
                } else if (current === i) {
                  props = {
                    status: 'doing',
                    ...props
                  }
                } else {
                  props = {
                    status: 'todo',
                    ...props
                  }
                }
              }
              return React.cloneElement(childrenItem, {
                ...props,
                ...childrenItem.props
              })
            })
          }
        </View>
      )
    } else if (data && data.length > 0) {
      return (
        <View style={[style, direction === 'vertical' && { flexDirection: 'row' }]}>
          {
            data.map((item, i) => {
              let props = {
                size,
                direction,
                isFirst: i === 0,
                isLast: data.length === i + 1,
                ...item
              }
              if (current) {
                if (current && current > i) {
                  props = {
                    status: 'done',
                    ...props
                  }
                } else if (current === i) {
                  props = {
                    status: 'doing',
                    ...props
                  }
                } else {
                  props = {
                    status: 'todo',
                    ...props
                  }
                }
              }
              return (
                <Step key={`step_${i}`} {...props} />
              )
            })
          }
        </View>
      )
    } else {
      return null
    }
  }
}

Steps.Step = Step

export default Steps
