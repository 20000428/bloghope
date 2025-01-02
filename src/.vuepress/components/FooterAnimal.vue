<template>
    <div id="footer-animal">
      <div class="animal-wall">
        <img
          class="animal entered loaded"
          src="../public/favicon.png"
          onerror="this.onerror=null;this.src='/img/golang.jpg';"
          alt="动物"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterAnimal',
  };
  </script>
  
  <style scoped>
  /* 你的 CSS 样式 */
  #footer-animal {
    position: relative;
    width: 100%;
  }
  
  #footer-animal .animal-wall {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 36px;
    background: #bcb0a4 url('https://p.qjqq.cn/cover/202410191400532.png/color') repeat center;
    background-size: auto 100%;
    box-shadow: 0 4px 7px rgba(0,0,0,.15);
  }
  
  @media screen and (max-width: 1023px) {
    #footer-animal .animal-wall {
      height: 4vw;
    }
  }
  
  #footer-animal img.animal {
    position: relative;
    max-width: min(974px, 100vw);
    margin: 0 auto;
    display: block;
  }
  
  #footer-bar {
    margin-top: 0 !important;
  }
  </style>