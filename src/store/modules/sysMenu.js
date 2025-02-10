import { removeById, getMenus, addMenu, updateMenu } from '@/api/sysMenu'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // 获取菜单
  getMenus({ commit }, data) {
    return new Promise((resolve, reject) => {
      getMenus(data).then(response => {
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
  addMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      addMenu(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateMenu({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateMenu(data).then(res => {
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

