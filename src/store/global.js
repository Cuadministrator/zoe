import { observable, action, computed, configure, runInAction } from 'mobx'

// storage
import storage from '../storage'

// components
import { Tip } from 'beeshell'

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

  @action
  login = async ({
    account,
    password
  }) => {
    const usersRes = await storage.get('userList')
    if (usersRes && usersRes.length > 0) {
      const user = usersRes.find(item => item.phone === account && item.password === password)
      if (user) {
        runInAction(() => {
          this.user = user
        })
      } else {
        Tip.show('账户或密码有误，请重新输入!')
      }
    }
  }
}

export default Global
