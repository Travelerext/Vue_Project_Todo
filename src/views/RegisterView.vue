<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="register-header">
        <h1>注册</h1>
        <p>创建您的待办事项管理账户</p>
      </div>
      
      <el-form
        ref="registerFormRef"
        :model="form"
        :rules="rules"
        @submit.prevent="handleRegister"
        class="register-form"
      >
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            type="email"
            placeholder="请输入邮箱"
            :disabled="loading"
            size="large"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="userName">
          <el-input
            v-model="form.userName"
            type="text"
            placeholder="请输入用户名"
            :disabled="loading"
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :disabled="loading"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            :disabled="loading"
            size="large"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="inputCode">
          <div class="verification-input">
            <el-input
              v-model="form.inputCode"
              type="text"
              placeholder="请输入验证码"
              :disabled="loading"
              size="large"
              prefix-icon="Key"
              maxlength="6"
            />
            <el-button
              type="primary"
              :disabled="loading || codeSent || countdown > 0"
              @click="sendVerificationCode"
              class="send-code-btn"
            >
              <span v-if="countdown > 0">{{ countdown }}s</span>
              <span v-else-if="codeSent">已发送</span>
              <span v-else>发送验证码</span>
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleRegister"
            class="register-btn"
          >
            {{ loading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="register-footer">
        <p>已有账号？ <router-link to="/login" class="link">立即登录</router-link></p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const codeSent = ref(false)
const countdown = ref(0)
const registerFormRef = ref()

const form = reactive({
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
  inputCode: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在2到20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  inputCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
  ]
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const sendVerificationCode = async () => {
  if (!form.email) {
    ElMessage.warning('请先输入邮箱')
    return
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    ElMessage.warning('请输入有效的邮箱地址')
    return
  }
  
  try {
    const result = await authStore.sendVerificationCode(form.email)
    if (result.success) {
      codeSent.value = true
      ElMessage.success('验证码已发送到您的邮箱')
      startCountdown()
    } else {
      ElMessage.error(result.error || '发送验证码失败')
    }
  } catch (err) {
    ElMessage.error('发送验证码失败，请稍后重试')
  }
}

const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  try {
    await registerFormRef.value.validate()
  } catch (error) {
    return
  }
  
  loading.value = true
  
  try {
    const result = await authStore.register({
      email: form.email,
      userName: form.userName,
      password: form.password,
      inputCode: form.inputCode
    })
    
    if (result.success) {
      ElMessage.success('注册成功！正在跳转到首页...')
      // 注册成功，跳转到首页
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      ElMessage.error(result.error || '注册失败')
    }
  } catch (err) {
    ElMessage.error('注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 450px;
}

.register-card :deep(.el-card__body) {
  padding: 40px;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
}

.register-header p {
  color: #666;
  font-size: 14px;
}

.register-form {
  margin-bottom: 20px;
}

.verification-input {
  display: flex;
  gap: 12px;
}

.verification-input .el-input {
  flex: 1;
}

.send-code-btn {
  white-space: nowrap;
  min-width: 120px;
}

.register-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.register-btn:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.register-footer {
  text-align: center;
  margin-top: 20px;
}

.register-footer p {
  color: #666;
  font-size: 14px;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style> 