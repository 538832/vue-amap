<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null
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
        //初始化地图对象，加载地图
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 13
        });

        this.pathLength();
      },
      pathLength() {
        let arr = new Array();//经纬度坐标数组
        arr.push(new AMap.LngLat("116.368904", "39.913423"));
        arr.push(new AMap.LngLat("116.382122", "39.901176"));
        arr.push(new AMap.LngLat("116.387271", "39.912501"));
        arr.push(new AMap.LngLat("116.398258", "39.904600"));
        arr.push(new AMap.LngLat("116.427097", "39.912500"));

        //定义折线对象
        let polyline = new AMap.Polyline({
          path: arr,     //设置折线的节点数组
          strokeColor: "red",
          strokeOpacity: 1,
          strokeWeight: 3,
          strokeDasharray: [10, 5]
        });

        polyline.setMap(this.map);//地图上添加折线

        let distance = Math.round(AMap.GeometryUtil.distanceOfLine(arr));
        let text = new AMap.Text({
          position: new AMap.LngLat(116.427097, 39.912500),
          text: '折线长' + distance + '米',
          offset: new AMap.Pixel(-20, -20)
        })
        this.map.add(text);
        this.map.setFitView();
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
</style>
