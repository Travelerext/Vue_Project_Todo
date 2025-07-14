import { defineStore } from 'pinia'
import { AvatarRepository } from '../repository/avatarRepository.js'

export const useAvatarStore = defineStore('avatar', {
  state: () => ({
    // 头像URL
    avatarUrl: null,
    // 头像信息
    avatarInfo: null,
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 获取头像URL
    getAvatarUrl: (state) => state.avatarUrl,
    // 获取头像信息
    getAvatarInfo: (state) => state.avatarInfo,
    // 获取加载状态
    getLoading: (state) => state.loading,
    // 获取错误信息
    getError: (state) => state.error
  },

  actions: {
    /**
     * 上传头像
     * @param {File} file - 头像文件
     */
    async uploadAvatar(file) {
      this.loading = true
      this.error = null
      
      try {
        const result = await AvatarRepository.uploadAvatar(file)
        if (result.success) {
          this.avatarInfo = result.data
          // 上传成功后获取新的头像URL
          await this.fetchAvatarUrl()
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
     * 获取头像URL
     */
    async fetchAvatarUrl() {
      this.loading = true
      this.error = null
      
      try {
        const avatarUrl = await AvatarRepository.getAvatarUrl()
        if (avatarUrl) {
          this.avatarUrl = avatarUrl
          return { success: true, data: avatarUrl }
        } else {
          this.error = '获取头像失败'
          return { success: false, error: '获取头像失败' }
        }
      } catch (error) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取头像信息
     */
    async fetchAvatarInfo() {
      this.loading = true
      this.error = null
      
      try {
        const result = await AvatarRepository.getMyAvatar()
        if (result.success) {
          this.avatarInfo = result.data
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
     * 初始化头像
     */
    async initAvatar() {
      await Promise.all([
        this.fetchAvatarUrl(),
        this.fetchAvatarInfo()
      ])
    },

    /**
     * 清除头像
     */
    clearAvatar() {
      this.avatarUrl = null
      this.avatarInfo = null
      this.error = null
    },

    /**
     * 清除错误信息
     */
    clearError() {
      this.error = null
    }
  }
}) 