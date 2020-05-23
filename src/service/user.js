import request from './index'

export const getUsers = () => request({
  url: 'users',
  method: 'GET'
})

export const addUser = (phone, name, password, pic) => request({
  url: 'users/add',
  method: 'POST',
  data: {
    users: {
      phone,
      name,
      password,
      pic
    }
  }
})

export const updateUser = (id, phone, name, password, resignDate, pic) => request({
  url: 'users/update',
  method: 'POST',
  data: {
    users: {
      id,
      phone,
      name,
      password,
      resignDate,
      pic
    }
  }
})