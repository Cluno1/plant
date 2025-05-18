<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: 张连登 17875477802@163.com
 * @LastEditTime: 2025-05-18 23:11:02
 * @FilePath: \plant\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Plants from './components/Plants.vue';
import Tools from './components/Tools.vue';
function handleImageSelected(index: number) {
  console.log("Selected image index:", index);
}
</script>

<template>
  
  <div class="common-layout">
    <el-container>
      <el-header class="flex flex-row justify-center items-center"></el-header>
      <el-container>
        <el-aside width="200px" class="flex flex-row justify-center items-center">
          <Tools @image-selected="handleImageSelected" />
        </el-aside>
        <el-main >
          <Plants @image-selected="handleImageSelected" />
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
