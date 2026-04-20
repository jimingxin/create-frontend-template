<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from './stores/session'

const sessionStore = useSessionStore()

onMounted(() => {
  sessionStore.initSession()
})
</script>

<style lang="scss">
// 导入设计系统变量
@use './styles/variables.scss';
@use './styles/gauss-theme.scss';

// 全局重置
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

// 链接样式
a {
  color: inherit;
  text-decoration: none;
}

// 按钮重置
button {
  font-family: inherit;
}

// 输入框重置
input,
textarea {
  font-family: inherit;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gray-400);
}

// 选中文字样式
::selection {
  background: var(--primary-200);
  color: var(--primary-900);
}

// Element Plus 主题覆盖
:root {
  --el-color-primary: var(--primary-600);
  --el-color-primary-light-3: var(--primary-400);
  --el-color-primary-light-5: var(--primary-300);
  --el-color-primary-light-7: var(--primary-200);
  --el-color-primary-light-8: var(--primary-100);
  --el-color-primary-light-9: var(--primary-50);
  --el-color-primary-dark-2: var(--primary-700);
  
  --el-border-radius-base: var(--radius-md);
  --el-border-radius-small: var(--radius-sm);
  --el-border-radius-round: var(--radius-full);
  --el-box-shadow: var(--shadow-md);
  --el-box-shadow-light: var(--shadow-sm);
  --el-box-shadow-lighter: var(--shadow-xs);
  --el-box-shadow-dark: var(--shadow-lg);
}

// 页面过渡动画
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
