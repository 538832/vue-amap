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
        map: null
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
          zoom: 13,
          center: [116.473195, 39.973253],
          resizeEnable: true,
          mapStyle: 'amap://styles/whitesmoke'
        });
        let positions = [
          [116.493195, 39.993253],
          [116.473195, 39.993253],
          [116.453195, 39.993253],
          [116.493195, 39.973253],
          [116.473195, 39.973253],
          [116.453195, 39.973253],
          [116.493195, 39.953253],
          [116.473195, 39.953253],
          [116.453195, 39.953253]
        ];
        let anchor = [
          'bottom-left',
          'bottom-center',
          'bottom-right',
          'middle-left',
          'center',
          'middle-right',
          'top-left',
          'top-center',
          'top-right'
        ]
        let pos_icon = [];
        let pos_marker = [];
        let icon = [];
        let marker = [];
        for (let i = 0; i < positions.length; i++) {
          // 创建一个 Icon
          pos_icon[i] = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(12, 12),
            // 图标的取图地址
            image: '//a.amap.com/jsapi_demos/static/demo-center/marker/marker.png',
            // 图标所用图片大小
            imageSize: new AMap.Size(12, 12),
          });
          let labelContent = "<div class='labelContent'>anchor:" + anchor[i] + "</div>"

          // 将 Icon 传入 marker
          pos_marker[i] = new AMap.Marker({
            position: positions[i],
            icon: pos_icon[i],
            anchor: 'center', //设置锚点
            offset: new AMap.Pixel(0, 0) //设置偏移量
          });
          map.add(pos_marker[i]);

          // 创建一个 Icon
          let imageUrl = '//a.amap.com/jsapi_demos/static/demo-center/marker/icon.png'
          icon[i] = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(46, 28),
            // 图标的取图地址
            image: imageUrl,
            // 图标所用图片大小
            imageSize: new AMap.Size(46, 28),
          });
          // 将 Icon 传入 marker
          let labelOffset = new AMap.Pixel(0, -5);
          marker[i] = new AMap.Marker({
            position: positions[i],
            icon: icon[i],
            anchor: anchor[i], //设置锚点
            offset: new AMap.Pixel(0, 0), //设置偏移量
            label: {
              direction: 'top',
              content: labelContent,
              offset: labelOffset,
            }
          });
          map.add(marker[i]);
        }
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
