import { getPostListPage, removeById, addPost, updateUser, batchDelete, getPostById, updatePost } from '@/api/sysPost'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // 分页获取角色列表
  getList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getPostListPage(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPostById({ commit }, data) {
    return new Promise((resolve, reject) => {
      getPostById(data).then(response => {
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
  addPost({ commit }, data) {
    return new Promise((resolve, reject) => {
      addPost(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePost({ commit }, data) {
    return new Promise((resolve, reject) => {
      updatePost(data).then(res => {
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

