<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  import {points} from '@/utils/amap/weight.js'

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
        let map = new AMap.Map("container", {
          center: [104.937478, 35.439575],
          mapStyle: "amap://styles/grey",
          zoom: 5
        });

        // 数据中增加权重信息，以权重高的点为中心进行聚合
        // 本示例中北京等城市中心点权重较高
        // let points = [
        // { weight: 8, lnglat:["116.408032","39.909729"], "name": '北京'},
        // { weight: 8, lnglat:["121.461743","31.231584"], "name": '上海'},
        // { weight: 8, lnglat:["113.265942","23.08983"], "name": '广州'},
        // { weight: 8, lnglat:["104.059399","30.562253"], "name": '成都'},
        // { weight: 1, lnglat: ["108.939621", "34.343147"] },
        // { weight: 1, lnglat: ["112.985037", "23.15046"] },
        // ...
        // ]
        let cluster = new AMap.MarkerCluster(map, points, {
          gridSize: 60, // 聚合网格像素大小
          renderClusterMarker: this.renderClusterMarker, // 自定义聚合点样式
          renderMarker: this.renderMarker,   // 自定义非聚合点样式
        });
      },

      renderClusterMarker(context) {
        let bgColor;
        let count = points.length;
        // 聚合中点个数
        let clusterCount = context.count;
        let div = document.createElement('div');
        // 聚合点配色
        let defaultColor = [
          '204,235,197',
          '168,221,181',
          '123,204,196',
          '78,179,211',
          '43,140,190',
        ]
        if (clusterCount >= 0 && clusterCount < 10) {
          bgColor = defaultColor[0];
        } else if (clusterCount >= 10 && clusterCount < 100) {
          bgColor = defaultColor[1];
        } else if (clusterCount >= 100 && clusterCount < 1000) {
          bgColor = defaultColor[2];
        } else if (clusterCount >= 1000 && clusterCount < 10000) {
          bgColor = defaultColor[3];
        } else if (clusterCount >= 10000) {
          bgColor = defaultColor[4];
        }
        div.style.backgroundColor = 'rgba(' + bgColor + ',.5)';
        let size = Math.round(25 + Math.pow(clusterCount / count, 1 / 5) * 40);
        div.style.width = div.style.height = size + 'px';
        div.style.border = 'solid 1px rgba(' + bgColor + ',1)';
        div.style.borderRadius = size / 2 + 'px';
        div.innerHTML = context.count;
        div.style.lineHeight = size + 'px';
        div.style.color = '#ffffff';
        div.style.fontSize = '12px';
        div.style.textAlign = 'center';
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div);
      },

      renderMarker(context) {
        let content = '<div style="background-color: rgba(255,255,178,.9); height: 18px; width: 18px; border: 1px solid rgba(255,255,178,1); border-radius: 12px; box-shadow: rgba(0, 0, 0, 1) 0px 0px 3px;"></div>';
        let offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content)
        context.marker.setOffset(offset)
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
