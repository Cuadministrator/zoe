import { observable, action, computed, configure, runInAction } from 'mobx'

// storage
import storage from '../storage'

// components
import { Tip } from 'beeshell'

// api
import { getUsers } from '../service/user'

class Global {
  @observable user = null
  
  @observable sideMenuVisible = false

  @action
  changeUser (value) {
    this.user = value
  }

  @action
  changeSideMenuVisible (value) {
    this.sideMenuVisible = value
  }

  @action
  async login ({ account, password }) {
    // const usersRes = await storage.get('userList')
    const usersRes = await getUsers()
    if (usersRes && usersRes.data && usersRes.data.length > 0) {
      const user = usersRes.data.find(item => item.phone === account && item.password === password)
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
