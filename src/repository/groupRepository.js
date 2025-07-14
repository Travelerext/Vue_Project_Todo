import api from './index.js'

export class GroupRepository {
  /**
   * 获取我的分组
   * @returns {Promise} - 请求结果
   */
  static async getMyGroups() {
    try {
      const response = await api.get('/api/groups/my_group')
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 创建分组
   * @param {Object} groupData - 分组数据
   * @param {string} groupData.groupName - 分组名称
   * @param {Array<number>} groupData.todoIds - 待办事项ID列表
   * @returns {Promise} - 请求结果
   */
  static async createGroup(groupData) {
    try {
      const response = await api.post('/api/groups/create', groupData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 更新分组名称
   * @param {Object} groupData - 分组数据
   * @param {number} groupData.groupId - 分组ID
   * @param {string} groupData.groupName - 新的分组名称
   * @returns {Promise} - 请求结果
   */
  static async updateGroup(groupData) {
    try {
      const response = await api.put('/api/groups/edit_group', groupData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 删除分组
   * @param {number} groupId - 分组ID
   * @returns {Promise} - 请求结果
   */
  static async deleteGroup(groupId) {
    try {
      const response = await api.delete(`/api/groups/${groupId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 向分组添加待办事项
   * @param {Object} groupData - 分组数据
   * @param {number} groupData.groupId - 分组ID
   * @param {Array<number>} groupData.todoIds - 待办事项ID列表
   * @returns {Promise} - 请求结果
   */
  static async addTodosToGroup(groupData) {
    try {
      const response = await api.put('/api/groups/add_todos', groupData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 从分组移除待办事项
   * @param {Object} groupData - 分组数据
   * @param {number} groupData.groupId - 分组ID
   * @param {Array<number>} groupData.todoIds - 待办事项ID列表
   * @returns {Promise} - 请求结果
   */
  static async removeTodosFromGroup(groupData) {
    try {
      const response = await api.delete('/api/groups/remove_todos', {
        data: groupData
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }
} 