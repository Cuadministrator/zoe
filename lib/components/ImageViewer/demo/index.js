import React from 'react'
import {ScrollView, View, Button} from 'react-native'
import { helperPageHOC } from '../../../../src/utils/hoc'
import Modal from '../../Modal'
import ImageViewer from '../index'

const imageUrls = [
  {
    url: 'https://avatars2.githubusercontent.com/u/7970947',
  },
  {
    url: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
  },
]

class Test extends React.Component {
  state = {
    visible: false
  }
  showModal1 = () => {
    this.setState({
      visible: true
    })
  }
  hideModal1 = () => {
    this.setState({
      visible: false
    })
  }
  render () {
    const {visible} = this.state
    return (
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <Button title='测试1' onPress={this.showModal1} />
        <Modal
          visible={visible}
          onRequestClose={this.hideModal1}
        >
          <View style={{height: '100%', width: '100%'}}>
            {
              !!visible && <ImageViewer
                index={0}
                imageUrls={imageUrls}
                onClick={() => this.setState({visible: false})}
              />
            }
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

export default helperPageHOC(Test)
