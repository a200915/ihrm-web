// 动态注册api接口
import service from '@/utils/request'
const get = (url, data) => {
  return service.get(url, { params: data })
}
const post = (url, data) => {
  return service.post(url, { data })
}
const put = (url, data) => {
  return service.put(url, { data })
}

const api = Object.create(null)
api.base = { get, post, put }

// const allApi = require.context('./modules', true, /\.js$/)
// console.log(allApi.keys())

export default api
