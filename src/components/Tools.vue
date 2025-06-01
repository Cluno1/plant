<!--
 * @Author: 张连登 17875477802@163.com
 * @Date: 2025-05-18 23:15:06
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-06-01 03:46:16
 * @FilePath: \plant\plant\src\components\Tools.vue
 * @Description: 
 * 
 * Copyright 2025 xingye/'zld', All Rights Reserved. 
-->
<template>
  <div class="tool mx-auto mt-10 flex flex-col gap-4">
   <el-button type="primary">tools</el-button>
    <div v-for="(image, index) in images" @click="handleSelect(index)" :key="index">
      <img :src="image" alt="Option" class="image object-cover rounded" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 定义 emit
const emit = defineEmits<{
  (event: "image-selected", index: number, image: string): void;
}>();
const images = [
  "image/sun.png",
  "image/temper.png",
  "image/water.png",
  "image/ferti.png",
  "image/bug.png",
];
const selectedImage = ref<string>("");

function handleSelect(index: number) {
  selectedImage.value = images[index];
  emit("image-selected", index, selectedImage.value);
}
</script>

<style scoped>
.tool {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 和 Edge */
  min-height: 35vw;
  border-right: 1px solid #7b7d83; /* 添加右侧竖线 */
  padding-right: 10px; /* 可选：为竖线添加一些间距 */
}
.image {
  width: 6vw;
  height: 6vw;
  object-fit: contain;
}


/* 平板竖屏样式 */
@media only screen and (max-width: 1024px) and (orientation: portrait) {

  .image {
  width: 10vw;
  height: 10vw;
  }
}
</style>
