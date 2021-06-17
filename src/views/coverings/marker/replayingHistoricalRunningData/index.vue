<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>轨迹回放控制</h5>
      <div class="item">
        <span>卫星图层：</span>
        <el-button size="mini" round @click="startAnimation">开始动画</el-button>
        <el-button size="mini" round @click="pauseAnimation">暂停动画</el-button>
      </div>
      <div class="item">
        <span>红色标记：</span>
        <el-button size="mini" round @click="resumeAnimation">继续动画</el-button>
        <el-button size="mini" round @click="stopAnimation">停止动画</el-button>
      </div>

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
        lineArr: [[116.478935, 39.997761], [116.478939, 39.997825], [116.478912, 39.998549], [116.478912, 39.998549], [116.478998, 39.998555], [116.478998, 39.998555], [116.479282, 39.99856], [116.479658, 39.998528], [116.480151, 39.998453], [116.480784, 39.998302], [116.480784, 39.998302], [116.481149, 39.998184], [116.481573, 39.997997], [116.481863, 39.997846], [116.482072, 39.997718], [116.482362, 39.997718], [116.483633, 39.998935], [116.48367, 39.998968], [116.484648, 39.999861]]
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
        // JSAPI2.0 使用覆盖物动画必须先加载动画插件
        // AMap.plugin('AMap.MoveAnimation', function () {

        let map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 17
        });

        this.marker = new AMap.Marker({
          map: map,
          position: [116.478935, 39.997761],
          icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
          offset: new AMap.Pixel(-13, -26),
        });

        // 绘制轨迹
        var polyline = new AMap.Polyline({
          map: map,
          path: this.lineArr,
          showDir: true,
          strokeColor: "#28F",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
        });

        var passedPolyline = new AMap.Polyline({
          map: map,
          strokeColor: "#AF5",  //线颜色
          strokeWeight: 6,      //线宽
        });


        this.marker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
        });

        map.setFitView();
        // / });
      },
      startAnimation() {
        this.marker.moveAlong(this.lineArr, {
          // 每一段的时长
          duration: 200,
          // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
          autoRotation: true,
        });
      },
      pauseAnimation() {
        this.marker.pauseMove();
      },
      resumeAnimation() {
        this.marker.resumeMove();
      },
      stopAnimation() {
        this.marker.stopMove();
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

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }

  .input-item .item {
    margin: 10px 0px;
  }
</style>
