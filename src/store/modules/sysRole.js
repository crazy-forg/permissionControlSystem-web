import { getRoleListPage, removeById, addRole, updateRole, batchDelete } from '@/api/sysRole'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // 分页获取角色列表
  getList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getRoleListPage(data).then(response => {
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
  addRole({ commit }, data) {
    return new Promise((resolve, reject) => {
      addRole(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRole({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateRole(data).then(res => {
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

