import {
  removeById,
  addUser,
  updateUser,
  batchDelete,
  getUserById,
  getLoginLogListPage
} from '@/api/sysLoginLog'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // 分页获取角色列表
  getList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getLoginLogListPage(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserById({ commit }, data) {
    return new Promise((resolve, reject) => {
      getUserById(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeById({ commit }, data) {
    return new Promise((resolve, reject) => {
      removeById(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      addUser(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateUser(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  batchDelete({ commit }, data) {
    return new Promise((resolve, reject) => {
      batchDelete(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

