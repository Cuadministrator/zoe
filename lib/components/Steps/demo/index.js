import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
// component
import Steps from '../index'
// utils
import Utils from '../../../utils'
const { funcsUtils: { rem } } = Utils

const { Step } = Steps
class Test extends React.Component {
  render () {
    return (
      <ScrollView style={{ flex: 1, height: '100%', backgroundColor: '#fff', paddingHorizontal: rem(14) }}>
        <Text style={styles.titleText}>横向步骤器</Text>
        <Steps direction='vertical' current={1}>
          {
            [0, 1, 2].map((item, i) => <Step key={`step_${i}`} header='添加新的header' title='在官网"运单资料"' description='2019-04-16' />)
          }
          <Step key={`step_${3}`} size='small' header='添加新的header' title='在官网"运单资料"' description='2019-04-16' />
        </Steps>
        <Text style={styles.titleText}>竖向步骤器</Text>
        <Text style={styles.secondaryTitleText}>size: default</Text>
        <Steps
          current={1}
          data={[
            {
              header: '添加新的header',
              title: '在官网"运单资料"',
              size: 'small',
              description: '2019-04-16'
            },
            {
              header: '添加新的header',
              title: '在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息',
              description: '2019-04-16'
            },
            {
              header: '添加新的header',
              title: '在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息',
              size: 'small',
              description: '2019-04-16'
            }
          ]} />
        <Text style={styles.secondaryTitleText}>size: small</Text>
        <Steps size='small' current={3}>
          {
            [0, 1, 2].map((item, i) => <Step key={`step_${i}`} header='04-16 09:46:21' title='在官网"运单资料&签收图",可查看签收人信息在官网' description='2019-04-16 09:46:21 星期二' />)
          }
          <Step key={`step_11`} size='middle' header='04-16 09:46:21' title='在官网"运单资料&签收图",可查看签收人信息在官网' description='2019-04-16 09:46:21 星期二' />
          {
            [0, 1, 2].map((item, i) => <Step key={`step_${i}`} header='04-16 09:46:21' title='在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息' description='2019-04-16 09:46:21 星期二' />)
          }
          {
            [0, 1, 2].map((item, i) => <Step key={`step_${i}`} header='04-16 09:46:21' title='在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息在官网"运单资料&签收图",可查看签收人信息' description='2019-04-16 09:46:21 星期二' />)
          }
        </Steps>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    marginVertical: rem(14),
    fontSize: rem(18),
    color: '#333'
  },
  secondaryTitleText: {
    marginVertical: rem(14),
    fontSize: rem(14),
    color: '#333'
  },
})

export default helperPageHOC(Test)
