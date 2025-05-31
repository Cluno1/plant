<!--
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-20 22:23:02
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-06-01 03:46:27
 * @FilePath: \plant\src\components\Plants.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: 张连登 17875477802@163.com
 * @Date: 2025-05-18 23:15:06
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-20 23:51:23
 * @FilePath: \plant\plant\src\components\Plants.vue
 * @Description: 
 * 
 * Copyright 2025 xingye/'zld', All Rights Reserved. 
-->
<template>
    <div class="w-64 mx-auto mt-10 flex justify-center flex-col">
        <!-- 显示选中的图片 -->
        <!-- <div class="mb-4">
            <img v-if="selectedImage" :src="selectedImage" alt="Selected" class="w-full h-40 object-cover rounded" />
            <p v-else class="text-gray-500 text-center">select plant</p>
        </div> -->

        <!-- 下拉菜单 -->
        <el-dropdown @command="handleSelect">
            <el-button type="primary">
                plants
                <el-icon>
                    <ArrowDown />
                </el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(image, index) in images" :key="index" :command="index">
                        <img :src="image" alt="Option" class="image object-cover rounded" />
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义 emit
const emit = defineEmits<{
    (event: 'image-selected', index: number, image: string): void;
}>();
const images = [
  "/plants/1/1.jpg",
  "/plants/2/1.jpg",
  "/plants/3/1.jpg",
  "/plants/4/1.jpg",
  "/plants/5/1.jpg",
]
const selectedImage = ref<string>('')

function handleSelect(index: number) {
    selectedImage.value = images[index];
    emit("image-selected", index+1, selectedImage.value);
}



</script>

<style scoped>
.image {
    width: 6vw;
    height: auto;
}
</style>