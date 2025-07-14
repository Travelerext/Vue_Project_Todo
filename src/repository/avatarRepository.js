import api from './index.js'

export class AvatarRepository {
  /**
   * 上传头像
   * @param {File} file - 头像文件
   * @returns {Promise} - 请求结果
   */
  static async uploadAvatar(file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await api.post('/avatar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
   * 获取我的头像
   * @returns {Promise} - 请求结果
   */
  static async getMyAvatar() {
    try {
      const response = await api.get('/avatar/myAvatar', {
        responseType: 'blob'
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
   * 获取头像URL（返回blob URL）
   * @returns {Promise<string>} - 头像blob URL
   */
  static async getAvatarUrl() {
    try {
      const response = await api.get('/avatar/myAvatar', {
        responseType: 'blob'
      })
      return URL.createObjectURL(response.data)
    } catch (error) {
      console.error('获取头像失败:', error)
      return null
    }
  }
} 