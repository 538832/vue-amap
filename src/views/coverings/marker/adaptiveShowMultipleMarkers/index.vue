<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>地图自适应</h5>
      <el-button size="mini" round @click="setFitView">地图自适应显示</el-button>
    </div>
    <div class="info">
      <div id="centerCoord" v-text="centerCoord"></div>
      <div id="tips" v-text="tips"></div>
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
        centerCoord: '',
        tips: '',
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
        that.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13
        });
        that.map.clearMap();  // 清除地图覆盖物

        let markers = [{
          //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          position: [116.205467, 39.907761]
        }, {
          //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
          icon: new AMap.Icon({
            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          position: [116.368904, 39.913423]
        }, {
          //icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
          icon: new AMap.Icon({
            image: "a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png",
            size: new AMap.Size(25, 34),  //图标所处区域大小
            imageSize: new AMap.Size(25, 34)//图标大小
          }),
          position: [116.305467, 39.807761]
        }];

        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        markers.forEach(function (marker) {
          new AMap.Marker({
            map: that.map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30)
          });
        });

        let center = that.map.getCenter();

        that.centerCoord = '当前中心点坐标：' + center.getLng() + ',' + center.getLat();
        that.tips = '成功添加三个点标记，其中有两个在当前地图视野外！';
      },

      setFitView() {
        // 第一个参数为空，表明用图上所有覆盖物 setFitview
        // 第二个参数为false, 非立即执行
        // 第三个参数设置上左下右的空白
        this.map.setFitView(null, false, [150, 60, 100, 60]);
        var newCenter = this.map.getCenter();
        this.centerCoord = '当前中心点坐标：' + newCenter.toString();
        this.tips = '通过setFitView，地图自适应显示到合适的范围内,点标记已全部显示在视野中！';
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

  .info {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    top: 30px;
  }
</style>
