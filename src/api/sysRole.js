import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/admin/system/index/login',
//     method: 'post',
//     data
//   })
// }

export function getRoleListPage(data) {
  return request({
    url: '/admin/system/sysRole/selectPage',
    method: 'get',
    params: data
  })
}

export function addRole(data) {
  return request({
    url: '/admin/system/sysRole/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/system/sysRole/updateRole',
    method: 'post',
    data
  })
}

export function batchDelete(data) {
  return request({
    url: '/admin/system/sysRole/batchDelete',
    method: 'post',
    data
  })
}

export function removeById(data) {
  return request({
    url: `/admin/system/sysRole/remove/${data.id}`,
    method: 'delete',
    data
  })
}

