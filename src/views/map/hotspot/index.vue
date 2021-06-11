<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="tip">鼠标悬停热点试试</div>
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
        infoWindow: null,
        placeSearch: null
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
        that.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13,
          isHotspot: true
        });
        that.placeSearch = new AMap.PlaceSearch();  //构造地点查询类
        that.infoWindow = new AMap.InfoWindow({});

        that.map.on('hotspotover', function (result) {
          that.placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              that.placeSearchCallBack(result);
            }
          });
        })
      },

      //回调函数
      placeSearchCallBack(data) {
        var poiArr = data.poiList.pois;
        var location = poiArr[0].location;
        this.infoWindow.setContent(this.createContent(poiArr[0]));
        this.infoWindow.open(this.map, location);
      },

      //信息窗体内容
      createContent(poi) {
        var s = [];
        s.push('<div class="info-title">' + poi.name + '</div><div class="info-content">' + "地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        s.push('<div>');
        return s.join("<br>");
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

  .info-title {
    font-weight: bolder;
    color: #000;
    font-size: 14px;
    width: 250px;
    line-height: 26px;
    padding: 0 0 0 6px;
  }

  .info-content {
    width: 250px;
    padding: 4px;
    color: #666666;
    line-height: 23px;
    font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
  }

  .info-content img {
    float: left;
    margin: 3px;
  }

  .amap-info-combo .keyword-input {
    height: auto;
  }
</style>
