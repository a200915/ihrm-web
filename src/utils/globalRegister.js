// 全局注册文件

import api from '@/api/index'

export default {
  install (Vue) {
    Vue.prototype.$api = api
  }
}
