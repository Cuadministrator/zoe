import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { inject, observer } from 'mobx-react'
import storage from '../../storage'

// component
import List from './components/listItem'
import { ModalEdit, Icon } from '../../components'

// storage
import { getTaskList, editTask, completeTask, deleteTask, addTask } from '../../storage/task'

const HomeScreen = ({globalStore}) => {
  const safeArea = useSafeArea()
  // 列表数据
  const [data, setData] = useState([])
  // 弹窗类型 添加或者编辑
  const [modalType, setModalType] = useState('edit')
  // 编辑弹窗的数据
  const [editTaskId, setEditTaskId] = useState(null)
  // 是否显示弹窗
  const [visible, setVisible] = useState(false)

  useEffect(() => { initData() }, [])

  const initData = async () => {
    let params = {}
    if (globalStore.user && globalStore.user.id) {
      params.userId = globalStore.user.id
    }
    const res = await getTaskList(params)
    if (res && res.length > 0) {
      let result = []
      res.forEach(resItem => {
        resItem = {
          ...resItem,
          label: resItem.name,
          finished: resItem.status === 2
        }
        result.push(resItem)
      })
      setData(result)
    }
  }

  // 显示修改弹窗
  const _onItemEdit = (id, index) => {
    setModalType('edit')
    setEditTaskId(id)
    openModal()
  }

  // 显示添加弹框
  const openAddModal = () => {
    setModalType('add')
    openModal()
  }

  // 删除回调函数
  const _onItemDelete = async (id, index) => {
    const res = await deleteTask({id})
    res && initData()
  }

  // 完成回调函数
  const _onItemComplete = async (id, index) => {
    const res = await completeTask({id})
    res && initData()
  }

  // 排序回调函数
  const _onDataChange = async nextData => {
    // if (nextData.length !== data.length) {}
    await storage.set('taskList', nextData)
    await initData()
  }

  // 修改回调函数
  const _onModalEdit = async (params) => {
    const res = await editTask(params)
    if (res) {
      await initData()
    }
  }

  // 添加回调函数
  const _onModalAdd = async (params) => {
    if (globalStore.user) {
      params.userId = globalStore.user.id
    }
    const res = await addTask(params)
    if (res) {
      await initData()
    }
  }
  // 显示弹窗
  const openModal = () => setVisible(true)
  // 关闭弹窗
  const closeModal = () => setVisible(false)

  const editTaskData = data.find(item => item.id === editTaskId)

  return (
    <View
      style={{
        flex: 1,
        paddingTop: safeArea.top
      }}
    >
      {
        data && data.length > 0 &&
        <List
          data={data}
          style={{flex: 1}}
          onDataChange={_onDataChange}
          onItemEdit={_onItemEdit}
          onItemDelete={_onItemDelete}
          onItemComplete={_onItemComplete}
        />
      }
      <View
        style={styles.footerView}
      >
        {/* 添加按钮 */}
        <TouchableOpacity
          style={styles.stackNavigatorBottom}
          onPress={openAddModal}
        >
          <Icon
            name='plus-circle'
            color='#F6BB42'
            size={56}
            style={{backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden'}}
          />
        </TouchableOpacity>
      </View>
      {
        // 弹窗
        !(modalType === 'edit' && !editTask) && visible &&
        <ModalEdit
          editable={modalType === 'edit'}
          defaultData={editTaskData}
          visible={visible}
          onModalEdit={_onModalEdit}
          onModalAdd={_onModalAdd}
          onClose={closeModal}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  footerView: {
    position: 'absolute',
    height: 28,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  stackNavigatorBottom: {
    position: 'absolute',
    left: '50%',
    top: -28,
    transform: [{translateX: -28}],
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
  }
})

export default inject('globalStore')(observer(HomeScreen))
