<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      地图上右击鼠标，弹出自定义样式的右键菜单
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
        infoWindow: null
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
        let lnglat = new AMap.LngLat(116.397, 39.918);
        let contextMenuPositon = []

        let map = new AMap.Map("container", {
          center: lnglat,
          zoom: 14,
        });

        //创建右键菜单
        let contextMenu = new AMap.ContextMenu();

        //右键放大
        contextMenu.addItem("放大一级", function () {
          map.zoomIn();
        }, 0);

        //右键缩小
        contextMenu.addItem("缩小一级", function () {
          map.zoomOut();
        }, 1);

        //右键显示全国范围
        contextMenu.addItem("缩放至全国范围", function (e) {
          map.setZoomAndCenter(4, [108.946609, 34.262324]);
        }, 2);

        //右键添加Marker标记
        contextMenu.addItem("添加标记", function (e) {
          let marker = new AMap.Marker({
            map: map,
            position: contextMenuPositon //基点位置
          });
        }, 3);

        //地图绑定鼠标右击事件——弹出右键菜单
        map.on('rightclick', function (e) {
          contextMenu.open(map, e.lnglat);
          contextMenuPositon = e.lnglat;
        });

        contextMenu.open(map, lnglat);
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative;
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
</style>
