import api from './index.js'

export class TodoRepository {
  /**
   * 获取今日待办事项
   * @param {number} current - 当前页码
   * @param {number} size - 每页大小
   * @returns {Promise} - 请求结果
   */
  static async getTodayTodos(current = 1, size = 20) {
    try {
      const response = await api.get('/api/todos/today', {
        params: { current, size }
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
   * 获取所有未完成的待办事项
   * @param {number} current - 当前页码
   * @param {number} size - 每页大小
   * @returns {Promise} - 请求结果
   */
  static async getUndoneTodos(current = 1, size = 20) {
    try {
      const response = await api.get('/api/todos/undone', {
        params: { current, size }
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
   * 获取过期的待办事项
   * @param {number} current - 当前页码
   * @param {number} size - 每页大小
   * @returns {Promise} - 请求结果
   */
  static async getOverdueTodos(current = 1, size = 20) {
    try {
      const response = await api.get('/api/todos/overdue', {
        params: { current, size }
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
   * 获取所有已完成的待办事项
   * @param {number} current - 当前页码
   * @param {number} size - 每页大小
   * @returns {Promise} - 请求结果
   */
  static async getDoneTodos(current = 1, size = 20) {
    try {
      const response = await api.get('/api/todos/done', {
        params: { current, size }
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
   * 获取待办事项的日程安排
   * @param {number} todoId - 待办事项ID
   * @returns {Promise} - 请求结果
   */
  static async getScheduleByTodo(todoId) {
    try {
      const response = await api.get('/api/todos/schedule', {
        params: { todoId }
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
   * 创建待办事项
   * @param {Object} todoData - 待办事项数据
   * @param {string} todoData.content - 内容
   * @param {string} todoData.deadline - 截止时间
   * @param {string} todoData.frequency - 频率
   * @param {Array<number>} todoData.customDayOfWeek - 自定义星期几
   * @returns {Promise} - 请求结果
   */
  static async createTodo(todoData) {
    try {
      const response = await api.post('/api/todos/create', todoData)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 编辑待办事项
   * @param {number} todoId - 待办事项ID
   * @param {Object} todoData - 待办事项数据
   * @param {string} todoData.content - 内容
   * @param {string} todoData.deadline - 截止时间
   * @param {string} todoData.frequency - 频率
   * @param {Array<number>} todoData.customDayOfWeek - 自定义星期几
   * @returns {Promise} - 请求结果
   */
  static async editTodo(todoId, todoData) {
    try {
      const response = await api.put('/api/todos/edit', todoData, {
        params: { todoId }
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
   * 标记待办事项为完成
   * @param {number} todoId - 待办事项ID
   * @returns {Promise} - 请求结果
   */
  static async markDoneTodo(todoId) {
    try {
      const response = await api.put('/api/todos/mark_done', null, {
        params: { todoId }
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
   * 删除待办事项
   * @param {number} todoId - 待办事项ID
   * @returns {Promise} - 请求结果
   */
  static async deleteTodo(todoId) {
    try {
      const response = await api.delete(`/api/todos/${todoId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message 
      }
    }
  }

  /**
   * 取消日程安排
   * @param {number} scheduleId - 日程ID
   * @returns {Promise} - 请求结果
   */
  static async cancelSchedule(scheduleId) {
    try {
      const response = await api.put('/api/todos/cancel_schedule', null, {
        params: { scheduleId }
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