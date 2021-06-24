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
        polygon1: null,
        polygon2: null,
        textBox: null,
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
        let map = new AMap.Map("container", {
          center: [116.400274, 39.905812],
          zoom: 14
        });

        let path = [
          [116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353],
          [116.389846, 39.891365]
        ]

        // 路径上点按顺序标明
        let markers = [{
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
          position: path[0]
        }, {
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
          position: path[1]
        }, {
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
          position: path[2]
        }, {
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b4.png',
          position: path[3]
        }];

        // 添加点标记，作为参照
        markers.forEach(function (marker) {
          new AMap.Marker({
            map: map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-9, -31)
          });
        });

        // 根据路径绘制多边形
        let polygon = new AMap.Polygon({
          map: map,
          path: path
        });

        let clockwise = AMap.GeometryUtil.isClockwise(path);
        let text = '该路径为逆时针方向';
        if (clockwise) {
          text = '该路径为顺时针方向';
        }
        let textBox = new AMap.Text({
          position: new AMap.LngLat(116.403322, 39.920255),
          text: text,
          offset: new AMap.Pixel(90, -20)
        })
        map.add(textBox);
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
