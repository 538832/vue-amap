<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="info">
      <h5>预报天气</h5>
      <hr>
      <p v-html='forecast'></p>
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
        forecast: ''
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
          resizeEnable: true,
          center: [116.486409, 39.921489],
          zoom: 12
        });
        let weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive('朝阳区', function (err, data) {
          if (!err) {
            let str = [];
            str.push('<h5 >实时天气' + '</h5><hr>');
            str.push('<p style="margin: 2px">城市/区：' + data.city + '</p>');
            str.push('<p style="margin: 2px">天气：' + data.weather + '</p>');
            str.push('<p style="margin: 2px">温度：' + data.temperature + '℃</p>');
            str.push('<p style="margin: 2px">风向：' + data.windDirection + '</p>');
            str.push('<p style="margin: 2px">风力：' + data.windPower + ' 级</p>');
            str.push('<p style="margin: 2px">空气湿度：' + data.humidity + '</p>');
            str.push('<p style="margin: 2px">发布时间：' + data.reportTime + '</p>');
            let marker = new AMap.Marker({map: map, position: map.getCenter()});
            let infoWin = new AMap.InfoWindow({
              content: '<div class="info" style="background-color: white;padding:5px;position:inherit;margin-bottom:0;">' + str.join('') + '</div>',
              offset: new AMap.Pixel(0, -37)
            });
            infoWin.open(map, marker.getPosition());
            marker.on('mouseover', function () {
              infoWin.open(map, marker.getPosition());
            });
          }
        });
        //未来4天天气预报
        weather.getForecast('朝阳区', function (err, data) {
          if (err) {
            return;
          }
          let str = [];
          for (let i = 0, dayWeather; i < data.forecasts.length; i++) {
            dayWeather = data.forecasts[i];
            str.push(dayWeather.date + ' <span class="weather" style="width:5rem;display:inline-block; padding-left:0.5rem;">' + dayWeather.dayWeather + '</span> ' + dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃');
          }
          that.forecast = str.join('<br>');
        });
      },

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
    width: 320px;
  }
</style>
