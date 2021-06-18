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
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        infoWindow: null
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
        //初始化地图对象，加载地图
        this.map = new AMap.Map("container", {resizeEnable: true});
        let lnglats = [
          [116.368904, 39.923423],
          [116.382122, 39.921176],
          [116.387271, 39.922501],
          [116.398258, 39.914600]
        ];
        this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        for (let i = 0, marker; i < lnglats.length; i++) {
          let marker = new AMap.Marker({
            position: lnglats[i],
            map: this.map
          });
          marker.content = '我是第' + (i + 1) + '个Marker';
          marker.on('click', this.markerClick);
          marker.emit('click', {target: marker});
        }
        this.map.setFitView();
      },

      markerClick(e) {
        this.infoWindow.setContent(e.target.content);
        this.infoWindow.open(this.map, e.target.getPosition());
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
