<!--
 * @Author: 张连登 17875477802@163.com
 * @Date: 2025-05-18 23:15:06
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-27 00:14:59
 * @FilePath: \plant\plant\src\components\Tools.vue
 * @Description: 
 * 
 * Copyright 2025 xingye/'zld', All Rights Reserved. 
-->
<template>
    <div class="mx-auto mt-10 flex justify-center flex-col items-center gap-9">
        <div v-for="(image, index) in images" @click='handleSelect(index)' :key="index">
            <img :src="image" alt="Option" class="image object-cover rounded" />

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义 emit
const emit = defineEmits<{
    (event: 'image-selected', index: number, image: string): void;
}>();
const images = [
    "/image/sunlight.jpg",
    "/image/temperature.jpg",
    "/image/water.jpg",
    "/image/fertilizer.jpg",
    "/image/bug spray.jpg",
]
const selectedImage = ref<string>('')

function handleSelect(index: number) {
    selectedImage.value = images[index];
    emit("image-selected", index, selectedImage.value);
}




</script>

<style scoped>
.image {
    width: 6vw;
    height: auto;
}
</style>