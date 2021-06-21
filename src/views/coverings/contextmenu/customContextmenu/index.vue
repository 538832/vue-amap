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
        mouseTool: null,
        ContextMenu: null
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

        //TODO：拆分后报错，暂时使用js语法，后期研究
        //自定义菜单类
        function ContextMenu(map) {
          let that = this;

          //地图中添加鼠标工具MouseTool插件
          this.mouseTool = new AMap.MouseTool(map);

          this.contextMenuPositon = null;

          let content = [];

          content.push("<div class='info context_menu' style='background: white;padding: 10px'>");
          content.push("  <p id='addZoomMenu'>缩小</p>");
          content.push("  <p class='split_line' id='reduceZoomMenu'>放大</p>");
          content.push("  <p class='split_line' id='distanceMeasureMenu'>距离量测</p>");
          content.push("  <p id='addMarkerMenu'>添加标记</p>");
          content.push("</div>");

          //通过content自定义右键菜单内容
          this.contextMenu = new AMap.ContextMenu({isCustom: true, content: content.join('')});

          //地图绑定鼠标右击事件——弹出右键菜单
          map.on('rightclick', function (e) {
            that.contextMenu.open(map, e.lnglat);
            that.contextMenuPositon = e.lnglat; //右键菜单位置
            let p1 = document.getElementById("addZoomMenu")
            p1.onclick = function () {
              menu.zoomMenu(0)
            }
            let p2 = document.getElementById("reduceZoomMenu")
            p2.onclick = function () {
              menu.zoomMenu(1)
            }
            let p3 = document.getElementById("distanceMeasureMenu")
            p3.onclick = function () {
              menu.distanceMeasureMenu()
            }
            let p4 = document.getElementById("addMarkerMenu")
            p4.onclick = function () {
              menu.addMarkerMenu()
            }
          });
        }

        ContextMenu.prototype.zoomMenu = function zoomMenu(tag) {//右键菜单缩放地图
          if (tag === 0) {
            that.map.zoomOut();
          }
          if (tag === 1) {
            that.map.zoomIn();
          }
          this.contextMenu.close();
        };

        ContextMenu.prototype.distanceMeasureMenu = function () {  //右键菜单距离量测
          this.mouseTool.rule();
          this.contextMenu.close();
        };

        ContextMenu.prototype.addMarkerMenu = function () {  //右键菜单添加Marker标记
          this.mouseTool.close();
          let marker = new AMap.Marker({
            map: that.map,
            position: this.contextMenuPositon || that.map.getCenter() //基点位置
          });
          this.contextMenu.close();
        };

        //创建右键菜单
        let menu = new ContextMenu(that.map);
        menu.contextMenu.open(that.map, lnglat);
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
