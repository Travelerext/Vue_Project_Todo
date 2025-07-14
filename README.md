# 待办事项管理系统 - 前端

这是一个基于 Vue 3 + Vite + Pinia 的待办事项管理系统前端项目。

## 功能特性

- 🔐 用户认证（登录/注册）
- ✅ 待办事项管理（增删改查）
- 📅 日程安排
- 📁 分组管理
- 👤 头像上传
- 📱 响应式设计

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 快速的前端构建工具
- **Pinia** - Vue 状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **Axios** - HTTP 客户端

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
├── repository/      # 数据访问层
│   ├── index.js     # API 配置
│   ├── authRepository.js    # 认证相关 API
│   ├── todoRepository.js    # 待办事项相关 API
│   ├── groupRepository.js   # 分组相关 API
│   └── avatarRepository.js  # 头像相关 API
├── stores/          # 状态管理
│   ├── index.js     # Store 导出
│   ├── authStore.js # 认证状态
│   ├── todoStore.js # 待办事项状态
│   ├── groupStore.js # 分组状态
│   └── avatarStore.js # 头像状态
├── views/           # 页面组件
│   ├── HomeView.vue     # 首页
│   ├── LoginView.vue    # 登录页
│   └── RegisterView.vue # 注册页
├── router/          # 路由配置
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## 安装和运行

### 安装依赖

```bash
npm install
# 或者
pnpm install
```

### 开发环境运行

```bash
npm run dev
# 或者
pnpm dev
```

### 构建生产版本

```bash
npm run build
# 或者
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或者
pnpm preview
```

## 环境要求

- Node.js 16.0 或更高版本
- 后端服务运行在 `http://localhost:8080`

## 使用说明

1. 启动后端服务
2. 运行前端开发服务器
3. 访问 `http://localhost:5173`
4. 注册新账户或使用现有账户登录
5. 开始管理您的待办事项

## 开发说明

### 状态管理

项目使用 Pinia 进行状态管理，包含以下 stores：

- `useAuthStore` - 用户认证状态
- `useTodoStore` - 待办事项状态
- `useGroupStore` - 分组状态
- `useAvatarStore` - 头像状态

### API 调用

所有 API 调用都通过 repository 层进行，支持：

- 自动 token 管理
- 请求/响应拦截
- 统一错误处理
- Token 自动刷新

### 路由守卫

- 需要认证的页面会自动检查登录状态
- 未登录用户会被重定向到登录页
- 已登录用户访问登录/注册页会被重定向到首页

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 