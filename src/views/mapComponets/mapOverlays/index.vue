<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="input-item">
      <h5>添加、删除覆盖物</h5>
      <div class="item">
        <el-button size="mini" round @click="addMarker">添加Marker</el-button>
        <el-button size="mini" round @click="removeMarker">删除Marker</el-button>
      </div>
      <div class="item">
        <el-button size="mini" round @click="addCircle">添加Circle</el-button>
        <el-button size="mini" round @click="removeCircle">删除Circle</el-button>
      </div>
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
        //点标记
        marker: null,
        // 构造矢量圆形
        circle: null
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
        var that = this

        function isLoaded() {
          try {
            var map = new AMap.Map('container', {
              resizeEnable: true,
              zoom: 11,
              center: [116.397428, 39.90923]
            });
            that.map = map;
          } catch (e) {
            setTimeout(() => {
              isLoaded()
            }, 50)
          }
        }

        isLoaded()
      },

      //添加Marker
      addMarker() {
        // 构造点标记
        this.marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [116.405467, 39.907761],
          anchor: 'bottom-center'
        });
        this.map.add(this.marker);
        this.map.setFitView();
      },

      //删除Marker
      removeMarker() {
        this.map.remove(this.marker);
        this.map.setFitView();
      },

      //添加Circle
      addCircle() {
        // 构造矢量圆形
        this.circle = new AMap.Circle({
          center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
          radius: 1000,  //半径
          strokeColor: "#F33",  //线颜色
          strokeOpacity: 1,  //线透明度
          strokeWeight: 3,  //线粗细度
          fillColor: "#ee2200",  //填充颜色
          fillOpacity: 0.35 //填充透明度
        });
        this.map.add(this.circle);
        this.map.setFitView();

      },

      //删除Circle
      removeCircle() {
        this.map.remove(this.circle);
        this.map.setFitView();
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

  .input-item .item {
    margin: 10px 0px;
  }
</style>
