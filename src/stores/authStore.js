import { defineStore } from 'pinia'
import { AuthRepository } from '../repository/authRepository.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 用户信息
    user: null,
    // 登录状态
    isLoggedIn: false,
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 获取用户信息
    getUser: (state) => state.user,
    // 获取登录状态
    getLoginStatus: (state) => state.isLoggedIn,
    // 获取加载状态
    getLoading: (state) => state.loading,
    // 获取错误信息
    getError: (state) => state.error
  },

  actions: {
    /**
     * 发送验证码
     * @param {string} email - 邮箱地址
     */
    async sendVerificationCode(email) {
      this.loading = true
      this.error = null
      
      try {
        const result = await AuthRepository.sendVerificationCode(email)
        if (result.success) {
          return { success: true }
        } else {
          this.error = result.error
          return { success: false, error: result.error }
        }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户注册
     * @param {Object} userData - 用户数据
     */
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await AuthRepository.register(userData)
        if (result.success) {
          this.user = result.data.user
          this.isLoggedIn = true
          return { success: true, data: result.data }
        } else {
          this.error = result.error
          return { success: false, error: result.error }
        }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户登录
     * @param {Object} credentials - 登录凭据
     */
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const result = await AuthRepository.login(credentials)
        if (result.success) {
          this.user = result.data.user
          this.isLoggedIn = true
          return { success: true, data: result.data }
        } else {
          this.error = result.error
          return { success: false, error: result.error }
        }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    /**
     * 用户登出
     */
    logout() {
      AuthRepository.logout()
      this.user = null
      this.isLoggedIn = false
      this.error = null
    },

    /**
     * 检查登录状态
     */
    checkAuthStatus() {
      this.isLoggedIn = AuthRepository.isLoggedIn()
      return this.isLoggedIn
    },

    /**
     * 清除错误信息
     */
    clearError() {
      this.error = null
    }
  }
}) 