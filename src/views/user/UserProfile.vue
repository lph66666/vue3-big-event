<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/article'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const formRef = ref()

// ✅ 直接从 store 获取最新数据
const form = ref({
  id: '',
  username: '',
  nickname: '',
  email: ''
})

// 初始化表单数据
const initForm = () => {
  form.value = {
    id: userStore.user.id || '',
    username: userStore.user.username || '',
    nickname: userStore.user.nickname || '',
    email: userStore.user.email || ''
  }
  //console.log('初始化表单:', form.value) // 调试用
}
initForm()
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
//提交更新
const submitForm = async () => {
  await formRef.value.validate()
  //校验通过提交修改
  await userUpdateInfoService(form.value)
  ElMessage.success('修改成功')
  userStore.getUser()
}
</script>
<template>
  <PageContainer title="基本资料">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      size="large"
    >
      <!-- 登录名称不可修改 -->
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>

      <!-- 昵称可修改 -->
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入昵称"
          clearable
        ></el-input>
      </el-form-item>

      <!-- 邮箱可修改 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
          clearable
        ></el-input>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
        <el-button @click="initForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 调试信息（开发时可看到） -->
    <pre v-if="false">表单数据: {{ form }}</pre>
  </PageContainer>
</template>
