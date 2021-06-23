<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <h4 v-text='status'></h4>
      <hr>
      <p v-html='result'></p>
      <hr>
      由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。
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
        status: '',
        result: ''
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
        let map = new AMap.Map('container', {
          resizeEnable: true
        });

        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          position: 'RB',    //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            that.onComplete(result)
          } else {
            that.onError(result)
          }
        });
      },
      //解析定位结果
      onComplete(data) {
        this.status = '定位成功'
        let str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        this.result = str.join('<br>');
      },
      //解析定位错误信息
      onError(data) {
        this.status = '定位失败'
        this.result = '失败原因排查信息:' + data.message;
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
    padding: 20px;
    width: 320px;
  }
</style>
