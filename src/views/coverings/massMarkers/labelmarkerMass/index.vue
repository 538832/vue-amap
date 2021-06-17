<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      海量点展示: 30000
    </div>
  </div>
</template>

<script>
  import {Positions} from '@/utils/amap/mock_position.js'

  export default {
    name: "index",

    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        allowCollision: false,
        layer: null,
        disabled1: false,
        disabled2: true
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
          zoom: 9,
          center: [116.12, 40.11],
          mapStyle: 'amap://styles/whitesmoke',
          showLabel: false,
          showIndoorMap: false,
        });

        map.on('complete', function () {
          // 创建 AMap.LabelsLayer 图层
          let layer = new AMap.LabelsLayer({
            zooms: [3, 20],
            zIndex: 1000,
            collision: false
          });

          // 将图层添加到地图
          map.add(layer);

          let markers = [];
          let positions = Positions.slice(0, 3E4);

          let icon = {
            type: 'image',
            image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            size: [6, 9],
            anchor: 'bottom-center',
          };

          for (let i = 0; i < positions.length; i++) {
            let curPosition = positions[i];
            let curData = {
              position: curPosition,
              icon
            };

            let labelMarker = new AMap.LabelMarker(curData);

            markers.push(labelMarker);

            // 给marker绑定事件
            labelMarker.on('mouseover', function (e) {
              let position = e.data.data && e.data.data.position;

              if (position) {
                normalMarker.setContent(
                  '<div class="amap-info-window">'
                  + position +
                  '<div class="amap-info-sharp"></div>' +
                  '</div>');
                normalMarker.setPosition(position);
                map.add(normalMarker);
              }
            });

            labelMarker.on('mouseout', function () {
              map.remove(normalMarker);
            });
          }

          // 一次性将海量点添加到图层
          layer.add(markers);

          // 普通点
          let normalMarker = new AMap.Marker({
            anchor: 'bottom-center',
            offset: [0, -15],
          });
        });
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
