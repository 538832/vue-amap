<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>聚合点效果切换</h5>
      <el-button size="mini" round @click="addCluster(0)">默认样式</el-button>
      <el-button size="mini" round @click="addCluster(1)">自定义图标</el-button>
      <el-button size="mini" round @click="addCluster(2)">完全自定义</el-button>
    </div>
  </div>
</template>

<script>
  import {points} from '@/utils/amap/china.js'

  export default {
    name: "index",

    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        cluster: null,
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
          center: [104.937478, 35.439575],
          zoom: 5
        });
        this.addCluster(2);
      },

      renderClusterMarker(context) {
        // 数据中需包含经纬度信息字段 lnglat
        // var points = [
        // { lnglat: ["108.939621", "34.343147"] },
        // { lnglat: ["112.985037", "23.15046"] },
        // ...
        // ...
        // ]
        let count = points.length;
        let factor = Math.pow(context.count / count, 1 / 18);
        let div = document.createElement('div');
        let Hue = 180 - factor * 180;
        let bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
        let fontColor = 'hsla(' + Hue + ',100%,90%,1)';
        let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
        let shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
        div.style.backgroundColor = bgColor;
        let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
        div.style.width = div.style.height = size + 'px';
        div.style.border = 'solid 1px ' + borderColor;
        div.style.borderRadius = size / 2 + 'px';
        div.style.boxShadow = '0 0 5px ' + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = fontColor;
        div.style.fontSize = '14px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div)
      },

      renderMarker(context) {
        let content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
        let offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content)
        context.marker.setOffset(offset)
      },

      addCluster(tag) {
        let gridSize = 60
        if (this.cluster) {
          this.cluster.setMap(null);
        }
        if (tag == 2) {//完全自定义
          this.cluster = new AMap.MarkerCluster(this.map, points, {
            gridSize: gridSize, // 设置网格像素大小
            renderClusterMarker: this.renderClusterMarker, // 自定义聚合点样式
            renderMarker: this.renderMarker, // 自定义非聚合点样式
          });
        } else if (tag == 1) {//自定义图标
          let sts = [{
            url: "//a.amap.com/jsapi_demos/static/images/blue.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          }, {
            url: "//a.amap.com/jsapi_demos/static/images/green.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
          }, {
            url: "//a.amap.com/jsapi_demos/static/images/orange.png",
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
          }, {
            url: "//a.amap.com/jsapi_demos/static/images/red.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }, {
            url: "//a.amap.com/jsapi_demos/static/images/darkRed.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
          }];
          this.cluster = new AMap.MarkerCluster(this.map, points, {
            styles: sts,
            gridSize: gridSize
          });
        } else {//默认样式
          this.cluster = new AMap.MarkerCluster(this.map, points, {gridSize: gridSize});
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

  .input-item {
    position: absolute;
    background: white;
    padding: 5px 20px 10px;
    right: 30px;
    bottom: 30px;
  }
</style>
