/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-06-01 08:24:11
 * @FilePath: \plant\vite.config.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    outDir: "docs",
    assetsDir: "assets"  // 添加这一行
  },
  // 修改 base 配置为你的仓库名
  base: process.env.NODE_ENV === 'production'
    ? '/plant/'  // 替换为你的实际仓库名
    : '/',
  publicDir: 'public'

})
