import {
  removeById,
  addUser,
  updateUser,
  batchDelete,
  getUserById
} from '@/api/sysLoginLog'
import { addDept, getDeptTree, removeDeptById, updateDept } from '@/api/sysDept'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // 获取所有菜单
  getDepts({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDeptTree(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDeptById({ commit }, data) {
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
      removeDeptById(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addDept({ commit }, data) {
    return new Promise((resolve, reject) => {
      addDept(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDept({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateDept(data).then(res => {
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

