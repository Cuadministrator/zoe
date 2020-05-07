import storage from './index' // https://github.com/jasonmerino/react-native-simple-store/blob/master/docs/index.md
import dayjs from 'dayjs'
import { Tip } from 'beeshell'

const STORAGE_KEY = 'userList'

export const register = async ({
  name,
  phone,
  password,
  email
}) => {
  if (!(name && phone && password && email)) return false
  let res = await storage.get(STORAGE_KEY)
  if (res && res.length > 0) {
    const userItem = res.find(resItem => resItem.phone === phone)
    if (userItem) {
      Tip.show('已有该账户!')
      return false
    } else {
      res = [
        ...res,
        {
          id: res.length,
          name,
          phone,
          password,
          email,
          resignDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588018407177&di=be2dc0bac343d615225a174d91e3650b&imgtype=0&src=http%3A%2F%2Fis1.mzstatic.com%2Fimage%2Fthumb%2FPurple122%2Fv4%2Faf%2Fb4%2F25%2Fafb425c6-6dc9-e263-c588-6a07c9c3e791%2Fsource%2F512x512bb.png'
        }
      ]
      await storage.save(STORAGE_KEY, res)
      return true
    }
  }
  return false
}