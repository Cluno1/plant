<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-27 00:47:46
 * @FilePath: \plant\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Plants from "./components/Plants.vue";
import Tools from "./components/Tools.vue";
import gsap from "gsap";
import { ref, nextTick, watch, reactive, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import { judgePeriod, type toolType } from "./utls/utl";

const tool = reactive<{
  image: string;
  index: number; //0-4  分别是  "sun" | "tempr" | "water" | "ferti" | "pest"
  name: toolType | null;
}>({
  image: "",
  index: 0,
  name: null,
});
const plant = reactive({
  image: "",
  index: -1, //该植物图片的种类 从 1 开始  1-5
});

const data = reactive({
  ferti: 0, //施肥
  pest: 0, //农药
  sun: 0, //阳光
  tempr: 0, //温度
  water: 0, //水分
});
/**
 * 工具选择函数，会进入动画函数
 * @param index
 * @param image
 */
async function handleToolSelected(index: number, image: string) {
  if (!plant.image) {
    ElMessage.info("you can't use tool before selected any plant");
    return;
  }
  tool.image = image;
  tool.index = index;

  switch (index) {
    case 0:
      data.sun++;
      tool.name = "sun";
      break;
    case 1:
      data.tempr++;
      tool.name = "tempr";
      break;
    case 2:
      data.water++;
      tool.name = "water";
      break;
    case 3:
      data.ferti++;
      tool.name = "ferti";
      break;
    case 4:
      data.pest++;
      tool.name = "pest";
      break;
  }

  await useAnimation();
  const number2 = plant.image.split('/').pop()?.split('.')[0] as string

  const res=judgePeriod(data,tool.name,plant.index,parseInt(number2, 10))//判断植物下一个阶段

  if(res.pest){
    //pest 动画
  }
  if(res.shiny){
    //shiny 动画
    useShiny()
  }
  plant.image=res.plantUrl
}
/**
 * 植物选择
 * @param index
 * @param image
 */
async function handlePlantSelected(index: number, image: string) {
  console.log("plant url:", image);
  initData();
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

function useShiny(){
  nextTick(() => {
    const el2 = document.querySelector(".shiny-img") as HTMLElement;
    gsap.set(el2, { clearProps: "all" }); // 清除所有内联样式
    gsap.set(el2,{opacity:1})

    gsap.from(el2,{
      rotate:135,
      duration:1,
      //todo
   
    })
  })
}

//实现工具动画的函数
async function useAnimation() {
  nextTick(() => {
    // 动画逻辑
    console.log(tool,'tool data')
    if (tool.index == 0) {
      //太阳动画
      const el2 = document.querySelector(".sun-img") as HTMLElement;
      if (el2) {
        gsap.set(el2, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el2); // 清理之前的动画

        gsap.to(el2, {
          rotate: 360,
          duration: 1,
          repeat: 2,
        });
      }
    } else {
      //其他动画
      const el = document.querySelector(".animated-img") as HTMLElement;

      if (el) {
        gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el); // 清理之前的动画
        gsap.set(el, { opacity: 0.8,y:-100 });

        const tl = gsap.timeline();
        tl.from(
          el,
          {
            opacity: 0,
            x: -300,
            y: tool.index * 100,
            width: 0,
            height: 0,
          }

        );

        // 旋转动画序列
        tl.to(el, { rotate: 90, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.3 })
          .to(el, { rotate: 90, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.3, opacity: 0 });
      }
    }

    return Promise.resolve()
  });
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header
        height="10vh"
        class="flex flex-row justify-center items-center"
      ></el-header>
      <el-container>
        <el-aside width="20vw" class="flex flex-row justify-center items-center">
          <div class="w-full h-100 flex flex-col justify-start">
            <Tools @image-selected="handleToolSelected" />
          </div>
        </el-aside>
        <el-main>
          <div
            class="main-layout relative flex flex-col bg-red-500 overflow-auto justify-center items-center"
          >
            <div class="image-layout relative bg-blue-300">
              <!-- 太阳图 -->
              <img
                src="/image/sunlight.jpg"
                alt="sun"
                class="image sun-img absolute top-0 left-0 object-cover rounded"
              />

              <!-- 植物图 -->
              <img
                v-if="plant.image"
                :src="plant.image"
                alt="plant"
                class="image absolute top-1/2 left-1/4 object-cover rounded"
              />

              <!-- 动画图 -->
              <img
                :src="tool.image"
                alt="tool"
                class="animated-img image absolute top-1/2 left-1/4 z-100 object-cover rounded opacity-0"
              />

              <!-- 效果图 -->
              <img
                alt="shiny"
                class="shiny-img image absolute top-1/2 left-1/4 z-20 object-cover rounded opacity-0"
                src="/effect/1.png"
              />
              <img
                alt="pest"
                class="pest-img image absolute top-1/2 left-1/4 z-30 object-cover rounded opacity-0"
                src="/effect/2.png"
              />
            </div>
            <span class="mt-14">
              <p>sunshine:{{ data.sun }} h/day</p>
              <br />
              <p>water:{{ data.water }} time/week</p>
              <br />
              <p>ferti:{{ data.ferti }} time/month</p>
              <br />
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
