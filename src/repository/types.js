/**
 * API响应结果类型
 */
export class ApiResponse {
  /**
   * @param {boolean} success - 请求是否成功
   * @param {any} data - 响应数据
   * @param {string} error - 错误信息
   */
  constructor(success, data = null, error = null) {
    this.success = success
    this.data = data
    this.error = error
  }
}

/**
 * 分页响应类型
 */
export class PageResponse {
  /**
   * @param {number} current - 当前页码
   * @param {number} size - 每页大小
   * @param {number} total - 总记录数
   * @param {Array} records - 当前页记录
   */
  constructor(current, size, total, records = []) {
    this.current = current
    this.size = size
    this.total = total
    this.records = records
  }
}

/**
 * 待办事项类型
 */
export class Todo {
  /**
   * @param {number} id - 待办事项ID
   * @param {string} content - 内容
   * @param {string} deadline - 截止时间
   * @param {string} frequency - 频率
   * @param {Array<number>} customDayOfWeek - 自定义星期几
   * @param {string} groupName - 分组名称
   */
  constructor(id, content, deadline, frequency, customDayOfWeek, groupName) {
    this.id = id
    this.content = content
    this.deadline = deadline
    this.frequency = frequency
    this.customDayOfWeek = customDayOfWeek
    this.groupName = groupName
  }
}

/**
 * 分组类型
 */
export class Group {
  /**
   * @param {number} id - 分组ID
   * @param {string} groupName - 分组名称
   * @param {number} userId - 用户ID
   */
  constructor(id, groupName, userId) {
    this.id = id
    this.groupName = groupName
    this.userId = userId
  }
}

/**
 * 用户类型
 */
export class User {
  /**
   * @param {number} id - 用户ID
   * @param {string} email - 邮箱
   * @param {string} userName - 用户名
   * @param {number} avatarId - 头像ID
   */
  constructor(id, email, userName, avatarId) {
    this.id = id
    this.email = email
    this.userName = userName
    this.avatarId = avatarId
  }
}

/**
 * 认证响应类型
 */
export class AuthResponse {
  /**
   * @param {string} accessToken - 访问令牌
   * @param {string} refreshToken - 刷新令牌
   */
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}

/**
 * 频率枚举
 */
export const Frequency = {
  ONCE: 'ONCE',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  CUSTOM: 'CUSTOM'
}

/**
 * 星期枚举
 */
export const DayOfWeek = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
} 