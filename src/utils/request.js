import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
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
    if (store.getters.token) {
      // 根据项目而定
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
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
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
