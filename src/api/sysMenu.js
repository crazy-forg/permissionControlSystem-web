import request from '@/utils/request'

export function getMenus(data) {
  return request({
    url: '/admin/system/sysMenu/findNodes',
    method: 'get',
    params: data
  })
}

export function addMenu(data) {
  return request({
    url: '/admin/system/sysMenu/save',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/admin/system/sysMenu/update',
    method: 'post',
    data
  })
}

export function removeById(id) {
  return request({
    url: `/admin/system/sysMenu/remove/${id}`,
    method: 'delete'
  })
}

