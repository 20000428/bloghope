<template>
  <ClientOnly>
    <div
      v-if="ShowPreviewBox"
      id="Mo7PreviewBox"
      @mousemove="on_mousemove"
      @touchmove="on_mousemove"
      @mouseup="on_mouseup"
      @touchend="on_mouseup"
      @click="closeOnOutsideClick"
    >
      <div class="Mo7PreviewBox-topBar">
        <div class="btn" @click="leftFunc" :class="{ hide: CurrentImgIdx === 0 }">
          <MyIcon class="icon" name="xiangzuo"></MyIcon>
        </div>
        <div class="btn" @click="rightFunc" :class="{ hide: CurrentImgIdx === ImageArr.length - 1 }">
          <MyIcon class="icon" name="xiangyou"></MyIcon>
        </div>
        <div class="btn" @click="zoomFunc">
          <MyIcon class="icon" name="fangda"></MyIcon>
        </div>
        <div class="btn" @click="shrinkFunc">
          <MyIcon class="icon" name="suoxiao"></MyIcon>
        </div>
        <div class="btn" @click="fullscreenFunc">
          <MyIcon class="icon" name="quanping"></MyIcon>
        </div>
        <a class="btn" :href="ImageArr[CurrentImgIdx].src" download>
          <MyIcon class="icon" name="xiazai"></MyIcon>
        </a>
        <div class="btn" @click="ClosePreviewBox">
          <MyIcon class="icon" name="guanbi"></MyIcon>
        </div>
      </div>

      <img
        id="Mo7PreviewBox-img"
        @mousedown="on_mousedown"
        @touchstart="on_mousedown"
        @click.stop="() => {}"
        :src="ImageArr[CurrentImgIdx]?.src"
        :alt="ImageArr[CurrentImgIdx]?.alt"
      />

      <div class="Mo7PreviewBox-idxView">
        <div class="Mo7PreviewBox-idxView-box">
          <div class="Mo7PreviewBox-idxView-idx">{{ CurrentImgIdx + 1 }}/{{ ImageArr.length }}</div>
          <div class="Mo7PreviewBox-idxView-alt" v-if="ImageArr[CurrentImgIdx]?.alt">
            {{ ImageArr[CurrentImgIdx]?.alt }}
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import MyIcon from './MyIcon.vue';

let ImageArr = ref<{ src: string; alt: string }[]>([]);
let ShowPreviewBox = ref(false);
let CurrentImgIdx = ref(0);

// 关闭预览框
function ClosePreviewBox() {
  ShowPreviewBox.value = false;
  document.body.style.overflow = 'auto';
}

// 点击非图片区域关闭预览框
function closeOnOutsideClick(e: MouseEvent) {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (!imgElm) return;

  const rect = imgElm.getBoundingClientRect();
  const isClickInsideImg =
    e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

  if (!isClickInsideImg) {
    ClosePreviewBox();
  }
}

// 图片放大
function zoomFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (imgElm) {
    let width = imgElm.clientWidth;
    let height = imgElm.clientHeight;
    width *= 1.1;
    height *= 1.1;
    imgElm.style.width = `${width}px`;
    imgElm.style.height = `${height}px`;
  }
}

// 图片缩小
function shrinkFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (imgElm) {
    let width = imgElm.clientWidth;
    let height = imgElm.clientHeight;
    width *= 0.9;
    height *= 0.9;
    imgElm.style.width = `${width}px`;
    imgElm.style.height = `${height}px`;
  }
}

// 全屏查看
function fullscreenFunc() {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (imgElm) {
    window.open(imgElm.src);
  }
}

// 左滑动
function leftFunc() {
  if (CurrentImgIdx.value > 0) {
    CurrentImgIdx.value--;
  }
  nextTick(() => {
    ImageBoxReset();
  });
}

// 右滑动
function rightFunc() {
  if (CurrentImgIdx.value < ImageArr.value.length - 1) {
    CurrentImgIdx.value++;
  }
  nextTick(() => {
    ImageBoxReset();
  });
}

// 重置图片大小
function ImageBoxReset() {
  const boxElm = document.getElementById('Mo7PreviewBox') as HTMLElement | null;
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (!boxElm || !imgElm) return;

  const boxWidth = boxElm.clientWidth;
  const boxHeight = boxElm.clientHeight;

  imgElm.style.width = `${boxWidth * 0.9}px`;
  imgElm.style.height = '';
  imgElm.style.maxWidth = '';
  imgElm.style.maxHeight = '';
  imgElm.style.left = '';
  imgElm.style.top = '';
  imgElm.style.cursor = '';

  const height = imgElm.clientHeight;
  if (height > boxHeight) {
    imgElm.style.width = '';
    imgElm.style.height = `${boxHeight * 0.9}px`;
  }
}

// 图片点击事件
function ImageClick(e: MouseEvent) {
  const elm = e.target as HTMLImageElement;
  const src = elm.getAttribute('src');
  if (!src) return;

  const index = ImageArr.value.findIndex((img) => img.src === src);
  if (index !== -1) {
    CurrentImgIdx.value = index;
    ShowPreviewBox.value = true;
    document.body.style.overflow = 'hidden';
    nextTick(() => {
      ImageBoxReset();
    });
  }
}

// 初始化图片预览
function InitPreviewImage(type: 'bind' | 'unbind') {
  const contentElms = document.getElementsByClassName('theme-hope-content');
  const contentElm = contentElms.length > 0 ? contentElms[0] : null;

  if (!contentElm) return;

  const images = contentElm.getElementsByTagName('img');
  const imaArr: { src: string; alt: string }[] = [];

  for (const elm of images) {
    if (type === 'bind') {
      imaArr.push({
        alt: elm.getAttribute('alt') || '',
        src: elm.getAttribute('src') || '',
      });
    }

    elm.removeEventListener('click', ImageClick);
    if (type === 'bind') {
      elm.addEventListener('click', ImageClick);
    }
  }

  ImageArr.value = imaArr;
}

// 鼠标拖动图片
let mouseStatus = false;
let mouseDownX = 0;
let mouseDownY = 0;
let imgElmLeft = 0;
let imgElmTop = 0;

function Mousemove(e: MouseEvent | TouchEvent) {
  if (!mouseStatus) return;

  const xDiff = e instanceof MouseEvent ? e.clientX - mouseDownX : e.touches[0].clientX - mouseDownX;
  const yDiff = e instanceof MouseEvent ? e.clientY - mouseDownY : e.touches[0].clientY - mouseDownY;
  const left = imgElmLeft + xDiff;
  const top = imgElmTop + yDiff;

  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (imgElm) {
    imgElm.style.left = `${left}px`;
    imgElm.style.top = `${top}px`;
  }
}

function ImgMouseUp() {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (imgElm) {
    imgElm.style.cursor = 'default';
  }

  mouseStatus = false;
  mouseDownX = 0;
  mouseDownY = 0;
  imgElmLeft = 0;
  imgElmTop = 0;
}

function ImgMouseDown(e: MouseEvent | TouchEvent) {
  const imgElm = document.getElementById('Mo7PreviewBox-img') as HTMLImageElement | null;
  if (!imgElm) return;

  imgElm.style.cursor = 'move';
  mouseStatus = true;

  if (e instanceof MouseEvent) {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
  } else {
    mouseDownX = e.touches[0].clientX;
    mouseDownY = e.touches[0].clientY;
  }

  const computedStyle = window.getComputedStyle(imgElm);
  imgElmLeft = parseInt(computedStyle.left, 10) || 0;
  imgElmTop = parseInt(computedStyle.top, 10) || 0;
}

// 监听鼠标事件
function on_mousemove(e: MouseEvent | TouchEvent) {
  Mousemove(e);
}

function on_mouseup(e: MouseEvent | TouchEvent) {
  ImgMouseUp();
}

function on_mousedown(e: MouseEvent | TouchEvent) {
  ImgMouseDown(e);
}

// 初始化
onMounted(() => {
  nextTick(() => {
    InitPreviewImage('bind');
  });

  const router = useRouter();
  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      InitPreviewImage('unbind');
    }
  });

  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      nextTick(() => {
        setTimeout(() => {
          InitPreviewImage('bind');
        }, 1000);
      });
    }
  });
});
</script>

<style lang="scss">
.theme-hope-content {
  img {
    cursor: pointer;
  }
}

#Mo7PreviewBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;

  .icon {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 6px;
    display: block;
  }

  .Mo7PreviewBox-topBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 10px;
    z-index: 99;
    .btn {
      display: block;
      margin-left: 10px;
      background-color: rgba(0, 0, 0, 0.4);
      &.hide {
        opacity: 0.4;
      }
    }
  }

  .Mo7PreviewBox-idxView {
    position: absolute;
    bottom: 90px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .Mo7PreviewBox-idxView-box {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 8px;
    color: #fff;
    margin: 0 auto;
    max-width: 80%;
    text-align: center;
  }
  .Mo7PreviewBox-idxView-idx {
    font-size: 24px;
  }
  .Mo7PreviewBox-idxView-alt {
    margin-top: 10px;
    font-size: 20px;
  }
}

#Mo7PreviewBox-img {
  position: relative;
  user-select: none;
  -webkit-user-drag: none;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 5px 15px;
}
</style>