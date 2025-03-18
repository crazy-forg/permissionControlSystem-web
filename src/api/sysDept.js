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

export function addDept(data) {
  return request({
    url: '/admin/system/sysDept/save',
    method: 'post',
    data
  })
}

export function updateDept(data) {
  return request({
    url: '/admin/system/sysDept/update',
    method: 'put',
    data
  })
}

export function removeDeptById(id) {
  return request({
    url: `/admin/system/sysDept/remove/${id}`,
    method: 'delete'
  })
}

