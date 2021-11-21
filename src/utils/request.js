import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求基地址
  // withCredentials: true, // 请求是否携带cookie
  timeout: 5000 // 请求超时设定
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 根据项目而定
    getToken() && (config.headers['Authorization'] = `Bearer ${getToken()}`)
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 统一处理响应数据，返回成功的响应数据，提示错误信息
    // 这里使用success判定请求是否成功，还有可能是使用后端返回的一个状态码判断响应的是哪种数据
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error('请求数据失败!')) // 终止.then继续执行
    }
  },
  error => {
    if (error.request.status === 401) {
      Message({
        message: '登录已过期，请重新登录！',
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/logout')
      router.push(`/login?redirect=${window.location.href.split('#')[1]}`)
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 统一请求错误处理
// function _fetch (config) {
//   return new Promise((resolve, reject) => {
//     service(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   })
// }

// export default _fetch

export default service
