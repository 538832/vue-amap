<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>覆盖物群组添加/移除</h5>
      <el-button size="mini" round @click="addOverlayGroup">添加覆盖物群组</el-button>
      <el-button size="mini" round @click="removeOverlayGroup">移除覆盖物群组</el-button>
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
        overlayGroups: null,
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
        this.map = new AMap.Map("container", {
          zoom: 13,
          center: [116.43, 39.92],
          resizeEnable: true
        });

        let lnglats = [[116.39, 39.92], [116.41, 39.93], [116.43, 39.91], [116.46, 39.93]];
        let markers = [];

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

          markers.push(marker);
        }

        // 创建覆盖物群组，并将 marker 传给 OverlayGroup
        this.overlayGroups = new AMap.OverlayGroup(markers);
      },

      // 添加覆盖物群组
      addOverlayGroup() {
        this.map.add(this.overlayGroups);
      },

      // 移除覆盖物群组
      removeOverlayGroup() {
        this.map.remove(this.overlayGroups);
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
