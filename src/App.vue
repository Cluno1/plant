<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-20 23:50:02
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

const tool = reactive({
  image: '',
  index: 0,
});
const plant = reactive({
  image: '',
  index: 0,
});
async function handleToolSelected(index: number, image: string) {
  console.log("url:", image);
  tool.image = image;
  tool.index = index

  useAnimation(index)
}
async function handlePlantSelected(index: number, image: string) {
  console.log("url:", image);
  plant.image = image;
  plant.index = index
}

function useAnimation(index:number){
  nextTick(() => {
    // 动画逻辑
    const el = document.querySelector('.animated-image') as HTMLElement;

    const el2 = document.querySelector('.effect-img') as HTMLElement;
    if (el) {
      console.log(el); // 确保目标元素存在

      gsap.set(el, { clearProps: 'all' }); // 清除所有内联样式
      gsap.set(el2, { clearProps: 'all' });


      gsap.killTweensOf([el, el2]);; // 清理之前的动画


      gsap.set(el, { opacity:1 });

      const tl = gsap.timeline();

      
      tl.from(el, {
        opacity: 0,
        x: -300,
        y: index * 100,
        width: 0,
        height: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      });

      tl.to(el, {
        rotate: 90,
        duration: 0.5,
      })
      tl.to(el, {
        rotate: 0,
        duration: 0.5,
        opacity: 0,
      })
      
      tl.to(el2, {
        opacity: 1,
        duration: 0.3,
        repeat: 3, // 无限循环
        yoyo: true,  // 来回播放
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
          <div class="w-full h-200 flex flex-col justify-center">
          <Tools @image-selected="handleToolSelected" />
          </div>
        </el-aside>
        <el-main>
          <div class="relative">
              <img v-if="plant.image" :src="plant.image" alt="plant" class="image absolute top-1/2 left-1/2 object-cover rounded" />
              <img :src="tool.image" alt="tool"
                class="animated-image image absolute top-1/2 left-1/2 z-10 object-cover rounded opacity-0" />
              
              <img alt="Effect" class="effect-img image absolute  top-1/2 left-1/2 z-20  object-cover rounded opacity-0" src="/effect/1.png" />
            
          </div>
        </el-main>
        <el-aside width="200px">
          <div class="w-full h-200 flex flex-col justify-center">
          <Plants @image-selected="handlePlantSelected" class="absolute" />
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.image {
  width: 160px;
  height: 160px;
}
</style>
