import { observable, action, computed, configure, runInAction } from 'mobx'

// 不允许在动作外部修改状态
configure({
  enforceActions: true
})

class Global {
  @observable user = null

  @action
  changeUser (value) {
    if (value) {
      user = value
    }
  }
}

export default Global
