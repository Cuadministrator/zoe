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
  const [data, setData] = useState([])
  const [modalType, setModalType] = useState('edit')
  const [editTaskId, setEditTaskId] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    initData()
  }, [])

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

  const _onItemEdit = (id, index) => {
    setModalType('edit')
    setEditTaskId(id)
    openModal()
  }

  const _onItemDelete = async (id, index) => {
    const res = await deleteTask({id})
    res && initData()
  }

  const _onItemComplete = async (id, index) => {
    const res = await completeTask({id})
    res && initData()
  }

  const _onDataChange = async nextData => {
    // if (nextData.length !== data.length) {}
    await storage.set('taskList', nextData)
    await initData()
  }

  const _onModalEdit = async (params) => {
    const res = await editTask(params)
    if (res) {
      await initData()
    }
  }

  const _onModalAdd = async (params) => {
    if (globalStore.user) {
      params.userId = globalStore.user.id
    }
    const res = await addTask(params)
    if (res) {
      await initData()
    }
  }

  const openAddModal = () => {
    setModalType('add')
    openModal()
  }

  const openModal = () => setVisible(true)

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
