<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      地图上右击鼠标，弹出右键菜单
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
        contextMenuPositon: []
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
        let lnglat = new AMap.LngLat(116.397, 39.918);

        that.map = new AMap.Map("container", {
          center: lnglat,
          zoom: 14,
          resizeEnable: true
        });

        //地图中添加鼠标工具MouseTool插件
        let mouseTool = new AMap.MouseTool(that.map);

        // 创建一个右键菜单实例
        let contextMenu = new AMap.ContextMenu();

        //右键缩小
        contextMenu.addItem("缩小", function () {
          let zoom = that.map.getZoom();
          that.map.setZoom(--zoom);
        }, 0);

        //右键放大
        contextMenu.addItem("放大", function () {
          let zoom = that.map.getZoom();
          that.map.setZoom(++zoom);
        }, 0);

        //右键菜单距离量测
        contextMenu.addItem("距离量测", function () {
          mouseTool.rule();
          contextMenu.close();
        }, 0);

        //右键菜单添加Marker标记
        contextMenu.addItem("添加标记", function () {
          mouseTool.close();
          let marker = new AMap.Marker({
            map: that.map,
            position: that.contextMenuPositon || that.map.getCenter() //基点位置
          });
          contextMenu.close();
        }, 0);


        //地图绑定鼠标右击事件——弹出右键菜单
        that.map.on('rightclick', function (e) {
          //右键菜单位置
          that.contextMenuPositon = e.lnglat
          contextMenu.open(that.map, e.lnglat);
        });
      },

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
