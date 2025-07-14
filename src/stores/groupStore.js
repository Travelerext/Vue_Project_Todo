import { defineStore } from 'pinia'
import { GroupRepository } from '../repository/groupRepository.js'

export const useGroupStore = defineStore('group', {
  state: () => ({
    // 我的分组列表
    myGroups: [],
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 获取我的分组列表
    getMyGroups: (state) => state.myGroups,
    // 获取加载状态
    getLoading: (state) => state.loading,
    // 获取错误信息
    getError: (state) => state.error
  },

  actions: {
    /**
     * 获取我的分组
     */
    async fetchMyGroups() {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.getMyGroups()
        if (result.success) {
          this.myGroups = result.data
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
     * 创建分组
     * @param {Object} groupData - 分组数据
     */
    async createGroup(groupData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.createGroup(groupData)
        if (result.success) {
          // 创建成功后刷新分组列表
          await this.fetchMyGroups()
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
     * 更新分组名称
     * @param {Object} groupData - 分组数据
     */
    async updateGroup(groupData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.updateGroup(groupData)
        if (result.success) {
          // 更新成功后刷新分组列表
          await this.fetchMyGroups()
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
     * 删除分组
     * @param {number} groupId - 分组ID
     */
    async deleteGroup(groupId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.deleteGroup(groupId)
        if (result.success) {
          // 删除成功后刷新分组列表
          await this.fetchMyGroups()
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
     * 向分组添加待办事项
     * @param {Object} groupData - 分组数据
     */
    async addTodosToGroup(groupData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.addTodosToGroup(groupData)
        if (result.success) {
          // 添加成功后刷新分组列表
          await this.fetchMyGroups()
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
     * 从分组移除待办事项
     * @param {Object} groupData - 分组数据
     */
    async removeTodosFromGroup(groupData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await GroupRepository.removeTodosFromGroup(groupData)
        if (result.success) {
          // 移除成功后刷新分组列表
          await this.fetchMyGroups()
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
     * 根据ID获取分组
     * @param {number} groupId - 分组ID
     * @returns {Object|null} - 分组对象
     */
    getGroupById(groupId) {
      return this.myGroups.find(group => group.id === groupId) || null
    },

    /**
     * 清除错误信息
     */
    clearError() {
      this.error = null
    }
  }
}) 