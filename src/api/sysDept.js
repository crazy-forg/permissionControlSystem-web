import request from '@/utils/request'

export function getDeptTree() {
  return request({
    url: `/admin/system/sysDept/getDeptTree`,
    method: 'get'
    // params: data
  })
}

export function getLoginLogListPage(data) {
  return request({
    url: `/admin/system/sysLoginLog/${data.page}/${data.limit}`,
    method: 'get'
    // params: data
  })
}

export function getUserById(data) {
  return request({
    url: `/admin/system/sysUser/getUser/${data.id}`,
    method: 'get',
    params: data
  })
}

export function addUser(data) {
  return request({
    url: '/admin/system/sysUser/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/system/sysUser/update',
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
    url: `/admin/system/sysUser/remove/${data.id}`,
    method: 'delete',
    data
  })
}

