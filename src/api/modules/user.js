import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}

// 用户注册

// 用户注销

// 获取用户基本资料
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
