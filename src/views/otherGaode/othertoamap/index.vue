<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>坐标转换</h5>
      <el-radio-group v-model="type" @change="setCoordinate">
        <el-radio class="input-text" label="gps">GPS 坐标转为高德坐标</el-radio>
        <el-radio class="input-text" label="mapbar">图吧坐标转为高德坐标</el-radio>
        <el-radio class="input-text" label="baidu">百度坐标转为高德坐标</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map: null,
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        type: 'gps'
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
        this.map = new AMap.Map("container", {
          center: [116.473222, 39.993214],
          zoom: 15
        });
        //初始化
        this.setCoordinate()
      },

      //地图转换
      convertFrom(lnglat, type) {
        let that = this;
        AMap.convertFrom(lnglat, type, function (status, result) {
          if (result.info === 'ok') {
            let resLnglat = result.locations[0];
            let marker = new AMap.Marker({
              position: resLnglat,
            });
            that.map.add(marker);
            // 设置标签
            marker.setLabel({
              offset: new AMap.Pixel(20, 20),
              content: "高德坐标系中首开广场（正确）"
            });
          }
        });
      },

      //切换其它地图坐标
      setCoordinate() {
        //删除地图上所有的覆盖物
        this.map.clearMap();

        let markerText;
        let lnglat;
        if (this.type == 'gps') {
          markerText = "GPS 坐标系中首开广场";
          lnglat = [116.46706996, 39.99188446]; // GPS 坐标系中首开广场
        } else if (this.type == 'mapbar') {
          markerText = '图吧坐标系中首开广场';
          lnglat = [116.46179996, 39.99241446]; // 图吧坐标系下首开广场
        } else if (this.type == 'baidu') {
          markerText = '百度坐标系中首开广场';
          lnglat = [116.4798674287, 39.9989020876]; // 百度坐标系下首开广场
        }

        let marker = new AMap.Marker({
          position: lnglat,
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        });
        this.map.add(marker);
        // 设置label标签
        marker.setLabel({
          offset: new AMap.Pixel(20, 20),
          content: markerText
        });

        // 坐标转换
        this.convertFrom(lnglat, this.type);
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
    width: 220px;
  }

  .input-item .input-text {
    display: block;
    padding: 10px 0;
  }
</style>
