<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="input-card">
      <h4>设置地图中心点</h4>
      <el-button size="mini" class="btn" round @click="randomZoom">随机地图层级 setZoom</el-button>
      <el-button size="mini" class="btn" round @click="randomCenter">随机地图中心点 setCenter</el-button>
      <el-button size="mini" class="btn" round @click="randomZoomCenter">随机地图层级与中心点 setZoomAndCenter</el-button>
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
        //地图级别
        zoom: 11,
        //地图中心点
        center: {
          lng: 116.407387,
          lat: 39.904179
        }
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
        let that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              zoom: that.zoom, //初始地图级别
              center: [that.center.lng, that.center.lat], //初始地图中心点
            });
            that.map = map
            //绑定地图移动事件
            AMap.event.addListener(that.map, 'moveend', function () { //添加点击事件,传入对象名，事件名，回调函数
              that.zoom = that.map.getZoom();
              that.center.lng = that.map.getCenter().lng;
              that.center.lat = that.map.getCenter().lat;
            })

            //绑定地图缩放事件
            AMap.event.addListener(that.map, 'zoomend', function () { //添加点击事件,传入对象名，事件名，回调函数
              that.zoom = that.map.getZoom();
              that.center.lng = that.map.getCenter().lng;
              that.center.lat = that.map.getCenter().lat;
            })
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()


      },

      // 随机改变地图层级
      randomZoom() {
        var zoom = Math.floor(Math.random() * 7) + 11; //zoom范围[11,18]
        this.map.setZoom(zoom); //设置地图层级
        this.$message('当前层级已设为' + zoom + '级');

      },
      randomCenter() {
        var lng = 121.138398 + Math.floor(Math.random() * 589828) / 1e6; //经度范围[121.138398, 121.728226]
        var lat = 30.972688 + Math.floor(Math.random() * 514923) / 1e6; //纬度范围[30.972688, 31.487611]
        this.map.setCenter([lng, lat]); //设置地图中心点
        this.$message('当前中心点已设为[' + lng + ',' + lat + ']');
      },

      randomZoomCenter() {
        var zoom = Math.floor(Math.random() * 7) + 11;
        var lng = 121.138398 + Math.floor(Math.random() * 589828) / 1e6;
        var lat = 30.972688 + Math.floor(Math.random() * 514923) / 1e6;
        this.map.setZoomAndCenter(zoom, [lng, lat]); //同时设置地图层级与中心点
        this.$message('当前层级已设为' + zoom + '级，中心点已设为[' + lng + ',' + lat + ']');
      },
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

  #input-card {
    position: absolute;
    right: 30px;
    top: 30px;
    background: white;
    padding: 0px 20px;
  }

  #input-card > .btn {
    display: block;
    margin: 10px 10px;
    text-align: left;
  }
</style>
