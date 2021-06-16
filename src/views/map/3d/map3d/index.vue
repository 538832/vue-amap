<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {
        let map = new AMap.Map('container', {
          rotateEnable: true,
          pitchEnable: true,
          zoom: 17,
          pitch: 50,
          rotation: -15,
          viewMode: '3D', //开启3D视图,默认为关闭
          zooms: [2, 20],
          center: [116.333926, 39.997245]
        });

        let controlBar = new AMap.ControlBar({
          position: {
            right: '10px',
            top: '10px'
          }
        });
        controlBar.addTo(map);

        let toolBar = new AMap.ToolBar({
          position: {
            right: '40px',
            top: '110px'
          }
        });
        toolBar.addTo(map);
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
