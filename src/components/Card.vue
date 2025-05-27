<template>
  <el-card class="responsive-card" :body-style="{ padding: '0', display: 'flex', height: '100%' }">
    <div class="card-content">
      <div class="image-container">
        <img :src="imageIndex>0?`/plants/${imageIndex}/3.jpg`:null" class="card-image" alt="Card Image" />
      </div>
      <div class="text-content">
        <h3 class="card-title">{{ title }}</h3>
        <div class="scrollable-description">
          <div class="card-description" v-html="description"></div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  imageIndex: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const isPortrait = ref(window.innerHeight > window.innerWidth);

const handleResize = () => {
  isPortrait.value = window.innerHeight > window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.responsive-card {
  width: 60vw;
  height: 30vh;
  max-width: 1200px;
  max-height: 800px;
  margin: 10vh auto;
  transition: all 0.3s ease;
}

.card-content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}

.image-container {
  flex: 1;
  min-width: 40%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-image:hover {
  transform: scale(1.05);
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2vmin;
  justify-content: space-between;
}

.card-title {
  font-size: 3vmin;
  text-align: center;
  margin: 1vmin 0;
  color: #333;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.scrollable-description {
  min-height: 0; /* 关键修复：允许flex子元素收缩 */
  flex: 1;
  overflow-y: auto; /* 添加垂直滚动条 */
  padding: 0 2vmin;
  margin-top: 1vmin;
}

.card-description {
  font-size: 2vmin;
  line-height: 1.6;
  color: #666;
  text-align: justify;
  padding: 0 1vmin;
}

/* 自定义滚动条样式 */
.scrollable-description::-webkit-scrollbar {
  width: 8px;
}

.scrollable-description::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrollable-description::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.scrollable-description::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}




/* 竖屏模式下的响应式调整 */
@media (orientation: portrait) {
  /* 自定义滚动条样式 */
.card-content::-webkit-scrollbar {
  width: 8px;
}

.card-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.card-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.card-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
  .card-content {
    flex-direction: column;
    min-height: 0; /* 添加此项 */
    overflow-y: auto; /* 添加垂直滚动条 */
    
  }
  
  .image-container {
    min-height: 40%;
    min-width: 100%;
    flex-shrink: 0; /* 防止图片容器被压缩 */
  }
  
  .card-title {
    font-size: 3vmin;
  }
  
  .scrollable-description {
    font-size: 2vmin;
     overflow-y: auto; /* 添加垂直滚动条 */
  }
}

/* 小屏幕调整 */
@media (max-width: 768px) {
  .responsive-card {
    width: 90vw;
    height: 90vh;
  }
  
  .card-title {
    font-size: 3vmin;
  }
  
  .scrollable-description {
    font-size: 2vmin;
  }
}

/* HTML内容中的元素样式 */
.card-description ::v-deep img {
  max-width: 100%;
  height: auto;
}

.card-description ::v-deep a {
  color: #409eff;
  text-decoration: none;
}

.card-description ::v-deep a:hover {
  text-decoration: underline;
}
</style>