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
