<!--
 * @Author: 张连登 17875477802@163.com
 * @Date: 2025-05-18 23:15:06
 * @LastEditors: 张连登 17875477802@163.com
 * @LastEditTime: 2025-05-18 23:58:13
 * @FilePath: \plant\src\components\Tools.vue
 * @Description: 
 * 
 * Copyright 2025 xingye/'zld', All Rights Reserved. 
-->
<template>
    <div class="mx-auto mt-10 flex justify-center flex-col items-center gap-9">
        <div v-for="(image, index) in images" @click='handleSelect(index)' :key="index">
        <img  :src="image" alt="Option"
            class="w-20 h-20 object-cover rounded"  />
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义 emit
const emit = defineEmits<{
    (event: 'image-selected', index: number): void;
}>();
const images = [
    "/image/ferti.png",
    "/image/pest.png",
    "/image/sun.png",
    "/image/tempr.png"
]
const selectedImage = ref<string>('')

function handleSelect(index: number) {
    console.log("tools  index:", index);
    selectedImage.value = images[index];
    emit("image-selected", index);
}



</script>

<style scoped></style>