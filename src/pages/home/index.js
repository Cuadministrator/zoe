import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import storage from '../../storage'

// component
import List from './components/listItem'
import { ModalEdit } from '../../components'

// storage
import { editTask } from '../../storage/task'

const HomeScreen = ({navigation}) => {
  const safeArea = useSafeArea()
  const [data, setData] = useState([])
  const [modalType, setModalType] = useState('edit')
  const [modalData, setModalData] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const res = await storage.get('taskList')
    if (res && res.length > 0) {
      let result = []
      res.forEach(resItem => {
        if (resItem.status !== 3) {
          resItem = {
            ...resItem,
            label: resItem.name,
            finished: resItem.status === 2
          }
          result.push(resItem)
        }
      })
      setData(result)
    }
  }

  const _onItemEdit = (id, index) => {
    const taskItem = data.find(item => item.id === id)
    if (taskItem) {
      setModalData({...taskItem})
      openModal()
    }
  }

  const _onItemComplete = (id, index) => {
    const newData = [...data]
    if (newData[index]) {
      newData[index].finished = !newData[index].finished
      setData(newData)
    }
  }

  const openModal = () => setVisible(true)

  const closeModal = () => setVisible(false)

  return (
    <View
      style={{
        flex: 1,
        paddingTop: safeArea.top
      }}
    >
      <List
        data={data}
        style={{flex: 1}}
        onItemEdit={_onItemEdit}
        onItemComplete={_onItemComplete}
      />
      <View
        style={styles.footerView}
      >
      </View>
      {
        !(modalType === 'edit' && !modalData) && visible &&
        <ModalEdit
          editable={modalType === 'edit'}
          data={modalData}
          visible={visible}
          onClose={closeModal}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  footerView: {

  }
})

export default HomeScreen