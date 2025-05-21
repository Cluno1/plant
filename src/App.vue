<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-22 00:37:35
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
import { ElMessage } from 'element-plus';

const tool = reactive({
  image: '',
  index: 0,
});
const plant = reactive({
  image: '',
  index: 0,//该植物图片的位置 从1开始
});

const data = reactive({
  ferti: 0,//施肥
  pest: 0,//农药
  sun: 0,//阳光
  tempr: 0,//温度
  water: 0,//水分
})
/**
 * 工具选择函数，会进入动画函数
 * @param index 
 * @param image 
 */
async function handleToolSelected(index: number, image: string) {
  console.log("tool url:", image);
  if (!plant.image) {
    ElMessage.info("you can't use tool before selected plant");
    return
  }
  tool.image = image;
  tool.index = index + 1;
  switch (index) {
    case 0:
      data.sun++;
      break;
    case 1:
      data.water++;
      break;
    case 2:
      data.ferti++;
      break;
    case 3:
      data.pest++;
      break;
  }

  useAnimation()
}
/**
 * 植物选择
 * @param index 
 * @param image 
 */
async function handlePlantSelected(index: number, image: string) {
  console.log("plant url:", image);
  initData()
  plant.image = image;
  plant.index = index + 1;

}

function initData() {
  data.ferti = 0;
  data.pest = 0;
  data.sun = 0;
  data.water = 0;
  data.tempr = 0;
}

//实现动画的函数
function useAnimation() {
  nextTick(() => {
    // 动画逻辑
    if (tool.index == 1) {
      //太阳动画
      const el2 = document.querySelector('.sun-img') as HTMLElement;
      if (el2) {


        gsap.set(el2, { clearProps: 'all' }); // 清除所有内联样式
        gsap.killTweensOf(el2);; // 清理之前的动画

        gsap.to(el2, {
          rotate: 360,
          duration: 1,
          repeat: 2,
        })
      }
    } else {
      const el = document.querySelector('.animated-img') as HTMLElement;


      if (el) {
        gsap.set(el, { clearProps: 'all' }); // 清除所有内联样式
        gsap.killTweensOf(el);; // 清理之前的动画


        gsap.set(el, { opacity: 0.5 });
        const tl = gsap.timeline();
        tl.from(el, {
          opacity: 0,
          x: -300,
          y: tool.index * 100,
          width: 0,
          height: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out'
        });
        tl.to(el, {
          rotate: 90,
          duration: 0.3,
        })
        tl.to(el, {
          rotate: 0,
          duration: 0.3,
        })
        tl.to(el, {
          rotate: 90,
          duration: 0.3,
        })
        tl.to(el, {
          rotate: 0,
          duration: 0.3,
          opacity: 0,
        })
      }
    }

  })
}


</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-header height="10vh" class="flex flex-row justify-center items-center"></el-header>
      <el-container>
        <el-aside width="20vw" class="flex flex-row justify-center items-center">
          <div class="w-full h-100 flex flex-col justify-start">
            <Tools @image-selected="handleToolSelected" />
          </div>
        </el-aside>
        <el-main>
          <div class="main-layout relative  flex flex-col bg-red-500  overflow-auto justify-center items-center">
            <div class="image-layout relative bg-blue-300 ">
              <!-- 太阳图 -->
              <img src="/image/sun.png" alt="sun" class="image sun-img absolute top-0 left-0 object-cover rounded" />
              <!-- 植物图 -->
              <img v-if="plant.image" :src="plant.image" alt="plant"
                class="image absolute top-1/2 left-1/4 object-cover rounded" />
              <!-- 动画图 -->
              <img :src="tool.image" alt="tool"
                class="animated-img image absolute top-1/4 left-1/4 z-10 object-cover rounded opacity-0" />
              <!-- 效果图 -->
              <img alt="Effect" class="effect-img image absolute  top-1/4 left-1/4 z-20  object-cover rounded opacity-0"
                src="/effect/1.png" />
            </div>
            <span class="mt-14">
              <p>sunshine:{{ data.sun }} h/day</p><br />
              <p>water:{{ data.water }} time/week</p><br />
              <p>ferti:{{ data.ferti }} time/month</p><br />
              <p>pest:{{ data.pest }} h/month</p>
            </span>
          </div>
        </el-main>
        <el-aside width="20vw">
          <div class="w-full h-100 flex flex-col justify-start">
            <Plants @image-selected="handlePlantSelected" class="absolute" />
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.image {
  width: 10vw;
  height: auto;
}

.main-layout {
  width: 50vw;
  height: 80vh;
}

.image-layout {
  height: 50vh;
  width: 50vw;
}
</style>
