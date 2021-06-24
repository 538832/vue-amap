<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      拖动Marker可调整位置
    </div>
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
        marker: null,
        path: [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]
        ]
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
        this.map = new AMap.Map("container", {
          zoom: 13
        });

        // 创建折线
        let polyline = new AMap.Polyline({
          map: this.map,
          path: this.path,
          strokeColor: '#80d8ff',
          strokeWeight: 5
        });

        // 创建marker
        this.marker = new AMap.Marker({
          map: this.map,
          draggable: true,
          position: [116.377904, 39.915423]
        });

        this.map.setFitView();
        this.pointOnSegment();
        this.marker.on('dragging', this.pointOnSegment)
      },

      // 判断点线关系
      pointOnSegment() {
        let pos = this.marker.getPosition();
        // mp = getResolution() 获取指定位置的地图分辨率，单位：米/像素
        let mp = this.map.getResolution();
        // m 为Polyline宽度的米数
        let m = 5 * mp;
        // 判断 marker 是否在线段上，最后一个参数为 m米 的误差
        let inLine = AMap.GeometryUtil.isPointOnSegment(pos, this.path[0], this.path[1], m);
        let text = '点不在第一条线段上';
        if (inLine) {
          text = '点在第一条线段上';
        }
        this.marker.setLabel({
          offset: new AMap.Pixel(20, 20),
          content: text
        });
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
  }
</style>
