import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export class AuthRepository {
  /**
   * 发送验证码
   * @param {string} email - 邮箱地址
   * @returns {Promise} - 请求结果
   */
  static async sendVerificationCode(email) {
    try {
      const response = await authApi.post('/auth/send-code', null, {
        params: { email }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 用户注册
   * @param {Object} userData - 用户数据
   * @param {string} userData.email - 邮箱
   * @param {string} userData.userName - 用户名
   * @param {string} userData.password - 密码
   * @param {string} userData.inputCode - 验证码
   * @returns {Promise} - 注册结果
   */
  static async register(userData) {
    try {
      const response = await authApi.post('/auth/register', userData)
      const { accessToken, refreshToken } = response.data
      
      // 保存token到本地存储
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 用户登录
   * @param {Object} credentials - 登录凭据
   * @param {string} credentials.email - 邮箱
   * @param {string} credentials.password - 密码
   * @returns {Promise} - 登录结果
   */
  static async login(credentials) {
    try {
      const response = await authApi.post('/auth/login', credentials)
      const { accessToken, refreshToken } = response.data
      
      // 保存token到本地存储
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 刷新token
   * @param {string} refreshToken - 刷新token
   * @returns {Promise} - 刷新结果
   */
  static async refreshToken(refreshToken) {
    try {
      const response = await authApi.post('/auth/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data
      
      // 更新本地存储的token
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 登出
   */
  static logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  /**
   * 检查是否已登录
   * @returns {boolean} - 是否已登录
   */
  static isLoggedIn() {
    return !!localStorage.getItem('accessToken')
  }
} 