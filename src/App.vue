<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-14 18:17:46
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-06-01 01:22:59
 * @FilePath: \plant\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import Plants from "./components/Plants.vue";
import Tools from "./components/Tools.vue";
import Card from "./components/Card.vue";
import gsap from "gsap";
import { ref, nextTick, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getPlantDetail, judgePeriod, type toolType } from "./utls/utl";

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
  name: "",
  title: "",
  detail: "",
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
function handleToolSelected(index: number, image: string) {
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

  useAnimation();
  const number2 = plant.image.split("/").pop()?.split(".")[0] as string;

  const res = judgePeriod(data, tool.name, plant.index, parseInt(number2, 10)); //判断植物下一个阶段

  console.log(res, "judge");

  if (res.pest) {
    //bug 动画
    useBug();
  }
  if (res.shiny) {
    //shiny 动画
    useShiny();
  }
  plant.image = res.plantUrl;
  if(String(res.plantUrl).indexOf('4.jpg') !== -1){
    ElMessage.info('sorry but the plant deaded...maybe you can start plant again')
  }
}
/**
 * 植物选择
 * @param index
 * @param image
 */
function handlePlantSelected(index: number, image: string) {
  console.log("plant url:", image);
  plant.image = image;
  plant.index = index;
  initData();
  const res = getPlantDetail(plant.index);
  if(res){
 data.tempr = res.lowestTempr - 1;
  data.sun = res.lowestSun - 1;
  plant.detail = res?.detail ?? "";
  plant.title = res?.title ?? "";
  plant.name = res?.name ?? "";
  }
 
}

function initData() {
  data.ferti = 0;
  data.pest = 0;
  data.sun = 0;
  data.water = 0;
  data.tempr = 0;
  bug.value = false;
  const el = document.querySelector(".pest-img") as HTMLElement;
  gsap.killTweensOf(el); // 停止所有正在运行的动画
  gsap.set(el, { clearProps: "all" });
  gsap.set(el, { opacity: 0 });
}

const bug = ref(false);
function useBug() {
  nextTick(() => {
    bug.value = !bug.value;
    const el = document.querySelector(".pest-img") as HTMLElement;
    gsap.killTweensOf(el); // 停止所有正在运行的动画
    if (bug.value) {
      //需要显示bug pest-img
      gsap.set(el, { opacity: 0 });
      gsap.to(el, {
        delay: 3,
        opacity: 1,
        duration: 1,
        repeat: -1,
        scale: 1.03,
        yoyo: true,
      });
    } else {
      gsap.to(el, {
        delay: 1,
        duration: 0,
        onComplete: () => {
          gsap.set(el, { clearProps: "all" });
          gsap.set(el, { opacity: 0 });
        },
      });

      setTimeout(() => {
        useShiny();
         ElMessage.success(plant.name+" is perfert !!");
      }, 1000);
    }
  });
}

function useShiny() {
  nextTick(() => {
    const el = document.querySelector(".plant-img") as HTMLElement;
    const el3 = document.querySelector(".shiny-img") as HTMLElement;

    if (!el || !el3) {
      console.error("Element not found!");
      return;
    }

    // 1. 先重置所有动画状态
    gsap.killTweensOf([el, el3]); // 停止所有正在运行的动画
    gsap.set(el, { scale: 1 }); // 强制重置 scale
    gsap.set(el3, { opacity: 0 }); // 强制重置 opacity

    // 2. 执行 plant-img 的动画
    gsap.to(el, {
      scale: 1.1,
      duration: 1.5,
      yoyo: true,
      repeat: 1,
    });

    // 3. 执行 shiny-img 的闪烁动画
    const tl = gsap.timeline();
    tl.to(el3, { opacity: 1, delay: 1, duration: 0.5, repeat: 4, yoyo: true }) // 闪烁 5 次
      .to(el3, { opacity: 0, duration: 0.8 }); // 最后消失
  });
}
//实现工具动画的函数
function useAnimation() {
  nextTick(() => {
    // 动画逻辑
    console.log(tool, "tool data");
    if (tool.name == "sun") {
      const el = document.querySelector(".animated-img") as HTMLElement;
      gsap.killTweensOf(el); // 清理之前的动画
      gsap.set(el, { opacity: 0 });

      //太阳动画
      const el2 = document.querySelector(".sun-img") as HTMLElement;
      if (el2) {
        gsap.set(el2, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el2); // 清理之前的动画
        gsap.to(el2, {
          rotate: 360,
          duration: 1,
        });
      }
    } else if (tool.name == "pest") {
      const el = document.querySelector(".animated-img") as HTMLElement;

      if (el) {
        gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el); // 清理之前的动画
        gsap.set(el, { opacity: 0.8, y: -100, rotate: -40 });
        const tl = gsap.timeline();
        tl.from(el, {
          opacity: 0,
          x: -300,
          y: tool.index * 100,
          width: 0,
          height: 0,
        });

        // 旋转动画序列
        tl.to(el, { rotate: -140, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.7 })
          .to(el, { rotate: -140, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.7, opacity: 0 });
      }
    } else if (tool.name == "tempr") {
      const el2 = document.querySelector(".animated-img") as HTMLElement;
      gsap.killTweensOf(el2); // 清理之前的动画
      gsap.set(el2, { opacity: 0 });
      // 温度计动画
      const el = document.querySelector(".temper-img") as HTMLElement;
      if (el) {
        gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el); // 清理之前的动画
        gsap.to(el, {
          scale: 1.5, // 放大1.5倍
          duration: 0.5,
          yoyo: true, // 往返动画
          repeat: 3, // 重复3次
        });
      }
    } else {
      //其他动画
      const el = document.querySelector(".animated-img") as HTMLElement;

      if (el) {
        gsap.set(el, { clearProps: "all" }); // 清除所有内联样式
        gsap.killTweensOf(el); // 清理之前的动画
        gsap.set(el, { opacity: 0.8, y: -100 });

        const tl = gsap.timeline();
        tl.from(el, {
          opacity: 0,
          x: -300,
          y: tool.index * 100,
          width: 0,
          height: 0,
        });

        // 旋转动画序列
        tl.to(el, { rotate: 90, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.7 })
          .to(el, { rotate: 90, duration: 0.3 })
          .to(el, { rotate: 0, duration: 0.7, opacity: 0 });
      }
    }
  });
}
</script>

<template>
  <div class="common-layout bg-green-50">
    <el-container>
      <el-aside
        width="20vw"
        class="flex flex-row justify-start items-start mt-10"
      >
        <!-- <div class="w-full h-100 flex flex-col justify-start"> -->
        <Tools @image-selected="handleToolSelected" />
        <!-- </div> -->
      </el-aside>
      <el-container>
        <el-header
          height="30vh"
          class="flex flex-row justify-center items-center mt-4"
        >
          <Card
            :description="plant.detail"
            :title="plant.title"
            :image-index="plant.index"
          />
        </el-header>
        <el-main>
          <div class="image-layout">
            <!-- 太阳图 -->
            <img
              src="/image/sun.png"
              alt="sun"
              class="sun-img absolute top-0 left-0 object-contain rounded"
            />
            <!-- temper -->
            <img
              src="/image/temper.png"
              alt="tempr"
              class="temper-img absolute top-5 right-5 object-contain rounded"
            />

            <!-- 植物图 -->
            <img
              v-if="plant.image"
              :src="plant.image"
              alt="plant"
              class="image plant-img absolute top-2/5 left-1/4 object-contain rounded"
            />


            <!-- 动画图 -->
            <img
              :src="tool.image"
              alt="tool"
              class="animated-img absolute top-1/5 left-1/4 z-100 object-contain rounded opacity-0"
            />

            <!-- 效果图 -->
            <img
              alt="shiny"
              class="image shiny-img absolute top-2/5 left-1/4 z-20 object-contain rounded opacity-0"
              src="/effect/shiny-2.png"
            />
            <img
              alt="bugs"
              class="pest-img image absolute top-2/5 left-1/4 z-30 object-contain rounded opacity-0"
              src="/effect/bugs.png"
            />

            
          </div>
        </el-main>
      </el-container>
      <el-aside width="20vw" class="mt-10">
        <div class="w-full flex flex-col justify-start gap-1.5">
          <Plants @image-selected="handlePlantSelected" class="absolute" />
          <span class="mt-40 declear-img p-1.5 pl-4">
            <b>Record</b><br /><br />

            <p>sunshine: <b>{{ data.sun }}</b> h/day</p>
            <br />
            <p>temperature: <b>{{ data.tempr }}</b> h/day</p>
            <br />
            <p>water: <b>{{ data.water }} </b>time/week</p>
            <br />
            <p>ferti: <b>{{ data.ferti }}</b> time/month</p>
            <br />
            <p>pest: <b>{{ data.pest }} </b>h/month</p>
          </span>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.sun-img {
  width: 10vw;
  height: auto;
}
.temper-img {
  width: 4vw;
}
.plant-img {
  transition: all 1s ease-out;
}
.image {
  width: 15vw;
  height: auto;
}
.animated-img {
  width: 10vw;
  height: 10vw;
}
.shiny-img {
  width: 17vw;
  height: auto;
}

.main-layout {
  width: 50vw;
  height: 80vh;
}

.declear-img {
  background-color: rgba(255, 255, 255, 0.2); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */

  /* 边框和圆角增强效果 */
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* 初始阴影（轻微立体感） */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08);

  /* 隐藏滚动条 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 悬停动画 */
  transition: all 0.3s ease;
}

/* 悬停效果：阴影扩大+上浮 */
.declear-img:hover {
  transform: translateY(-4px); /* 轻微上浮 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.281), 0 4px 8px rgba(0, 0, 0, 0.12);
}

.image-layout {
  height: 55vh;
  width: 50vw;
  overflow: auto;
  position: absolute;

  /* 磨砂玻璃效果 */
  background-color: rgb(255, 255, 255); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */

  /* 边框和圆角增强效果 */
  border-radius: 15px;
  border: 1px solid rgba(156, 151, 151, 0.401);

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.305), 0 1px 2px rgba(0, 0, 0, 0.128);

  /* 隐藏滚动条 */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.common-layout {
  height: 120vh;
}

/* 平板竖屏样式 */
@media only screen and (max-width: 1024px) and (orientation: portrait) {
  .plant-img {
    width: 25vw !important;
    left: 15% !important;
  }
  .animated-img {
    width: 18vw !important;
    height: 18vw !important;
  }
  
  .shiny-img {
    width: 27vw !important;
  }
  
  .pest-img {
    width: 25vw !important;
  }
  
  .image-layout {
    width: 50vw;
    height: 65vh;
  }
  
  .sun-img {
    width: 15vw;
  }
  
  .temper-img {
    width: 8vw;
  }
}
</style>
