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
        marker: null
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
        let position = new AMap.LngLat(116.397428, 39.90923);

        // 创建地图实例
        this.map = new AMap.Map("container", {
          zoom: 13,
          center: position,
          resizeEnable: true
        });

        // 点标记显示内容，HTML要素字符串
        // let markerContent = '' +
        //   '<div class="custom-content-marker">' +
        //   '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
        //   '   <div class="close-btn" ">X</div>' +
        //   '</div>';

        this.marker = new AMap.Marker({
          position: position,
          // 将 html 传给 content
          //content: markerContent,
          //改成icon
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30)
        });

        // 将 markers 添加到地图
        this.map.add(this.marker);
        //绑定事件
        this.marker.on("click", this.clearMarker)
      },

      // 清除 marker
      clearMarker() {
        this.map.remove(this.marker);
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
