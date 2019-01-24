import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://cangdu.org:8001',
  timeout: 5000,
})

// request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },

  err => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
  },
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
  },
)

export default service
