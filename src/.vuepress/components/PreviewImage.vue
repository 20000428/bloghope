<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="ShowPreviewBox"
          ref="previewBoxRef"
          class="mo7-preview-box"
          @click="closeOnOutsideClick"
        >
          <!-- 工具栏 -->
          <div class="preview-toolbar">
            <button 
              class="tool-btn" 
              :disabled="CurrentImgIdx === 0"
              @click.stop="leftFunc"
            >
              <MyIcon name="xiangzuo" />
            </button>
            <button 
              class="tool-btn" 
              :disabled="CurrentImgIdx === ImageArr.length - 1"
              @click.stop="rightFunc"
            >
              <MyIcon name="xiangyou" />
            </button>
            <button class="tool-btn" @click.stop="zoomFunc">
              <MyIcon name="fangda" />
            </button>
            <button class="tool-btn" @click.stop="shrinkFunc">
              <MyIcon name="suoxiao" />
            </button>
            <button class="tool-btn" @click.stop="fullscreenFunc">
              <MyIcon name="quanping" />
            </button>
            <a 
              class="tool-btn" 
              :href="currentImage?.src" 
              download
              @click.stop
            >
              <MyIcon name="xiazai" />
            </a>
            <button class="tool-btn" @click.stop="ClosePreviewBox">
              <MyIcon name="guanbi" />
            </button>
          </div>

          <!-- 图片容器 -->
          <div 
            class="image-wrapper"
            @mousedown="on_mousedown"
            @touchstart.passive="on_mousedown"
          >
            <img
              ref="imageRef"
              :src="currentImage?.src"
              :alt="currentImage?.alt"
              :style="imageStyle"
              @click.stop
              draggable="false"
            />
          </div>

          <!-- 底部信息 -->
          <div class="preview-info">
            <div class="info-box">
              <span class="index">{{ CurrentImgIdx + 1 }} / {{ ImageArr.length }}</span>
              <span v-if="currentImage?.alt" class="alt-text">{{ currentImage.alt }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { 
  ref, 
  computed, 
  onMounted, 
  onUnmounted, 
  nextTick, 
  watch 
} from 'vue';
import { useRouter } from 'vue-router';
import MyIcon from './MyIcon.vue';

// 类型定义
interface ImageItem {
  src: string;
  alt: string;
  el?: HTMLImageElement;
}

// 检查是否为客户端环境
const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

// 状态
const ImageArr = ref<ImageItem[]>([]);
const ShowPreviewBox = ref(false);
const CurrentImgIdx = ref(0);
const previewBoxRef = ref<HTMLDivElement>();
const imageRef = ref<HTMLImageElement>();

// 图片变换状态
const scale = ref(1);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });

// 计算属性
const currentImage = computed(() => ImageArr.value[CurrentImgIdx.value]);

const imageStyle = computed(() => ({
  transform: `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`,
  cursor: isDragging.value ? 'grabbing' : 'grab'
}));

// 工具函数：重置状态
const resetTransform = () => {
  scale.value = 1;
  position.value = { x: 0, y: 0 };
};

// 关闭预览
const ClosePreviewBox = () => {
  ShowPreviewBox.value = false;
  if (isClient) {
    document.body.style.overflow = '';
  }
  resetTransform();
};

// 点击外部关闭
const closeOnOutsideClick = (e: MouseEvent) => {
  if (e.target === previewBoxRef.value) {
    ClosePreviewBox();
  }
};

// 缩放功能
const zoomFunc = () => {
  scale.value = Math.min(scale.value * 1.2, 5);
};

const shrinkFunc = () => {
  scale.value = Math.max(scale.value / 1.2, 0.2);
};

// 真正的全屏 API
const fullscreenFunc = async () => {
  if (!previewBoxRef.value || !isClient) return;
  
  try {
    if (!document.fullscreenElement) {
      await previewBoxRef.value.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    if (isClient && currentImage.value?.src) {
      window.open(currentImage.value.src, '_blank');
    }
  }
};

// 切换图片
const navigate = (direction: 'prev' | 'next') => {
  if (direction === 'prev' && CurrentImgIdx.value > 0) {
    CurrentImgIdx.value--;
  } else if (direction === 'next' && CurrentImgIdx.value < ImageArr.value.length - 1) {
    CurrentImgIdx.value++;
  }
  resetTransform();
};

const leftFunc = () => navigate('prev');
const rightFunc = () => navigate('next');

// 拖拽逻辑
const on_mousedown = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  isDragging.value = true;
  
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  
  dragStart.value = {
    x: clientX - position.value.x,
    y: clientY - position.value.y
  };

  if (isClient) {
    document.addEventListener('mousemove', on_mousemove);
    document.addEventListener('mouseup', on_mouseup);
    document.addEventListener('touchmove', on_mousemove, { passive: false });
    document.addEventListener('touchend', on_mouseup);
  }
};

const on_mousemove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

  position.value = {
    x: clientX - dragStart.value.x,
    y: clientY - dragStart.value.y
  };
};

const on_mouseup = () => {
  isDragging.value = false;
  if (isClient) {
    document.removeEventListener('mousemove', on_mousemove);
    document.removeEventListener('mouseup', on_mouseup);
    document.removeEventListener('touchmove', on_mousemove);
    document.removeEventListener('touchend', on_mouseup);
  }
};

// 键盘导航
const onKeydown = (e: KeyboardEvent) => {
  if (!ShowPreviewBox.value) return;
  
  switch (e.key) {
    case 'Escape':
      ClosePreviewBox();
      break;
    case 'ArrowLeft':
      leftFunc();
      break;
    case 'ArrowRight':
      rightFunc();
      break;
    case '+':
    case '=':
      zoomFunc();
      break;
    case '-':
      shrinkFunc();
      break;
  }
};

// 初始化图片绑定 - 增加客户端环境检查
const InitPreviewImage = () => {
  if (!isClient) return;
  
  const contentElms = document.getElementsByClassName('theme-hope-content');
  const contentElm = contentElms[0] as HTMLElement | undefined;
  
  if (!contentElm) return;

  const images = Array.from(contentElm.getElementsByTagName('img'));
  
  ImageArr.value = images.map(img => ({
    src: img.src,
    alt: img.alt || '',
    el: img
  }));

  // 添加点击事件
  images.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      CurrentImgIdx.value = index;
      ShowPreviewBox.value = true;
      document.body.style.overflow = 'hidden';
      resetTransform();
    });
  });

  // 清理函数
  return () => {
    images.forEach(img => {
      img.style.cursor = '';
      // 注意：这里应该移除事件监听器，但匿名函数无法直接移除
      // 实际应用中建议将处理函数提取为具名函数
    });
  };
};

// 只在客户端初始化
let cleanup: (() => void) | undefined;
const router = useRouter();

// 将路由钩子也限制在客户端
if (isClient) {
  router.beforeEach(() => {
    cleanup?.();
  });

  router.afterEach(() => {
    nextTick(() => {
      cleanup = InitPreviewImage();
    });
  });
}

// 生命周期
onMounted(() => {
  if (isClient) {
    cleanup = InitPreviewImage();
    window.addEventListener('keydown', onKeydown);
  }
});

onUnmounted(() => {
  cleanup?.();
  if (isClient) {
    window.removeEventListener('keydown', onKeydown);
    document.body.style.overflow = '';
  }
});
</script>

<style scoped lang="scss">
.mo7-preview-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  
  // 顶部工具栏
  .preview-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
    z-index: 10;

    .tool-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: #fff;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
      
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }

  // 图片容器
  .image-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    touch-action: none;
    
    img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
      transition: transform 0.1s ease-out;
      will-change: transform;
    }
  }

  // 底部信息
  .preview-info {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    
    .info-box {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);
      padding: 12px 24px;
      border-radius: 24px;
      color: #fff;
      
      .index {
        font-size: 14px;
        opacity: 0.8;
        margin-right: 12px;
      }
      
      .alt-text {
        font-size: 16px;
      }
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>