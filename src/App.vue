<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-19 10:31:35
 * @FilePath: \plant\plant\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Plants from './components/Plants.vue';
import Tools from './components/Tools.vue';
import gsap from 'gsap';
import { ref, nextTick, watch, reactive, watchEffect } from 'vue';

const selectedImage = reactive({
  image:'',
  index:0,
});
async function handleImageSelected(index: number, image: string) {
  console.log("url:", image);
  selectedImage.image = image;
  selectedImage.index=index

  nextTick(() => {
      
      // 动画逻辑
      const el = document.querySelector('.animated-image') as HTMLElement;
      if (el) {
        // console.log(el); // 确保目标元素存在
        
         gsap.set(el, { clearProps: 'all' }); // 清除所有内联样式
         gsap.killTweensOf(el); // 清理之前的动画

        const tl = gsap.timeline();
        tl.from(el, {
          opacity: 0,
          x: -300, 
          y: selectedImage.index * 100,
          width: 0,
          height: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        });
        tl.to(el, {
          rotate: 90,
          opacity:0,
          duration: 0.5,
        })
      }
    })
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
        <el-main>
          <div class="flex flex-col justify-center items-center">
            <!-- 动画图片 -->
            <img v-if="selectedImage.image" :src="selectedImage.image" alt="Animated"
              class="animated-image  w-40 h-40 object-cover rounded" />
            <Plants @image-selected="handleImageSelected" />
          </div>
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.animated-image {
  z-index: 1000;
  pointer-events: none;
}
</style>
