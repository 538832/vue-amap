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
        map: null,
        address: ''
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
          resizeEnable: true
        });
        let placeSearch = new AMap.PlaceSearch({
          // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
          city: '021'
        })

        placeSearch.search('东方明珠', function (status, result) {
          // 查询成功时，result即对应匹配的POI信息
          //console.log(result)
          let pois = result.poiList.pois;
          for (let i = 0; i < pois.length; i++) {
            let poi = pois[i];
            let marker = [];
            marker[i] = new AMap.Marker({
              position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: poi.name
            });
            // 将创建的点标记添加到已有的地图实例：
            map.add(marker[i]);
          }
          map.setFitView();
        });
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
