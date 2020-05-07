import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

const HelpScreen = () => {
  return (
    <ScrollView
      style={styles.pageView}
    >
      <Text style={styles.bodyText}>使用步骤：</Text>
      <Text style={styles.contextText}>点击正下方添加按钮，添加任务项，选择任务优先级，重复方式，时间，填写任务名称。在右下方的切换按钮中选择喜欢的显示方式进行查看任务，并且按顺序完成，或者按时间完成，又或者按重要程度完成，任君选择。</Text>
      <Text style={styles.bodyText}>1.“使用任务清单，保持高效快感”</Text>
      <Text style={styles.contextText}>快速经过GTD的五个步骤：收集，理清，组织，执行，回顾。使用最快的时间，随时随地整理自己的代办事项，并对其进行排序整理，也许只需要15分钟的时间，但是可以保持高效，为一天争取五小时的空闲，留给自己去生活。</Text>
      <Text style={styles.bodyText}>2.“要事放在第一，摒弃所有压力”</Text>
      <Text style={styles.contextText}>在添加任务时选择任务优先级要慎重选择，将会直接产生任务在四象限中的摆放。在四象限中，要事是放在第一位执行的，仔细想想，急事是否也曾是要事，将要事尽快消化，压力也就顺其自然的减少了。减少再第三象限的忙碌，立即处理第一象限的任务，尽早处理第二象限的任务，合理分配时间，才是四象限的核心。
重要且紧急立即做，重要不紧急尽快做，不重要但紧急安排别人做，不重要也不紧急尽量不去做。</Text>
      <Text style={styles.bodyText}>3.“计时维持专注，培养工作节奏”</Text>
      <Text style={styles.contextText}>计时之前可以先给自己定义一个目标，这段时间完成什么，若感到疲惫可以换一个工作去执行，这也可以被称为“替换拖延”，在一段时间内执行多件事情，交替进行可以有效的缓解疲惫厌烦同一件事情带来的困扰，因此在计时期间，你可以同时做多件事情，在时间结束之后，细想自己完成了什么事情，选择已经完成的事项，即可展示在时间轴上。</Text>
    </ScrollView>
  )
}

export default HelpScreen

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 48,
    color: '#222'
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 32,
    color: '#222',
    marginTop: 10
  },
  contextText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#222'
  }
})