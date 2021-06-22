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
        let that = this;
        let lnglat = new AMap.LngLat(116.397, 39.918);
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: lnglat,
        });
        let placeSearch = new AMap.PlaceSearch({
          city: 'beijing', // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          pageSize: 10, // 单页显示结果条数
          children: 0, //不展示子节点数据
          pageIndex: 1, //页码
          extensions: 'base' //返回基本地址信息
        });

        //详情查询
        placeSearch.getDetails("B000A83U0P", function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            that.placeSearchCallBack(result);
          }
        });
        this.infoWindow = new AMap.InfoWindow({
          autoMove: true,
          offset: {x: 0, y: -30}
        });
      },
      //回调函数
      placeSearchCallBack(data) {
        let poiArr = data.poiList.pois;
        //添加marker
        let marker = new AMap.Marker({
          map: this.map,
          position: poiArr[0].location
        });
        this.map.setCenter(marker.getPosition());
        this.infoWindow.setContent(this.createContent(poiArr[0]));
        this.infoWindow.open(this.map, marker.getPosition());
      },

      //信息窗体内容
      createContent(poi) {
        let s = [];
        s.push("<b>名称：" + poi.name + "</b>");
        s.push("地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        return s.join("<br>");
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
