import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取用户信息
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 用户注册

// 用户注销
