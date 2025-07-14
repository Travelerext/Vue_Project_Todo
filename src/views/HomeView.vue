<template>
  <div class="home-container">
    <el-card class="home-card">
      <div class="home-header">
        <h1>欢迎使用待办事项管理系统</h1>
        <p>您已成功登录</p>
        <el-button
          type="danger"
          size="large"
          @click="handleLogout"
          class="logout-btn"
        >
          登出
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  ElMessage.success('已成功登出')
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.home-card {
  max-width: 500px;
}

.home-card :deep(.el-card__body) {
  padding: 40px;
}

.home-header {
  text-align: center;
}

.home-header h1 {
  color: #333;
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 600;
}

.home-header p {
  color: #666;
  font-size: 18px;
  margin-bottom: 30px;
}

.logout-btn {
  min-width: 120px;
}
</style> 