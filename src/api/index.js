// 动态注册api接口
import service from '@/utils/request'

export const get = (url, data) => {
  return service.get(url, { params: data })
}
export const post = (url, data) => {
  return service.post(url, { data })
}
export const put = (url, data) => {
  return service.put(url, { data })
}

const api = Object.create(null)
api.base = { get, post, put }

/**
 * 动态注册API接口
 * 调用方法： this.$api.{文件名}.{接口函数名称}
 * 
 */
const registerModule = (moduleName, datas) => {
  api[moduleName] = {}
  for (const [key, val] of Object.entries(datas)) {
    api[moduleName][key] = val
  }
}

const mod = require.context('./modules', true, /\.js$/)
// require.context详情： https://webpack.docschina.org/guides/dependency-management/#requirecontext

mod.keys().forEach(item => {
  const apiDefinitionData = mod(item)
  const apiMoudleName = item.replace(/^\.\//, '').replace(/\.\w+$/, '')
  apiDefinitionData && registerModule(apiMoudleName, apiDefinitionData)
})


export default api
