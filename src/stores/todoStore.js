import { defineStore } from 'pinia'
import { TodoRepository } from '../repository/todoRepository.js'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    // 今日待办事项
    todayTodos: [],
    // 未完成待办事项
    undoneTodos: [],
    // 过期待办事项
    overdueTodos: [],
    // 已完成待办事项
    doneTodos: [],
    // 分页信息
    pagination: {
      current: 1,
      size: 20,
      total: 0
    },
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 获取今日待办事项
    getTodayTodos: (state) => state.todayTodos,
    // 获取未完成待办事项
    getUndoneTodos: (state) => state.undoneTodos,
    // 获取过期待办事项
    getOverdueTodos: (state) => state.overdueTodos,
    // 获取已完成待办事项
    getDoneTodos: (state) => state.doneTodos,
    // 获取分页信息
    getPagination: (state) => state.pagination,
    // 获取加载状态
    getLoading: (state) => state.loading,
    // 获取错误信息
    getError: (state) => state.error
  },

  actions: {
    /**
     * 获取今日待办事项
     * @param {number} current - 当前页码
     * @param {number} size - 每页大小
     */
    async fetchTodayTodos(current = 1, size = 20) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.getTodayTodos(current, size)
        if (result.success) {
          this.todayTodos = result.data.records
          this.pagination = {
            current: result.data.current,
            size: result.data.size,
            total: result.data.total
          }
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
     * 获取未完成待办事项
     * @param {number} current - 当前页码
     * @param {number} size - 每页大小
     */
    async fetchUndoneTodos(current = 1, size = 20) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.getUndoneTodos(current, size)
        if (result.success) {
          this.undoneTodos = result.data.records
          this.pagination = {
            current: result.data.current,
            size: result.data.size,
            total: result.data.total
          }
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
     * 获取过期待办事项
     * @param {number} current - 当前页码
     * @param {number} size - 每页大小
     */
    async fetchOverdueTodos(current = 1, size = 20) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.getOverdueTodos(current, size)
        if (result.success) {
          this.overdueTodos = result.data.records
          this.pagination = {
            current: result.data.current,
            size: result.data.size,
            total: result.data.total
          }
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
     * 获取已完成待办事项
     * @param {number} current - 当前页码
     * @param {number} size - 每页大小
     */
    async fetchDoneTodos(current = 1, size = 20) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.getDoneTodos(current, size)
        if (result.success) {
          this.doneTodos = result.data.records
          this.pagination = {
            current: result.data.current,
            size: result.data.size,
            total: result.data.total
          }
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
     * 创建待办事项
     * @param {Object} todoData - 待办事项数据
     */
    async createTodo(todoData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.createTodo(todoData)
        if (result.success) {
          // 创建成功后刷新今日待办事项
          await this.fetchTodayTodos()
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
     * 编辑待办事项
     * @param {number} todoId - 待办事项ID
     * @param {Object} todoData - 待办事项数据
     */
    async editTodo(todoId, todoData) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.editTodo(todoId, todoData)
        if (result.success) {
          // 编辑成功后刷新所有列表
          await Promise.all([
            this.fetchTodayTodos(),
            this.fetchUndoneTodos(),
            this.fetchOverdueTodos(),
            this.fetchDoneTodos()
          ])
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
     * 标记待办事项为完成
     * @param {number} todoId - 待办事项ID
     */
    async markDoneTodo(todoId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.markDoneTodo(todoId)
        if (result.success) {
          // 标记完成后刷新所有列表
          await Promise.all([
            this.fetchTodayTodos(),
            this.fetchUndoneTodos(),
            this.fetchOverdueTodos(),
            this.fetchDoneTodos()
          ])
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
     * 删除待办事项
     * @param {number} todoId - 待办事项ID
     */
    async deleteTodo(todoId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.deleteTodo(todoId)
        if (result.success) {
          // 删除成功后刷新所有列表
          await Promise.all([
            this.fetchTodayTodos(),
            this.fetchUndoneTodos(),
            this.fetchOverdueTodos(),
            this.fetchDoneTodos()
          ])
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
     * 取消日程安排
     * @param {number} scheduleId - 日程ID
     */
    async cancelSchedule(scheduleId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await TodoRepository.cancelSchedule(scheduleId)
        if (result.success) {
          // 取消日程后刷新所有列表
          await Promise.all([
            this.fetchTodayTodos(),
            this.fetchUndoneTodos(),
            this.fetchOverdueTodos(),
            this.fetchDoneTodos()
          ])
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
     * 清除错误信息
     */
    clearError() {
      this.error = null
    }
  }
}) 