import request from '@/utils/request'

export function getPostListPage(data) {
  return request({
    url: '/admin/system/sysPost/selectPage',
    method: 'get',
    params: data
  })
}

export function getPostById(data) {
  return request({
    url: `/admin/system/sysPost/getPost/${data.id}`,
    method: 'get',
    params: data
  })
}

export function addPost(data) {
  return request({
    url: '/admin/system/sysPost/addPost',
    method: 'post',
    data
  })
}

export function updatePost(data) {
  return request({
    url: '/admin/system/sysPost/update',
    method: 'post',
    data
  })
}

export function batchDelete(data) {
  return request({
    url: '/admin/system/sysUser/batchDelete',
    method: 'post',
    data
  })
}

export function removeById(data) {
  return request({
    url: `/admin/system/sysPost/remove/${data.id}`,
    method: 'delete',
    data
  })
}

