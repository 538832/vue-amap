<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <el-button size="mini" round @click="getOneOverlay">获取 id 为 2 覆盖物</el-button>
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
        markers: []
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
        // 创建地图实例
        this.map = new AMap.Map('container', {
          zoom: 13,
          center: [116.43, 39.92],
          resizeEnable: true
        });

        let lnglats = [[116.39, 39.92], [116.41, 39.93], [116.43, 39.91], [116.46, 39.93]];

        for (let i = 0; i < lnglats.length; i++) {
          let lnglat = lnglats[i];
          // 创建点实例
          let marker = new AMap.Marker({
            position: new AMap.LngLat(lnglat[0], lnglat[1]),
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + (i + 1) + '.png',
            extData: {
              id: i + 1
            }
          });

          this.markers.push(marker);
        }

        // 将点添加到地图
        this.map.add(this.markers);
      },


      // 获取当前 id 的覆盖物
      getOneOverlay() {
        let targetId = 2;
        let targetMarker;

        for (let i = 0; i < this.markers.length; i++) {
          // 获取存在每个 extData 中的 id
          let id = this.markers[i].getExtData().id;

          if (id === targetId) {
            targetMarker = this.markers[i];
            break;
          }
        }

        let position = targetMarker.getPosition();

        let infoWindow = new AMap.InfoWindow({
          position: position,
          offset: new AMap.Pixel(0, -35),
          content: '<div>已获取 id 为 2 覆盖物</div>'
        });

        infoWindow.open(this.map);
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
    padding: 10px 20px;
    right: 30px;
    bottom: 30px;
  }
</style>
