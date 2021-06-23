<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info" v-text="message"></div>
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
        this.map = new AMap.Map("container", {
          center: [116.397428, 39.90923],
          zoom: 13
        });
        this.showCityInfo();
      },
      //获取用户所在城市信息
      showCityInfo() {
        let that = this;
        //实例化城市查询类
        let citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              let cityinfo = result.city;
              let citybounds = result.bounds;
              that.message = '您当前所在城市：' + cityinfo;
              //地图显示当前城市
              that.map.setBounds(citybounds);
            }
          } else {
            that.message = result.info;
          }
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

  .info {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 30px;
    right: 30px;
    padding: 10px;
  }
</style>
