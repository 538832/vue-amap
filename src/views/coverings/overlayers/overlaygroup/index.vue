<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-card">
      <el-button size="mini" round @click="show">显示覆盖物</el-button>
      <el-button size="mini" round @click="hide">隐藏覆盖物</el-button>
      <el-button size="mini" round @click="setOptions">修改覆盖物颜色</el-button>
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
        overlayGroup: null
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
          resizeEnable: true,
          center: [116.40, 39.91],
          zoom: 13
        });
        let lineArr = [
          [116.37, 39.91],
          [116.38, 39.90],
          [116.39, 39.91],
          [116.40, 39.90]
        ];
        let polyline = new AMap.Polyline({
          path: lineArr,          //设置线覆盖物路径
          strokeColor: "#3366FF", //线颜色
          strokeOpacity: 1,       //线透明度
          strokeWeight: 5,        //线宽
          strokeStyle: "solid",   //线样式
          strokeDasharray: [10, 5] //补充线样式
        });
        let polygonArr = new Array();//多边形覆盖物节点坐标数组
        polygonArr.push([116.40, 39.92]);
        polygonArr.push([116.41, 39.90]);
        polygonArr.push([116.40, 39.89]);
        polygonArr.push([116.39, 39.89]);
        let polygon = new AMap.Polygon({
          path: polygonArr,//设置多边形边界路径
          strokeColor: "#FF33FF", //线颜色
          strokeOpacity: 0.2, //线透明度
          strokeWeight: 3,    //线宽
          fillColor: "#1791fc", //填充色
          fillOpacity: 0.35//填充透明度
        });

        let circle = new AMap.Circle({
          center: new AMap.LngLat("116.40", "39.92"),// 圆心位置
          radius: 1000, //半径
          strokeColor: "#F33", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线粗细度
          fillColor: "#ee2200", //填充颜色
          fillOpacity: 0.35//填充透明度
        });

        this.overlayGroup = new AMap.OverlayGroup([polyline, polygon, circle])
        map.add(this.overlayGroup);

      },
      //显示覆盖物
      show() {
        this.overlayGroup.show()
      },

      //隐藏覆盖物
      hide() {
        this.overlayGroup.hide()
      },
      //修改覆盖物颜色
      setOptions() {
        this.overlayGroup.setOptions({fillColor: this.randomColor(), strokeColor: this.randomColor(), outlineColor: this.randomColor()})
      },
      randomColor() {
        return '#' + (Math.random() * 0xffffff << 0).toString(16)
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

  .input-card {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    bottom: 30px;
  }

  .input-card .box {
    margin: 10px 0;
  }
</style>
