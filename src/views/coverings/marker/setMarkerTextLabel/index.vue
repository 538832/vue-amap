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
        // 创建地图实例
        let map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13
        });
        let marker = new AMap.Marker({
          position: map.getCenter(),
          //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          anchor:'bottom-center',
          offset: new AMap.Pixel(0, 0)
        });

        marker.setMap(map);

        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle('我是marker的title');

        // 设置label标签
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        marker.setLabel({
          direction:'right',
          offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
          content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        });
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
