<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class='info' v-text="message"></div>

    <div class="input-card" style='width:18rem;'>
      <label style='color:grey'>公交站点查询</label>
      <div class="input-item">
        <el-input placeholder="请输入站名" size="mini" v-model="stationKeyWord">
          <template slot="prepend">站名</template>
        </el-input>
      </div>
      <el-button round type="mini" style="width: 100%;" @click="stationSearch">查询</el-button>
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
        stationKeyWord: '阜通',
        markers: [],
        message: ''
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
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],//地图中心点
          zoom: 13 //地图显示的缩放级别
        });
        this.stationSearch();
      },

      /*公交站点查询*/
      stationSearch() {
        let that = this;
        // 移除原有marker
        that.map.remove(this.markers);
        that.markers = [];
        if (!that.stationKeyWord) return
        //实例化公交站点查询类
        let station = new AMap.StationSearch({
          pageIndex: 1, //页码
          pageSize: 60, //单页显示结果条数
          city: '010'   //确定搜索城市
        });
        station.search(that.stationKeyWord, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            that.stationSearch_CallBack(result);
          } else {
            that.message = JSON.stringify(result);
          }
        });
      },

      /*公交站点查询返回数据解析*/
      stationSearch_CallBack(searchResult) {
        let that = this;
        let stationArr = searchResult.stationInfo;
        let searchNum = stationArr.length;
        if (searchNum > 0) {
          that.message = '查询结果：共' + searchNum + '个相关站点';
          for (let i = 0; i < searchNum; i++) {
            let marker = new AMap.Marker({
              icon: new AMap.Icon({
                image: '//a.amap.com/jsapi_demos/static/resource/img/pin.png',
                size: new AMap.Size(32, 32),
                imageSize: new AMap.Size(32, 32)
              }),
              offset: new AMap.Pixel(-16, -32),
              position: stationArr[i].location,
              map: that.map,
              title: stationArr[i].name
            });
            marker.info = new AMap.InfoWindow({
              content: stationArr[i].name,
              offset: new AMap.Pixel(0, -30)
            });
            marker.on('mouseover', function (e) {
              e.target.info.open(that.map, e.target.getPosition())
            })
            that.markers.push(marker);
          }
          that.map.setFitView();
        }
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
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
    width: 220px;
  }

  .input-card {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    bottom: 30px;
    right: 30px;
    padding: 10px;
  }

  .input-card .input-item {
    margin: 10px 0;
  }
</style>
