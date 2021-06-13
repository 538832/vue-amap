<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>覆盖物拖拽事件的绑定与解绑</h5>
      <el-button size="mini" round @click="clickOn">绑定事件</el-button>
      <el-button size="mini" round @click="clickOff">解绑事件</el-button>
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
        message: '请拖拽覆盖物试试',
        marker: null,
        circle: null,
        polygon: null
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
        let that = this;
        that.map = new AMap.Map("container", {
          resizeEnable: true
        });

        that.marker = new AMap.Marker({
          map: that.map,
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [116.405467, 39.907761],
          draggable: true
        });

        let lineArr = [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]
        ];
        that.circle = new AMap.Circle({
          //map: that.map,
          center: lineArr[0],          //设置线覆盖物路径
          radius: 1500,
          strokeColor: "#3366FF", //边框线颜色
          strokeOpacity: 0.3,       //边框线透明度
          strokeWeight: 3,        //边框线宽
          fillColor: "#FFA500", //填充色
          fillOpacity: 0.35, //填充透明度
          draggable: true
        });
        that.map.add(that.circle);
        /*
          TODO: 官网案例上的圆也没有加载出来, 查看JSAPI2.0，构造中并没有map这一项，而在JSAPI1.4.15中存在这一项，后期反馈给高德地图(2021/6/13)
          JSAPI2.0链接：https://lbs.amap.com/api/jsapi-v2/documentation#circle
          JSAPI1.4.15链接：https://lbs.amap.com/api/javascript-api/reference/overlay#circle
          通过map.add()方法可解决
         */

        let polygonArr = [[116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353],
          [116.389846, 39.891365]];
        that.polygon = new AMap.Polygon({
          map: that.map,
          path: polygonArr,//设置多边形边界路径
          strokeColor: "#FF33FF", //线颜色
          strokeOpacity: 0.2, //线透明度
          strokeWeight: 3,    //线宽
          fillColor: "#1791fc", //填充色
          fillOpacity: 0.35,//填充透明度
          draggable: true
        });
        that.map.setFitView();
      },

      // 事件绑定 如果拖拽没有反应 请检查参数中是否有 draggable: true
      clickOn() {
        this.marker.on('dragging', this.showInfoM);
        this.circle.on('dragging', this.showInfoC);
        this.polygon.on('dragging', this.showInfoP);
        this.$message('绑定事件');
      },

      // 解绑事件
      clickOff() {
        this.marker.off('dragging', this.showInfoM);
        this.circle.off('dragging', this.showInfoC);
        this.polygon.off('dragging', this.showInfoP);
        this.$message('解除绑定事件');
      },

      showInfoM(e) {
        this.message = '您拖拽了marker！'
      },

      showInfoC(e) {
        this.message = '您拖拽了圆！'
      },

      showInfoP(e) {
        this.message = '您拖拽了多边形！'
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

  .info {
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 30px;
  }

  .input-item {
    position: absolute;
    background: white;
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }

</style>
