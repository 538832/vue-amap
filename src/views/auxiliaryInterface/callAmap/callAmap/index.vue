<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container">
      等待官方更新
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
    },
    methods: {}
  }
</script>

<style scoped>
  .app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
