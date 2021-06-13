<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <span v-text="message"></span>
    </div>
    <div class="input-item">
      <h5>地图拖拽相关事件</h5>
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
        message: '覆盖物点击事件的绑定与解绑',
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
          position: [116.405467, 39.907761]
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
          fillOpacity: 0.35//填充透明度
        });
        /*
          TODO: 官网案例上的圆也没有加载出来, 查看JSAPI2.0，构造中并没有map这一项，而在1.4.15中存在这一项，后期反馈给高德地图(2021/6/13)
          2.0连接：https://lbs.amap.com/api/jsapi-v2/documentation#circle
          1.4.15连接：https://lbs.amap.com/api/javascript-api/reference/overlay#circle
          通过map.add()方法可解决
         */
        that.map.add( that.circle);

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
          fillOpacity: 0.35//填充透明度
        });
        that.map.setFitView();
      },


      // 事件绑定
      clickOn() {
        this.marker.on('click', this.showInfoM);
        this.circle.on('click', this.showInfoC);
        this.polygon.on('click', this.showInfoP);

        this.marker.on('mouseover', this.showInfoOver);
        this.circle.on('mouseover', this.showInfoOver);
        this.polygon.on('mouseover', this.showInfoOver);

        this.marker.on('mouseout', this.showInfoOut);
        this.circle.on('mouseout', this.showInfoOut);
        this.polygon.on('mouseout', this.showInfoOut);
        this.$message('绑定事件');
      },

      // 解绑事件
      clickOff() {
        this.marker.off('click', this.showInfoM);
        this.circle.off('click', this.showInfoC);
        this.polygon.off('click', this.showInfoP);

        this.marker.off('mouseover', this.showInfoOver);
        this.circle.off('mouseover', this.showInfoOver);
        this.polygon.off('mouseover', this.showInfoOver);

        this.marker.off('mouseout', this.showInfoOut);
        this.circle.off('mouseout', this.showInfoOut);
        this.polygon.off('mouseout', this.showInfoOut);

        this.$message('解除绑定事件');
      },

      showInfoM(e) {
        this.message = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了marker！'
      },

      showInfoC(e) {
        this.message = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了圆！'
      },

      showInfoP(e) {
        this.message = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了多边形！'
      },

      showInfoOver(e) {
        this.message = '鼠标移入覆盖物！'
      },

      showInfoOut(e) {
        this.message = '鼠标移出覆盖物！'
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
