import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理token过期
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      // token过期，尝试刷新
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8080/auth/refresh', {
            refreshToken: refreshToken
          })
          const { accessToken, refreshToken: newRefreshToken } = response.data
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', newRefreshToken)
          
          // 重试原请求
          error.config.headers.Authorization = `Bearer ${accessToken}`
          return api.request(error.config)
        } catch (refreshError) {
          // 刷新失败，清除token并跳转到登录页
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
        }
      } else {
        // 没有refreshToken，跳转到登录页
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api 